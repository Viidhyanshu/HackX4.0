import { TeamMember } from "./types";

const EXECUTIVE_PHOTOS = [
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
];

const EXECUTIVE_NAMES = [
  "Aryan Verma", "Samaksh Gupta", "Tamanna Yadav", "Harshada Chandel", "Devansh Kapoor",
  "Priya Nair", "Aditya Vikram", "Shreya Singhal", "Karan Malhotra", "Ridhima Sen",
  "Madhav Jha", "Ananya Deshmukh", "Chaitanya Rastogi", "Simran Gill", "Utkarsh Srivastava",
  "Nikita Aggarwal", "Siddharth Menon", "Tanya Khurana", "Varun Taneja", "Ishita Bose",
  "Pranav Anand", "Meghna Roy", "Tushar Bhardwaj", "Akansha Trivedi", "Dhruv Sachdeva",
  "Srishti Mishra", "Abhinav Kaushik", "Kirti Sundaram", "Harshit Jain", "Preeti Saini",
  "Mayank Joshi", "Charu Sharma", "Raghav Lamba", "Divya Thakur", "Nikhil Chopra",
  "Pallavi Shinde", "Aakash Mehta", "Sonali Roy", "Vineet Gambhir", "Surbhi Garg",
  "Yashwant Negi", "Juhi Parmar", "Gaurav Sehgal", "Richa Vats"
];

// 2025 Executive Sub-teams Specification
const executive2025Specs = [
  { subTeam: "STUDENT CONVENER 2024-25", count: 4 },
  { subTeam: "MUJ HACKX 3.0 ADVISORIES", count: 3 },
  { subTeam: "TECHNICAL TEAM", count: 3 },
  { subTeam: "CONTENT TEAM", count: 3 },
  { subTeam: "CURATIONS TEAM", count: 3 },
  { subTeam: "GRAPHIC DESIGN TEAM", count: 4 },
  { subTeam: "HOSPITALITY TEAM", count: 3 },
  { subTeam: "MARKETING TEAM", count: 3 },
  { subTeam: "MEDIA & COVERAGE TEAM", count: 3 },
  { subTeam: "OPERATIONS TEAM", count: 8 },
  { subTeam: "SOCIAL MEDIA TEAM", count: 3 },
  { subTeam: "SPONSORSHIP & FINANCE TEAM", count: 4 },
];

export const executiveMembers: TeamMember[] = [
  // ── 2026 Executive ──
  {
    id: "aryan-verma-2026",
    name: "Aryan Verma",
    role: "Student Convener",
    year: "2026",
    category: "EXECUTIVE",
    subTeam: "STUDENT CONVENERS",
    initials: "AV",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    id: "samaksh-gupta-2026",
    name: "Samaksh Gupta",
    role: "Student Convener",
    year: "2026",
    category: "EXECUTIVE",
    subTeam: "STUDENT CONVENERS",
    initials: "SG",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    id: "tamanna-yadav-2026",
    name: "Tamanna Yadav",
    role: "Student Convener",
    year: "2026",
    category: "EXECUTIVE",
    subTeam: "STUDENT CONVENERS",
    initials: "TY",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
  {
    id: "harshada-chandel-2026",
    name: "Harshada Chandel",
    role: "Student Convener",
    year: "2026",
    category: "EXECUTIVE",
    subTeam: "STUDENT CONVENERS",
    initials: "HC",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },

  // ── 2025 Executive ──
  ...executive2025Specs.flatMap((spec, specIdx) => {
    const startIndex = executive2025Specs.slice(0, specIdx).reduce((acc, curr) => acc + curr.count, 0);
    return Array.from({ length: spec.count }, (_, i) => {
      const globalIdx = startIndex + i;
      const name = EXECUTIVE_NAMES[globalIdx % EXECUTIVE_NAMES.length];
      const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
      const image = EXECUTIVE_PHOTOS[globalIdx % EXECUTIVE_PHOTOS.length];
      const roleTitle = spec.subTeam.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase()).replace(" Team", " Lead");

      return {
        id: `2025-executive-${spec.subTeam.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${i + 1}`,
        name,
        role: roleTitle,
        year: "2025" as const,
        category: "EXECUTIVE" as const,
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

  // ── 2024 Executive ──
  {
    id: "karan-johal-2024",
    name: "Karan Johal",
    role: "Convener",
    year: "2024",
    category: "EXECUTIVE",
    subTeam: "STUDENT CONVENERS",
    initials: "KJ",
    image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
  },
];
