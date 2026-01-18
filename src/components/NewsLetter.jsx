"use client"
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function NewsLetter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)

    setTimeout(() => {
      toast.success('Subscribed successfully!', {
        style: {
          background: '#22c55e',
          color: 'white',
        },
      })
      setEmail('')
      setLoading(false)
    }, 1200)
  }

  return (
    <section className="container mx-auto my-10 px-5">
      <div className="bg-base-200 rounded-2xl p-8 md:p-10 shadow-md text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-title mb-4">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-content text-sm sm:text-base mb-8 max-w-lg mx-auto">
          Get the latest updates, exclusive offers and new arrivals
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-5 py-3.5 rounded-xl border border-base-300 bg-base-100 
                       text-content placeholder:text-content/50 
                       focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 
                       transition-all duration-200 disabled:opacity-60"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="min-w-[160px] px-8 py-3.5 rounded-xl font-medium text-white bg-primary 
                       hover:bg-primary/90 active:bg-primary/80 
                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 
                       transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                       shadow-sm hover:shadow-md"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                Subscribing...
              </span>
            ) : (
              'Subscribe Now'
            )}
          </button>
        </form>

        <p className="text-content/60 text-xs mt-6">
          We respect your privacy • You can unsubscribe at any time
        </p>
      </div>
    </section>
  )
}