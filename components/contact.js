import React, { useEffect, useRef } from 'react'
import { FaWhatsapp, FaInstagram, FaLinkedin, FaFacebook, FaPhone } from 'react-icons/fa';

const Contact = () => {
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
      <section id="contact" className="py-24 bg-black/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black/60 to-black z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Get In Touch</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Ready to elevate your digital presence? Contact us to discuss how we can help your business thrive.
              </p>
            </div>
            
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 md:p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Send us a message</h3>
                  <form className="space-y-4"  action="https://formsubmit.co/vectriumventures@gmail.com" method="POST">
                  <input type="hidden" name="_template" value="table"></input>
                  <input type="hidden" name="_subject" value="Enquiry for Vectrium Ventures!"></input>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="Name"
                        className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="Email"

                        className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                      <textarea 
                        id="message" 
                        rows="4" 
                        name="Message"

                        className="w-full bg-black/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md hover:opacity-90 transition-opacity">
                      Send Message
                    </button>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                        <FaPhone className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <a href="tel:+918815631154" className="text-white hover:text-blue-400 transition-colors">+91 8815631154</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                        <FaWhatsapp className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">WhatsApp</p>
                        <a href="https://api.whatsapp.com/send?phone=918815631154" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">+91 8815631154</a>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Follow Us</h4>
                      <div className="flex space-x-4">
                        <a href="https://www.instagram.com/vectrium_ventures/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-colors">
                          <FaInstagram className="text-white" />
                        </a>
                        <a href="https://www.linkedin.com/company/vectrium-ventures/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                          <FaLinkedin className="text-white" />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61565679226049" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                          <FaFacebook className="text-white" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="pt-6 mt-6 border-t border-gray-800">
                      <h4 className="text-white font-medium mb-3">Office Hours</h4>
                      <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-400">Saturday: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30 relative z-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create innovative solutions that drive growth for your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md hover:opacity-90 transition-opacity">
              Get Started Now
            </a>
            <a href="#services" className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-md hover:bg-white/20 transition-all">
              Explore Services
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact