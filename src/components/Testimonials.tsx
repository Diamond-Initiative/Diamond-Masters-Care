import React from 'react'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah',
    specialty: 'Patient',
    content: 'The confidential home service was exactly what I needed. The nurse was professional, caring, and made me feel completely comfortable throughout the entire process.',
    gradient: 'from-blue-100 to-blue-200'
  },
  {
    name: 'Annie',
    specialty: 'Patient', 
    content: 'Diamond Masters Care provided exceptional service with complete privacy. The results were delivered securely and the follow-up care was outstanding.',
    gradient: 'from-blue-50 to-blue-150'
  },
  {
    name: 'John',
    specialty: 'Patient',
    content: 'I was nervous about getting tested, but the team made everything so easy and stress-free. The home visit was convenient and the staff was incredibly professional.',
    gradient: 'from-blue-100 to-blue-200'
  }
]

export function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-blue-700 max-w-2xl mx-auto">
            Read testimonials from patients who have experienced our confidential, 
            professional healthcare services in the comfort of their homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 relative group hover:scale-105 transition-transform duration-300 border border-blue-200 shadow-lg`}
            >
              <div className="mb-4">
                <Quote className="w-6 h-6 text-blue-600" />
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                "{testimonial.content}"
              </p>

              <div>
                <h4 className="font-bold text-blue-900 text-base">
                  {testimonial.name}
                </h4>
                <p className="text-blue-600">
                  {testimonial.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}