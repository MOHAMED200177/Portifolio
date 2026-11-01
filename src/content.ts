// ALL copy lives here. Components never hold literal text. Items marked DRAFT need owner approval.
export type StageId =
  | "request" | "middleware" | "guards" | "interceptors"
  | "pipes" | "controller" | "service" | "response" | "exception";

export interface Stage {
  id: StageId; file: string; label: string; title: string; route: string; color: string; // color = CSS var name
  subtitle: string; log: string;
}

export const content = {
  person: {
    name: "Mohamed", fullName: "Mohamed Elafandy", city: "Alexandria, Egypt",
    email: "mohamedelafandy593@gmail.com", phone: "+20 109 584 6921",
  },
  intro: {
    // OPEN: owner confirms captions (DRAFT)
    command:
      "git init && git add . && git config user.name 'Mohamed Elafandy' && git config user.email 'mohamedelafandy593@gmail.com' && git commit -m 'portfolio for backend and full-stack developer' && git push",
    prompts: { name: "? name:", role: "? role:", send: "? send request" },
    roleJourney: ["Accounting", "Backend Developer", "Full-Stack Developer"] as const,
    roleSuffix: " + AI Programmer",
    captions: [
      "Studied accounting and finance",
      "Moved into backend development",
      "Now building complete full-stack products, plus AI",
    ] as const,
    sendHint: "// press Enter to send (it sends itself in a moment)",
    sendFallback: "Send request",
  },
  stages: [
    { id: "request", title: "Home", route: "POST /portfolio · 201 Created", file: "Request.tsx", label: "Request", color: "orange", subtitle: "", log: "[Request] POST /portfolio 201 Created" },
    { id: "middleware", title: "Education", route: "GET /education · 200 OK", file: "Middleware.tsx", label: "Middleware", color: "rose", subtitle: "What I studied, what I did there, and what I kept", log: "[Middleware] LoggerMiddleware.use() +1ms" },
    { id: "guards", title: "Credentials", route: "GET /credentials · 200 OK", file: "Guards.tsx", label: "Guards", color: "mint", subtitle: "Training and certificates that back it up", log: "[Guards] canActivate() -> true +3ms" },
    { id: "interceptors", title: "Experience", route: "GET /experience · 200 OK", file: "Interceptors.tsx", label: "Interceptors", color: "acid-yellow", subtitle: "Where I have worked, and how I got here", log: "[Interceptors] intercept() before +1ms" },
    { id: "pipes", title: "Skills", route: "GET /skills · 200 OK", file: "Pipes.tsx", label: "Pipes", color: "hot-pink", subtitle: "Skills, and the projects that prove them", log: "[Pipes] ValidationPipe.transform() ok +2ms" },
    { id: "controller", title: "Projects", route: "GET /projects · 200 OK", file: "Controller.tsx", label: "Controller", color: "toxic-lime", subtitle: "Things I built and shipped", log: "[Controller] GET /projects 200" },
    { id: "service", title: "Case study", route: "GET /projects/invoice-system · 200 OK", file: "Service.tsx", label: "Service", color: "peach", subtitle: "How it works inside: the main project", log: "[Service] AccountingService.post() ok +9ms" },
    { id: "response", title: "Contact", route: "POST /message · 200 OK", file: "Response.tsx", label: "Response", color: "text", subtitle: "Send me a message", log: "[Response] 200 OK" },
    { id: "exception", title: "Learning", route: "GET /nowhere · 404 Not Found", file: "ExceptionFilter.tsx", label: "Exception filter", color: "crimson", subtitle: "What I'm still learning, and Easter eggs", log: "[ExceptionFilter] catch() HttpException 404" },
  ] satisfies Stage[],
  contact: { reasons: ["Hiring", "Freelance", "Just saying hi"] as const },
} as const;

// Every URL below is copied programmatically from the hyperlinks inside the CV PDF. Do not retype them.
export interface Link { label: string; url: string; }
export const links = {
  // derived from the phone number in the CV (+20 109 584 6921), international format without 0 or +
  whatsapp: "https://wa.me/201095846921",
    mail: "mailto:mohamedelafandy593@gmail.com", linkedin: "https://www.linkedin.com/in/mohamed-elafandy-05667b279/", github: "https://github.com/MOHAMED200177",
} as const;
const L = (label: string, url: string): Link => ({ label, url });
const nci = L("View certificate", "https://savanna.alxafrica.com/certificates/LynEhRsr27");
const petopia = L("GitHub", "https://github.com/MOHAMED200177/pet-v1");
const apiAbuse = L("GitHub", "https://github.com/MOHAMED200177/api-abuse");
const wedding = L("Live demo: Wedding Invitation", "https://wedding-xcjr.vercel.app/");
const birthday = L("Live demo: Birthday Tribute", "https://birthday-1ag8.vercel.app/");
const graduation = L("Live demo: Graduation Showcase", "https://graduated-psi.vercel.app/");
const almira = L("View website", "https://almira-nine.vercel.app/");
const alx = L("View certificate", "https://drive.google.com/file/d/1klXh_JztKdKqobMC8NLN9PZZNUdjY1bd/view?pli=1");
const udacity = L("View certificate", "https://www.udacity.com/certificate/e/cf9cf8a0-900d-11f1-b218-a747a7339af8");
const credly = L("View badge", "https://www.credly.com/earner/earned/badge/98913bfd-2349-4c7c-9264-1bdeb40de974");
const pf = (project: string, l: Link) => ({ project, url: l.url });
const nciP = pf("NCI platform", nci), petP = pf("Petopia", petopia), apiP = pf("API Abuse", apiAbuse);
const weddingP = pf("Wedding Invitation Experience", wedding), birthdayP = pf("Birthday Tribute Site", birthday), gradP = pf("Graduation Showcase", graduation);
const almiraP = pf("the Almira website", almira), udaP = pf("the AWS AI Programmer Nanodegree", udacity), credlyP = pf("the AWS Serverless badge", credly);
export interface Skill { name: string; proof?: { project: string; url: string }; }
const sk = (name: string, proof?: Skill["proof"]): Skill => ({ name, proof });

// Site copy built from the CV. Plain-language lines are DRAFT: owner to confirm.
export const site = {
  facts: [["X-Location", "Alexandria, Egypt"], ["X-Stack", "Node.js, NestJS, MongoDB, React"], ["X-Contact", "mohamedelafandy593@gmail.com"]] as [string, string][],
  requestPlain: "I build the part of a product that users never see but always depend on: logins, data and payments. Then I put the screens on top.",
  background: [
    { mark: "ALX", name: "Software Engineering Certificate", where: "ALX Africa, powered by Mastercard Foundation and the Holberton School curriculum", place: "Remote", when: "May 2023 – Jul 2024",
      did: ["Foundations, 6 months: low-level C, Linux administration, shell scripting, data structures, algorithms and OOP.", "Full-stack, 3 months: JavaScript (ES6+), Python and web fundamentals, with projects delivered across frontend and backend.", "Backend specialization, 3 months: production-ready REST APIs and full Node.js applications."],
      took: "Authentication, database integration and deployment, from first line to a running backend.", link: alx },
    { mark: "DU", name: "B.Sc. in Accounting & Finance", where: "Faculty of Commerce, Damanhour University", place: "El Beheira, Egypt", when: "May 2021 – Jun 2024",
      did: ["Financial, managerial and cost accounting.", "Business economics, auditing and taxation."],
      took: "Analytical and financial reporting skills that apply directly to ERP, invoicing and financial systems." },
  ] as { mark: string; name: string; where: string; place: string; when: string; did: string[]; took: string; link?: Link }[],
  credentials: [
    { name: "Future AWS AI Programmer Nanodegree", issuer: "Udacity", when: "Sep 2026 – Oct 2026", plain: "Hands-on AI training: neural networks, language models and transformers with PyTorch.", link: udacity },
    { name: "AWS AI & ML Scholars Program", issuer: "AWS Skill Builder, Udacity", when: "2026", plain: "Generative AI, large language models and AWS AI services." },
    { name: "AWS SimuLearn: Serverless Developer badge", issuer: "Amazon Web Services", when: "Oct 2026", plain: "Built multi-tiered apps on AWS Lambda, where the cloud runs the servers for you.", link: credly },
    { name: "AI Career Essentials (AiCE)", issuer: "ALX Africa", when: "2024", plain: "Six weeks on prompt engineering and generative AI applications." },
  ] as { name: string; issuer: string; when: string; plain: string; link?: Link }[],
  before: "Studied accounting and finance, and wanted to build the software behind the numbers.",
  after: "Now a backend-focused full-stack developer: multi-tenant SaaS, secure logins, transactional money workflows.",
  roles: [
    { title: "Frontend Developer", org: "Freelance", kind: "Freelance", place: "Remote", when: "2026 – Present", stack: "React.js, Vite, Tailwind CSS, Framer Motion",
      lead: "", points: ["Designed and delivered custom single-page web experiences for personal events, from design to Vercel deployment and client handoff."], links: [] as Link[],
      works: [L("Wedding Invitation Experience", "https://wedding-xcjr.vercel.app/"), L("Birthday Tribute Site", "https://birthday-1ag8.vercel.app/"), L("Graduation Showcase", "https://graduated-psi.vercel.app/")] },
    { title: "Backend Developer", org: "Freelance", kind: "Freelance", place: "Remote", when: "Nov 2025 – Jan 2026", stack: "Node.js, Express.js, MongoDB, ACID transactions",
      lead: "Invoice & Inventory Management System", points: ["Built the backend for stock tracking, invoice generation and payment reconciliation.", "Used MongoDB multi-document ACID transactions with automatic rollback to keep financial data consistent.", "Exposed RESTful APIs for the full inventory, invoice and payment workflow, with input validation and error handling."], links: [] as Link[], see: "service" },
    { title: "Backend Developer", org: "NCI, via Sand Technologies", kind: "Contract", place: "Remote, Egypt", when: "Sep 2024 – Nov 2024", stack: "NestJS, MongoDB, JWT, RBAC",
      lead: "Contracted through Sand Technologies' Gig-at-a-Startup Program", points: ["Built a multi-tenant SaaS inventory and company management platform with tenant-isolated database schemas.", "Implemented JWT authentication with hierarchical RBAC for company onboarding, employee access and admin workflows.", "Optimized MongoDB queries with indexing and aggregation pipelines, and secured endpoints with Helmet, XSS Clean, Express Mongo Sanitize and input validation."], links: [nci] },
    { title: "Frontend Developer", org: "Almira Pharmaceutical Company", kind: "Company", place: "", when: "", stack: "Next.js",
      lead: "", points: ["Built the front end of the company website with Next.js, presenting Almira's information and medicines."], links: [almira] },
  ] as { title: string; org: string; kind: string; place: string; when: string; stack: string; lead: string; points: string[]; links: Link[]; works?: Link[]; see?: string }[],
  commits: [
    "f4c19a2 feat: freelance frontend, event sites (2026 - present)",
    "b82e0d7 feat: AWS AI & ML Scholars + AI Programmer Nanodegree (2026)",
    "6a3c5e1 feat: API Abuse, Kafka microservices (Mar 2026 - present)",
    "d70b94f feat: freelance backend, invoice & inventory (Nov 2025 - Jan 2026)",
    "91e2a6c feat: Petopia adoption platform (Aug 2024 - 2025)",
    "3c58d1b feat: NCI multi-tenant SaaS via Sand Technologies (Sep - Nov 2024)",
    "0a7f3e8 chore: ALX Software Engineering Certificate (2023 - 2024)",
    "e1d46b0 init: B.Sc. Accounting & Finance (2021 - 2024)",
  ],
  skills: [
    { group: "Backend", plain: "The engine room: servers, APIs and the rules every request follows.", items: [sk("Node.js", petP), sk("Express.js", petP), sk("NestJS", nciP), sk("REST API Design", petP), sk("Microservices", apiP), sk("Kafka", apiP), sk("Middleware Pipelines", apiP)] },
    { group: "Frontend", plain: "What people see and click.", items: [sk("React.js", weddingP), sk("Next.js", almiraP), sk("Vite", weddingP), sk("Tailwind CSS", gradP), sk("shadcn/ui"), sk("Framer Motion", birthdayP), sk("HTML5"), sk("CSS3")] },
    { group: "Databases", plain: "Where information is stored safely.", items: [sk("PostgreSQL"), sk("TypeORM"), sk("MongoDB (Transactions, Aggregation, Indexing)", nciP), sk("Mongoose"), sk("MySQL"), sk("Redis")] },
    { group: "Auth & Security", plain: "Keeping the right people in and everyone else out.", items: [sk("JWT (Access/Refresh Rotation)", petP), sk("RBAC", nciP), sk("HttpOnly Cookies"), sk("OTP"), sk("bcryptjs"), sk("Helmet", nciP), sk("Rate Limiting"), sk("Input Validation", nciP)] },
    { group: "AI & ML", plain: "Teaching computers to read, learn and predict.", items: [sk("Python", udaP), sk("PyTorch", udaP), sk("NumPy", udaP), sk("Pandas", udaP), sk("Matplotlib"), sk("Jupyter"), sk("Neural Networks", udaP), sk("Deep Learning", udaP), sk("NLP", udaP), sk("Transformers", udaP), sk("LLMs")] },
    { group: "Cloud", plain: "Running code online without managing servers.", items: [sk("AWS Lambda", credlyP), sk("Serverless Architecture", credlyP), sk("AWS AI Services")] },
    { group: "Languages", plain: "The languages I write in.", items: [sk("TypeScript", apiP), sk("JavaScript (ES6+)"), sk("Python"), sk("C")] },
    { group: "DevOps & Tools", plain: "Packaging, testing and shipping.", items: [sk("Docker", apiP), sk("Git"), sk("GitHub"), sk("Jest (Unit Testing)"), sk("Cloudinary", petP), sk("Nodemailer"), sk("Swagger/OpenAPI")] },
    { group: "CS Fundamentals", plain: "The theory that keeps code clean and fast.", items: [sk("OOP"), sk("Data Structures & Algorithms"), sk("SOLID Principles"), sk("Design Patterns"), sk("Clean Architecture")] },
  ] as { group: string; plain: string; items: Skill[] }[],
  projects: [
    { route: "GET /api-abuse", name: "ApiAbuse", title: "API Abuse: Real-Time API Traffic Monitoring", when: "Mar 2026 – Present", stack: "TypeScript, Express.js, Kafka, Microservices, Docker", plain: "Watches API traffic in real time. A collector streams requests to a message broker for analysis, so the database stays unloaded.", link: apiAbuse },
    { route: "GET /petopia", name: "Petopia", title: "Petopia: Cat Adoption Platform", when: "Aug 2024 – 2025", stack: "Node.js, Express.js, MongoDB, JWT, Cloudinary", plain: "A cat adoption platform: sign-up, listings, adoption requests and admin controls, all behind secure logins.", link: petopia },
  ] as { route: string; name: string; title: string; when: string; stack: string; plain: string; link: Link }[],
  // DRAFT: owner to confirm wording. Everything here is derived from the CV data above.
  about: {
    file: "developer.ts",
    summary: "Backend-focused full-stack developer from Alexandria, Egypt. I studied accounting and finance, then moved into software: multi-tenant SaaS, secure logins and money workflows that stay consistent. Now adding AI on AWS.",
    dev: {
      name: "Mohamed Elafandy",
      role: "Backend-focused Full-Stack Developer",
      location: "Alexandria, Egypt",
      background: ["Accounting & Finance", "Software Engineering (ALX)"],
      stack: ["Node.js", "NestJS", "MongoDB", "React"],
      building: ["Multi-tenant SaaS", "Secure authentication", "Kafka microservices"],
      currently: ["API Abuse", "AWS AI & ML"],
      openTo: ["Hiring", "Freelance"],
    } as Record<string, string | string[]>,
  },
  featured: {
    name: "Invoice & Inventory Management System",
    plain: "Selling something touches three records: the stock goes down, an invoice is made, a payment is matched. They save together, or none of them save. That is what a database transaction guarantees.",
    steps: [["Stock goes down", "The items leave the inventory."], ["An invoice is created", "The sale is written down."], ["The payment is matched", "Money received is linked to the invoice."]] as [string, string][],
    ledger: [["Accounts receivable", 1200, 0], ["Sales revenue", 0, 1200], ["Cash", 1200, 0], ["Accounts receivable", 0, 1200]] as [string, number, number][],
    ledgerPlain: "Double entry: every movement has two sides, and the two sides must match. Invoice first, then payment. (Illustrative data.)",
    externalPlain: "My AI work stands on its own: PyTorch, NLP and transformers, from the Future AWS AI Programmer Nanodegree.",
  },
  learning: ["AWS Certified AI Practitioner (the path my scholars program aligns with)", "Event streaming with Kafka, in progress through API Abuse", "Generative AI and LLMs on AWS"],
  env: ["COFFEE_LEVEL=critical", "SECRET_SAUCE=curiosity", "BUGS=0 (until prod)"],
  contactPlain: "Pick a reason, write a line, and your email app opens ready to send.",
};

export const ui = {
  commit: {
    label: "leave a commit message (max 72 chars)", name: "your name (optional)", btn: "git commit -m",
    tooShort: "error: empty commit message. Write at least 3 characters.",
    done: "Committed to this page. Only you can see it, there is no database. Want Mohamed to see it too?",
    send: "Send it to him on WhatsApp",
  },
  contact: {
    sent: "Your email app should have opened with the message ready.",
    waLine: "Prefer WhatsApp? Send the same message there.", wa: "Open WhatsApp", again: "Send another",
  },
  debug: "debug",
} as const;
