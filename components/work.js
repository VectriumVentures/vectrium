import React from 'react'

const work = () => {
  const projects = [
    {
      title: "E-Commerce Platform Redesign",
      client: "FashionForward",
      image: "/projects/project1.jpg",
      description: "Complete redesign of an e-commerce platform with improved UX and mobile responsiveness, resulting in 40% higher conversion rates."
    },
    {
      title: "Integrated Marketing Campaign",
      client: "NutriWell",
      image: "/projects/project2.jpg",
      description: "Multi-channel digital marketing strategy that increased brand awareness by 85% and drove a 65% growth in online sales."
    },
    {
      title: "Corporate Identity Overhaul",
      client: "TechSolutions Global",
      image: "/projects/project3.jpg",
      description: "Comprehensive brand identity development including logo, visual assets, and brand guidelines to establish market presence."
    }
  ];

  return (
    <section id="work" className="py-24 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Our Work</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Explore some of our recent projects and see how we've helped businesses achieve their digital objectives.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden group hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="h-56 bg-gray-800 relative overflow-hidden">
                    {/* Replace with actual image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium rounded-md">
                        View Project
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                    <p className="text-blue-400 text-sm mb-3">Client: {project.client}</p>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a href="#contact" className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-md hover:bg-white/20 transition-all inline-flex">
                See All Projects
              </a>
            </div>
          </div>
        </section>
  )
}

export default work
