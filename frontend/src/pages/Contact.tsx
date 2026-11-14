import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import emailjs from '@emailjs/browser'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/layout/PageHero'
import SEOHead from '../components/SEOHead'
import GridLines from '../components/ui/GridLines'
import Reveal from '../components/ui/Reveal'
import { WHATSAPP } from '../data/site'

// EmailJS configuration (unchanged)
const EMAILJS_PUBLIC_KEY = 'Ou6T6HoRysKtyhP0j'
const EMAILJS_SERVICE_ID = 'service_tl0umcz'
const EMAILJS_SERVICE_ID_Gmail = 'service_p2sxzs9'
const EMAILJS_TEMPLATE_ID_COMPANY = 'template_qcbbejk'
const EMAILJS_TEMPLATE_ID_USER = 'template_2cbv37m'

const ADDRESS =
  '1st Floor, A Wing, 21 5-Kanakia Atrium-I, Andheri - Kurla Rd, beside Courtyard by Marriott Hotel, Chakala, Andheri East, Mumbai, Maharashtra - 400093'
const DIRECTIONS_URL =
  'https://www.google.com/maps/dir//1st+Floor,+A+Wing,+21+5-Keakia+Atrium-I,+Andheri+-+Kurla+Rd,+beside+Courtyard+by+Marriott+Hotel,+Chakala,+Andheri+East,+Mumbai,+Maharashtra+400093/@19.0728,72.8682,15z'
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8!2d72.8682!3d19.0728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzIyLjEiTiA3MsKwNTInMDUuNSJF!5e0!3m2!1sen!2sin!4v1695286800000!5m2!1sen!2sin&t=k'

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  companyName: '',
  EmployeeCount: '',
  subSubject: '',
}

type FieldKey = 'name' | 'email' | 'subject' | 'message'
type Errors = Partial<Record<FieldKey, string>>

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Same rules the form enforced before (required fields + email format), surfaced inline */
const validate = (f: typeof EMPTY_FORM): Errors => {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please enter your name.'
  if (!f.email.trim()) e.email = 'Please enter your email address.'
  else if (!emailRegex.test(f.email)) e.email = 'Please enter a valid email address.'
  if (!f.subject) e.subject = 'Please select a subject.'
  if (!f.message.trim()) e.message = 'Please tell us how we can help.'
  return e
}

const Field = ({
  id,
  label,
  required,
  error,
  children,
  className = '',
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={id} className="text-sm font-medium text-forest-700">
      {label}
      {required && <span aria-hidden="true"> *</span>}
    </label>
    {children}
    <p id={`${id}-error`} role={error ? 'alert' : undefined} className="min-h-[1.25rem] pt-2 text-sm text-alert">
      {error}
    </p>
  </div>
)

const Contact = () => {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [mapRef, mapInView] = useInView({ threshold: 0.3, triggerOnce: true })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name as FieldKey]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const found = validate(formData)
    setErrors(found)
    if (found.name || found.email?.startsWith('Please enter your') || found.subject || found.message) {
      toast.error('Please fill in all required fields')
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus()
      return
    }
    if (found.email) {
      toast.error('Please enter a valid email address')
      document.getElementById('contact-email')?.focus()
      return
    }

    setIsSubmitting(true)
    const submissionToast = toast.loading('Sending your message...')

    // Prepare WhatsApp message with form details (unchanged)
    const whatsappNumber = WHATSAPP.number
    const whatsappMessage =
      `For a faster response, please message us on WhatsApp. Our team will assist you shortly.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone || 'Not provided'}\n` +
      `*Subject:* ${formData.subject}\n` +
      `*Message:* ${formData.message}`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    // Attempt to send email silently (no error shown to user), as before
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID_Gmail,
        EMAILJS_TEMPLATE_ID_COMPANY,
        {
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          user_subject: formData.subject,
          user_message: formData.message,
          user_company: formData.companyName,
          user_employee_count: formData.EmployeeCount,
        },
        EMAILJS_PUBLIC_KEY,
      )

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_USER,
        {
          user_name: formData.name,
          user_email: formData.email,
          company_email: 'support@Zimaxxtech.com',
        },
        EMAILJS_PUBLIC_KEY,
      )
    } catch (error: unknown) {
      console.error('EmailJS error (silent):', error)
    }

    toast.success("Message sent successfully! We'll get back to you soon.", {
      id: submissionToast,
      duration: 4000,
      position: 'top-right',
    })

    window.open(whatsappUrl, '_blank')

    setFormData(EMPTY_FORM)
    setErrors({})
    setIsSubmitting(false)
  }

  const aria = (key: FieldKey) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': `contact-${key}-error`,
  })

  const channels = [
    { icon: Phone, title: 'Call Us', detail: 'Toll-Free: 1800 210 4567', href: 'tel:18002104567' },
    { icon: Mail, title: 'Email Us', detail: 'support@Zimaxxtech.com', href: 'mailto:support@Zimaxxtech.com' },
    {
      icon: null,
      title: 'WhatsApp',
      detail: 'Chat with us',
      href: `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message)}`,
      external: true,
    },
    { icon: Clock, title: 'Business Hours', detail: '24/7 Available' },
  ]

  return (
    <PageShell>
      <SEOHead
        title="Contact Us"
        description="We're here to support you in creating safer environments for your workforce and their loved ones."
        url="https://worksafe247.com/contact"
      />
      <Toaster
        toastOptions={{
          style: {
            fontFamily: 'Manrope, system-ui, sans-serif',
            borderRadius: '999px',
            padding: '12px 18px',
            background: '#F6F4EF',
            color: '#194D3E',
            border: '1px solid rgba(25,77,62,0.18)',
          },
          success: { style: { background: '#1F5E4B', color: '#F6F4EF', border: 'none' }, iconTheme: { primary: '#F6F4EF', secondary: '#1F5E4B' } },
          error: { iconTheme: { primary: '#8C3B2A', secondary: '#F6F4EF' } },
        }}
      />

      <PageHero
        titleLines={['Contact Us']}
        size="xl"
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Contact Us' }]}
      >
        <p>We're here to support you in creating safer environments for your workforce and their loved ones.</p>
      </PageHero>

      <section aria-label="Contact form and details" className="relative bg-ivory-100">
        <GridLines tone="ivory" />
        <div className="ws-shell relative grid grid-cols-1 gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-6 lg:py-28">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <h2 className="ws-display text-display-sm">Send us a Message</h2>
            <p className="mt-3 text-sm text-forest-700/80">Fields marked * are required.</p>

            <form onSubmit={handleSubmit} noValidate className="mt-12 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <Field id="contact-name" label="Full name" required error={errors.name}>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className="ws-field"
                  {...aria('name')}
                />
              </Field>
              <Field id="contact-email" label="Email" required error={errors.email}>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  className="ws-field"
                  {...aria('email')}
                />
              </Field>
              <Field id="contact-phone" label="Phone">
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  className="ws-field"
                />
              </Field>
              <Field id="contact-subject" label="Subject" required error={errors.subject}>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`ws-field ${formData.subject ? '' : 'text-forest-700/40'}`}
                  {...aria('subject')}
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Consulted">Consulted</option>
                </select>
              </Field>
              <Field id="contact-message" label="Message" required error={errors.message} className="sm:col-span-2">
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Tell us about your safety needs..."
                  className="ws-field resize-none"
                  {...aria('message')}
                />
              </Field>

              <div className="flex flex-col items-start gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[26rem] text-sm text-forest-700/80">
                  After sending, WhatsApp opens with your message for a faster response.
                </p>
                <button type="submit" disabled={isSubmitting} className="ws-btn-forest px-7 py-4 disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory-50 border-t-transparent" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <ul className="border-t border-forest-700/20">
              {channels.map((c) => {
                const inner = (
                  <>
                    <span className="flex items-center gap-3">
                      {c.icon ? (
                        <c.icon className="h-4 w-4 text-forest-600" aria-hidden="true" />
                      ) : (
                        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#25D366]" />
                      )}
                      <span className="ws-eyebrow text-forest-500">{c.title}</span>
                    </span>
                    <span className="mt-3 flex items-center justify-between gap-4 text-[1.15rem] text-forest-700">
                      <span className="break-all sm:break-normal">{c.detail}</span>
                      {c.href && (
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      )}
                    </span>
                  </>
                )
                return (
                  <li key={c.title} className="border-b border-forest-700/20">
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.external ? '_blank' : undefined}
                        rel={c.external ? 'noopener noreferrer' : undefined}
                        className="group block py-6 transition-colors hover:bg-forest-700/[0.03]"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="py-6">{inner}</div>
                    )}
                  </li>
                )
              })}
              <li className="border-b border-forest-700/20 py-6">
                <span className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-forest-600" aria-hidden="true" />
                  <span className="ws-eyebrow text-forest-500">Visit Us</span>
                </span>
                <address className="mt-3 not-italic leading-relaxed text-forest-700">{ADDRESS}</address>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Location */}
      <section ref={mapRef} aria-labelledby="map-title" className="ws-grain relative bg-forest-700 text-ivory-50">
        <GridLines tone="forest" />
        <div className="ws-shell relative py-16 sm:py-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-ivory-50/20 pb-6">
            <h2 id="map-title" className="ws-display text-display-sm">
              Our Location
            </h2>
            <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="ws-btn-line-light">
              Open in Google Maps
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-forest-900 sm:aspect-[16/9] lg:aspect-[21/9]">
            <iframe
              title="Company Location"
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="eager"
              className="absolute inset-0 h-full w-full grayscale-[0.55] transition-[filter] duration-700 hover:grayscale-0"
            />
            {/* Location video overlay: plays once when the section comes into view (as before) */}
            {mapInView && !videoEnded && (
              <video
                autoPlay
                muted
                playsInline
                onEnded={() => setVideoEnded(true)}
                onError={(e) => {
                  console.error('Video failed to load:', e)
                  setVideoEnded(true)
                }}
                className="absolute inset-0 z-10 h-full w-full bg-transparent object-cover"
              >
                <source src="/videos/location.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  )
}

export default Contact
