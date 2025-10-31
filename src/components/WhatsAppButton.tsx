import React from 'react'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const phoneNumber = '09121933212'
  const message = encodeURIComponent('Hello! I would like to inquire about your healthcare services.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  )
}