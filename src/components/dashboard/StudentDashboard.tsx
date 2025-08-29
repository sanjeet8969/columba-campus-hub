import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  BookOpen, 
  Calendar, 
  Bell, 
  ClipboardList,
  BarChart3,
  GraduationCap,
  Clock
} from 'lucide-react';

interface StudentStats {
  enrolledCourses: number;
  attendancePercentage: number;
  completedAssignments: number;
  pendingAssignments: number;
  totalResults: number;
  upcomingEvents: number;
}

interface Notice {
  id: string;
  title: string;
  content: string;
  priority: string;
  publish_date: string;
}

export const StudentDashboard = () => {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<StudentStats>({
    enrolledCourses: 0,
    attendancePercentage: 0,
    completedAssignments: 0,
    pendingAssignments: 0,
    totalResults: 0,
    upcomingEvents: 0,
  });
  const [recentNotices, setRecentNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentNotices();
  }, []);

  const fetchStats = async () => {
    try {
      if (!profile?.user_id) return;

      // Fetch attendance records for this student
      const { count: attendanceCount } = await supabase
        .from('attendance')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', profile.user_id);

      const { count: presentCount } = await supabase
        .from('attendance')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', profile.user_id)
        .eq('is_present', true);

      // Fetch results for this student
      const { count: resultsCount } = await supabase
        .from('results')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', profile.user_id);

      // Fetch courses count
      const { count: coursesCount } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });

      // Fetch upcoming events
      const { count: upcomingEventsCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
        .gte('event_date', new Date().toISOString());

      const attendancePercentage = attendanceCount > 0 ? ((presentCount || 0) / attendanceCount) * 100 : 0;

      setStats({
        enrolledCourses: coursesCount || 0,
        attendancePercentage: Math.round(attendancePercentage),
        completedAssignments: Math.floor(Math.random() * 15), // Placeholder
        pendingAssignments: Math.floor(Math.random() * 5), // Placeholder
        totalResults: resultsCount || 0,
        upcomingEvents: upcomingEventsCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentNotices = async () => {
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('id, title, content, priority, publish_date')
        .eq('is_active', true)
        .order('publish_date', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentNotices(data || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'default';
      case 'normal':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.full_name}</p>
              {profile?.enrollment_number && (
                <p className="text-sm text-muted-foreground">Enrollment: {profile.enrollment_number}</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{profile?.role}</Badge>
              <Button onClick={signOut} variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.enrolledCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.attendancePercentage}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedAssignments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingAssignments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Results Available</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalResults}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Notices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Recent Notices</span>
              </CardTitle>
              <CardDescription>Latest announcements from the college</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotices.map((notice) => (
                  <div key={notice.id} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{notice.title}</h4>
                      <Badge variant={getPriorityColor(notice.priority) as any}>
                        {notice.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notice.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notice.publish_date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {recentNotices.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No notices available</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <ClipboardList className="h-5 w-5" />
                  <span>View Attendance</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Check Results</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Course Materials</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="h-5 w-5" />
                  <span>View Timetable</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};