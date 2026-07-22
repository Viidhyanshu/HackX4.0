import { TeamMember } from "./types";

const CORE_PHOTOS = [
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
];

const CORE_NAMES = [
  "Rohan Malhotra", "Kavya Sharma", "Ishaan Verma", "Diya Patel", "Aditya Sen",
  "Tanvi Bhatia", "Yash Kapur", "Riya Singh", "Devansh Mehta", "Kavya Nair",
  "Arjun Reddy", "Tara Saxena", "Siddharth Rao", "Pooja Hegde", "Varun Dhawan",
  "Kritika Chaudhry", "Ayushmann Roy", "Shraddha Das", "Kartik Aryan", "Disha Patani",
  "Tiger Shroff", "Janhavi Kapoor", "Kunal Kemmu", "Anushka Shetty", "Rajkummar Rao",
  "Bhumi Pednekar", "Ayan Mukherjee", "Nisha Goyal", "Manish Pandey", "Suhani Bhatnagar",
  "Kushagra Verma", "Radhika Merchant", "Sahil Lamba", "Divya Unni", "Naman Mathur",
  "Parul Chauhan", "Gautam Gambhir", "Esha Gupta", "Nikhil Kumar", "Surbhi Jyoti",
  "Vansh Tyagi", "Alia Sengupta", "Chethan Kumar", "Siddhi Mahajan"
];

// 2025 Core Sub-teams Specification
const core2025Specs = [
  { subTeam: "TECHNICAL TEAM", count: 5 },
  { subTeam: "CONTENT TEAM", count: 4 },
  { subTeam: "CURATIONS TEAM", count: 7 },
  { subTeam: "GRAPHIC DESIGN TEAM", count: 4 },
  { subTeam: "HOSPITALITY TEAM", count: 3 },
  { subTeam: "MARKETING TEAM", count: 3 },
  { subTeam: "MEDIA & COVERAGE TEAM", count: 3 },
  { subTeam: "OPERATIONS TEAM", count: 8 },
  { subTeam: "SOCIAL MEDIA TEAM", count: 3 },
  { subTeam: "SPONSORSHIP & FINANCE TEAM", count: 4 },
];

export const coreMembers: TeamMember[] = [
  // ── 2026 Core ──
  {
    id: "rohit-singh-2026",
    name: "Rohit Singh",
    role: "Technical Lead",
    year: "2026",
    category: "CORE",
    subTeam: "TECHNICAL TEAM",
    initials: "RS",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },

  // ── 2025 Core ──
  ...core2025Specs.flatMap((spec, specIdx) => {
    const startIndex = core2025Specs.slice(0, specIdx).reduce((acc, curr) => acc + curr.count, 0);
    return Array.from({ length: spec.count }, (_, i) => {
      const globalIdx = startIndex + i;
      const name = CORE_NAMES[globalIdx % CORE_NAMES.length];
      const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
      const image = CORE_PHOTOS[globalIdx % CORE_PHOTOS.length];
      const roleTitle = spec.subTeam.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase()).replace(" Team", " Member");

      return {
        id: `2025-core-${spec.subTeam.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${i + 1}`,
        name,
        role: roleTitle,
        year: "2025" as const,
        category: "CORE" as const,
        subTeam: spec.subTeam,
        initials,
        image,
        socials: {
          linkedin: "https://linkedin.com",
          github: i % 2 === 0 ? "https://github.com" : undefined,
        },
      };
    });
  }),
];
