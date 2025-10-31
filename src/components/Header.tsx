import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { Button } from './ui/Button'
import { supabase } from '../lib/supabase'

interface HeaderProps {
  user?: any
}

export function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle()

        setUserRole(data?.role || null)
      } else {
        setUserRole(null)
      }
    }

    fetchUserRole()
  }, [user])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const isDashboardPage = location.pathname.startsWith('/dashboard')

  const getDashboardPath = () => {
    if (userRole === 'admin') return '/dashboard/admin'
    if (userRole === 'nurse') return '/dashboard/nurse'
    if (userRole === 'patient') return '/dashboard/patient'
    return '/dashboard'
  }

  const isActivePage = (path: string) => {
    return location.pathname === path
  }

  if (isDashboardPage) {
    return null
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-blue-900">DMC</span>
          </Link>

          <nav className="hidden md:flex items-center justify-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-all ${
                isActivePage('/')
                  ? 'text-white bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-full'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`font-medium transition-all ${
                isActivePage('/services')
                  ? 'text-white bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-full'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Services
            </Link>
            <Link
              to="/blog"
              className={`font-medium transition-all ${
                isActivePage('/blog')
                  ? 'text-white bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-full'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-all ${
                isActivePage('/about')
                  ? 'text-white bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-full'
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              About Us
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to={getDashboardPath()}>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-blue-600 hover:text-blue-800">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">Sign In</Button>
                </Link>
                <Link to="/signup-patient">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Sign Up
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-blue-600" />
            ) : (
              <Menu className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`font-medium ${
                  isActivePage('/') ? 'text-blue-800' : 'text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`font-medium ${
                  isActivePage('/services') ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/blog"
                className={`font-medium ${
                  isActivePage('/blog') ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className={`font-medium ${
                  isActivePage('/about') ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>

              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-blue-200">
                  <Link to={getDashboardPath()} onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleSignOut} className="justify-start text-blue-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-blue-200">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-blue-500 text-blue-500">Sign In</Button>
                  </Link>
                  <Link to="/signup-patient" onClick={() => setIsMenuOpen(false)} className="block">
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}