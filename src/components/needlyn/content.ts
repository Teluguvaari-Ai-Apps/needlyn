export type Tone = "light" | "dark";

export type Capability = {
  id: string;
  title: string;
  line: string;
  summary: string;
  image: string;
  alt: string;
  tone: Tone;
  includes: string[];
  stack: string;
};

export const capabilities: Capability[] = [
  {
    id: "software",
    title: "Software consulting.",
    line: "Advice, then the build. For consultants and their clients.",
    summary:
      "A software development service for consultants and the companies they advise. We scope the problem with you, design the system, and deliver the platform or internal tool — under your engagement, or beside it.",
    image: "/media/software.jpg",
    alt: "A desktop monitor with a system diagram, a keyboard, and a sketched plan",
    tone: "light",
    includes: [
      "Discovery and a written technical recommendation",
      "Custom software, platforms and internal tools",
      "You keep the client relationship. We do the engineering.",
    ],
    stack: "Next.js · Node · PostgreSQL",
  },
  {
    id: "mobile",
    title: "Mobile apps.",
    line: "iOS, Android and cross-platform, from prototype to the stores.",
    summary:
      "Mobile app development for products that have to live on a phone. Native iOS, Android or a shared codebase — taken from a working prototype through release, review and store operations.",
    image: "/media/mobile.jpg",
    alt: "Two plain smartphones on a workbench beside a drawing and a cable",
    tone: "light",
    includes: [
      "iOS, Android and React Native",
      "Prototype, release and store operations",
      "Interfaces that feel at home on the device",
    ],
    stack: "Swift · Kotlin · React Native",
  },
  {
    id: "robotics",
    title: "Robotics.",
    line: "Robotics technology for machines that leave the lab.",
    summary:
      "Robotics development across perception, motion control and fleet software. The same team handles the embedded work and the systems around it, so a robot is not a demo that stops at the lab door.",
    image: "/media/robotics.jpg",
    alt: "A yellow industrial robot arm over a metal worktable",
    tone: "light",
    includes: [
      "Perception, motion and fleet software",
      "Embedded C++ and ROS 2",
      "Integration with the software around the machine",
    ],
    stack: "ROS 2 · Embedded C++",
  },
  {
    id: "ai",
    title: "AI development.",
    line: "Applied AI, shipped as a feature your client can use.",
    summary:
      "AI development for products and internal tools: applied machine learning, language models, retrieval and copilots. We start from the workflow a consultant’s client already has, and put a person in the loop where it matters.",
    image: "/media/ai.jpg",
    alt: "A display of a network graph beside server racks",
    tone: "dark",
    includes: [
      "Applied ML and language-model features",
      "Copilots, retrieval and automation",
      "Evaluation a client can read, not a single score",
    ],
    stack: "PyTorch · TensorFlow · LLM APIs · Vector search",
  },
];

export const stages = [
  {
    n: "01",
    title: "Consult & scope",
    body: "We sit with you — and, if you want, your client — and map the problem, the constraints and what success looks like.",
  },
  {
    n: "02",
    title: "Design & architect",
    body: "A system design you can take into the room. Reviewed before anyone starts building.",
  },
  {
    n: "03",
    title: "Build & iterate",
    body: "Weekly demos against a visible roadmap. Software, mobile, robotics or AI — same cadence.",
  },
  {
    n: "04",
    title: "Ship & hand over",
    body: "Launch support, full handover, and an optional retainer if you want us to stay on the engagement.",
  },
];

export const reasons = [
  {
    title: "A service for consultants",
    body: "Independent consultants and firms hire us when a client needs software, a mobile app, robotics or AI. You stay in front. We can work named, or behind your practice.",
  },
  {
    title: "Senior engineers only",
    body: "No bench of juniors learning on the engagement. Every engineer has shipped production systems before.",
  },
  {
    title: "You own the work",
    body: "Code, models and infrastructure transfer to you, or to your client, on delivery. Full repo access. No lock-in.",
  },
  {
    title: "One company, four practices",
    body: "Software consulting, mobile app development, robotics and AI sit in the same team, so a mixed engagement does not get split across vendors.",
  },
];

export const engagements = [
  {
    name: "Consulting",
    fit: "Before a build",
    body: "A fixed advisory engagement: problem framing, architecture and a recommendation your client can act on.",
  },
  {
    name: "Fixed price",
    fit: "A defined build",
    body: "Software, a mobile app, a robotics workstream or an AI feature. Scope and number in writing before we start.",
  },
  {
    name: "Retainer",
    fit: "Alongside your practice",
    body: "Ongoing engineering for consultants who need a build partner month to month. You call it. We leave when you say.",
  },
];

export const faqs = [
  {
    q: "Do you work with consultants?",
    a: "Yes. That is the usual way in. Consultants bring us a client problem in software, mobile, robotics or AI. You keep the relationship. We do the engineering, named or white-label.",
  },
  {
    q: "What do you actually build?",
    a: "Four things: software (platforms and tools, with the consulting that scopes them), mobile apps for iOS and Android, robotics systems, and applied AI. Cloud delivery is part of the build, not a separate pitch.",
  },
  {
    q: "How is pricing structured?",
    a: "A consulting engagement when you need a recommendation. Fixed-price when the build is clear. A monthly retainer when you want us beside the practice. The number is in writing before we start.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, before any call that touches a client’s product or data. IP and code ownership transfer on delivery — to you, or to your client, as the contract says.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Yes. We start with a technical audit so you know what the client is inheriting before we commit to a scope or a timeline.",
  },
];

export const projectTypes = [
  "Software consulting",
  "Mobile app development",
  "Robotics development",
  "AI development",
  "Not sure yet",
];

export const horizons = ["4 weeks", "A quarter", "A year"] as const;
export const moments = ["A client ask", "An MVP", "A rebuild", "Ongoing support"] as const;

export const specLine =
  "Software consulting  ·  Mobile apps  ·  Robotics  ·  AI development";
