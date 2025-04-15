import React, { useState, useEffect } from 'react';

const Testimonial = () => {
  const [stars, setStars] = useState([]);
  
  // Generate stars for universe animation
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          animationDuration: `${Math.random() * 5 + 3}s`
        });
      }
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      image: "/testimonials/person1.jpg",
      quote: "Vectrium Ventures transformed our digital presence. Their strategic approach to our website redesign and digital marketing efforts resulted in a 150% increase in qualified leads."
    },
    {
      name: "Michael Chen",
      role: "Marketing Director, GrowInnovate",
      image: "/testimonials/person2.jpg",
      quote: "The team at Vectrium Ventures delivered beyond our expectations. Their brand building strategy helped us establish a strong market position in a highly competitive industry."
    },
    {
      name: "Priya Sharma",
      role: "Founder, EcoSolutions",
      image: "/testimonials/person3.jpg",
      quote: "Working with Vectrium has been a game-changer for our business. Their comprehensive IT solutions and business consultation have streamlined our operations and accelerated our growth."
    },
    {
      name: "Rajesh Patel",
      role: "CTO, IndiaTech Solutions",
      image: "/testimonials/person4.jpg",
      quote: "Vectrium Ventures provided exceptional cybersecurity solutions for our enterprise. Their team's expertise helped us strengthen our digital infrastructure with minimal disruption."
    },
    {
      name: "Ananya Desai",
      role: "Marketing Head, GlobalConnect India",
      image: "/testimonials/person5.jpg",
      quote: "The digital marketing campaign created by Vectrium increased our customer engagement by 200%. Their understanding of the Indian market dynamics was crucial to our success."
    },
    {
      name: "Vikram Mehta",
      role: "Founder, NextGen Innovations",
      image: "/testimonials/person6.jpg",
      quote: "Partnering with Vectrium has been the best decision for our startup. Their strategic guidance and technical expertise helped us secure our first round of funding and scale operations."
    }
  ];

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      {/* Universe background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        {/* Stars */}
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.animationDuration} infinite ease-in-out`
            }}
          />
        ))}
        
        {/* Nebula effects */}
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear what our clients have to say about their experience working with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 overflow-hidden mr-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(name => name[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              
              {/* Star rating */}
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add CSS for star animation */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;