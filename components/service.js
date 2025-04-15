import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Palette, 
  PenTool, 
  Layers, 
  Share2, 
  Briefcase, 
  BarChart2, 
  Search 
} from 'lucide-react';

const Services = () => {
  const canvasRef = useRef(null);
  
  // Simple universe/star field animation
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
    
    // Add occasional distant galaxies
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
    
    // Handle window resize
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

  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies to deliver exceptional user experiences.",
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "UI/UX Design",
      description: "User-centric design that combines aesthetics with functionality to create intuitive digital experiences.",
      icon: <Palette className="w-6 h-6" />
    },
    {
      title: "Graphic Design",
      description: "Compelling visual assets that communicate your message effectively and strengthen your brand identity.",
      icon: <PenTool className="w-6 h-6" />
    },
    {
      title: "Brand Building",
      description: "Strategic brand development to establish your unique identity and position in the market.",
      icon: <Layers className="w-6 h-6" />
    },
    {
      title: "Social Media Handling",
      description: "Comprehensive social media management to grow your audience and enhance brand engagement.",
      icon: <Share2 className="w-6 h-6" />
    },
    {
      title: "Business Consultation",
      description: "Expert guidance on strategic decisions to optimize operations and drive business growth.",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      title: "Digital Marketing",
      description: "Data-driven campaigns that increase visibility and drive qualified leads to your business.",
      icon: <BarChart2 className="w-6 h-6" />
    },
    {
      title: "SEO & Content Writing",
      description: "Search engine optimization and compelling content that attracts and engages your target audience.",
      icon: <Search className="w-6 h-6" />
    }
  ];

  // Simplified animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section id="services" className="relative py-24 bg-black overflow-hidden">
      {/* Background canvas for universe animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Our Services
          </h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Comprehensive digital solutions designed to meet your business needs and drive growth.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                <div className="text-white">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {service.title}
              </h3>
              <p className="text-gray-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;