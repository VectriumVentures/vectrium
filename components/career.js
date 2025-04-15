import React, { useEffect, useRef, useState } from 'react';
import { FaCode, FaLaptopCode, FaBriefcase, FaUserTie, FaFileUpload } from 'react-icons/fa';

const Careers = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Stars array
    const stars = [];
    const numStars = 200;
    
    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
        alpha: Math.random()
      });
    }
    
    // Animation function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(180, 210, 255, ${star.alpha})`;
        ctx.fill();
        
        // Move stars
        star.x += star.vx / 100;
        star.y += star.vy / 100;
        
        // Pulsing effect
        star.alpha = Math.abs(Math.sin(Date.now() * 0.001 + i) * 0.5) + 0.5;
        
        // Loop stars back into canvas
        if (star.x < -50) star.x = canvas.width + 50;
        if (star.y < -50) star.y = canvas.height + 50;
        if (star.x > canvas.width + 50) star.x = -50;
        if (star.y > canvas.height + 50) star.y = -50;
      }
      
      requestAnimationFrame(draw);
    };
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    draw();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      />
      <section id="career" className="py-24 bg-black/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black/60 to-black z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Join Our Team</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                We're looking for talented individuals who are passionate about creating innovative digital solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCode className="text-blue-400 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Web Developer</h3>
                <p className="text-gray-400">Create responsive, modern web experiences using the latest technologies.</p>
              </div>
              
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLaptopCode className="text-purple-400 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">UX/UI Designer</h3>
                <p className="text-gray-400">Design intuitive interfaces and create compelling user experiences.</p>
              </div>
              
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBriefcase className="text-indigo-400 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Project Manager</h3>
                <p className="text-gray-400">Coordinate projects and ensure timely delivery of exceptional solutions.</p>
              </div>
            </div>
            
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Apply Now</h3>
              
              
                <form action="https://formsubmit.co/vectriumventures@gmail.com" method="POST" encType="multipart/form-data" className="space-y-6">
                    <input type="hidden" name="_template" value="table"></input>
                    <input type="hidden" name="_subject" value="Job Application for Vectrium Ventures!"></input>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Full Name*</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email*</label>
                      <input 
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                      <input 
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-400 mb-1">Position*</label>
                      <select
                        id="position"
                        name="position"
                        required
                        className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                      >
                        <option value="Web Developer">Web Developer</option>
                        <option value="UX/UI Designer">UX/UI Designer</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-400 mb-1">Years of Experience*</label>
                      <input 
                        type="text"
                        id="experience"
                        name="experience"
                        required
                        className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="3 years"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="portfolio" className="block text-sm font-medium text-gray-400 mb-1">Portfolio/LinkedIn URL</label>
                      <input 
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="https://your-portfolio.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Why do you want to join our team?</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows="4"
                      className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Tell us about yourself and why you're interested in joining our team..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Upload Resume/CV*</label>
                    <div className="flex items-center">
                      <label htmlFor="resume" className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md cursor-pointer mr-4">
                        <FaFileUpload className="text-blue-400 mr-2" />
                        <span className="text-white">Choose File</span>
                        <input 
                          type="file"
                          id="resume"
                          name="resume"
                          accept=".pdf,.doc,.docx"
                          required
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Accepted formats: PDF, DOC, DOCX</p>
                  </div>
                  
                  <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md hover:opacity-90 transition-opacity">
                    Submit Application
                  </button>
                </form>
            </div>
            
            <div className="mt-12 text-center">
              <h4 className="text-xl font-semibold mb-4 text-white">Not seeing a suitable position?</h4>
              <p className="text-gray-400 mb-6">
                We're always on the lookout for exceptional talent. Send your resume to <a href="mailto:contact@vectriumventures.com" className="text-blue-400 hover:underline">contact@vectriumventures.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30 relative z-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaUserTie className="text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Professional Growth</h3>
              <p className="text-gray-400">Continuous learning and advancement opportunities</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Collaborative Culture</h3>
              <p className="text-gray-400">Work with talented professionals in a supportive environment</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Flexible Schedule</h3>
              <p className="text-gray-400">Work-life balance with flexible working hours</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Innovative Projects</h3>
              <p className="text-gray-400">Work on cutting-edge solutions for diverse clients</p>
            </div>
          </div>
          
          <a href="#careers" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md hover:opacity-90 transition-opacity inline-block">
            Apply Today
          </a>
        </div>
      </section>
    </>
  );
};

export default Careers;