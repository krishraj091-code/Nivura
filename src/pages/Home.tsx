import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Globe, CheckCircle2, ChevronDown } from "lucide-react";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useData } from "@/src/hooks/useData";
import { useState } from "react";

export function Home() {
  const { data, loading } = useData();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const content = data?.content || {};
  const services = data?.services || [];
  const benefits = data?.benefits || [];
  const faqs = data?.faqs || [];

  const icons = [TrendingUp, Globe, Shield]; // Fallback icons

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase">Senior Level Advisory</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-4xl leading-[1.1]"
          >
            {content.heroTitle || "Execution When It Matters Most."}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-8 text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed"
          >
            {content.heroSubtitle || "Strategic financial consulting and operational architecture for high-growth businesses."}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/schedule"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-accent-foreground transition-all hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-xl shadow-accent/20"
            >
              Schedule a Consultation
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-8 py-4 text-base font-medium transition-all hover:bg-black/5 dark:hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              Meet the Founder
            </Link>
          </motion.div>
        </section>

        {/* Services Section */}
        {services.length > 0 && (
          <section id="services" className="py-20 border-t border-border/50">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Core Services</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">Comprehensive financial and operational leadership for your business.</p>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {}
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {services.map((service: any, index: number) => {
                const Icon = icons[index % icons.length];
                return (
                  <motion.div
                    key={service.id}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                    }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <GlassCard hoverEffect className="h-full">
                      <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-foreground">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {service.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        )}

        {/* Benefits Section */}
        {benefits.length > 0 && (
          <section id="benefits" className="py-20 border-t border-border/50">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Add-on Benefits</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">Specific, high-impact deliverables available on demand.</p>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {}
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {benefits.map((benefit: any, index: number) => (
                <motion.div
                  key={benefit.id}
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
                  }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <GlassCard hoverEffect className="h-full flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-foreground">
                          <CheckCircle2 size={20} />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">{benefit.price}</div>
                          {benefit.basePrice && benefit.basePrice !== "$0" && (
                            <div className="text-sm text-foreground/50 line-through">{benefit.basePrice}</div>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section id="faq" className="py-20 border-t border-border/50">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">Common queries about our engagement and processes.</p>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {}
              }}
              className="max-w-3xl mx-auto space-y-4"
            >
              {faqs.map((faq: any, index: number) => (
                <motion.div
                  key={faq.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                  }}
                >
                  <GlassCard className="p-0 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="font-semibold text-lg pr-8">{faq.question}</span>
                      <ChevronDown
                        size={20}
                        className={`text-foreground/50 transition-transform duration-300 flex-shrink-0 ${
                          openFaq === faq.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: openFaq === faq.id ? "auto" : 0, opacity: openFaq === faq.id ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-foreground/70 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

      </div>
    </div>
  );
}
