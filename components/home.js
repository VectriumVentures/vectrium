// pages/index.js
"use client"
import Image from 'next/image';
import Header from './header'
import Hero from './hero'
import About from './about'
import Contact from './contact'
import Career from './career'

import Footer from './footer'
import Service from './service'
import Testimonial from './testimonial'
import Work from './work'


export default function Home() {

  return (
    <div className="min-h-screen bg-black text-white">
     <Header/>
      <main>
        <Hero/>
        <Service/>
<About/>
    {/* <Work/>    */}
<Testimonial/>
<Career/>
 <Contact/>
      </main>
<Footer/>
    </div>
  );
}
