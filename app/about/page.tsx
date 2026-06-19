"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { IconType } from "react-icons";
import { BsStarFill } from "react-icons/bs";
import { FiCheckCircle, FiHome, FiTrendingUp, FiUsers } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

type WhyCard = { icon: IconType; title: string; description: string };
type CommitmentCard = { icon: IconType; title: string; description: string };
type Stat = { value: string; label: string };
type Testimonial = {
  initial: string;
  name: string;
  role: string;
  quote: string;
};

const whyChooseCards: WhyCard[] = [
  {
    icon: FiCheckCircle,
    title: "Integrity You Can Trust",
    description:
      "Every interaction at REM is built on honesty, transparency, and ethical standards. You can count on us to always act in your best interest — no hidden costs, no false promises.",
  },
  {
    icon: FiTrendingUp,
    title: "Expert Guidance",
    description:
      "Our experienced team brings you insights that go beyond listings — from market trends to investment strategies, we help you make informed decisions with confidence.",
  },
  {
    icon: FiUsers,
    title: "Seamless Experience",
    description:
      "Whether buying, selling, or renting, we ensure every process is smooth, efficient, and stress-free. From consultation to closing, we're with you every step of the way.",
  },
];

const commitmentCards: CommitmentCard[] = [
  {
    icon: FiUsers,
    title: "Unmatched Market Expertise",
    description:
      "With years of hands-on experience and local knowledge, our experts understand market trends and pricing dynamics — empowering you to make informed, confident property decisions.",
  },
  {
    icon: FiHome,
    title: "Customer-Centric Service",
    description:
      "We put you first — always. Every conversation, showing, and deal is handled with the utmost professionalism, empathy, and respect for your unique goals.",
  },
  {
    icon: FiCheckCircle,
    title: "Transparency & Trust",
    description:
      "At REM, honesty isn't just a policy — it's our foundation. From pricing to paperwork, you'll always know where you stand with us.",
  },
  {
    icon: FiTrendingUp,
    title: "Modern Tools, Human Touch",
    description:
      "We combine cutting-edge real estate technology with genuine personal service. Our digital platforms make things easy — our people make it meaningful.",
  },
  {
    icon: FiUsers,
    title: "End-to-End Support",
    description:
      "From your first inquiry to final closing, we walk with you every step of the way — offering guidance, documentation assistance, and reliable after-sale support.",
  },
  {
    icon: FiCheckCircle,
    title: "Proven Track Record",
    description:
      "Our growing list of satisfied clients speaks for itself. We've successfully helped families, investors, and developers achieve their dreams with confidence.",
  },
];

const stats: Stat[] = [
  { value: "500+", label: "Happy Clients" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "250M+", label: "Properties Sold" },
];

const testimonials: Testimonial[] = [
  {
    initial: "S",
    name: "Sarah Johnson",
    role: "First-time Home Buyer",
    quote:
      "REM made our first home buying experience seamless. Their expertise and patience guided us through every step.",
  },
  {
    initial: "M",
    name: "Michael Chen",
    role: "Real Estate Investor",
    quote:
      "As an investor, I appreciate REM's market insights and transparency. They've helped me build a profitable portfolio.",
  },
  {
    initial: "T",
    name: "The Williams Family",
    role: "Home Sellers",
    quote:
      "The team at REM went above and beyond to sell our family home quickly and at a great price. Highly recommended!",
  },
];

export default function About() {
  return (
    <main className="w-full overflow-hidden">
      {/* Who We Are */}
      <section className="bg-amber-400 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-6">
            Who We Are
          </h1>
          <p className="text-stone-800/80 leading-relaxed mb-4">
            At REM (Real Estate Management), we are more than a real estate
            company — we are your trusted partner in finding, investing, and
            living in the spaces that define your lifestyle. With years of
            expertise and a deep understanding of the market, we bring clarity,
            trust, and innovation to every transaction.
          </p>
          <p className="text-stone-800/80 leading-relaxed">
            Our mission is simple — to make real estate accessible, transparent,
            and rewarding for everyone. From first-time buyers to seasoned
            investors, we are dedicated to delivering seamless experiences and
            long-lasting value through integrity, professionalism, and a passion
            for excellence.
          </p>
        </motion.div>
      </section>

      {/* Why Choose REM */}
      <section className="bg-amber-50 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-3">
              Why Choose REM
            </h2>
            <p className="text-stone-500 text-sm">
              Discover what makes us stand out in a crowded industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-amber-100/70 rounded-2xl p-7"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center mb-5">
                  <card.icon size={22} className="text-amber-600" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment to Excellence */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-3">
              Our Commitment to Excellence
            </h2>
            <p className="text-stone-500 text-sm">
              We combine expertise with empathy to deliver exceptional real
              estate experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commitmentCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{
                  duration: 0.5,
                  delay: (i % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border border-stone-200 rounded-xl p-6"
              >
                <card.icon size={24} className="text-amber-500 mb-4" />
                <h3 className="font-semibold text-stone-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact in Numbers */}
      <section className="bg-amber-400 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-stone-800/70 text-sm mb-12">
            Real results that speak to our dedication and expertise.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
              <div
                  className="text-3xl sm:text-4xl font-bold text-white mb-1"
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-stone-800/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* What Our Clients Say */}
      <section className="bg-amber-50 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-3">
              What Our Clients Say
            </h2>
            <p className="text-stone-500 text-sm">
              Hear from those who have experienced the REM difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <BsStarFill
                      key={idx}
                      size={13}
                      className="text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-semibold text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-stone-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-stone-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-400 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-4 leading-snug">
            REM isn&apos;t just about property — it&apos;s about people,
            possibilities, and prosperity.
          </h2>
          <p className="text-stone-800/80 mb-8">
            When you choose us, you&apos;re choosing peace of mind and a partner
            committed to your success.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center text-sm font-semibold text-amber-300 bg-stone-900 hover:bg-stone-800 transition-colors duration-150 px-6 py-3 rounded-lg cursor-pointer"
            >
              Get Started Today
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-sm font-semibold text-stone-900 border border-stone-900 hover:bg-stone-900/5 transition-colors duration-150 px-6 py-3 rounded-lg cursor-pointer"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
