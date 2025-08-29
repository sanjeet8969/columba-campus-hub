import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  BookOpen,
  Users,
  Calendar,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import collegeLogo from '@/assets/college-logo.png';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Departments', href: '#departments' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];

  const academics = [
    { name: 'Science Programs', href: '#science' },
    { name: 'Arts Programs', href: '#arts' },
    { name: 'Commerce Programs', href: '#commerce' },
    { name: 'B.Ed. Program', href: '#education' },
    { name: 'Research', href: '#research' },
    { name: 'Library', href: '#library' },
  ];

  const activities = [
    { name: 'NSS', href: '#nss' },
    { name: 'NCC', href: '#ncc' },
    { name: 'Cultural Fest', href: '#cultural' },
    { name: 'Sports Meet', href: '#sports' },
    { name: 'Seminars', href: '#seminars' },
    { name: 'Career Guidance', href: '#career' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-4 h-full">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-secondary rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* College Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <img 
                    src={collegeLogo} 
                    alt="St. Columba's College Logo" 
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold">St. Columba's College</h3>
                    <p className="text-sm text-primary-foreground/80">Truth and Service • Est. 1899</p>
                  </div>
                </div>
                
                <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                  A premier educational institution committed to academic excellence, 
                  character building, and holistic development for over 125 years.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span className="text-sm">Hazaribagh, Jharkhand, India</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-secondary" />
                    <span className="text-sm">+91-6546-222-XXX</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-secondary" />
                    <span className="text-sm">info@stcolumbashzb.edu.in</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-secondary" />
                    <span className="text-sm">www.stcolumbashzb.edu.in</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold mb-6 flex items-center">
                  <BookOpen className="w-5 h-5 text-secondary mr-2" />
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-primary-foreground/80 hover:text-secondary transition-colors flex items-center group"
                      >
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Academics */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-lg font-semibold mb-6 flex items-center">
                  <Users className="w-5 h-5 text-secondary mr-2" />
                  Academics
                </h4>
                <ul className="space-y-3">
                  {academics.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-primary-foreground/80 hover:text-secondary transition-colors flex items-center group"
                      >
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Activities & Social */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="text-lg font-semibold mb-6 flex items-center">
                  <Calendar className="w-5 h-5 text-secondary mr-2" />
                  Activities
                </h4>
                <ul className="space-y-3 mb-8">
                  {activities.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-primary-foreground/80 hover:text-secondary transition-colors flex items-center group"
                      >
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Social Media */}
                <div>
                  <h5 className="font-semibold mb-4">Follow Us</h5>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center text-primary-foreground/70 transition-colors ${social.color}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-primary-foreground/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h4 className="text-xl font-semibold mb-4">Stay Connected</h4>
              <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for updates on admissions, events, and college news.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Button className="btn-college-secondary px-8">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-primary-foreground/80">
                © {new Date().getFullYear()} St. Columba's College, Hazaribagh. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Accessibility
                </a>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <Award className="w-4 h-4 text-secondary" />
                <span>NAAC A+ Accredited</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;