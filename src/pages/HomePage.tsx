import React from 'react'
import { Hero } from '../components/Hero'
import { Services } from '../components/Services'
import { SubscriptionPlans } from '../components/SubscriptionPlans'
import { Doctors } from '../components/Doctors'
import { Testimonials } from '../components/Testimonials'
import { Blog } from '../components/Blog'
import { ContactForm } from '../components/ContactForm'

export function HomePage() {
  return (
    <div>
      <Hero />
      <Services />
      <SubscriptionPlans />
      <Doctors />
      <Testimonials />
      <Blog />
      <ContactForm />
    </div>
  )
}