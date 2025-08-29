import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Atom, 
  FlaskConical, 
  Calculator, 
  Leaf, 
  Bug, 
  Monitor,
  BookOpen, 
  Globe, 
  Scroll, 
  Clock, 
  Users, 
  PieChart,
  DollarSign,
  Briefcase,
  GraduationCap,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Departments = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.children!,
        { opacity: 0, y: 80, rotateX: 45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const departments = [
    {
      name: "Science Faculty",
      description: "Cutting-edge research and practical learning in natural sciences",
      color: "from-blue-600 to-cyan-500",
      subjects: [
        { name: "Physics", icon: Atom, hod: "Dr. N. P. Sinha" },
        { name: "Chemistry", icon: FlaskConical, hod: "Dr. Shashi Bala" },
        { name: "Mathematics", icon: Calculator, hod: "Prof. R. Jha" },
        { name: "Botany", icon: Leaf, hod: "Dr. A. K. Sharma" },
        { name: "Zoology", icon: Bug, hod: "Prof. M. K. Singh" },
        { name: "Computer Science", icon: Monitor, hod: "Dr. S. R. Prasad" },
      ]
    },
    {
      name: "Arts Faculty",
      description: "Comprehensive humanities education fostering critical thinking",
      color: "from-purple-600 to-pink-500",
      subjects: [
        { name: "English", icon: BookOpen, hod: "Dr. Rita Kumari" },
        { name: "Hindi", icon: BookOpen, hod: "Prof. V. K. Mishra" },
        { name: "Sanskrit", icon: Scroll, hod: "Dr. P. N. Jha" },
        { name: "History", icon: Clock, hod: "Prof. Anil Verma" },
        { name: "Political Science", icon: Users, hod: "Dr. R. K. Singh" },
        { name: "Economics", icon: PieChart, hod: "Prof. S. Kumar" },
        { name: "Philosophy", icon: Globe, hod: "Dr. A. Sharma" },
        { name: "Psychology", icon: Users, hod: "Prof. M. Devi" },
      ]
    },
    {
      name: "Commerce Faculty",
      description: "Professional business education with industry relevance",
      color: "from-green-600 to-emerald-500",
      subjects: [
        { name: "B.Com", icon: DollarSign, hod: "Prof. S. P. Sinha" },
        { name: "Accountancy", icon: Calculator, hod: "Dr. N. Kumar" },
        { name: "Business Administration", icon: Briefcase, hod: "Prof. A. K. Roy" },
      ]
    },
    {
      name: "Education Faculty",
      description: "Preparing future educators with modern pedagogical methods",
      color: "from-orange-600 to-red-500",
      subjects: [
        { name: "B.Ed. (Teacher Training)", icon: GraduationCap, hod: "Dr. P. K. Pandey" },
      ]
    }
  ];

  const leadership = [
    { title: "Principal", name: "Dr. Manoj Kumar", description: "Leading the institution with vision and dedication" },
    { title: "Dean (Science)", name: "Dr. R. K. Singh", description: "Overseeing scientific research and innovation" },
    { title: "Dean (Arts)", name: "Prof. A. K. Mishra", description: "Nurturing humanities and social sciences" },
    { title: "Dean (Commerce)", name: "Prof. S. P. Sinha", description: "Advancing business education excellence" },
  ];

  return (
    <section id="departments" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">
              Academic Departments
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Diverse <span className="gradient-text">Disciplines</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive academic programs across Science, Arts, Commerce, and Education 
              designed to nurture intellectual growth and professional excellence.
            </p>
          </motion.div>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Academic Leadership</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover-lift text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold mb-1">{leader.name}</h4>
                    <p className="text-primary font-semibold mb-2">{leader.title}</p>
                    <p className="text-sm text-muted-foreground">{leader.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Departments Grid */}
        <div ref={sectionRef} className="space-y-16">
          {departments.map((dept, deptIndex) => (
            <motion.div
              key={deptIndex}
              initial={{ opacity: 0, x: deptIndex % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: deptIndex * 0.2 }}
              className="relative"
            >
              <Card className="overflow-hidden hover-lift">
                <div className={`h-2 bg-gradient-to-r ${dept.color}`} />
                
                <CardHeader className="pb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-3xl mb-3">{dept.name}</CardTitle>
                      <p className="text-lg text-muted-foreground">{dept.description}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center`}>
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dept.subjects.map((subject, subIndex) => (
                      <motion.div
                        key={subIndex}
                        whileHover={{ scale: 1.02, rotateY: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group"
                      >
                        <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors bg-muted/30 hover:bg-muted/50">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${dept.color} flex items-center justify-center`}>
                              <subject.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{subject.name}</h4>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            HOD: {subject.hod}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="btn-college-primary">
                        Explore {dept.name}
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Facilities Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">World-Class Facilities</h3>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
                Our departments are equipped with state-of-the-art laboratories, modern classrooms, 
                extensive library resources with 80,000+ books, digital learning tools, and research facilities 
                that provide hands-on experience and foster innovation.
              </p>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-muted-foreground">Laboratories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">80K+</div>
                  <div className="text-muted-foreground">Library Books</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">50+</div>
                  <div className="text-muted-foreground">Faculty Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Wi-Fi Coverage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </section>
  );
};

export default Departments;