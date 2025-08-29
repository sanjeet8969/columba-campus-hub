import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, MapPin, Users, Clock, ArrowRight, Star, Trophy, Music, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.children!,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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

  const upcomingEvents = [
    {
      title: "Annual Cultural Festival - Columbiana 2024",
      date: "March 15-17, 2024",
      time: "09:00 AM - 06:00 PM",
      location: "College Auditorium & Grounds",
      category: "Cultural",
      icon: Music,
      color: "from-purple-500 to-pink-500",
      description: "Three days of music, dance, drama, and literary competitions showcasing student talents.",
      attendees: "3000+",
      featured: true
    },
    {
      title: "Science Exhibition & Innovation Fair",
      date: "March 25, 2024",
      time: "10:00 AM - 04:00 PM",
      location: "Science Block",
      category: "Academic",
      icon: Star,
      color: "from-blue-500 to-cyan-500",
      description: "Student research projects, scientific innovations, and interactive demonstrations.",
      attendees: "1500+",
      featured: true
    },
    {
      title: "Inter-College Sports Championship",
      date: "April 5-7, 2024",
      time: "07:00 AM - 05:00 PM",
      location: "Sports Complex",
      category: "Sports",
      icon: Trophy,
      color: "from-green-500 to-emerald-500",
      description: "Athletic competitions including cricket, football, volleyball, and track events.",
      attendees: "2000+",
      featured: false
    },
    {
      title: "Career Guidance Seminar",
      date: "April 12, 2024",
      time: "02:00 PM - 05:00 PM",
      location: "Main Auditorium",
      category: "Career",
      icon: BookOpen,
      color: "from-orange-500 to-red-500",
      description: "Industry experts sharing insights on career opportunities and skill development.",
      attendees: "800+",
      featured: false
    },
  ];

  const pastEvents = [
    {
      title: "Alumni Meet 2023",
      date: "December 15, 2023",
      description: "Successful reunion with 500+ alumni sharing experiences and networking.",
      image: "🎓"
    },
    {
      title: "Republic Day Celebration",
      date: "January 26, 2024",
      description: "Patriotic celebration with flag hoisting, cultural programs, and NCC parade.",
      image: "🇮🇳"
    },
    {
      title: "Women's Day Conference",
      date: "March 8, 2024",
      description: "Empowering discussions on women's achievements and challenges in modern society.",
      image: "👩‍🎓"
    },
  ];

  return (
    <section id="events" className="py-24 bg-muted/30">
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
              Events & Activities
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Campus <span className="gradient-text">Life</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Vibrant campus life with cultural festivals, academic seminars, sports competitions, 
              and community engagement activities that enrich the college experience.
            </p>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <div ref={sectionRef} className="mb-20">
          <h3 className="text-3xl font-bold mb-12 text-center">Upcoming Events</h3>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {upcomingEvents.filter(event => event.featured).map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <Card className="overflow-hidden hover-lift h-full relative">
                  <div className={`h-2 bg-gradient-to-r ${event.color}`} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center`}>
                          <event.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1">{event.attendees}</div>
                        <div className="text-xs text-muted-foreground">Expected</div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl mb-4 group-hover:text-primary transition-colors">
                      {event.title}
                    </CardTitle>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-6">{event.description}</p>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="btn-college-primary group w-full">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Other Upcoming Events */}
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.filter(event => !event.featured).map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center flex-shrink-0`}>
                        <event.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{event.attendees}</span>
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{event.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-12 text-center">Recent Highlights</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="text-center hover-lift h-full">
                  <CardContent className="p-8">
                    <div className="text-6xl mb-4">{event.image}</div>
                    <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                    <p className="text-primary font-semibold mb-3">{event.date}</p>
                    <p className="text-muted-foreground text-sm">{event.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <Card className="glass-card text-center">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-6">Join Our Community</h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Be part of our vibrant campus life. Stay updated with latest events, 
                workshops, and activities happening at St. Columba's College.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="btn-college-primary">
                    View Event Calendar
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="outline">
                    Subscribe to Updates
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </section>
  );
};

export default Events;
