import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Award, Target, Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline animation
      gsap.fromTo(timelineRef.current?.children!,
        { opacity: 0, x: -100, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "Over 125 years of educational leadership with NAAC A+ accreditation"
    },
    {
      icon: Users,
      title: "Holistic Development",
      description: "Nurturing character, intellect, and social responsibility in every student"
    },
    {
      icon: Award,
      title: "Distinguished Alumni",
      description: "Proud graduates serving in leadership roles across various fields"
    }
  ];

  const timeline = [
    { year: "1899", event: "Founded by Jesuits", description: "Established with the mission of Truth and Service" },
    { year: "1920", event: "First Graduate", description: "Commenced degree programs under Calcutta University" },
    { year: "1960", event: "Campus Expansion", description: "Expanded to 28-acre urban campus with modern facilities" },
    { year: "2000", event: "Digital Revolution", description: "Introduced computer labs and digital learning" },
    { year: "2020", event: "NAAC A+ Rating", description: "Achieved highest accreditation for quality education" },
  ];

  const values = [
    { icon: Target, title: "Truth", description: "Pursuing knowledge with integrity and honesty" },
    { icon: Heart, title: "Service", description: "Commitment to serving society and community" },
    { icon: Star, title: "Excellence", description: "Striving for the highest standards in all endeavors" }
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">
              About St. Columba's College
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Legacy of <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A constituent unit of Vinoba Bhave University, Hazaribagh, committed to shaping 
              future leaders through value-based education and character development.
            </p>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="hover-lift glass-card border-primary/20 h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass-card hover-lift h-full">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-6 text-primary">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To provide quality education that fosters intellectual growth, moral development, 
                  and social consciousness. We strive to create responsible citizens who contribute 
                  meaningfully to society through the principles of Truth and Service.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass-card hover-lift h-full">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-6 text-secondary">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be a center of academic excellence that nurtures transformational leaders, 
                  innovative thinkers, and compassionate human beings who make positive impacts 
                  in their communities and beyond.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">Our Journey</h3>
          <div ref={timelineRef} className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary to-secondary h-full"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="glass-card hover-lift">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">{item.year}</div>
                      <div className="text-xl font-semibold mb-2">{item.event}</div>
                      <div className="text-muted-foreground">{item.description}</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-6 h-6 bg-secondary rounded-full border-4 border-background z-10 relative">
                  <div className="w-2 h-2 bg-primary rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;