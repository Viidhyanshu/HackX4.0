import { TeamMember } from "./types";

const FACULTY_PHOTOS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580894732413-a704934e65b4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
];

const FACULTY_NAMES = [
  "Dr. Vivek Sharma", "Prof. Sunita Reddy", "Dr. Amit Agarwal", "Prof. Ritu Kapoor", "Dr. Manoj Deshmukh",
  "Prof. Arpita Roy", "Dr. Sameer Joshi", "Prof. Neeta Choudhury", "Dr. Rajeshwar Rao", "Prof. Priyanka Saxena",
  "Dr. Arvind Swaminathan", "Prof. Bhavna Patel", "Dr. Deepak Malhotra", "Prof. Kavita Pillai", "Dr. Harish Bhasin",
  "Prof. Sangeeta Gill", "Dr. Tarun Kulkarni", "Prof. Meenakshi Bhat", "Dr. Alok Nath", "Prof. Archana Saini",
  "Dr. Sandeep Tripathy", "Prof. Vandana Dubey", "Dr. Hemant Pandey", "Prof. Shalini Saxena", "Dr. Girish Varma",
  "Prof. Smita Rastogi", "Dr. Nitin Khandelwal", "Prof. Rashmi Bhatnagar", "Dr. Umesh Nambiar", "Prof. Reena Tyagi",
  "Dr. Bhaskar Banerjee", "Prof. Chetna Kaushik", "Dr. Lalit Mohan", "Prof. Deepika Sen"
];

// 2025 Faculty Sub-teams Specification
const faculty2025Specs = [
  { subTeam: "FACULTY ORGANIZERS", count: 5 },
  { subTeam: "FACULTY CONVENERS", count: 2 },
  { subTeam: "FACULTY CO-ORDINATORS", count: 27 },
];

export const facultyMembers: TeamMember[] = [
  // ── 2026 Faculty ──
  {
    id: "dr-sharma-2026",
    name: "Dr. Ananya Sharma",
    role: "Faculty Convener",
    year: "2026",
    category: "FACULTY",
    subTeam: "FACULTY CONVENERS",
    initials: "AS",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "https://linkedin.com" },
  },

  // ── 2025 Faculty ──
  ...faculty2025Specs.flatMap((spec, specIdx) => {
    const startIndex = faculty2025Specs.slice(0, specIdx).reduce((acc, curr) => acc + curr.count, 0);
    return Array.from({ length: spec.count }, (_, i) => {
      const globalIdx = startIndex + i;
      const name = FACULTY_NAMES[globalIdx % FACULTY_NAMES.length];
      const initials = name.replace(/^(Dr\.|Prof\.)\s+/, "").split(" ").map(n => n[0]).join("").toUpperCase();
      const image = FACULTY_PHOTOS[globalIdx % FACULTY_PHOTOS.length];

      return {
        id: `2025-faculty-${spec.subTeam.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${i + 1}`,
        name,
        role: "Faculty Mentor",
        year: "2025" as const,
        category: "FACULTY" as const,
        subTeam: spec.subTeam,
        initials,
        image,
        socials: { linkedin: "https://linkedin.com" },
      };
    });
  }),

  // ── 2024 Faculty ──
  {
    id: "prof-agrawal-2024",
    name: "Prof. V. Agrawal",
    role: "Faculty Advisor",
    year: "2024",
    category: "FACULTY",
    subTeam: "FACULTY ADVISORS",
    initials: "VA",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "https://linkedin.com" },
  },
];
