export interface SocialLinks {
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category?: string;
  initials?: string;
  image?: string;
  socials?: SocialLinks;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "aryan-verma",
    name: "Aryan Verma",
    role: "Student Convener",
    category: "Conveners",
    initials: "AV",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "samaksh-gupta",
    name: "Samaksh Gupta",
    role: "Student Convener",
    category: "Conveners",
    initials: "SG",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "tamanna-yadav",
    name: "Tamanna Yadav",
    role: "Student Convener",
    category: "Conveners",
    initials: "TY",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "harshada-chandel",
    name: "Harshada Chandel",
    role: "Student Convener",
    category: "Conveners",
    initials: "HC",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
];
