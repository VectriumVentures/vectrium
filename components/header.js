"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { HiOutlineChevronDown, HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link'
const header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
     <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black bg-opacity-80 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                <div className="text-2xl font-bold text-white flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Vectrium Logo" 
                width={40} 
                height={40} 
                className="mr-2"
              />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Vectrium</span> Ventures
            </div>
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                  <a href="/#services" className="text-sm text-gray-300 hover:text-white transition-colors">Services</a>
                  <a href="/#about" className="text-sm text-gray-300 hover:text-white transition-colors">About</a>
                  <a href="/#work" className="text-sm text-gray-300 hover:text-white transition-colors">Work</a>
                  <a href="/#testimonials" className="text-sm text-gray-300 hover:text-white transition-colors">Testimonials</a>
                  <a href="/#career" className="text-sm text-gray-300 hover:text-white transition-colors">Career</a>
                  <Link href="/interns" className="text-sm text-gray-300 hover:text-white transition-colors">Interns</Link>
                  
                  <a href="/#contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</a>
                </nav>
                
                {/* Mobile Navigation Button */}
                <button 
                  className="md:hidden text-gray-300 focus:outline-none" 
                  onClick={() => setNavOpen(!navOpen)}
                >
                  {navOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
                </button>
              </div>
            </div>
            
            {/* Mobile Navigation Menu */}
            {navOpen && (
              <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-lg">
                <div className="container mx-auto px-4 py-4">
                  <nav className="flex flex-col space-y-4">
                    <a href="/#services" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setNavOpen(false)}>Services</a>
                    <a href="/#about" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setNavOpen(false)}>About</a>
                    <a href="/#work" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setNavOpen(false)}>Work</a>
                    <a href="/#testimonials" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setNavOpen(false)}>Testimonials</a>
                    <a href="/#career" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setNavOpen(false)}>Career</a>
                    <Link href="/interns" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setNavOpen(false)}>Interns</Link>
                    <a href="/#contact" className="text-gray-300 hover:text-white py-2 transition-colors" onClick={() => setNavOpen(false)}>Contact</a>
                  </nav>
                </div>
              </div>
            )}
          </header>
    
  )
}

export default header
