/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'motion/react';
import {
  ArrowRight,
  Users,
  Video,
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  TrendingUp,
  Target,
  Instagram,
  Linkedin,
  Twitter,
  Menu,
  X,
  Calendar,
  Clock,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Quote,
  MessageSquare
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { analytics } from './services/analyticsService';

const JOURNAL_POSTS = [
  {
    id: 'nollywood-future',
    title: 'The Future of African Storytelling',
    category: 'Industry Insights',
    date: 'May 12, 2026',
    readTime: '6 min read',
    excerpt: 'As global interest in African narratives peaks, we explore how Nigerian creatives are redefining cinema for a world stage.',
    content: `
      Nollywood is no longer just a local phenomenon. It is a global powerhouse of creativity, resilience, and unique storytelling. In the last five years, we've seen a massive shift from quantity to quality, with Nigerian productions finding homes on major global streaming platforms and entering international film festivals.

      At Altior, we believe the next phase of this evolution is 'Narrative Sovereignty'—the ability of African creators to tell their own stories on their own terms, backed by world-class production values and strategic career management.

      The rise of "New Nollywood" has been characterized by a more tech-savvy generation of filmmakers who prioritize cinematography, sound design, and complex character development. This shift is not just about aesthetics; it's about making our stories universally resonant while maintaining their cultural DNA.
    `,
    image: '/assets/news1.jpg'
  },
  {
    id: 'lagos-lights',
    title: 'Inside the Lagos Lights Campaign',
    category: 'Featured Projects',
    date: 'April 28, 2026',
    readTime: '4 min read',
    excerpt: 'A behind-the-scenes look at our recent collaboration with luxury brand Aurora, blending traditional motifs with modern aesthetics.',
    content: `
      The "Lagos Lights" campaign was born from a desire to showcase the vibrant, nocturnal energy of Lagos. Working with the team at Aurora, we aimed to create a visual language that felt both ancestral and futuristic.

      Our production team spent three weeks scouting locations across the city, from the historic streets of Lagos Island to the neon-drenched skylines of Victoria Island. The result is a series of commercials that aren't just advertisements, but short-form cinematic experiences.

      The challenges were numerous—managing light in high-density areas, coordinating large casts in public spaces—but the synergy between our talent and production crew delivered a campaign that is already being hailed as a benchmark for creative advertising in the region.
    `,
    image: '/assets/news2.jpg'
  },
  {
    id: 'new-talent',
    title: 'Shaping the Next Wave: New Talent Signings',
    category: 'Company Updates',
    date: 'April 15, 2026',
    readTime: '3 min read',
    excerpt: 'Welcoming the newest visionaries to the Altior roster. Discover the fresh faces ready to make an impact.',
    content: `
      We are thrilled to announce the signing of three incredible new talents to the Altior family. Each brings a unique voice and a relentless drive for excellence.

      - **Elena K.**: A multidisciplinary artist blending spoken word with visual performance.
      - **Marcus D.**: A rising lead actor with a background in classical theater and a penchant for gritty, emotional roles.
      - **Sola V.**: A visual storyteller whose cinematography has already caught the eye of international indie filmmakers.

      At Altior, we don't just represent talent; we curate careers. Our onboarding process for these new signings involves a deep-dive career strategy, brand positioning, and immediate integration into our network of production partners.
    `,
    image: '/assets/news3.jpg'
  }
];

const SERVICES = [
  {
    id: 'talent',
    icon: <Users className="w-8 h-8" />,
    title: 'Talent Management',
    description: 'We represent and develop actors and creative talents, guiding their careers strategically.',
    tasks: ['Talent representation', 'Career strategy & development', 'Contract negotiation', 'Talent placement & casting', 'Brand partnerships'],
    image: '/assets/service-talent.jpg' // Black model portrait
  },
  {
    id: 'creative',
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Creative & Advertising',
    description: 'Full-scale creative solutions for brands, companies, and organizations.',
    tasks: ['Creative concept development', 'Advertising campaign strategy', 'Scriptwriting and storytelling', 'Brand identity and messaging'],
    image: '/assets/news3.jpg' // Diverse team collab
  },
  {
    id: 'production',
    icon: <Video className="w-8 h-8" />,
    title: 'Production Services',
    description: 'Complete production process from concept to delivery.',
    tasks: ['Commercial and advertisement production', 'Video production (digital & broadcast)', 'Casting and talent sourcing', 'Directing and cinematography', 'Post-production'],
    image: '/assets/news2.jpg' // Film set
  }
];

const VALUES = [
  { rank: '01', title: 'Excellence', desc: 'Committed to work at the highest standard.', icon: <Award /> },
  { rank: '02', title: 'Creativity', desc: 'Pushing boundaries and embracing originality.', icon: <Zap /> },
  { rank: '03', title: 'Integrity', desc: 'Operating with transparency and professional accountability.', icon: <ShieldCheck /> },
  { rank: '04', title: 'Growth', desc: 'Dedicated to continuous learning and innovation.', icon: <TrendingUp /> },
  { rank: '05', title: 'Impact', desc: 'Meaningful and lasting impressions through our work.', icon: <Target /> }
];

const TALENTS = [
  {
    name: "Stephnora Boniface",
    role: "Seasoned Actress & Creative Leader",
    bio: "A seasoned actress with over a decade of experience across performance, production, and creative leadership, she brings depth, precision, and commanding presence to every role. Naturally versatile, she seamlessly embodies characters ranging from strong maternal figures to complex modern women, delivering performances that are both authentic and compelling.",
    extra: "Beyond acting, her background as a producer and entrepreneur gives her a unique understanding of storytelling, execution, and on-set excellence.",
    careerDetails: "Throughout her illustrious career, Stephnora has headlined major Nollywood blockbusters and received critical acclaim for her nuanced portrayals. She has worked with top-tier directors and has been instrumental in the strategic development of numerous rising stars through the Altior network. Her expertise extends into film financing and distribution logistics, making her a true powerhouse in the industry.",
    image: "/assets/steph.jpg"
  },
  {
    name: "Charisma Dauda",
    role: "Dynamic Performer & Afrocentric Icon",
    bio: "A striking and dynamic performer with a distinct Afrocentric presence, she is known for her emotional depth and transformative range. Her strength lies in bringing to life stories rooted in African identity, culture, and lived realities, delivering performances that are both powerful and deeply resonant.",
    extra: "With a natural ability to adapt across roles, she continues to stand out as a bold and authentic voice in contemporary storytelling.",
    careerDetails: "Charisma's stage presence has captivated audiences across international film festivals. She is a dedicated advocate for Afro-centric narratives and has collaborated with global fashion houses to bridge the gap between cinema and high-fashion aesthetics. Her training in traditional African dance and contemporary theatre allows her to bring a unique physical language to her cinematic performances.",
    image: "/assets/char.jpg"
  }
];

const LEADERSHIP = [
  {
    name: "Mina Precy Macdonald",
    role: "Founder & Creative Director",
    bio: "A visionary leader with a decade of experience in Nollywood, guiding the agency's artistic direction and strategic growth. Her passion for authentic storytelling drives Altior's creative excellence.",
    image: "/assets/ceo.jpg"
  },
  {
    name: "Gideon Stephen",
    role: "Co-Founder & Head of Strategy",
    bio: "The architect behind Altior's market positioning and talent development frameworks. Gideon bridges the gap between artistic vision and commercial viability.",
    image: "/assets/cof.jpg"
  },
  {
    name: "Lollipop Gideon",
    role: "Head of Operations",
    bio: "Ensures seamless execution across complex productions and talent placements. Lollipop manages the heartbeat of Altior's daily rhythm with precision.",
    image: "/assets/coo.jpg"
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Altior doesn't just manage talent; they nurture vision. Their approach to storytelling is unparalleled in the global creative scape, blending cultural depth with modern execution.",
    name: "Kingsley S.",
    title: "Production Head",
    company: "Mstudios Africa",
    image: "/assets/emeka.jpg"
  },
  {
    id: 2,
    quote: "Working with the Altior team on our flagship campaign was a masterclass in strategy. They didn't just deliver a video; they built a movement around our brand's core values.",
    name: "Shalom Ernest",
    title: "Founder",
    company: "youth making impact foundation",
    image: "/assets/shalom.jpg"
  },
  {
    id: 3,
    quote: "The integrity and excellence Altior brings to talent management is refreshing. They truly advocate for the artist while maintaining a razor-sharp commercial focus.",
    name: "David E.",
    title: "Creative Lead",
    company: "Impact Studio",
    image: "/assets/talent8.jpg"
  }
];

const SectionHeader = ({ title, subtitle, number }: { title: string, subtitle?: string, number?: string }) => (
  <div className="mb-20">
    <div className="flex items-center gap-4 mb-4">
      {number && <span className="font-display text-brand-gold text-lg tracking-widest">{number}</span>}
      <div className="h-[1px] w-12 bg-brand-gold/30" />
      {subtitle && <span className="uppercase tracking-[0.3em] text-xs text-white/50">{subtitle}</span>}
    </div>
    <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight uppercase tracking-tight">
      {title}
    </h2>
  </div>
);

const StickyFooterNav = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ y: 100, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        exit={{ y: 100, opacity: 0, x: '-50%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-2xl"
      >
        <div className="bg-brand-black/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full px-4 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="hidden sm:flex items-center gap-3 pl-4">
            <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
            <span className="font-display font-black text-xs uppercase tracking-tighter">Altior Creatives</span>
          </div>

          <div className="flex gap-4 md:gap-8 items-center md:px-8 md:border-x border-white/10 px-2">
            {[
              { name: 'About', href: '#about' },
              { name: 'Talents', href: '#talents' },
              { name: 'Services', href: '#services' },
              { name: 'Journal', href: '#journal' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => analytics.trackEvent('sticky_nav_click', { section: item.name })}
                className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 hover:text-brand-gold transition-colors whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => analytics.trackEvent('sticky_nav_contact_click')}
            className="group bg-brand-gold text-black px-5 py-2.5 rounded-xl md:rounded-full text-[9px] uppercase tracking-widest font-black flex items-center gap-2 hover:bg-white transition-all duration-300"
          >
            <span className="hidden xs:inline">Contact Us</span>
            <MessageSquare size={12} className="group-hover:rotate-12 transition-transform" />
          </a>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const TestimonialSlider = ({ testimonials }: { testimonials: typeof TESTIMONIALS }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    analytics.trackEvent('testimonial_nav', { direction: 'next' });
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    analytics.trackEvent('testimonial_nav', { direction: 'prev' });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4
      }
    })
  };

  return (
    <div className="relative">
      <div className="min-h-[400px] flex items-center relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <div className="grid lg:grid-cols-[1fr_400px] gap-20 items-center">
              <div className="space-y-12">
                <div className="text-brand-gold">
                  <Quote size={60} strokeWidth={1} />
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-medium leading-tight">
                  "{testimonials[current].quote}"
                </h3>
                <div className="flex items-center gap-6">
                  <div className="h-[1px] w-12 bg-brand-gold/30" />
                  <div className="space-y-1">
                    <p className="font-display font-black uppercase tracking-widest text-lg">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold">
                      {testimonials[current].title} — <span className="text-brand-gold/80">{testimonials[current].company}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative aspect-square hidden lg:block">
                <div className="absolute inset-0 border border-brand-gold/20 translate-x-4 -translate-y-4" />
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-full h-full object-cover grayscale brightness-75"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-16 flex items-center justify-between">
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#D4AF37', color: '#000' }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="w-14 h-14 border border-white/10 flex items-center justify-center rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#D4AF37', color: '#000' }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="w-14 h-14 border border-white/10 flex items-center justify-center rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
                analytics.trackEvent('testimonial_dot_click', { index: i });
              }}
              className={`h-1 transition-all duration-500 rounded-full ${i === current ? 'w-12 bg-brand-gold' : 'w-4 bg-white/10 hover:bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof JOURNAL_POSTS[0] | null>(null);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [expandedTalent, setExpandedTalent] = useState<number | null>(null);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', interest: 'Talent Management', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '77abad32-cd80-460a-983d-e2d4858f9ef1',
          to: 'booking@altiorcreatives.com',
          subject: `New Inquiry: ${formData.interest} from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          interest: formData.interest,
          message: formData.message || '(no message provided)',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', interest: 'Talent Management', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Split text for staggered animations
  const tagline = "Elevating talent and delivering high-impact visual experiences at the intersection of creativity and strategy.";
  const titleText = "Shaping Narratives.";

  const containerRef = useRef(null);

  useEffect(() => {
    analytics.trackPageView();
  }, []);

  // Lock scroll when post is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedPost]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Show only when scrolled past 25% of the page
    if (latest > 0.25) {
      setShowStickyNav(true);
    } else {
      setShowStickyNav(false);
    }
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative bg-brand-black min-h-screen selection:bg-brand-gold selection:text-black font-sans overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center bg-gradient-to-b from-brand-black/80 to-transparent backdrop-blur-sm pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <span className="font-display text-2xl font-black tracking-tighter uppercase">
            Altior<span className="text-brand-gold">Creatives.</span>
          </span>
        </motion.div>

        <div className="hidden md:flex gap-12 pointer-events-auto items-center">
          {['About', 'Talents', 'Services', 'Vision', 'Executive', 'Journal', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => analytics.trackEvent('main_nav_click', { section: item })}
              whileHover={{ scale: 1.05, color: '#D4AF37' }}
              className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 border border-brand-gold/30 text-brand-gold text-[10px] uppercase tracking-widest font-bold hover:bg-brand-gold hover:text-black transition-all duration-300"
          >
            Work With Us
          </motion.button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden pointer-events-auto text-white p-2"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['About', 'Talents', 'Services', 'Vision', 'Executive', 'Journal', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-display uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/assets/hero-bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.3] contrast-[1.2] scale-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Animated Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{
              x: mousePosition.x * 3,
              y: mousePosition.y * 3
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-gold/20 blur-[150px] rounded-full"
          />
          <motion.div
            style={{
              x: mousePosition.x * -4,
              y: mousePosition.y * -4
            }}
            animate={{
              opacity: [0.1, 0.15, 0.1],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rounded-full"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-[1px] w-8 bg-brand-gold/50" />
            <span className="text-brand-gold text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-black">
              Altior Creatives & Entertainment
            </span>
            <div className="h-[1px] w-8 bg-brand-gold/50" />
          </motion.div>

          <div className="overflow-hidden mb-12">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="text-6xl md:text-[11rem] font-display font-black leading-[0.8] uppercase tracking-tighter text-white"
            >
              <div className="flex flex-wrap justify-center gap-x-8">
                {titleText.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                    className={word.includes(".") ? "text-stroke" : ""}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <motion.p
              className="text-white/50 text-lg md:text-xl font-light leading-relaxed tracking-wide"
            >
              {tagline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.05 }}
                  className="inline-block mr-1.5"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => analytics.trackEvent('hero_cta_click', { button: 'journey' })}
              className="group relative px-10 py-5 bg-brand-gold text-black uppercase tracking-[0.2em] text-[11px] font-black flex items-center gap-4 overflow-hidden"
            >
              <span className="relative z-10">Start Your Journey</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => analytics.trackEvent('hero_cta_click', { button: 'watch_reel' })}
              className="flex items-center gap-4 text-white/50 hover:text-brand-gold text-[11px] uppercase tracking-[0.2em] font-black transition-colors"
            >
              Watch Reel <Video size={16} />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 text-white/30"
        >
          <motion.span
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[9px] uppercase tracking-[0.6em] font-semibold"
          >
            Scroll
          </motion.span>
          <div className="relative h-20 w-[1px] bg-white/5 overflow-hidden">
            <motion.div
              animate={{
                y: [-80, 80],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "circIn"
              }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-brand-gold/80 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-12 bg-brand-black overflow-hidden">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <SectionHeader
                number="01"
                subtitle="About Us"
                title="Creators at the Core."
              />
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-8 italic">
                "We are a forward-thinking creative agency and talent management company dedicated to delivering high-impact visual and brand experiences."
              </p>
              <p className="text-white/50 leading-relaxed mb-12 max-w-lg">
                Operating at the intersection of creativity and strategy, we provide end-to-end solutions across talent representation, advertising production, and brand storytelling.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-display font-bold text-brand-gold mb-2 tracking-tighter">GLOBAL</div>
                  <div className="text-xs uppercase tracking-widest text-white/40">Reach & Vision</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-brand-gold mb-2 tracking-tighter">100%</div>
                  <div className="text-xs uppercase tracking-widest text-white/40">Creative Integrity</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative aspect-[4/5] perspective-1000 group"
            >
              <div className="absolute -inset-4 border border-brand-gold/20 -z-10 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
              <img
                src="/assets/team.jpg" // Professional creative team
                className="w-full h-full object-cover brightness-75 grayscale hover:grayscale-0 transition-all duration-700"
                alt="Altior Studio"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 right-8 bg-brand-gold p-8 max-w-[200px]">
                <span className="text-black font-display font-black text-xs uppercase tracking-widest">
                  Nigeria's Leading Talent Powerhouse
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Talents Section */}
      <section id="talents" className="py-32 px-6 md:px-12 relative overflow-hidden bg-brand-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeader
              number="02"
              subtitle="The Roster"
              title="Exceptional Talent."
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {TALENTS.map((talent, idx) => (
              <motion.div
                key={talent.name}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1,
                  delay: idx * 0.1,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                className="flex flex-col gap-8 group cursor-pointer"
                onClick={() => {
                  const newState = expandedTalent === idx ? null : idx;
                  setExpandedTalent(newState);
                  analytics.trackEvent('talent_card_click', { talent: talent.name, expanded: newState !== null });
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                  <motion.img
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={talent.image}
                    alt={talent.name}
                    className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <h3 className="text-3xl font-display font-black uppercase tracking-tight text-white mb-2">{talent.name}</h3>
                      <p className="text-brand-gold text-xs uppercase tracking-widest font-bold">{talent.role}</p>
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="text-lg text-white/80 leading-relaxed font-light"
                  >
                    {talent.bio}
                  </motion.p>

                  <motion.div
                    initial={false}
                    animate={{ height: expandedTalent === idx ? 'auto' : 0, opacity: expandedTalent === idx ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-6 space-y-4 border-t border-white/5">
                      <p className="text-white/60 text-sm leading-relaxed">
                        {talent.careerDetails}
                      </p>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="text-sm text-white/50 leading-relaxed italic border-l-2 border-brand-gold/30 pl-6"
                  >
                    {talent.extra}
                  </motion.p>

                  <div className="flex items-center gap-6">
                    <motion.button
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                      whileHover={{ x: 10 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        analytics.trackEvent('talent_portfolio_click', { talent: talent.name });
                      }}
                      className="flex items-center gap-4 text-brand-gold text-[10px] uppercase tracking-widest font-black"
                    >
                      View Full Portfolio <ArrowRight size={14} />
                    </motion.button>

                    <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-widest font-bold">
                      {expandedTalent === idx ? (
                        <>Collapse <ChevronUp size={14} /></>
                      ) : (
                        <>Read Biography <ChevronDown size={14} /></>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 px-6 md:px-12 bg-brand-gray/30">
        <div className="container mx-auto">
          <SectionHeader
            number="03"
            subtitle="Our Services"
            title="Comprehensive Solutions."
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="group relative bg-brand-black border border-white/5 hover:border-brand-gold/30 transition-all duration-500 overflow-hidden"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover brightness-50 group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent" />
                  <div className="absolute top-6 left-6 p-4 bg-brand-gold text-black rounded-sm shadow-xl transform -rotate-12 group-hover:rotate-3 group-hover:scale-110 transition-transform duration-500 ease-out">
                    {service.icon}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tight group-hover:text-brand-gold transition-colors">{service.title}</h3>
                  <p className="text-white/40 mb-6 text-sm leading-relaxed">{service.description}</p>

                  <div className="space-y-3">
                    {service.tasks.map((task, tidx) => (
                      <div
                        key={tidx}
                        className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/60 cursor-pointer hover:text-brand-gold transition-colors"
                        onClick={() => analytics.trackEvent('service_task_click', { service: service.title, task })}
                      >
                        <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                        {task}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-32 px-6 md:px-12 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 blur-[120px] -z-10" />
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <SectionHeader
              number="04"
              subtitle="The Blueprint"
              title="Vision & Mission."
            />

            <div className="grid md:grid-cols-2 gap-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h4 className="text-brand-gold uppercase tracking-[0.3em] font-black text-sm">Vision</h4>
                <p className="text-3xl font-display leading-[1.2] font-medium italic">
                  "To become a leading creative and talent powerhouse, recognized globally for excellence in storytelling and brand impact."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h4 className="text-brand-gold uppercase tracking-[0.3em] font-black text-sm">Mission</h4>
                <ul className="space-y-4">
                  {[
                    "Discover, develop, and manage exceptional talent",
                    "Create compelling visual and brand-driven content",
                    "Deliver innovative creative solutions for modern businesses",
                    "Build a platform where creativity meets opportunity"
                  ].map((m, i) => (
                    <li key={i} className="flex items-start gap-4 text-white/70">
                      <ArrowRight className="w-5 h-5 text-brand-gold flex-shrink-0 mt-1" />
                      <span className="font-light">{m}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Leadership Section */}
      <section id="executive" className="py-32 px-6 md:px-12 bg-brand-gray/20">
        <div className="container mx-auto">
          <SectionHeader
            number="05"
            subtitle="Executive Team"
            title="The Visionaries."
          />

          <div className="grid md:grid-cols-3 gap-12">
            {LEADERSHIP.map((leader, idx) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group p-8 border border-white/5 bg-brand-black/40 backdrop-blur-sm hover:border-brand-gold/30 transition-all duration-500"
              >
                <div className="aspect-square mb-8 overflow-hidden bg-brand-gray">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:text-brand-gold transition-colors">
                    {leader.name}
                  </h3>
                  <div className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em]">
                    {leader.role}
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values - Horizontal Scroll feel */}
      <section className="py-32 bg-brand-black border-y border-white/5">
        <div className="px-6 md:px-12 mb-16">
          <SectionHeader
            number="06"
            subtitle="The DNA"
            title="Core Values."
          />
        </div>

        <div className="flex gap-4 px-6 md:px-12 overflow-x-auto no-scrollbar pb-12">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-80 bg-brand-gray p-10 border border-white/5 hover:bg-brand-gold group transition-all duration-500"
            >
              <div className="text-6xl font-display font-black text-white/5 group-hover:text-black/10 transition-colors mb-4">{v.rank}</div>
              <div className="w-12 h-12 bg-brand-gold/10 group-hover:bg-black/10 flex items-center justify-center p-3 mb-6 transition-colors">
                {v.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 uppercase group-hover:text-black transition-colors">{v.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed group-hover:text-black/60 transition-colors">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section id="testimonials" className="py-32 px-6 md:px-12 bg-brand-gray/10 relative overflow-hidden">
        <div className="container mx-auto">
          <SectionHeader
            number="07"
            subtitle="Voices"
            title="What they say."
          />

          <TestimonialSlider testimonials={TESTIMONIALS} />
        </div>

        {/* Decorative Quote Mark */}
        <div className="absolute top-20 right-20 text-white/5 pointer-events-none hidden lg:block">
          <Quote size={400} strokeWidth={0.5} />
        </div>
      </section>

      {/* Journal Section */}
      <section id="journal" className="py-32 px-6 md:px-12 bg-brand-black overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <SectionHeader
              number="08"
              subtitle="Inside Altior"
              title="The Journal."
            />
            <motion.button
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-brand-gold text-[10px] uppercase tracking-widest font-black mb-20 md:mb-0"
            >
              View All Insights <ChevronRight size={14} />
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {JOURNAL_POSTS.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden mb-8">
                  <div className="absolute inset-0 bg-brand-gold/20 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-brand-black/80 backdrop-blur-md text-[8px] uppercase tracking-widest text-brand-gold font-bold border border-brand-gold/20">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-white/40">
                    <span className="flex items-center gap-1.5"><Calendar size={10} /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={10} /> {post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-display font-medium leading-tight group-hover:text-brand-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-brand-gold font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    Read Story <ArrowRight size={12} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-brand-black/95 backdrop-blur-xl"
            />

            <motion.div
              layoutId={selectedPost.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-5xl max-h-full bg-brand-gray border border-white/10 overflow-y-auto no-scrollbar shadow-2xl"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-8 right-8 z-50 p-4 bg-brand-black/50 hover:bg-brand-gold hover:text-black rounded-full transition-all text-white"
              >
                <X size={20} />
              </button>

              <div className="aspect-[21/9] w-full overflow-hidden">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover brightness-75"
                />
              </div>

              <div className="p-8 md:p-20">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-8">
                    <span>{selectedPost.category}</span>
                    <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                    <span className="text-white/40">{selectedPost.date}</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-display font-black leading-tight uppercase tracking-tighter mb-12">
                    {selectedPost.title}
                  </h2>

                  <div className="text-white/60 text-lg md:text-xl font-light leading-relaxed space-y-8 whitespace-pre-line">
                    {selectedPost.content}
                  </div>

                  <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center font-display font-black text-black">A.</div>
                      <div>
                        <div className="text-xs uppercase tracking-widest font-black">Altior Editorial</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">May 2026</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4">
                      <button className="px-8 py-3 bg-brand-gold text-black uppercase tracking-widest font-black text-[10px] hover:bg-white transition-colors w-full md:w-auto">
                        Share Insight
                      </button>
                      <div className="flex gap-6 items-center">
                        <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold">Share on:</span>
                        <motion.a
                          href="#"
                          whileHover={{ scale: 1.2, color: '#D4AF37' }}
                          className="text-white/40 transition-colors"
                          aria-label="Share on X (Twitter)"
                        >
                          <Twitter size={14} />
                        </motion.a>
                        <motion.a
                          href="#"
                          whileHover={{ scale: 1.2, color: '#D4AF37' }}
                          className="text-white/40 transition-colors"
                          aria-label="Share on LinkedIn"
                        >
                          <Linkedin size={14} />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / CTA */}
      <footer id="contact" className="pt-32 pb-12 px-6 md:px-12 bg-brand-black border-t border-white/5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
            <div className="max-w-xl">
              <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter mb-12"> Ready for <span className="text-brand-gold italic">Impact?</span></h2>
              <p className="text-white/50 text-xl font-light mb-12">
                We're always looking for exceptional talent and strategic partners. Let's create something meaningful together.
              </p>

              <div className="flex gap-8 items-center">
                <a href="#" className="p-4 rounded-full border border-white/10 hover:border-brand-gold hover:text-brand-gold transition-all"><Instagram size={20} /></a>
                <a href="#" className="p-4 rounded-full border border-white/10 hover:border-brand-gold hover:text-brand-gold transition-all"><Linkedin size={20} /></a>
                <a href="#" className="p-4 rounded-full border border-white/10 hover:border-brand-gold hover:text-brand-gold transition-all"><Twitter size={20} /></a>
              </div>
            </div>

            <div className="w-full md:w-96 p-10 bg-brand-gray border border-white/5">
              <h3 className="text-xl font-display font-bold uppercase mb-8 tracking-widest text-brand-gold">Inquire</h3>

              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-white font-display font-bold uppercase tracking-widest mb-2">Message Sent!</p>
                  <p className="text-white/40 text-xs">We'll be in touch at <span className="text-brand-gold">booking@altiorcreatives.com</span></p>
                  <button onClick={() => setFormStatus('idle')} className="mt-8 text-[10px] uppercase tracking-widest text-white/30 hover:text-brand-gold transition-colors">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-2">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Your full name"
                      className="w-full bg-transparent border-b border-white/20 focus:border-brand-gold outline-none py-2 transition-colors placeholder:text-white/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-2">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="your@email.com"
                      className="w-full bg-transparent border-b border-white/20 focus:border-brand-gold outline-none py-2 transition-colors placeholder:text-white/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-2">Interest</label>
                    <select
                      id="contact-interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleFormChange}
                      className="w-full bg-brand-gray border-b border-white/20 focus:border-brand-gold outline-none py-2 transition-colors appearance-none text-sm cursor-pointer"
                    >
                      <option className="bg-brand-gray">Talent Management</option>
                      <option className="bg-brand-gray">Creative / Advertising</option>
                      <option className="bg-brand-gray">Production Services</option>
                      <option className="bg-brand-gray">Partnership</option>
                      <option className="bg-brand-gray">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-2">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Tell us about your project or inquiry..."
                      className="w-full bg-transparent border-b border-white/20 focus:border-brand-gold outline-none py-2 transition-colors placeholder:text-white/20 text-sm resize-none"
                    />
                  </div>

                  {formStatus === 'error' && (
                    <p className="text-red-400 text-[10px] uppercase tracking-widest">Something went wrong. Please try again.</p>
                  )}

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-4 bg-brand-gold text-black uppercase tracking-widest font-black text-xs hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {formStatus === 'loading' ? (
                      <><span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Sending...</>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
            <div className="font-display text-lg font-black tracking-tighter uppercase">
              Altior<span className="text-brand-gold">.</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              © 2026 Altior Creatives & Entertainment. Built for Nigeria. Driven Globally.
            </div>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Footer Navigation */}
      <StickyFooterNav isVisible={showStickyNav} />
    </div>
  );
}
