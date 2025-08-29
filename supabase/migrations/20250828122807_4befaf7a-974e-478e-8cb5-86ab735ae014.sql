-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('admin', 'faculty', 'student');

-- Create enum for department types
CREATE TYPE public.department_type AS ENUM ('science', 'arts', 'commerce', 'bed');

-- Create enum for admission status
CREATE TYPE public.admission_status AS ENUM ('pending', 'approved', 'rejected');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  phone TEXT,
  address TEXT,
  date_of_birth DATE,
  enrollment_number TEXT UNIQUE,
  department_id UUID,
  year_of_study INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  type department_type NOT NULL,
  description TEXT,
  hod_name TEXT,
  hod_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  credits INTEGER NOT NULL DEFAULT 0,
  semester INTEGER NOT NULL,
  year INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notices table
CREATE TABLE public.notices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_active BOOLEAN DEFAULT true,
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  organizer_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  registration_required BOOLEAN DEFAULT false,
  max_participants INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admissions table
CREATE TABLE public.admissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  father_name TEXT NOT NULL,
  mother_name TEXT NOT NULL,
  previous_qualification TEXT NOT NULL,
  marks_percentage DECIMAL(5,2) NOT NULL,
  department_preference UUID NOT NULL REFERENCES public.departments(id),
  status admission_status DEFAULT 'pending',
  application_fee_paid BOOLEAN DEFAULT false,
  documents_submitted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_present BOOLEAN NOT NULL DEFAULT false,
  marked_by UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, course_id, date)
);

-- Create results table
CREATE TABLE public.results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL CHECK (exam_type IN ('internal', 'semester', 'annual')),
  marks_obtained INTEGER NOT NULL,
  total_marks INTEGER NOT NULL DEFAULT 100,
  grade TEXT,
  remarks TEXT,
  published_by UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key constraint for department_id in profiles
ALTER TABLE public.profiles 
ADD CONSTRAINT fk_profiles_department 
FOREIGN KEY (department_id) REFERENCES public.departments(id) ON DELETE SET NULL;

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = user_uuid AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles
FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can insert profiles" ON public.profiles
FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all profiles" ON public.profiles
FOR UPDATE USING (public.is_admin(auth.uid()));

-- Departments policies
CREATE POLICY "Everyone can view departments" ON public.departments
FOR SELECT USING (true);

CREATE POLICY "Admins can manage departments" ON public.departments
FOR ALL USING (public.is_admin(auth.uid()));

-- Courses policies
CREATE POLICY "Everyone can view courses" ON public.courses
FOR SELECT USING (true);

CREATE POLICY "Faculty and admins can manage courses" ON public.courses
FOR ALL USING (
  public.get_user_role(auth.uid()) IN ('admin', 'faculty')
);

-- Notices policies
CREATE POLICY "Everyone can view active notices" ON public.notices
FOR SELECT USING (is_active = true);

CREATE POLICY "Faculty and admins can create notices" ON public.notices
FOR INSERT WITH CHECK (
  public.get_user_role(auth.uid()) IN ('admin', 'faculty')
);

CREATE POLICY "Authors and admins can update notices" ON public.notices
FOR UPDATE USING (
  auth.uid() = author_id OR public.is_admin(auth.uid())
);

-- Events policies
CREATE POLICY "Everyone can view active events" ON public.events
FOR SELECT USING (is_active = true);

CREATE POLICY "Faculty and admins can create events" ON public.events
FOR INSERT WITH CHECK (
  public.get_user_role(auth.uid()) IN ('admin', 'faculty')
);

CREATE POLICY "Organizers and admins can update events" ON public.events
FOR UPDATE USING (
  auth.uid() = organizer_id OR public.is_admin(auth.uid())
);

-- Admissions policies
CREATE POLICY "Public can create admission applications" ON public.admissions
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all admissions" ON public.admissions
FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update admissions" ON public.admissions
FOR UPDATE USING (public.is_admin(auth.uid()));

-- Attendance policies
CREATE POLICY "Students can view own attendance" ON public.attendance
FOR SELECT USING (
  auth.uid() = student_id OR 
  public.get_user_role(auth.uid()) IN ('admin', 'faculty')
);

CREATE POLICY "Faculty can manage attendance" ON public.attendance
FOR ALL USING (
  public.get_user_role(auth.uid()) IN ('admin', 'faculty')
);

-- Results policies
CREATE POLICY "Students can view own results" ON public.results
FOR SELECT USING (
  auth.uid() = student_id OR 
  public.get_user_role(auth.uid()) IN ('admin', 'faculty')
);

CREATE POLICY "Faculty can manage results" ON public.results
FOR ALL USING (
  public.get_user_role(auth.uid()) IN ('admin', 'faculty')
);

-- Insert default departments
INSERT INTO public.departments (name, code, type, description, hod_name, hod_email) VALUES
('Physics', 'PHY', 'science', 'Department of Physics offering undergraduate courses', 'Dr. N. P. Sinha', 'physics.hod@stcolumba.edu'),
('Chemistry', 'CHE', 'science', 'Department of Chemistry with well-equipped laboratories', 'Dr. Shashi Bala', 'chemistry.hod@stcolumba.edu'),
('Mathematics', 'MAT', 'science', 'Department of Mathematics providing foundational courses', 'Prof. R. Jha', 'math.hod@stcolumba.edu'),
('English', 'ENG', 'arts', 'Department of English Literature and Language', 'Dr. Rita Kumari', 'english.hod@stcolumba.edu'),
('History', 'HIS', 'arts', 'Department of History covering ancient and modern periods', 'Prof. Anil Verma', 'history.hod@stcolumba.edu'),
('Commerce', 'COM', 'commerce', 'Department of Commerce and Business Administration', 'Prof. S. P. Sinha', 'commerce.hod@stcolumba.edu'),
('B.Ed', 'BED', 'bed', 'Bachelor of Education for teacher training', 'Dr. Manoj Kumar', 'bed.hod@stcolumba.edu');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notices_updated_at
  BEFORE UPDATE ON public.notices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admissions_updated_at
  BEFORE UPDATE ON public.admissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();