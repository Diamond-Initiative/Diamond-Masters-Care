import React from 'react'

const doctors = [
  {
    name: 'Patricia Smith',
    specialty: 'Gynecologist',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    background: 'from-blue-50 to-blue-100'
  },
  {
    name: 'John Smith',
    specialty: 'Cardiologist',
    image: 'https://images.pexels.com/photos/6203388/pexels-photo-6203388.jpeg?auto=compress&cs=tinysrgb&w=400',
    background: 'from-blue-50 to-blue-100'
  },
  {
    name: 'Martin Joe',
    specialty: 'Neurologist',
    image: 'https://images.pexels.com/photos/6203583/pexels-photo-6203583.jpeg?auto=compress&cs=tinysrgb&w=400',
    background: 'from-blue-100 to-blue-200',
    featured: true
  },
  {
    name: 'Thomas Erb',
    specialty: 'Neurologist',
    image: 'https://images.pexels.com/photos/6749770/pexels-photo-6749770.jpeg?auto=compress&cs=tinysrgb&w=400',
    background: 'from-blue-50 to-blue-100'
  }
]

export function Doctors() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
            Meet Our Expert Nurses
          </h2>
          <p className="text-blue-700 max-w-2xl mx-auto">
            Our team of licensed healthcare professionals provides compassionate, 
            confidential care with years of specialized experience in STI/STD treatment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center group hover:scale-105 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200 shadow-lg"
            >
              <div className="mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 mx-auto rounded-full object-cover shadow-lg border-2 border-blue-300"
                />
              </div>

              <h3 className="text-lg font-bold text-blue-900 mb-1">
                {doctor.name}
              </h3>
              <p className="text-blue-700">
                {doctor.specialty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}