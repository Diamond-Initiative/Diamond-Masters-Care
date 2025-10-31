import React from 'react'

const services = [
  {
    title: 'Test Sample Collection',
    description: 'Delivered by certified nurses, safely and professionally.',
  },
  {
    title: 'Confidential Lab Results',
    description: 'Delivered by certified nurses, safely and professionally.',
  },
  {
    title: 'Treatment at Home',
    description: 'Delivered by certified nurses, safely and professionally.',
  }
]

export function Services() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-blue-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}