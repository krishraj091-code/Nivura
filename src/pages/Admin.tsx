import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { Button } from "@/src/components/ui/Button";
import { Plus, Trash2, Save, Image as ImageIcon, Lock } from "lucide-react";
import { useData } from "@/src/hooks/useData";

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data, loading, refetch } = useData();

  const [content, setContent] = useState<any>({});
  const [benefits, setBenefits] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setContent(data.content || {});
      setBenefits(data.benefits || []);
      setServices(data.services || []);
      setFaqs(data.faqs || []);
      setContacts(data.contacts || []);
    }
  }, [data]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "manish@hike") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleSaveContent = async () => {
    setSaving(true);
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      await refetch();
      alert("Content saved successfully!");
    } catch (err) {
      alert("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBenefits = async () => {
    setSaving(true);
    try {
      await fetch("/api/benefits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(benefits)
      });
      await refetch();
      alert("Benefits saved successfully!");
    } catch (err) {
      alert("Failed to save benefits");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveServices = async () => {
    setSaving(true);
    try {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(services)
      });
      await refetch();
      alert("Services saved successfully!");
    } catch (err) {
      alert("Failed to save services");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFaqs = async () => {
    setSaving(true);
    try {
      await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqs)
      });
      await refetch();
      alert("FAQs saved successfully!");
    } catch (err) {
      alert("Failed to save FAQs");
    } finally {
      setSaving(false);
    }
  };

  const addBenefit = () => {
    setBenefits([
      ...benefits,
      {
        id: Date.now().toString(),
        title: "New Benefit",
        description: "Description here",
        price: "$0",
        basePrice: "$0"
      }
    ]);
  };

  const updateBenefit = (id: string, field: string, value: string) => {
    setBenefits(benefits.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const removeBenefit = (id: string) => {
    setBenefits(benefits.filter(b => b.id !== id));
  };

  const addService = () => {
    setServices([
      ...services,
      {
        id: Date.now().toString(),
        title: "New Service",
        description: "Description here"
      }
    ]);
  };

  const updateService = (id: string, field: string, value: string) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const addFaq = () => {
    setFaqs([
      ...faqs,
      {
        id: Date.now().toString(),
        question: "New Question",
        answer: "Answer here"
      }
    ]);
  };

  const updateFaq = (id: string, field: string, value: string) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const removeFaq = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <GlassCard className="w-full max-w-md p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold">Admin Access</h1>
            <p className="text-foreground/60 text-sm mt-2">Enter password to manage content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Password"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <Button className="w-full" type="submit">Login</Button>
          </form>
        </GlassCard>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-display text-4xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Content Management */}
          <div className="lg:col-span-2 space-y-8">
            <GlassCard>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">General Content</h2>
                <Button onClick={handleSaveContent} disabled={saving} size="sm">
                  <Save size={16} className="mr-2" /> Save Content
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hero Title</label>
                  <input
                    type="text"
                    value={content.heroTitle || ""}
                    onChange={(e) => setContent({...content, heroTitle: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hero Subtitle</label>
                  <textarea
                    value={content.heroSubtitle || ""}
                    onChange={(e) => setContent({...content, heroSubtitle: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">About Text 1</label>
                  <textarea
                    value={content.aboutText || ""}
                    onChange={(e) => setContent({...content, aboutText: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">About Text 2</label>
                  <textarea
                    value={content.aboutText2 || ""}
                    onChange={(e) => setContent({...content, aboutText2: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    rows={4}
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Benefits</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={addBenefit}
                  >
                    <Plus size={16} className="mr-2" /> Add
                  </Button>
                  <Button onClick={handleSaveBenefits} disabled={saving} size="sm">
                    <Save size={16} className="mr-2" /> Save Benefits
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={benefit.id} className="p-4 rounded-xl border border-border bg-background/30 relative">
                    <button 
                      onClick={() => removeBenefit(benefit.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                      <div>
                        <label className="text-xs font-medium text-foreground/60">Title</label>
                        <input
                          type="text"
                          value={benefit.title}
                          onChange={(e) => updateBenefit(benefit.id, "title", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-medium text-foreground/60">Price</label>
                          <input
                            type="text"
                            value={benefit.price}
                            onChange={(e) => updateBenefit(benefit.id, "price", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-foreground/60">Base Price</label>
                          <input
                            type="text"
                            value={benefit.basePrice}
                            onChange={(e) => updateBenefit(benefit.id, "basePrice", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground/60">Description</label>
                      <textarea
                        value={benefit.description}
                        onChange={(e) => updateBenefit(benefit.id, "description", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Services</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={addService}
                  >
                    <Plus size={16} className="mr-2" /> Add
                  </Button>
                  <Button onClick={handleSaveServices} disabled={saving} size="sm">
                    <Save size={16} className="mr-2" /> Save Services
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {services.map((service, index) => (
                  <div key={service.id} className="p-4 rounded-xl border border-border bg-background/30 relative">
                    <button 
                      onClick={() => removeService(service.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="mb-4 pr-8">
                      <label className="text-xs font-medium text-foreground/60">Title</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => updateService(service.id, "title", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground/60">Description</label>
                      <textarea
                        value={service.description}
                        onChange={(e) => updateService(service.id, "description", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">FAQs</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={addFaq}
                  >
                    <Plus size={16} className="mr-2" /> Add
                  </Button>
                  <Button onClick={handleSaveFaqs} disabled={saving} size="sm">
                    <Save size={16} className="mr-2" /> Save FAQs
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={faq.id} className="p-4 rounded-xl border border-border bg-background/30 relative">
                    <button 
                      onClick={() => removeFaq(faq.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="mb-4 pr-8">
                      <label className="text-xs font-medium text-foreground/60">Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground/60">Answer</label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Contact Requests */}
          <div className="lg:col-span-1">
            <GlassCard className="h-full">
              <h2 className="text-2xl font-bold mb-6">Contact Requests</h2>
              {contacts.length === 0 ? (
                <p className="text-foreground/60 text-center py-8">No requests yet.</p>
              ) : (
                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="p-4 rounded-xl border border-border bg-background/30">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <span className="text-xs text-foreground/50">
                          {new Date(contact.date).toLocaleDateString()}
                        </span>
                      </div>
                      <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline block mb-2">
                        {contact.email}
                      </a>
                      <div className="inline-block px-2 py-1 rounded bg-accent/20 text-accent-foreground text-xs font-medium mb-3">
                        {contact.topic}
                      </div>
                      <p className="text-sm text-foreground/80 bg-background/50 p-3 rounded-lg">
                        {contact.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>

        </div>
      </div>
    </div>
  );
}
