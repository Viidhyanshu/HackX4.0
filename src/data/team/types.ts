export interface SocialLinks {
  linkedin?: string;
  github?: string;
  website?: string;
}

export type TeamYear = "2026" | "2025" | "2024";
export type TeamCategory = "FACULTY" | "EXECUTIVE" | "CORE";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  year: TeamYear;
  category: TeamCategory;
  subTeam?: string;
  initials?: string;
  image?: string;
  socials?: SocialLinks;
}
