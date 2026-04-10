import { motion } from "motion/react";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useState } from "react";
import { useData } from "@/src/hooks/useData";

export function About() {
  const { data, loading } = useData();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const content = data?.content || {};

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            About the Founder
          </h1>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        {/* Profile Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <GlassCard className="prose prose-lg dark:prose-invert max-w-none p-8 md:p-12">
              <p className="text-xl leading-relaxed text-foreground/90 font-medium">
                {content.aboutText}
              </p>
              <p className="text-foreground/70 leading-relaxed mt-6">
                {content.aboutText2}
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="w-1.5 bg-primary rounded-full shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold m-0">Cross-functional Leadership</h3>
                    <p className="text-foreground/70 mt-2 text-sm">Took on legal, business development, and governance responsibilities as the business demanded. Operated across India, US and other jurisdictions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 bg-accent rounded-full shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold m-0">Multi-jurisdictional Operations</h3>
                    <p className="text-foreground/70 mt-2 text-sm">Managed entity structures, compliance, and operations across different countries.</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">Professional Journey</h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            
            <TimelineItem 
              title="Founder & Managing Partner"
              company="Nuvira Global"
              date="Feb 2026 - Present · 3 mos"
              location="Dubai, United Arab Emirates"
              summary="Nuvira Global is a professional services firm built for business leaders who need senior-level finance and strategic support, delivered with ownership, not at arm’s length."
              details="We work with founders, CEOs, and CFOs across growth and mid-market companies as an embedded extension of their leadership team. We take ownership, fix what is broken, and deliver outcomes while you stay focused on running the business. Current focus areas: Fractional & Interim CFO engagements, M&A advisory and deal execution, Corporate restructuring and turnaround, Capital strategy and fundraise support, Ad-hoc advisory for complex, time-sensitive situations. Sectors: Technology, Financial Services, Consumer, Manufacturing, Multi-industry. Markets: GCC and international."
            />

            <TimelineItem 
              title="Chief Financial Officer"
              company="Hike"
              date="Jul 2012 - Dec 2025 · 13 yrs 6 mos"
              location="Dubai, United Arab Emirates"
              summary="Joined Hike as Manager, Finance. Left as CFO. Over 13 years, I was the person the founder called when things needed to get done, regardless of whether it fell neatly under “finance.”"
              details="Finance & Operations: Built the finance function from zero. Took ownership of financial planning, reporting, treasury, compliance, and controls as the company scaled from a startup to a 100M+ user platform. Fundraising & Investor Relations: Co-led multiple fundraise cycles end to end, from investor outreach to close. Managed board reporting and investor communications throughout. M&A: Drove acquisitions and strategic transactions from sourcing through integration. Handled deal structuring, due diligence, negotiations, and post-deal execution. Business Pivot: Played a central role in Hike’s pivot from social messaging to gaming, which scaled to ~US$500M GMV. Cross-functional Leadership: Took on legal, business development, and governance responsibilities as the business demanded. Multi-jurisdictional Operations: Managed entity structures, compliance, and operations across different countries."
            />

            <TimelineItem 
              title="Manager - Finance"
              company="Tata Motors"
              date="Oct 2008 - Jun 2012 · 3 yrs 9 mos"
              location="Jamshedpur"
              summary="Part of the finance team at one of India's largest automotive manufacturers."
              details="Responsible for books closure, general ledger coordination and audit closure across business units. Worked on financial planning and projections supporting strategic decision-making. Led budgeting process for Axles & Transmissions division. Key involvement in IFRS implementation and merger execution, both of which required coordination across multiple internal teams and external advisors under tight timelines."
            />

            <TimelineItem 
              title="Financial Accountant"
              company="Logica"
              date="Mar 2007 - Sep 2008 · 1 yr 7 mos"
              location="Bengaluru, Karnataka, India"
              summary="Worked on SOX level compliances and internal controls governance for a global IT services firm (later acquired by CGI Group)."
              details="Responsible for inter company reconciliations & controls across international entities spanning multiple jurisdictions. Later was part of Corporate Finance managing books closure of holding entities and several corporate reporting & compliances. This role built the foundation for managing complex, multi-entity environments with different regulatory requirements, reporting standards, and governance structures."
            />

          </div>
        </motion.div>

      </div>
    </div>
  );
}

function TimelineItem({ title, company, date, location, summary, details }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
      }}
      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
      </div>
      
      {/* Card */}
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
        <GlassCard className="p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <div className="text-lg font-medium text-foreground/80">{company}</div>
            <div className="text-sm text-foreground/50 font-mono mt-1">{date}</div>
            <div className="text-sm text-foreground/50">{location}</div>
          </div>
          
          <p className="text-foreground/80 leading-relaxed">
            {summary}
          </p>
          
          <motion.div 
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            className="overflow-hidden"
          >
            <p className="text-foreground/70 leading-relaxed mt-4 pt-4 border-t border-border">
              {details}
            </p>
          </motion.div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            {isExpanded ? "Show Less" : "Know More"}
          </button>
        </GlassCard>
      </div>
    </motion.div>
  );
}
