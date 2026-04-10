import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = path.join(process.cwd(), "db.json");

// Initialize DB
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    content: {
      heroTitle: "Execution When It Matters Most.",
      heroSubtitle: "Strategic financial consulting and operational architecture for high-growth businesses.",
      aboutText: "With over 19 years of experience across industries, including 13 years at Hike, I've operated as the person founders rely on when execution matters most.",
      aboutText2: "I joined as a Finance Manager and went on to serve as Chief Financial Officer, building and leading the finance function through every stage of growth. During that time, I built the finance organization from the ground up, co-led fundraising and M&A transactions end-to-end, supported a business pivot that scaled to ~US$500M GMV. Managed the financial and operational architecture of the transition."
    },
    benefits: [
      {
        id: "1",
        title: "Pitch Deck Making",
        description: "Comprehensive pitch deck creation including financial modeling, market sizing, and narrative structuring for Series A/B rounds.",
        price: "$5,000",
        basePrice: "$7,500"
      },
      {
        id: "2",
        title: "1-to-1 Financial Report Discussion",
        description: "Deep dive into your monthly/quarterly financials to identify operational bottlenecks and growth levers.",
        price: "$500",
        basePrice: "$800"
      }
    ],
    services: [
      {
        id: "1",
        title: "Financial Architecture",
        description: "Building robust finance organizations from the ground up to support massive scale."
      },
      {
        id: "2",
        title: "Multi-jurisdictional",
        description: "Managing complex entity structures, compliance, and operations across global markets."
      },
      {
        id: "3",
        title: "Strategic Governance",
        description: "Cross-functional leadership spanning legal, business development, and governance."
      }
    ],
    faqs: [
      {
        id: "1",
        question: "What is your typical engagement model?",
        answer: "We typically engage on a retainer basis for fractional CFO services or on a project basis for specific M&A or fundraising transactions."
      },
      {
        id: "2",
        question: "Do you work with startups?",
        answer: "Yes, we specialize in high-growth startups from Series A through pre-IPO stages."
      },
      {
        id: "3",
        question: "How do you handle multi-jurisdictional compliance?",
        answer: "With extensive experience across the US, GCC, and India, we build scalable entity structures and partner with local legal experts to ensure full compliance while optimizing tax and operational efficiency."
      },
      {
        id: "4",
        question: "Can you help us prepare for a Series B fundraise?",
        answer: "Absolutely. We manage the entire process from financial modeling and narrative structuring to investor outreach, due diligence, and deal negotiation."
      },
      {
        id: "5",
        question: "What is the difference between a Fractional CFO and an Interim CFO?",
        answer: "A Fractional CFO works with you part-time on a long-term basis to provide strategic guidance. An Interim CFO steps in full-time for a short period to bridge a leadership gap or manage a specific transition."
      }
    ],
    contacts: []
  }, null, 2));
}

const getDb = () => JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
const saveDb = (data: any) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// API Routes
app.get("/api/data", (req, res) => {
  res.json(getDb());
});

app.post("/api/content", (req, res) => {
  const db = getDb();
  db.content = { ...db.content, ...req.body };
  saveDb(db);
  res.json({ success: true });
});

app.post("/api/benefits", (req, res) => {
  const db = getDb();
  db.benefits = req.body;
  saveDb(db);
  res.json({ success: true });
});

app.post("/api/services", (req, res) => {
  const db = getDb();
  db.services = req.body;
  saveDb(db);
  res.json({ success: true });
});

app.post("/api/faqs", (req, res) => {
  const db = getDb();
  db.faqs = req.body;
  saveDb(db);
  res.json({ success: true });
});

app.post("/api/contact", (req, res) => {
  const db = getDb();
  const newContact = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    ...req.body
  };
  db.contacts.unshift(newContact); // Add to beginning
  saveDb(db);
  
  // Simulate sending email
  console.log(`\n[EMAIL SENT]`);
  console.log(`To: admin@nuvira.com`);
  console.log(`Subject: New Contact Request from ${req.body.name}`);
  console.log(`Message:\n${req.body.message}\n`);
  
  res.json({ success: true });
});

app.get("/api/contacts", (req, res) => {
  const db = getDb();
  res.json(db.contacts);
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
