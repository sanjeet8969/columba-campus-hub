import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Bus, 
  Navigation as NavigationIcon,
  Send,
  User,
  MessageCircle,
  Building,
  GraduationCap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.children!,
        { opacity: 0, y: 80, rotateY: 15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Campus Address",
      details: [
        "St. Columba's College",
        "Near Hazaribagh Lake",
        "Hazaribagh - 825301",
        "Jharkhand, India"
      ],
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "Office: +91-6546-222-XXX",
        "Admissions: +91-6546-223-XXX",
        "Principal: +91-6546-224-XXX",
        "Emergency: +91-6546-225-XXX"
      ],
      color: "text-secondary"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@stcolumbashzb.edu.in",
        "admissions@stcolumbashzb.edu.in",
        "principal@stcolumbashzb.edu.in",
        "registrar@stcolumbashzb.edu.in"
      ],
      color: "text-accent"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 5:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed",
        "Holidays: As per academic calendar"
      ],
      color: "text-primary"
    }
  ];

  const departments = [
    { name: "Admissions Office", contact: "admissions@stcolumbashzb.edu.in", phone: "+91-6546-223-XXX" },
    { name: "Academic Office", contact: "academics@stcolumbashzb.edu.in", phone: "+91-6546-226-XXX" },
    { name: "Student Affairs", contact: "students@stcolumbashzb.edu.in", phone: "+91-6546-227-XXX" },
    { name: "Library", contact: "library@stcolumbashzb.edu.in", phone: "+91-6546-228-XXX" },
    { name: "Accounts Office", contact: "accounts@stcolumbashzb.edu.in", phone: "+91-6546-229-XXX" },
    { name: "Hostel Office", contact: "hostel@stcolumbashzb.edu.in", phone: "+91-6546-230-XXX" },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
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
              Get in Touch
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Contact <span className="gradient-text">Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to join our academic community? Have questions about admissions, programs, 
              or campus life? We're here to help you every step of the way.
            </p>
          </motion.div>
        </div>

        <div ref={sectionRef} className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
              
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover-lift mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${info.color}`}>
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{info.title}</h4>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-muted-foreground text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Department Contacts */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-primary" />
                    <span>Department Contacts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="flex flex-col space-y-1 pb-3 border-b border-border last:border-b-0">
                        <div className="font-medium text-sm">{dept.name}</div>
                        <div className="text-xs text-muted-foreground">{dept.contact}</div>
                        <div className="text-xs text-muted-foreground">{dept.phone}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <span>Send us a Message</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Full Name *</span>
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email Address *</span>
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Phone Number</span>
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4" />
                          <span>Inquiry Category</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="admissions">Admissions</option>
                          <option value="academics">Academic Programs</option>
                          <option value="facilities">Facilities</option>
                          <option value="hostel">Hostel</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject *</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Enter the subject of your message"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your detailed message here..."
                        rows={6}
                        required
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="btn-college-primary w-full group"
                      >
                        <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Map and Directions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <Card className="overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                <NavigationIcon className="w-6 h-6 text-primary" />
                <span>Find Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Placeholder for Google Maps */}
              <div className="h-96 bg-muted/50 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h4 className="text-2xl font-bold mb-2">St. Columba's College</h4>
                  <p className="text-muted-foreground">Near Hazaribagh Lake, Hazaribagh, Jharkhand</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4"
                  >
                    <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
                      Get Directions
                    </Button>
                  </motion.div>
                </div>
                
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-primary rounded-full"
                      animate={{
                        x: [Math.random() * 100, Math.random() * 100],
                        y: [Math.random() * 100, Math.random() * 100],
                      }}
                      transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Transportation Info */}
              <div className="p-8 bg-muted/30">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <Bus className="w-8 h-8 text-primary" />
                    <h4 className="font-semibold">By Bus</h4>
                    <p className="text-sm text-muted-foreground">
                      Regular bus services from Ranchi (100km) and Dhanbad (120km)
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-3">
                    <NavigationIcon className="w-8 h-8 text-primary" />
                    <h4 className="font-semibold">By Car</h4>
                    <p className="text-sm text-muted-foreground">
                      Well-connected by NH-100. Parking available on campus
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-3">
                    <MapPin className="w-8 h-8 text-primary" />
                    <h4 className="font-semibold">Nearest Railway</h4>
                    <p className="text-sm text-muted-foreground">
                      Hazaribagh Road Station (25km) on Delhi-Howrah line
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;