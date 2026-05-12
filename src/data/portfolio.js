export const personal = {
  name: "Mohamed Elafandy",
  title: "Backend Developer",
  subtitle: "Node.js · NestJS · Express.js · MongoDB · React.js",
  email: "mohamedelafandy593@gmail.com",
  phone: "01095846921",
  location: "Alexandria, Egypt",
  github: "https://github.com/MOHAMED200177",
  linkedin: "https://www.linkedin.com/in/mohamed-elafandy",
  bio: `Backend developer with 1+ year of production experience building secure, scalable server-side systems. 
  I specialize in RESTful API design, multi-tenant SaaS architecture, and real-time microservices — 
  with measurable results: ~40% faster API response times and ~60% less database load through targeted 
  optimization. My dual background in Software Engineering and Accounting & Finance gives me an edge 
  in financial and ERP system development.`,
};

export const skills = [
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "NestJS", "REST API Design", "Middleware Pipelines", "Microservices"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "Transactions & Aggregation", "Mongoose", "MySQL", "Redis"],
  },
  {
    category: "Auth & Security",
    items: ["JWT", "RBAC", "Helmet", "bcryptjs", "XSS Clean", "Rate Limiting", "Input Validation"],
  },
  {
    category: "Message Streaming",
    items: ["Apache Kafka", "Producer/Consumer", "Fault Tolerance", "Message Persistence"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Git", "Jest", "Cloudinary", "Nodemailer", "Swagger/OpenAPI"],
  },
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "C"],
  },
  {
    category: "CS Fundamentals",
    items: ["OOP", "Data Structures & Algorithms", "SOLID Principles", "Design Patterns"],
  },
];

export const experience = [
  {
    role: "Backend Developer",
    company: "Sand Technologies",
    period: "Sep 2024 – Nov 2024",
    type: "Remote, Egypt · Gig-at-a-Startup Program",
    highlights: [
      "Built a multi-tenant SaaS inventory and company management platform using NestJS and MongoDB with tenant-isolated database schemas, enabling secure data segregation across multiple clients.",
      "Implemented JWT-based authentication with hierarchical RBAC authorization covering company onboarding, employee access, and admin workflows.",
      "Optimized MongoDB query performance via indexing strategies and aggregation pipelines — achieving ~40% reduction in average API response time.",
      "Applied modular layered architecture (Controller → Service → Repository) ensuring clean separation of concerns and long-term extensibility.",
      "Secured all endpoints using Helmet, XSS Clean, Express Mongo Sanitize, and strict input validation middleware.",
    ],
    cert: "View Certificate",
  },
  {
    role: "Freelance Backend Developer",
    company: "Invoice & Inventory Management System",
    period: "Nov 2025 – Jan 2026",
    type: "Remote",
    highlights: [
      "Developed a full-stack inventory and invoicing backend handling stock tracking, invoice generation, and payment reconciliation using Node.js, Express.js, and MongoDB.",
      "Implemented MongoDB multi-document ACID transactions across 15+ collections with automatic rollback on failure, guaranteeing 100% data consistency and near-zero data loss.",
      "Exposed 25+ RESTful API endpoints covering a single atomic workflow: inventory management → invoice creation → payment processing.",
      "Eliminated manual reconciliation errors by enforcing atomic business logic at the database layer, bringing financial discrepancies to near zero.",
    ],
  },
];

export const projects = [
  {
    name: "API Abuse",
    subtitle: "Real-Time API Traffic Monitoring System",
    period: "Mar 2026 – Present",
    description:
      "A distributed microservices system designed to process high-volume API traffic with full fault tolerance and horizontal scalability. Streams live traffic to Apache Kafka for real-time analysis, eliminating direct database bottlenecks.",
    stack: ["TypeScript", "Express.js", "Apache Kafka", "Microservices", "Docker"],
    github: "https://github.com/MOHAMED200177/api-abuse",
    status: "active",
    highlights: [
      "3+ independent services with full fault tolerance",
      "~60% reduction in direct database load",
      "~99% end-to-end message delivery reliability",
      "Dead-letter handling & consumer retry logic",
    ],
  },
  {
    name: "Petopia",
    subtitle: "Cat Adoption Platform",
    period: "Aug 2024 – 2025",
    description:
      "A feature-complete pet adoption platform with the full adoption lifecycle — from user authentication and animal listings to adoption request management and admin controls.",
    stack: ["Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Nodemailer"],
    github: "https://github.com/MOHAMED200177/pet-v1",
    status: "completed",
    highlights: [
      "20+ RESTful endpoints covering the full adoption flow",
      "Cloudinary integration for scalable image delivery",
      "~80% reduction in unauthorized access attempts",
      "Automated transactional emails via Nodemailer",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor's Degree — Accounting & Finance",
    institution: "Damanhour University",
    period: "May 2021 – Jun 2024",
    location: "El Beheira, Egypt",
    note: "Dual-background advantage: financial logic, ERP systems, and audit thinking applied to backend architecture.",
  },
  {
    degree: "Software Engineering Certificate",
    institution: "ALX Africa · Powered by Mastercard Foundation",
    period: "May 2023 – Jul 2024",
    location: "Remote",
    note: "9-month intensive: C, JavaScript, Python, Linux. Final 3-month specialization in production-ready Node.js backends.",
  },
];

export const certifications = [
  {
    name: "AWS AI & ML Scholars Program 2026",
    issuer: "AWS Skill Builder · Udacity · Amazon Web Services",
    status: "In Progress",
    note: "Covers Generative AI, LLMs, and AWS AI services — aligned with AWS Certified AI Practitioner path.",
  },
  {
    name: "AI Career Essentials (AiCE)",
    issuer: "ALX Africa · Fully Funded by Mastercard Foundation",
    status: "Completed · 2024",
    note: "6-week program: prompt engineering, generative AI applications, and professional digital skills.",
  },
];

export const stats = [
  { value: "40%", label: "API Response Improvement" },
  { value: "60%", label: "Database Load Reduction" },
  { value: "25+", label: "REST Endpoints Built" },
  { value: "99%", label: "Message Delivery Reliability" },
];
