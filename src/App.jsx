import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import HexGridCanvas from './components/HexGridCanvas'
import lightLogoImg from './assets/lightlogo.png'
import darkLogoImg from './assets/darklogo.png'



// const heroVisual =
//   'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80'


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
    id: 'choco-melt',
    title: 'ChocoMelt',
    description: 'E-commerce storefront with bold product visuals, smooth browsing, and conversion-ready sections.',
    link: '',


    image: '/src/assets/chocomelt_main.jpeg',
    screenshots: [
      '/src/assets/chocomelt1.jpeg',
      '/src/assets/chocomelt2.jpeg',
      '/src/assets/chocomelt3.jpeg',
    ],
    tags: ['E-commerce', 'UI', 'Brand'],
  },
  {
    id: 'noor-bakers',
    title: 'NoorBakers',
    description: 'Luxury bakery branding and menu-first layout designed for trust and fast decisions.',
    link: '',

    image: '/src/assets/noorbakers_main.jpeg',
    screenshots: [
      '/src/assets/noorbakers1.jpeg',
      '/src/assets/noorbakers2.jpeg',
      '/src/assets/noorbakers3.jpeg',
    ],
    tags: ['Brand', 'Landing', 'Design'],
  },
  {
    id: 'sol-plant',
    title: 'SolPlant',
    description: 'Sustainable product landing with clean content hierarchy and responsive layout blocks.',
    link: 'https://shuja-tech.github.io/SolPlant-smit/',

    image: '/src/assets/SolPlantmain.png',
    screenshots: [
      '/src/assets/solplant2.png',
      '/src/assets/solplant3.png',
    ],
    tags: ['Landing', 'UI', 'Sustainability'],
  },
  {
    id: 'prefix-studio',
    title: 'Prefix Studio',
    description: 'A modern studio portfolio system with strong typography and consistent card patterns.',
    link: 'https://shuja-tech.github.io/Prefix-e-com-with-AIAgent/',

    image: '/src/assets/prefixmain.png',
    screenshots: [
      '/src/assets/prefix1.png',
      '/src/assets/prefix2.png',
      '/src/assets/prefix3.png',
    ],
    tags: ['Portfolio', 'Design', 'System'],
  },
  {
    id: 'hexly',
    title: 'Hexly',
    description: 'Brand and portfolio system for showcasing products, services, and responsive UI components.',
    link: 'https://hexly-studio.vercel.app/',

    image: '/src/assets/hexlymain.png',
    screenshots: [
      '/src/assets/hexly1.png',
      '/src/assets/hexly2.png',
      '/src/assets/hexly3.png',
    ],
    tags: ['Brand', 'Portfolio', 'UI'],
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
      <p className="text-xs uppercase tracking-[0.25em] text-blue-500/90">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl text-[var(--text)]">
        {title}
      </h2>
      {description ? <p className="mt-4 text-[var(--muted2)]">{description}</p> : null}
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

  const [selectedProject, setSelectedProject] = useState(null)


  const [theme, setTheme] = useState(() => {
    // Light theme is the default (must not follow system theme).
    // If a user previously selected dark, respect it; otherwise force light.
    const stored = localStorage.getItem('theme')
    return stored === 'dark' ? 'dark' : 'light'
  })


  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])



  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }


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
    <div className="bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-40 border-b border-[var(--header-border)] bg-[var(--header-bg)]/80 backdrop-blur-lg">

        <nav className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-3">
              <img
                  src={theme === 'light' ? lightLogoImg : darkLogoImg}
                  alt="Hexly logo"
                  className="h-12 w-auto object-contain"
                />

            <span className="text-2xl font-semibold tracking-[0.2em] text-[var(--text)]">Hexly</span>

          </a>
          <div className="hidden items-center gap-7 text-sm md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors text-[var(--muted)] hover:text-blue-500"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hidden items-center rounded-md border border-[var(--border)] px-3 py-1.5 text-xs tracking-wider md:flex"
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>


          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs tracking-wider text-[var(--muted)] md:hidden"
          >
            MENU
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs tracking-wider text-[var(--muted)] md:hidden"
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>


        </nav>
        {menuOpen ? (
          <div
            id="mobile-nav"
            className="border-t border-[var(--header-border)] bg-[var(--bg)]/95 px-6 py-4 md:hidden"
          >
            <div className="flex flex-col gap-4 text-sm text-[var(--muted)]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-blue-500"
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
        <section id="hero" className="relative overflow-hidden border-b border-[var(--border)]">
          <HexGridCanvas />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.22),transparent_42%)]" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mx-auto grid min-h-[88vh] w-full max-w-6xl gap-14 px-6 py-20 md:grid-cols-2 md:items-center"
          >
            <div>
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">

                We Design & Build Modern Websites & Designs That Convert
              </h1>
              <p className="mt-7 max-w-xl text-lg text-[var(--muted)]">

                Clean, high-performing websites and visual brands for businesses and creators.
              </p>
              <br />
              <br />
              <div className="mt-10 flex flex-wrap gap-4">
                <motion.a
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98, y: 0 }}
                  href="#contact"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative overflow-hidden rounded-full border border-blue-500/60 bg-blue-600 px-9 py-4 text-base font-semibold text-white shadow-[0_0_38px_rgba(37,99,235,0.38)] transition-shadow hover:shadow-[0_0_60px_rgba(37,99,235,0.62)]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 45%)',
                    }}
                  />
                  <span className="relative">Get Started</span>
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    initial={prefersReducedMotion ? undefined : { x: 0 }}
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { x: [0, 6, 0] }
                    }
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                    }
                  >
                    ➜
                  </motion.span>
                </motion.a>


              </div>
            </div>



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
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-7 shadow-lg shadow-black/10 backdrop-blur-md"
              >
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <ul className="mt-5 space-y-3 text-sm text-[var(--muted)]">

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

        <FadeSection id="portfolio" className="border-y border-[var(--border)] bg-[var(--surface2)] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Portfolio"
              title="Selected work"
              description="A sample of recent web and brand experiences designed for clarity and impact."
            />

            {selectedProject ? (
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface2)]/50 p-5 md:p-8"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedProject.tags?.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--text)]">
                      {selectedProject.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[var(--muted)]">{selectedProject.description}</p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface2)]"
                    >
                      ← Back to projects
                    </button>

                    {selectedProject.link ? (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.25)] transition hover:bg-blue-500 sm:inline-flex"
                      >
                        View live
                      </a>
                    ) : null}

                  </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-5">
                  <div className="lg:col-span-3">
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-3">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="h-[260px] w-full rounded-xl object-cover md:h-[340px]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="mt-5">
                      <p className="text-sm font-semibold text-[var(--muted2)]">Screenshots</p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {selectedProject.screenshots?.map((src, idx) => (
                          <motion.figure
                            key={src}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.35, delay: idx * 0.03 }}
                            className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60"
                          >
                            <img
                              src={src}
                              alt={`${selectedProject.title} screenshot ${idx + 1}`}
                              className="h-44 w-full object-cover md:h-52"
                              loading="lazy"
                              decoding="async"
                            />
                          </motion.figure>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-5">
                      <p className="text-sm font-semibold text-[var(--muted2)]">What we did</p>
                      <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                        <li className="rounded-xl border border-[var(--border)] bg-[var(--surface2)]/60 px-4 py-3">
                          Clear structure + high-contrast UI for readability
                        </li>
                        <li className="rounded-xl border border-[var(--border)] bg-[var(--surface2)]/60 px-4 py-3">
                          Performance-minded layout and responsive components
                        </li>
                        <li className="rounded-xl border border-[var(--border)] bg-[var(--surface2)]/60 px-4 py-3">
                          Conversion-ready sections and CTA placements
                        </li>
                        <li className="rounded-xl border border-[var(--border)] bg-[var(--surface2)]/60 px-4 py-3">
                          Polished visual system (spacing, type, and interaction)
                        </li>
                      </ul>



                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((project) => (
                  <motion.button
                    key={project.id}
                    whileHover={{ y: -6 }}
                    className="group text-left"
                    onClick={() => setSelectedProject(project)}
                    type="button"
                  >
                    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface2)]/50">
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
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <p className="mt-2 text-sm text-[var(--muted)]">{project.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs font-medium text-blue-400">Click to view</span>
                          <span className="text-xs text-[var(--muted2)]">→</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </FadeSection>


        <FadeSection className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading eyebrow="Why Hexly" title="Precision-driven design and development" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

            {reasons.map((reason) => (
              <motion.div
                key={reason}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)]/50 px-5 py-7 text-sm"
              >

                <span className="mb-3 block h-1 w-10 rounded-full bg-blue-500/70" />
                {reason}
              </motion.div>
            ))}
          </div>
        </FadeSection>

        <FadeSection id="about" className="border-y border-[var(--border)] bg-[var(--surface2)] py-20">

          <div className="mx-auto max-w-3xl px-6 text-center">
            <SectionHeading eyebrow="About" title="Studio profile" />
            <p className="text-lg leading-relaxed text-[var(--muted)]">

              Hexly is a web development and graphic design studio focused on creating modern, functional, and professionally designed digital solutions. <br></br><br />We help businesses, startups, freelancers, and creatives build a strong and consistent online presence through clean design, thoughtful user experience, and performance‑driven development.
<br /><br />Our services range from business websites and high‑converting landing pages to portfolio websites, logo design, branding, and social media design assets. Every project at Hexly is crafted with attention to detail, usability, and visual clarity.
<br /><br />At Hexly, we believe great design is not just about looking good, it’s about solving problems, building trust, and helping brands grow. Our goal is to deliver digital experiences that are simple, effective, and aligned with your brand identity.
            </p>
          </div>
        </FadeSection>

        <FadeSection id="contact" className="mx-auto max-w-4xl px-6 py-24">

          <SectionHeading eyebrow="Contact" title="Start your next project" />
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface2)]/60 p-7 shadow-xl shadow-black/20 backdrop-blur-md md:p-10"
          >

            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm text-[var(--muted)]">
                Name

                <input
                  type="text"
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-blue-500/70"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm text-[var(--muted)]">

                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-blue-500/70"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-5 block text-sm text-[var(--muted)]">

              Message
              <textarea
                name="message"
                rows="5"
                required
                className="mt-2 w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-blue-500/70"

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
            <div className="mt-8 flex flex-col items-center gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:justify-between">

              <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
                <p className="text-xs uppercase tracking-wider text-[var(--muted2)]">Email</p>

                <a href="mailto:hexly.studio11@gmail.com" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                  hexly.studio11@gmail.com
                </a>
              </div>
              <div className="flex flex-col items-center gap-1 text-center sm:items-end sm:text-right">
                <p className="text-xs uppercase tracking-wider text-[var(--muted2)]">Phone</p>

                <a href="tel:+923144661056" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                  +92 314 466 10 56
                </a>
              </div>
            </div>
          </form>
        </FadeSection>
      </main>

      <footer className="border-t border-[var(--border)] py-9">

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-[var(--muted2)] md:flex-row">

          <p className="font-semibold tracking-[0.2em] text-[var(--text)]">HEXLY</p>
          <div className="flex items-center gap-6">
            <a href="#services" className="text-[var(--muted2)] hover:text-blue-500">
              Services
            </a>
            <a href="#portfolio" className="text-[var(--muted2)] hover:text-blue-500">
              Portfolio
            </a>
            <a href="#contact" className="text-[var(--muted2)] hover:text-blue-500">
              Contact
            </a>
          </div>
        </div>
      </footer>
      
    </div>
  )
}

export default App
