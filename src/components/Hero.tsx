import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/Button'

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-500 to-blue-700 py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Home Healthcare for STI & STD Patients
          </h1>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Book a private nurse visit, get tested, and receive confidential treatment from the comfort of your home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            
            <Link to="/booking">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}