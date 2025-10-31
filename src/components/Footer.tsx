import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-blue-900">DMC</span>
          </Link>
            </div>
            <p className="text-gray-300">
              Leading healthcare provider committed to your wellness and providing exceptional medical services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Test Sample Collection</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Confidential Lab Results</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Treatment at Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>24/7 Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>About Us</Link></li>
              <li><Link to="/nurses" className="text-gray-300 hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Our Nurses</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Contact</Link></li>
              <li><Link to="/become-a-nurse" className="text-gray-300 hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Become a Nurse</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Abuja, Nigeria</li>
              <li>Phone: 09121933212</li>
              <li>Email: Yangestephanied@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2025 DMGL Healthcare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}