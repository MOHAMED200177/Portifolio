export const personal = {
  name: "Mohamed Elafandy",
  title: "Full-Stack Developer",
  subtitle: "Node.js · NestJS · React.js · Next.js · PostgreSQL · MongoDB",
  email: "mohamedelafandy593@gmail.com",
  phone: "+20 109 584 6921",
  location: "Alexandria, Egypt",
  github: "https://github.com/MOHAMED200177",
  linkedin: "https://www.linkedin.com/in/mohamed-elafandy",
  bio: `Full-Stack Developer with 1+ year of professional experience building secure, scalable backend systems and polished frontend applications. Specialized in Node.js, NestJS, and React/Next.js with hands-on production experience in multi-tenant SaaS architecture, real-time microservices, and RESTful API design. Delivered measurable gains including ~40% reduction in API response time and ~60% reduction in database load. Dual background in Software Engineering and Accounting & Finance, offering unique insight into ERP and financial system development.`,
};

export const skills = [
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "NestJS", "REST API Design", "Microservices", "Middleware Pipelines"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js 14", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion", "HTML5", "CSS3"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "TypeORM", "MongoDB", "Mongoose", "MySQL", "Redis"],
  },
  {
    category: "Auth & Security",
    items: ["JWT (Access/Refresh Rotation)", "RBAC", "HttpOnly Cookies", "OTP", "bcryptjs", "Helmet", "Rate Limiting"],
  },
  {
    category: "Message Streaming",
    items: ["Apache Kafka", "Producer/Consumer", "Fault Tolerance", "Message Persistence"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Git & GitHub", "Jest", "Cloudinary", "Nodemailer", "Swagger/OpenAPI", "LibreOffice"],
  },
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "Python", "C"],
  },
  {
    category: "ERP & Cloud",
    items: ["Odoo 19 (In Progress)", "AWS AI/ML Services (In Progress)", "Clean Architecture", "SOLID Principles"],
  },
];

export const experience = [
  {
    role: "Freelance Frontend Developer",
    company: "Cinematic Web Experiences",
    period: "2026 – Present",
    type: "Remote · Freelance",
    stack: ["React.js", "Vite", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Design and deliver fully custom, production-ready single-page web experiences for personal life events — wedding invitations, birthday tributes, and graduation showcases — with cinematic storytelling and responsive UI/UX.",
      "Implement event-driven user flows, dynamic media sections, and custom animation sequences using Framer Motion and canvas-confetti — zero off-the-shelf templates.",
      "Manage full project lifecycle independently: requirements gathering, design, development, Vercel deployment, and client handoff.",
    ],
    projects: [
      { label: "Wedding Invitation Experience", url: "https://wedding-xcjr.vercel.app/" },
      { label: "Birthday Tribute Site", url: "https://birthday-1ag8.vercel.app/" },
      { label: "Graduation Showcase", url: "https://graduated-psi.vercel.app/" },
    ],
  },
  {
    role: "Freelance Backend Developer",
    company: "Invoice & Inventory Management System",
    period: "Nov 2025 – Jan 2026",
    type: "Remote · Freelance",
    stack: ["Node.js", "Express.js", "MongoDB", "ACID Transactions"],
    highlights: [
      "Architected and delivered a full-stack inventory and invoicing backend covering stock tracking, invoice generation, and payment reconciliation across end-to-end financial workflows.",
      "Implemented MongoDB multi-document ACID transactions across 15+ collections with automatic rollback on failure, guaranteeing 100% data consistency.",
      "Exposed 25+ RESTful endpoints covering a single atomic workflow: inventory management → invoice creation → payment processing, with full input validation and error handling.",
    ],
  },
  {
    role: "Backend Developer",
    company: "NCI via Sand Technologies",
    period: "Sep 2024 – Nov 2024",
    type: "Remote, Egypt · Gig-at-a-Startup Program",
    stack: ["NestJS", "MongoDB", "JWT", "RBAC"],
    highlights: [
      "Placed by Sand Technologies to work directly with NCI, an early-stage startup — delivering production backend features end-to-end within the startup environment.",
      "Built a multi-tenant SaaS inventory and company management platform with tenant-isolated database schemas, enabling secure data segregation across multiple clients.",
      "Implemented JWT-based authentication with hierarchical RBAC covering company onboarding, employee access control, and admin workflows.",
      "Optimized MongoDB query performance through strategic indexing and aggregation pipelines, achieving ~40% reduction in average API response time.",
      "Hardened all endpoints with Helmet, XSS Clean, Express Mongo Sanitize, and strict input validation middleware.",
    ],
    cert: "https://www.linkedin.com/in/mohamed-elafandy",
  },
];

export const projects = [
  {
    name: "Teacher Platform",
    subtitle: "Education Management SaaS",
    period: "May 2026 – Present",
    description:
      "A production-grade, tenant-isolated SaaS platform built as part of a two-person team — leading full-stack NestJS backend and Next.js frontend alongside a teammate building Spring Boot microservices.",
    stack: ["TypeScript", "NestJS", "PostgreSQL", "TypeORM", "Next.js 14", "JWT", "Docker"],
    github: null,
    liveDemo: null,
    status: "active",
    highlights: [
      "Architected clean modular NestJS backend with logical multi-tenancy via tenant-scoped data access layers",
      "Full auth system: JWT access/refresh rotation, HttpOnly cookies, OTP email verification, account lockout, Cloudflare Turnstile",
      "QR-based attendance with automatic PRESENT / LATE / ABSENT classification and duplicate prevention",
      "RBAC with teacher/student separation, join requests, multi-group enrollment, grade management, PDF note export",
    ],
  },
  {
    name: "API Abuse",
    subtitle: "Real-Time API Traffic Monitoring",
    period: "Mar 2026 – Present",
    description:
      "A distributed microservices system designed to process high-volume API traffic with full fault tolerance and horizontal scalability. Streams live traffic to Apache Kafka for real-time analysis, eliminating direct database bottlenecks.",
    stack: ["TypeScript", "Express.js", "Apache Kafka", "Microservices", "Docker"],
    github: "https://github.com/MOHAMED200177/api-abuse",
    liveDemo: null,
    status: "active",
    highlights: [
      "3+ independent services with full fault tolerance and horizontal scalability",
      "~60% reduction in direct database load via Kafka message streaming",
      "Middleware-level request validation, auth, and permission checks as primary defense layer",
      "Dead-letter handling & consumer retry logic for ~99% message delivery reliability",
    ],
  },
  {
    name: "Petopia",
    subtitle: "Cat Adoption Platform",
    period: "Aug 2024 – 2025",
    description:
      "A feature-complete pet adoption platform covering the full adoption lifecycle — from user authentication and animal listings to adoption request management and admin controls.",
    stack: ["Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Nodemailer"],
    github: "https://github.com/MOHAMED200177/pet-v1",
    liveDemo: null,
    status: "completed",
    highlights: [
      "20+ RESTful endpoints covering the full adoption lifecycle",
      "JWT authentication + RBAC + layered security — ~80% reduction in unauthorized access attempts",
      "Cloudinary integration for scalable image delivery",
      "Automated transactional emails via Nodemailer",
    ],
  },
];

export const freelanceWork = [
  {
    label: "Wedding Invitation Experience",
    url: "https://wedding-xcjr.vercel.app/",
    stack: ["React", "Framer Motion", "Tailwind CSS"],
  },
  {
    label: "Birthday Tribute Site",
    url: "https://birthday-1ag8.vercel.app/",
    stack: ["React", "Vite", "CSS Animations"],
  },
  {
    label: "Graduation Showcase",
    url: "https://graduated-psi.vercel.app/",
    stack: ["React", "GSAP", "Framer Motion"],
  },
];

export const education = [
  {
    degree: "Software Engineering Certificate",
    institution: "ALX Africa · Holberton School Curriculum",
    badge: "Powered by Mastercard Foundation",
    period: "May 2023 – Jul 2024",
    location: "Remote",
    phases: [
      "Phase 1 — Foundations (6 months): C programming, Linux, shell scripting, data structures, algorithms, OOP",
      "Phase 2 — Full-Stack (3 months): JavaScript (ES6+), Python, and web fundamentals",
      "Phase 3 — Backend Specialization (3 months): Production-ready REST APIs in Node.js",
    ],
    certUrl: "https://www.linkedin.com/in/mohamed-elafandy",
  },
  {
    degree: "B.Sc. in Accounting & Finance",
    institution: "Damanhour University",
    badge: "Faculty of Commerce",
    period: "May 2021 – Jun 2024",
    location: "El Beheira, Egypt",
    phases: [
      "Financial Accounting, Managerial Accounting, Cost Accounting",
      "Business Economics, Auditing, and Taxation",
      "Dual-background edge in ERP, invoicing, and financial system development",
    ],
    certUrl: null,
  },
];

export const certifications = [
  {
    name: "AWS AI & ML Scholars Program 2026",
    issuer: "AWS Skill Builder · Udacity · Amazon Web Services",
    status: "In Progress",
    note: "Covers Generative AI, LLMs, and AWS AI services — aligned with the AWS Certified AI Practitioner certification path.",
  },
  {
    name: "Odoo 19 Development",
    issuer: "Self-Learning · Python · PostgreSQL · XML · ORM",
    status: "In Progress",
    note: "Custom module creation, ORM, views, and core Odoo framework concepts with hands-on local development.",
  },
  {
    name: "AI Career Essentials (AiCE)",
    issuer: "ALX Africa · Fully Funded — Mastercard Foundation",
    status: "Completed · 2024",
    note: "6-week program covering prompt engineering, generative AI applications, and professional digital skills.",
  },
];

export const stats = [
  { value: "40%", label: "API Response Improvement" },
  { value: "60%", label: "Database Load Reduction" },
  { value: "25+", label: "REST Endpoints Built" },
  { value: "3+", label: "Live Freelance Projects" },
];
