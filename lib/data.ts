export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const EXPERIENCE = [
  {
    role: "PHP Developer",
    company: "Digital Aimz",
    location: "Lahore,Pakistan",
    period: "Feb 2026 - Present",
    current: true,
    points: [
      "Developing and maintaining scalable web applications using PHP, Laravel, and CodeIgniter 3.",
      "Working on legacy systems built with CodeIgniter 3 and improving their performance and maintainability.",
      "Designing and optimizing RESTful APIs for performance and reliability.",
      "Improving system performance, database efficiency, and backend architecture.",
    ],
  },
  {
    role: "Laravel Developer",
    company: "EzyPro",
    location: "Sargodha, Pakistan",
    period: "June 2025 - Feb 2026",
    current: false,
    points: [
      "Contributed to construction SaaS platforms for real-time project management.",
      "Built modules for project tracking, resource allocation, and financial workflows.",
      "Enhanced system scalability and improved collaboration between stakeholders.",
    ],
  },
  {
    role: "PHP Laravel Developer",
    company: "Spark Solutionz",
    location: "Lahore, Pakistan",
    period: "Nov 2023 - June 2025",
    current: false,
    points: [
      "Developed and deployed 5+ systems including e-commerce and school management platforms.",
      "Built Aluminium Prime POS API, improving inventory and sales processing efficiency.",
      "Developed Black Luxora car booking system with dynamic pricing and real-time updates.",
      "Engineered a job appointment system improving scheduling efficiency by 25%.",
      "Designed a Fabric POS system for inventory and transaction management.",
      "Developed scalable APIs for Floxup POS fitness management system.",
      "Delivered responsive and user-friendly Laravel Blade interfaces.",
    ],
  },
];

export const PROJECTS = [
  {
    title: "Hadith Authentication System",
    description:
      "Full-stack MERN application designed to authenticate and verify Hadith references with advanced filtering and search capabilities, improving reliability of religious content.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    icon: "HA",
  },
  {
    title: "School Management System",
    description:
      "Scalable Laravel-based system for managing students, attendance, grades, and staff operations with improved performance and usability.",
    tech: ["Laravel", "MySQL", "Bootstrap", "PHP"],
    icon: "SM",
  },
  {
    title: "Pharmacy Management System",
    description:
      "Complete pharmacy solution with authentication, inventory tracking, and prescription handling supporting high daily user activity.",
    tech: ["Laravel", "MySQL", "JavaScript", "Bootstrap"],
    icon: "PM",
  },
  {
    title: "Permission Management System",
    description:
      "Advanced RBAC system enabling dynamic role and permission control with secure access handling across multiple modules.",
    tech: ["Laravel", "PHP", "MySQL", "REST API"],
    icon: "RB",
  },
  {
    title: "Evento Clone",
    description:
      "Vue.js-based event management platform with dynamic UI, responsive design, and smooth user interaction.",
    tech: ["Vue.js", "JavaScript", "CSS", "Bootstrap"],
    icon: "EV",
  },
  {
    title: "Black Luxora",
    description:
      "Premium car booking platform with dynamic pricing, real-time availability, and seamless booking experience.",
    tech: ["Laravel", "MySQL", "PHP", "REST API"],
    icon: "BL",
  },
];

export const SKILLS = {
  Backend: ["PHP", "Laravel", "CodeIgniter 3", "REST APIs"],
  Frontend: ["JavaScript", "Vue.js", "HTML", "CSS", "Bootstrap"],
  Database: ["MySQL", "MongoDB"],
  Tools: ["Git", "CI/CD", "Composer", "NPM"],
};

export const SKILL_LEVELS = [
  { name: "Laravel / PHP", level: 95 },
  { name: "REST API Design", level: 90 },
  { name: "CodeIgniter 3", level: 75 },
  { name: "MySQL", level: 88 },
  { name: "JavaScript", level: 80 },
  { name: "Vue.js", level: 75 },
  { name: "Git / CI/CD", level: 85 },
  { name: "HTML / CSS", level: 82 },
  { name: "Bootstrap", level: 83 },
];
