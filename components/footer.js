import React from 'react'
import { FaWhatsapp, FaInstagram, FaLinkedin, FaFacebook, FaPhone } from 'react-icons/fa';

const footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Vectrium</span> Ventures
              </div>
              <p className="text-gray-400 mb-6">
                Innovative IT solutions to transform your digital presence and drive business growth.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/vectrium_ventures/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="https://www.linkedin.com/company/vectrium-ventures/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin size={20} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61565679226049" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebook size={20} />
                </a>
                <a href="https://api.whatsapp.com/send?phone=918815631154" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
                <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors">UI/UX Design</a></li>
                <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors">Graphic Design</a></li>
                <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors">Brand Building</a></li>
                <li><a href="/#services" className="text-gray-400 hover:text-white transition-colors">Digital Marketing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/#career" className="text-gray-400 hover:text-white transition-colors">Career</a></li>
                <li><a href="/#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaPhone size={16} className="text-blue-400 mt-1 mr-3" />
                  <a href="tel:+918815631154" className="text-gray-400 hover:text-white transition-colors">+91 8815631154</a>
                </li>
                <li className="flex items-start">
                  <FaWhatsapp size={16} className="text-blue-400 mt-1 mr-3" />
                  <a href="https://api.whatsapp.com/send?phone=918815631154" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">WhatsApp</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-center md:items-center">
            <p className="text-gray-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Vectrium Ventures. All rights reserved.</p>
            {/* <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
            </div> */}
          </div>
        </div>
      </footer>
  )
}

export default footer
