import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Calendar, Users, Trophy } from 'lucide-react';
import heroImage from '@/assets/hero-college.jpg';
import ThreeScene from './ThreeScene';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 100, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.5, 
          ease: "back.out(1.7)",
          delay: 0.5 
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out",
          delay: 1 
        }
      );

      // Stats animation
      gsap.fromTo(statsRef.current?.children!,
        { opacity: 0, y: 80, rotateX: 45 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 0.8, 
          ease: "back.out(1.7)",
          stagger: 0.2,
          delay: 1.5 
        }
      );

      // Parallax effect for background
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Calendar, label: 'Established', value: '1899' },
    { icon: Users, label: 'Students', value: '3000+' },
    { icon: Trophy, label: 'NAAC Rating', value: 'A+' },
    { icon: MapPin, label: 'Campus', value: '28 Acres' },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        ref={heroRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      {/* Three.js 3D Scene Overlay */}
      <div className="absolute inset-0 opacity-30">
        <ThreeScene />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="text-white space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="inline-block"
              >
                <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary text-sm font-medium border border-secondary/30">
                  Est. 1899 • NAAC Accredited
                </span>
              </motion.div>

              <h1 
                ref={titleRef}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                St. Columba's{' '}
                <span className="gradient-text text-transparent bg-gradient-to-r from-secondary to-yellow-300 bg-clip-text">
                  College
                </span>
              </h1>

              <p 
                ref={subtitleRef}
                className="text-xl sm:text-2xl text-gray-100 max-w-2xl leading-relaxed"
              >
                Empowering minds with <span className="text-secondary font-semibold">Truth and Service</span> for over 
                <span className="text-secondary font-semibold"> 125 years</span>. 
                Excellence in education, character building, and holistic development.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="btn-college-secondary group text-lg px-8 py-4">
                    Explore Admissions
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="glass-card text-white border-white/30 hover:bg-white/10 text-lg px-8 py-4"
                  >
                    Virtual Tour
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Stats Cards */}
            <div className="relative">
              <div ref={statsRef} className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="glass-card p-6 text-center hover-lift"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <stat.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-200 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-secondary/20 rounded-full animate-float" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;