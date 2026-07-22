"use client";

import React, { useState } from "react";

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials?: string;
  image?: string;
  socials?: SocialLinks;
}

const LinkedInIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 1.47 1.47 1.47 1.47 0 0 0-1.47-1.47Z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const WebsiteIcon = () => (
  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
  </svg>
);

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, index = 0 }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    if (member.initials) return member.initials;
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const socials = member.socials || {};

  return (
    <div className="group relative w-full aspect-[3/4] overflow-hidden rounded-none border border-white/[0.12] bg-zinc-900/90 shadow-xl transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-purple-500/10">
      {/* Background Image / Gradient Fallback */}
      {member.image && !imageError ? (
        <img
          src={member.image}
          alt={member.name}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, #181824 0%, #2a1f3d 40%, #1e102a 100%)`,
          }}
        >
          <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">
            <span className="text-white/90 font-bold text-3xl tracking-wider select-none">
              {getInitials(member.name)}
            </span>
          </div>
        </div>
      )}

      {/* Top Gradient Overlay (for social button visibility) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none z-10" />

      {/* Bottom Gradient Overlay (for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none z-10" />

      {/* Top-Right Social Media Buttons (LinkedIn & GitHub only) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2.5">
        {socials.linkedin && (
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}'s LinkedIn`}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md border border-white/35 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <LinkedInIcon />
          </a>
        )}

        {socials.github && (
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}'s GitHub`}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md border border-white/35 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <GithubIcon />
          </a>
        )}

        {socials.website && (
          <a
            href={socials.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}'s Portfolio`}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md border border-white/35 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <WebsiteIcon />
          </a>
        )}
      </div>

      {/* Bottom-Left Details */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20 text-left flex flex-col justify-end">
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide font-sans leading-tight drop-shadow-md">
          {member.name}
        </h3>
        <p className="text-sm md:text-base text-gray-300 font-normal tracking-wide mt-1 drop-shadow-sm">
          {member.role}
        </p>
      </div>
    </div>
  );
};
