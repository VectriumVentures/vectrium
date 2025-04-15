"use client"
import React, { useEffect, useState, useRef } from 'react';
import { HiOutlineChevronDown, HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Universe/star field animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Star parameters
    const STAR_COUNT = 200;
    const STAR_MIN_SIZE = 0.5;
    const STAR_MAX_SIZE = 2;
    const TWINKLE_SPEED = 0.02;
    
    // Create stars
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (STAR_MAX_SIZE - STAR_MIN_SIZE) + STAR_MIN_SIZE,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: (Math.random() * 0.01) + TWINKLE_SPEED,
      color: Math.random() > 0.5 ? 'rgba(200, 220, 255, 0.8)' : 'rgba(180, 180, 255, 0.8)'
    }));
    
    // Animate stars
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with simple twinkling effect
      stars.forEach(star => {
        // Update twinkle phase
        star.twinklePhase += star.twinkleSpeed;
        
        // Calculate opacity based on twinkle phase
        const opacity = (Math.sin(star.twinklePhase) + 1) / 2 * 0.8 + 0.2;
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace('0.8', opacity.toString());
        ctx.fill();
        
        // Occasional shooting star
        if (Math.random() < 0.0005) {
          drawShootingStar(ctx);
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    // Draw a shooting star
    const drawShootingStar = (context) => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height / 2); // Top half of screen
      const length = 50 + Math.random() * 100;
      const angle = Math.PI / 4 + (Math.random() * Math.PI / 4);
      
      const gradient = context.createLinearGradient(
        x, y,
        x + Math.cos(angle) * length,
        y + Math.sin(angle) * length
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(
        x + Math.cos(angle) * length,
        y + Math.sin(angle) * length
      );
      context.strokeStyle = gradient;
      context.lineWidth = 1;
      context.stroke();
    };
    
    // Add distant galaxies
    const drawGalaxies = () => {
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 50 + Math.random() * 100;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, 'rgba(150, 150, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(100, 100, 200, 0)');
        
        ctx.beginPath();
        ctx.ellipse(
          x, y, 
          size, size * (0.4 + Math.random() * 0.3), 
          Math.random() * Math.PI * 2, 
          0, Math.PI * 2
        );
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };
    
    // Draw initial galaxies
    drawGalaxies();
    
    // Start animation loop
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGalaxies(); // Redraw galaxies on resize
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animate);
    };
  }, []);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({ 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.5 + (custom * 0.1), ease: "easeOut" }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas for universe animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Subtle overlay gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-black/60 z-10"
      />
      
      {/* Main content container */}
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            Transform Your Digital Presence
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
          >
            Comprehensive IT solutions and digital services to elevate your business in the digital landscape.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a 
              href="#contact" 
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              custom={0}
              variants={buttonVariants}
            >
              Get Started
            </motion.a>
            
            <motion.a 
              href="#services" 
              className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              custom={1}
              variants={buttonVariants}
            >
              Explore Services
            </motion.a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <a href="#services" className="text-white/70 hover:text-white transition-colors">
          <motion.div
            whileHover={{ scale: 1.2, color: "#ffffff" }}
            transition={{ duration: 0.2 }}
          >
            <HiOutlineChevronDown size={24} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}

export default Hero;