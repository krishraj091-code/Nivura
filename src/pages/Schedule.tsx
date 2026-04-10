import { motion } from "motion/react";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { Button } from "@/src/components/ui/Button";
import { Calendar, Clock, Mail, User, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

export function Schedule() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Interim CFO Services",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", topic: "Interim CFO Services", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Schedule a Meeting
            </h1>
            <p className="text-lg text-foreground/70 mb-12">
              Let's discuss your financial architecture, growth challenges, and how we can support your next phase of execution.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-foreground shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Initial Consultation</h3>
                  <p className="text-foreground/60 mt-1">A 45-minute deep dive into your current operational structure and immediate needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-foreground shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Flexible Timing</h3>
                  <p className="text-foreground/60 mt-1">We accommodate multiple time zones across US, Europe, and Asia.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard>
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
                  <p className="text-foreground/70">We'll get back to you shortly to confirm the meeting time.</p>
                  <Button className="mt-8" onClick={() => setStatus("idle")}>Send Another</Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Topic of Discussion</label>
                    <select 
                      value={formData.topic}
                      onChange={e => setFormData({...formData, topic: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                    >
                      <option>Interim CFO Services</option>
                      <option>Fundraising / M&A</option>
                      <option>Financial Architecture</option>
                      <option>Add-on Benefits</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Additional Context</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Briefly describe your current challenges..."
                    />
                  </div>

                  <Button className="w-full" size="lg" disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending..." : "Request Meeting"}
                  </Button>
                  {status === "error" && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
