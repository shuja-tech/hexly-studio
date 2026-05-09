import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import HexGridCanvas from './components/HexGridCanvas'
import logoImg from './assets/WhatsApp_Image_2026-05-09_at_8.54.01_PM-removebg-preview.png'

const heroVisual =
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80'

const services = [
  {
    title: 'Web Design & Development',
    items: [
      'Business Websites',
      'Portfolio Websites',
      'Landing Pages',
      'Responsive Design',
    ],
  },
  {
    title: 'Branding & Visual',
    items: ['Logo Design', 'Visual Identity', 'Social Media Design'],
  },
  {
    title: 'UI & Strategy',
    items: ['UI-focused Web Design', 'Conversion-focused layouts'],
  },
]

const portfolioItems = [
  {
    title: 'SaaS Product Site',
    description: 'Conversion-focused redesign for a B2B growth platform.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Creative Portfolio',
    description: 'Minimal personal portfolio with strong visual storytelling.',
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Agency Landing Page',
    description: 'High-end marketing page optimized for lead conversion.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
]

const reasons = [
  'Clean & Modern Design',
  'Fast Performance',
  'Mobile Responsive',
  'Conversion-Focused',
  'Tailored Solutions',
]

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-blue-400/80">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-slate-300/80">{description}</p> : null}
    </div>
  )
}

function FadeSection({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: null })
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ submitting: true, success: false, error: null })
    const form = e.target
    const data = { name: form.name.value, email: form.email.value, message: form.message.value }
    try {
      const res = await fetch('https://formspree.io/f/mjglanqg', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setFormStatus({ submitting: false, success: true, error: null })
        form.reset()
      } else {
        const err = await res.json()
        setFormStatus({ submitting: false, success: false, error: err.error || 'Failed to send' })
      }
    } catch {
      setFormStatus({ submitting: false, success: false, error: 'Network error' })
    }
  }

  return (
    <div className="bg-[#0B0B0F] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0B0F]/75 backdrop-blur-lg">
        <nav className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Hexly logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-2xl font-semibold tracking-[0.2em] text-white">Hexly</span>

          </a>
          <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-blue-400">
                {link.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="rounded-md border border-white/20 px-3 py-1.5 text-xs tracking-wider text-slate-200 md:hidden"
          >
            MENU
          </button>
        </nav>
        {menuOpen ? (
          <div id="mobile-nav" className="border-t border-white/10 bg-[#0B0B0F]/95 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm text-slate-300">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-blue-400"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section id="hero" className="relative overflow-hidden border-b border-white/10">
          <HexGridCanvas />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.28),transparent_42%)]" />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mx-auto grid min-h-[88vh] w-full max-w-6xl gap-14 px-6 py-20 md:grid-cols-2 md:items-center"
          >
            <div>
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                We Design & Build Modern Websites & Designs That Convert
              </h1>
              <p className="mt-7 max-w-xl text-lg text-slate-300/85">
                Clean, high-performing websites and visual brands for businesses and creators.
              </p>
              <br />
              <br />
              <div className="mt-10 flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="rounded-full border border-blue-500/70 bg-blue-600 px-7 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] transition-shadow hover:shadow-[0_0_32px_rgba(37,99,235,0.5)]"
                >
                  Get Started
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#portfolio"
                  className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium text-slate-200 backdrop-blur-md transition-colors hover:bg-white/10"
                >
                  View Portfolio
                </motion.a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.9 },
                scale: { duration: 0.9 },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="group relative mx-auto w-full max-w-xl"
            >
              <div className="absolute -inset-2 rounded-3xl bg-blue-500/20 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-3 backdrop-blur-xl">
                <img
                  src={heroVisual}
                  loading="eager"
                  decoding="async"
                  alt="Premium studio website showcase"
                  className="h-[320px] w-full rounded-2xl object-cover md:h-[420px]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-700/25 via-transparent to-blue-300/10" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <FadeSection id="services" className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading eyebrow="Services" title="Built for modern digital growth" />
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <motion.article
                key={service.title}
                whileHover={{ y: -7, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 shadow-lg shadow-black/10 backdrop-blur-md"
              >
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <ul className="mt-5 space-y-3 text-sm text-slate-300">
                  {service.items.map((item) => (
                    <li key={item} className="border-l border-blue-500/35 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </FadeSection>

        <FadeSection id="portfolio" className="border-y border-white/10 bg-black/20 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Portfolio"
              title="Selected work"
              description="A sample of recent web and brand experiences designed for clarity and impact."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.map((project) => (
                <motion.article
                  key={project.title}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      loading="lazy"
                      decoding="async"
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{project.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </FadeSection>

        <FadeSection className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading eyebrow="Why Hexly" title="Precision-driven design and development" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {reasons.map((reason) => (
              <motion.div
                key={reason}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-7 text-sm text-slate-200"
              >
                <span className="mb-3 block h-1 w-10 rounded-full bg-blue-500/70" />
                {reason}
              </motion.div>
            ))}
          </div>
        </FadeSection>

        <FadeSection id="about" className="border-y border-white/10 bg-black/20 py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <SectionHeading eyebrow="About" title="Studio profile" />
            <p className="text-lg leading-relaxed text-slate-300/90">
              Hexly is a web development and graphic design studio focused on creating modern, functional, and professionally designed digital solutions. <br></br><br />We help businesses, startups, freelancers, and creatives build a strong and consistent online presence through clean design, thoughtful user experience, and performance‑driven development.
<br /><br />Our services range from business websites and high‑converting landing pages to portfolio websites, logo design, branding, and social media design assets. Every project at Hexly is crafted with attention to detail, usability, and visual clarity.
<br /><br />At Hexly, we believe great design is not just about looking good, it’s about solving problems, building trust, and helping brands grow. Our goal is to deliver digital experiences that are simple, effective, and aligned with your brand identity.
            </p>
          </div>
        </FadeSection>

        <FadeSection id="contact" className="mx-auto max-w-4xl px-6 py-24">
          <SectionHeading eyebrow="Contact" title="Start your next project" />
          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-xl shadow-black/20 backdrop-blur-md md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500/70"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm text-slate-300">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500/70"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-5 block text-sm text-slate-300">
              Message
              <textarea
                name="message"
                rows="5"
                required
                className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500/70"
                placeholder="Tell us about your project."
              />
            </label>
            <motion.button
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              type="submit"
              disabled={formStatus.submitting}
              className="mt-6 rounded-full border border-blue-500/70 bg-blue-600 px-8 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] transition-shadow hover:shadow-[0_0_32px_rgba(37,99,235,0.5)] disabled:opacity-50"
            >
              {formStatus.submitting ? 'Sending...' : 'Start Your Project'}
            </motion.button>
            {formStatus.success && (
              <p className="mt-4 text-center text-sm font-medium text-green-400">
                Thanks! Your message has been sent successfully.
              </p>
            )}
            {formStatus.error && (
              <p className="mt-4 text-center text-sm font-medium text-red-400">
                {formStatus.error}
              </p>
            )}
            <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
              <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
                <p className="text-xs uppercase tracking-wider text-slate-400">Email</p>
                <a href="mailto:hexly.studio11@gmail.com" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                  hexly.studio11@gmail.com
                </a>
              </div>
              <div className="flex flex-col items-center gap-1 text-center sm:items-end sm:text-right">
                <p className="text-xs uppercase tracking-wider text-slate-400">Phone</p>
                <a href="tel:+923144661056" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                  +92 314 466 10 56
                </a>
              </div>
            </div>
          </form>
        </FadeSection>
      </main>

      <footer className="border-t border-white/10 py-9">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row">
          <p className="font-semibold tracking-[0.2em] text-slate-300">HEXLY</p>
          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-slate-200">
              Services
            </a>
            <a href="#portfolio" className="hover:text-slate-200">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-slate-200">
              Contact
            </a>
          </div>
        </div>
      </footer>
      
    </div>
  )
}

export default App
