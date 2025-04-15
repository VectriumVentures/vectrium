import React, { useEffect, useState, useRef } from 'react';
import { BarChart, Activity, Zap, Globe } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const aboutSection = document.getElementById("about");
    if (aboutSection) observer.observe(aboutSection);
    
    return () => {
      if (aboutSection) observer.unobserve(aboutSection);
    };
  }, []);

  // Universe/star field animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    
    // Star parameters
    const STAR_COUNT = 200;
    const STAR_MIN_SIZE = 0.5;
    const STAR_MAX_SIZE = 2;
    const TWINKLE_SPEED = 0.02;
    
    // Create stars
    const createStars = () => {
      return Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (STAR_MAX_SIZE - STAR_MIN_SIZE) + STAR_MIN_SIZE,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: (Math.random() * 0.01) + TWINKLE_SPEED,
        color: Math.random() > 0.5 ? 'rgba(200, 220, 255, 0.8)' : 'rgba(180, 180, 255, 0.8)'
      }));
    };
    
    let stars = createStars();
    
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
      resizeCanvas();
      drawGalaxies(); // Redraw galaxies on resize
      stars = createStars(); // Recreate stars on resize for better distribution
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="about" className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Canvas for universe animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Simple overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          {/* Visualization column */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Interactive Visualization with Icons */}
              <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 scale-75 sm:scale-90 md:scale-100">
                    {/* Central Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="w-16 sm:w-20 h-16 sm:h-20 text-blue-400" />
                    </div>
                    
                    {/* Orbiting Icons */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                      <Zap className="w-10 sm:w-12 h-10 sm:h-12 text-yellow-400 animate-pulse" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
                      <Activity className="w-10 sm:w-12 h-10 sm:h-12 text-green-400 animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
                      <BarChart className="w-10 sm:w-12 h-10 sm:h-12 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4">
                      <Activity className="w-10 sm:w-12 h-10 sm:h-12 text-red-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
                    </div>
                    
                    {/* Connecting Lines */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full border-4 border-blue-500/20 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
                      <div className="absolute w-3/4 h-3/4 border-2 border-green-500/20 rounded-full animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}></div>
                      <div className="absolute w-1/2 h-1/2 border border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '5s' }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Text Label for the visualization - visible only on medium+ screens */}
                <div className="absolute bottom-4 left-0 right-0 text-center hidden sm:block">
                  <h3 className="text-lg md:text-xl font-bold text-white">Vectrium Technology Ecosystem</h3>
                </div>
              </div>
              
              {/* Simple decorative elements */}
              <div className={`absolute -bottom-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 bg-blue-900/20 backdrop-blur-sm border border-blue-800/30 rounded-lg transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: '0.3s' }}></div>
              <div className={`absolute -top-6 -left-6 w-16 sm:w-24 h-16 sm:h-24 bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: '0.5s' }}></div>
            </div>
          </div>
          
          {/* Content column */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '0.3s' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white text-center lg:text-left">
              About Vectrium Ventures
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-4 md:mb-6">
              At Vectrium Ventures, we're dedicated to empowering businesses through innovative digital solutions. Founded on the principles of excellence, creativity, and client satisfaction, we've established ourselves as a trusted partner for businesses seeking comprehensive IT and digital marketing services.
            </p>
            <p className="text-sm sm:text-base text-gray-300 mb-6 md:mb-8">
              Our team of experts brings together diverse skills and extensive experience across multiple domains, allowing us to deliver integrated solutions that drive tangible results. We believe in a collaborative approach, working closely with our clients to understand their unique challenges and objectives.
            </p>
            
            {/* Mission/Vision boxes - stack on mobile, side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 md:mb-8">
              <div className={`transition-all duration-700 bg-gray-900/30 backdrop-blur-sm p-4 rounded-lg border border-gray-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.5s' }}>
                <h4 className="text-lg md:text-xl font-semibold text-white mb-2">Our Mission</h4>
                <p className="text-sm sm:text-base text-gray-400">
                  To empower businesses with cutting-edge digital solutions that drive growth and create lasting value.
                </p>
              </div>
              <div className={`transition-all duration-700 bg-gray-900/30 backdrop-blur-sm p-4 rounded-lg border border-gray-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.7s' }}>
                <h4 className="text-lg md:text-xl font-semibold text-white mb-2">Our Vision</h4>
                <p className="text-sm sm:text-base text-gray-400">
                  To be the premier technology partner for forward-thinking businesses in their digital transformation journey.
                </p>
              </div>
            </div>
            
            {/* CTA Button - centered on mobile, left aligned on large screens */}
            <div className="flex justify-center lg:justify-start">
              <a 
                href="#career" 
                className={`px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all duration-300 inline-flex items-center text-sm sm:text-base ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '0.9s' }}
              >
                Work With Us
                <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;