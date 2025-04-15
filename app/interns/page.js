"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header'
import Footer from '@/components/footer'

import { 
  Users, 
  Search, 
  ChevronDown, 
  ChevronUp,
  ExternalLink
} from 'lucide-react';

const Interns = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('ID');
  const [sortDirection, setSortDirection] = useState('asc');
  const canvasRef = useRef(null);
  
  // Fetch interns data from Google Sheets
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/interns');
        
        if (!response.ok) {
          throw new Error('Failed to fetch interns data');
        }
        
        const result = await response.json();
        setInterns(result.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching interns:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchInterns();
  }, []);
  
  // Star field animation
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
      });
      
      requestAnimationFrame(animate);
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
    const animationId = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGalaxies(); // Redraw galaxies on resize
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Handle sorting - updated to match the actual data fields
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filtering and sorting logic - updated to search only by name or ID
  const filteredAndSortedInterns = interns
    .filter(intern => {
      // Only search by Name or ID
      const matchesSearch = 
        searchTerm === '' || 
        (intern.Name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (intern.ID?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'ID') {
        // Parse as integers for numeric comparison
        comparison = parseInt(a.ID || 0) - parseInt(b.ID || 0);
      } else {
        // Use string comparison for text fields with null/undefined protection
        comparison = (a[sortField] || '').localeCompare(b[sortField] || '');
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
    <Header/>
    <section id="interns" className="relative py-12 md:py-24 bg-black min-h-screen overflow-hidden">
      {/* Background canvas for universe animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-900/50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4 text-white">
            Our Interns
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Meet the talented individuals who have contributed to our success through our internship program.
          </p>
        </motion.div>
        
        {/* Search Bar - now only searches by name or ID */}
        <motion.div 
          className="mb-6 md:mb-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex justify-center items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-900/80 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>
        
        {/* Mobile Card View (for small screens) */}
        <div className="md:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4"
          >
            {loading && !error ? (
              // Loading skeleton for mobile
              [...Array(3)].map((_, index) => (
                <motion.div 
                  key={`loading-mobile-${index}`}
                  variants={itemVariants}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4 animate-pulse"
                >
                  <div className="h-5 bg-gray-700 rounded w-1/4 mb-4"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </div>
                </motion.div>
              ))
            ) : error ? (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6 text-center text-red-400">
                <p className="text-lg font-medium mb-2">Error loading interns data</p>
                <p className="text-sm text-gray-400">{error}</p>
                <button 
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : filteredAndSortedInterns.length === 0 ? (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6 text-center text-gray-400">
                <p className="text-lg font-medium">No interns found</p>
                <p className="text-sm">Try adjusting your search</p>
              </div>
            ) : (
              filteredAndSortedInterns.map((intern) => (
                <motion.div 
                  key={`mobile-${intern.ID}`}
                  variants={itemVariants}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <h3 className="text-white font-medium text-lg mb-2">{intern.Name}</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="text-gray-400">ID:</div>
                    <div className="text-gray-300">{intern.ID}</div>
                    
                    <div className="text-gray-400">Domain:</div>
                    <div className="text-blue-200">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900/40">
                        {intern.Domain}
                      </span>
                    </div>
                    
                    <div className="text-gray-400">College:</div>
                    <div className="text-gray-300 flex items-center gap-1">
                      {intern.College}
                      <ExternalLink className="w-3 h-3 text-gray-500" />
                    </div>
                    
                    <div className="text-gray-400">Duration:</div>
                    <div className="text-gray-300">{intern.Duration}</div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
        
        {/* Desktop Table View (for medium screens and up) */}
        <div className="hidden md:block">
          <motion.div
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800/80">
                  <tr>
                    {['ID', 'Name', 'Domain', 'College', 'Duration'].map((field) => (
                      <th 
                        key={field}
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700/50"
                        onClick={() => handleSort(field)}
                      >
                        <div className="flex items-center gap-1">
                          <span>{field}</span>
                          {sortField === field && (
                            sortDirection === 'asc' ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 bg-gray-900/30">
                  {loading && !error ? (
                    // Show skeleton loading state
                    [...Array(5)].map((_, index) => (
                      <motion.tr 
                        key={`loading-${index}`}
                        variants={itemVariants}
                        className="animate-pulse"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-700 rounded w-8"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-700 rounded w-32"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-700 rounded w-24"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-700 rounded w-40"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-700 rounded w-28"></div>
                        </td>
                      </motion.tr>
                    ))
                  ) : error ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-red-400">
                        <div className="flex flex-col items-center">
                          <p className="text-lg font-medium mb-2">Error loading interns data</p>
                          <p className="text-sm text-gray-400">{error}</p>
                          <button 
                            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                            onClick={() => window.location.reload()}
                          >
                            Retry
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : filteredAndSortedInterns.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                        <p className="text-lg font-medium">No interns found</p>
                        <p className="text-sm">Try adjusting your search</p>
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedInterns.map((intern) => (
                      <motion.tr 
                        key={intern.ID}
                        variants={itemVariants}
                        className="hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                          {intern.ID}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {intern.Name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900/40 text-blue-200">
                            {intern.Domain}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            {intern.College}
                            <ExternalLink className="w-3 h-3 text-gray-500" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {intern.Duration}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
        
        {/* Stats at the bottom */}
        <motion.div 
          className="mt-6 md:mt-8 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {!loading && !error && (
            <p>
              Showing {filteredAndSortedInterns.length} of {interns.length} interns
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          )}
        </motion.div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Interns;