import React, { useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create mailto link
      const subject = encodeURIComponent('Contact Form Submission from Diamond Masters Care')
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      const mailtoLink = `mailto:yangestephanied@gmail.com?subject=${subject}&body=${body}`
      
      // Open email client
      window.location.href = mailtoLink
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name"
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>

              <div>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Email"
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>

              <div>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Message"
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">
                  Your email client should open shortly. Thank you for your message!
                </p>
              )}

              {submitStatus === 'error' && (
                <p className="text-red-600 text-center">
                  There was an error opening your email client. Please try again.
                </p>
              )}
            </form>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Prefer Quick Chat?
            </h2>
            <p className="text-blue-600 mb-6">
              Our healthcare team is available 24/7 to answer your questions and provide guidance. All conversations are completely confidential and HIPAA compliant.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="https://wa.me/09121933212?text=Hello! I would like to inquire about your healthcare services."
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Chat on WhatsApp
                </Button>
              </a>
              <a href="tel:09121933212" className="block">
                <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                  📞 Call Now: 09121933212
                </Button>
              </a>
            </div>

            <div>
              <h3 className="font-semibold text-blue-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-2 text-sm text-blue-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>100% Confidential Service</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Licensed Healthcare Professionals</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Secure Result Delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>24/7 Support Available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}