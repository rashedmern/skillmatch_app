"use client";

import React from "react";

interface CompanyLogoProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  size = "md",
  className = "",
}) => {
  const cleanName = (name || "").toLowerCase().trim();

  // Size specifications
  const sizeClasses = {
    xs: "w-6 h-6 rounded-md text-[10px]",
    sm: "w-8 h-8 rounded-lg text-xs",
    md: "w-10 h-10 rounded-xl text-xs",
    lg: "w-12 h-12 rounded-xl text-sm",
    xl: "w-14 h-14 rounded-2xl text-base",
    "2xl": "w-20 h-20 rounded-2xl text-xl",
  }[size];

  const iconSizes = {
    xs: "w-3.5 h-3.5",
    sm: "w-4.5 h-4.5",
    md: "w-5.5 h-5.5",
    lg: "w-6.5 h-6.5",
    xl: "w-8 h-8",
    "2xl": "w-11 h-11",
  }[size];

  // 1. Google
  if (cleanName.includes("google") || cleanName === "g") {
    return (
      <div
        className={`bg-white border border-zinc-200/90 shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Google"
      >
        <svg className={iconSizes} viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      </div>
    );
  }

  // 2. Meta
  if (cleanName.includes("meta") || cleanName === "me") {
    return (
      <div
        className={`bg-gradient-to-tr from-[#0064E0] to-[#0081FB] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Meta"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.992 5.75c-2.02 0-3.414 1.18-4.992 3.125C10.422 6.93 9.028 5.75 7.008 5.75 3.36 5.75 1 8.813 1 12.875 1 17.063 3.484 20 7.133 20c2.313 0 3.89-1.281 5.067-2.813 1.176 1.532 2.754 2.813 5.067 2.813 3.648 0 6.133-2.937 6.133-7.125 0-4.062-2.36-7.125-6.408-7.125zm-9.984 11.75c-2.227 0-3.608-1.938-3.608-4.625 0-2.625 1.38-4.625 3.608-4.625 1.773 0 2.93 1.25 4.195 3.125-1.266 1.875-2.422 3.125-4.195 3.125zm9.984 0c-1.773 0-2.93-1.25-4.195-3.125 1.266-1.875 2.422-3.125 4.195-3.125 2.227 0 3.608 2 3.608 4.625 0 2.687-1.38 4.625-3.608 4.625z" />
        </svg>
      </div>
    );
  }

  // 3. Stripe
  if (cleanName.includes("stripe") || cleanName === "sp") {
    return (
      <div
        className={`bg-[#635BFF] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Stripe"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.836.5 6.968.5 3.114 3.606 3.114 8.286c0 4.62 3.42 6.075 7.168 7.391 2.378.852 3.396 1.611 3.396 2.671 0 .973-.836 1.545-2.257 1.545-2.298 0-5.18-.999-7.242-2.133L3.25 23.25c2.193 1.107 5.378 1.75 8.784 1.75 6.275 0 10.366-2.946 10.366-7.854 0-4.708-3.35-6.241-8.424-7.996z" />
        </svg>
      </div>
    );
  }

  // 4. Datadog
  if (cleanName.includes("datadog") || cleanName === "dd") {
    return (
      <div
        className={`bg-[#632CA6] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Datadog"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.48 4.22c-1.38 0-2.58.55-3.48 1.45V4.6c0-.46-.37-.83-.83-.83h-2.34c-.46 0-.83.37-.83.83v7.45c-.9-.9-2.1-1.45-3.48-1.45-2.76 0-5 2.24-5 5s2.24 5 5 5c1.38 0 2.58-.55 3.48-1.45v1.07c0 .46.37.83.83.83h2.34c.46 0 .83-.37.83-.83v-7.45c.9.9 2.1 1.45 3.48 1.45 2.76 0 5-2.24 5-5s-2.24-5-5-5zm-10.96 14.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm10.96-5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
        </svg>
      </div>
    );
  }

  // 5. Cloudflare
  if (cleanName.includes("cloudflare") || cleanName === "cf") {
    return (
      <div
        className={`bg-white border border-zinc-200 shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Cloudflare"
      >
        <svg className={iconSizes} viewBox="0 0 24 24">
          <path
            fill="#F38020"
            d="M18.42 10.35A5.63 5.63 0 0 0 13.06 6a5.57 5.57 0 0 0-4.93 3.09 4.3 4.3 0 0 0-3.69 4.22c0 .24.03.48.07.71A3.75 3.75 0 0 0 5.75 21h12.5a4.75 4.75 0 0 0 .17-9.65z"
          />
          <path
            fill="#FAAE40"
            d="M18.25 10.35h-.17a4.75 4.75 0 0 1 .17 9.65h.25a3.75 3.75 0 0 0 3.75-3.75c0-2-1.59-3.63-3.56-3.73-.13-1.24-.86-2.17-.44-2.17z"
          />
        </svg>
      </div>
    );
  }

  // 6. Uber
  if (cleanName.includes("uber") || cleanName === "ub") {
    return (
      <div
        className={`bg-black text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Uber"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5c0 .83-.67 1.5-1.5 1.5h-6c-.83 0-1.5-.67-1.5-1.5v-7c0-.83.67-1.5 1.5-1.5h6c.83 0 1.5.67 1.5 1.5v7zm-2.5-5.5h-4v4h4v-4z" />
        </svg>
      </div>
    );
  }

  // 7. Snap Inc. / Snapchat
  if (cleanName.includes("snap") || cleanName === "snapchat") {
    return (
      <div
        className={`bg-[#FFFC00] text-black border border-black/10 shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Snap Inc."
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.015 2.1c-3.58 0-6.05 2.68-6.05 6.27 0 .86.2 2.05.62 3.12-.4.18-.88.42-1.35.7-.58.34-.84.66-.75 1.01.12.44.82.68 1.43.83.08.31.25.96.65 1.34.62.59 1.48.51 2.34.42.5-.05 1.05-.11 1.62.15.54.25.99.78 1.51 1.38.8.93 1.83 2.13 3.93 2.13 2.11 0 3.14-1.2 3.94-2.13.52-.6 1.02-1.13 1.56-1.38.56-.26 1.06-.2 1.57-.15.86.09 1.72.17 2.34-.42.4-.38.57-1.03.65-1.34.61-.15 1.31-.39 1.43-.83.09-.35-.17-.67-.75-1.01-.47-.28-.95-.52-1.35-.7.42-1.07.62-2.26.62-3.12 0-3.59-2.47-6.27-6.05-6.27z" />
        </svg>
      </div>
    );
  }

  // 8. TikTok
  if (cleanName.includes("tiktok") || cleanName === "tt") {
    return (
      <div
        className={`bg-black text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="TikTok"
      >
        <svg className={iconSizes} viewBox="0 0 24 24">
          <path
            fill="#00F2FE"
            d="M19.5 7.05a5.53 5.53 0 0 1-3.6-1.58v7.28a5.25 5.25 0 1 1-5.25-5.25c.34 0 .66.04.98.11v2.73a2.53 2.53 0 1 0 1.57 2.41V2h2.7a5.5 5.5 0 0 0 3.6 5.05z"
          />
          <path
            fill="#FE2C55"
            d="M19.1 6.65a5.53 5.53 0 0 1-3.6-1.58v7.28a5.25 5.25 0 1 1-5.25-5.25c.34 0 .66.04.98.11v2.73a2.53 2.53 0 1 0 1.57 2.41V2h2.7a5.5 5.5 0 0 0 3.6 4.65z"
            opacity="0.85"
          />
          <path
            fill="#FFFFFF"
            d="M19.3 6.85a5.53 5.53 0 0 1-3.6-1.58v7.28a5.25 5.25 0 1 1-5.25-5.25c.34 0 .66.04.98.11v2.73a2.53 2.53 0 1 0 1.57 2.41V2h2.7a5.5 5.5 0 0 0 3.6 4.85z"
          />
        </svg>
      </div>
    );
  }

  // 9. CockroachLabs / CockroachDB
  if (cleanName.includes("cockroach") || cleanName === "cr") {
    return (
      <div
        className={`bg-[#0C6967] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="CockroachLabs"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.69 2 6 4.69 6 8v3.5l-2.2 1.1a1 1 0 0 0-.4 1.34l1.5 2.6a1 1 0 0 0 1.34.4L8 16v2a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2l1.76.88a1 1 0 0 0 1.34-.4l1.5-2.6a1 1 0 0 0-.4-1.34L18 11.5V8c0-3.31-2.69-6-6-6zm-2 9V8c0-1.1.9-2 2-2s2 .9 2 2v3h-4zm4 5h-4v-2h4v2z" />
        </svg>
      </div>
    );
  }

  // 10. ScaleOps
  if (cleanName.includes("scaleops") || cleanName === "so") {
    return (
      <div
        className={`bg-[#051C19] border border-[#00D4BE]/30 text-[#00D4BE] shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="ScaleOps"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      </div>
    );
  }

  // 11. Johnson & Johnson
  if (cleanName.includes("johnson") || cleanName === "j&j") {
    return (
      <div
        className={`bg-[#D51900] text-white shadow-2xs flex items-center justify-center shrink-0 font-serif font-black tracking-tighter ${sizeClasses} ${className}`}
        title="Johnson & Johnson"
      >
        <span className="font-extrabold tracking-tight">J&amp;J</span>
      </div>
    );
  }

  // 12. Granite
  if (cleanName.includes("granite")) {
    return (
      <div
        className={`bg-[#1E3A2F] text-emerald-300 shadow-2xs flex items-center justify-center shrink-0 border border-emerald-500/20 ${sizeClasses} ${className}`}
        title="Granite"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
      </div>
    );
  }

  // 13. U.S. Coast Guard
  if (cleanName.includes("coast guard") || cleanName.includes("uscg")) {
    return (
      <div
        className={`bg-[#0B2545] text-amber-300 shadow-2xs flex items-center justify-center shrink-0 border border-amber-400/30 ${sizeClasses} ${className}`}
        title="U.S. Coast Guard"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8c-3.87 0-7 3.13-7 7v1h2v-1c0-2.76 2.24-5 5-5s5 2.24 5 5v1h2v-1c0-3.87-3.13-7-7-7zm-1 9v3H9v-3H4v2c0 3.31 2.69 6 6 6s6-2.69 6-6v-2h-5z" />
        </svg>
      </div>
    );
  }

  // 14. Amazon
  if (cleanName.includes("amazon") || cleanName === "amzn") {
    return (
      <div
        className={`bg-[#131921] text-[#FF9900] shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Amazon"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.9 12.3c-.1-.7-.4-1.2-.8-1.5-.4-.3-1-.5-1.7-.5-.7 0-1.3.2-1.7.5-.4.3-.7.8-.8 1.5h5zm-7.6 5.8c2.9 1.9 6.8 2.2 10.3 1 1.1-.4 2.2-1 3.1-1.8.3-.2.3-.6.1-.8s-.6-.2-.8.1c-.8.7-1.8 1.2-2.8 1.6-3.1 1.1-6.6.9-9.3-.8-.3-.2-.7-.1-.9.2s0 .6.3.7z" />
        </svg>
      </div>
    );
  }

  // 15. Microsoft
  if (cleanName.includes("microsoft") || cleanName === "msft") {
    return (
      <div
        className={`bg-white border border-zinc-200 shadow-2xs flex items-center justify-center shrink-0 p-1.5 ${sizeClasses} ${className}`}
        title="Microsoft"
      >
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          <div className="bg-[#F25022] rounded-xs" />
          <div className="bg-[#7FBA00] rounded-xs" />
          <div className="bg-[#00A4EF] rounded-xs" />
          <div className="bg-[#FFB900] rounded-xs" />
        </div>
      </div>
    );
  }

  // 16. Apple
  if (cleanName.includes("apple") || cleanName === "aapl") {
    return (
      <div
        className={`bg-zinc-950 text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Apple"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.76 1.04-1.82.93-2.87-.9.04-2 .6-2.64 1.36-.56.65-.99 1.73-.86 2.76 1.01.08 2-.51 2.57-1.25z" />
        </svg>
      </div>
    );
  }

  // 17. Netflix
  if (cleanName.includes("netflix")) {
    return (
      <div
        className={`bg-black text-[#E50914] shadow-2xs flex items-center justify-center shrink-0 font-black ${sizeClasses} ${className}`}
        title="Netflix"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2v20l5.5-2.5V4.5L4 2zm10.5 0v15l5.5 2.5V2l-5.5 0z" />
          <path d="M4 22l11-20h5L9 22H4z" fill="#B20710" />
        </svg>
      </div>
    );
  }

  // 18. Intel
  if (cleanName.includes("intel")) {
    return (
      <div
        className={`bg-[#0068B5] text-white shadow-2xs flex items-center justify-center shrink-0 font-mono font-black ${sizeClasses} ${className}`}
        title="Intel"
      >
        <span className="font-bold text-xs tracking-tighter">intel</span>
      </div>
    );
  }

  // 19. Cisco
  if (cleanName.includes("cisco")) {
    return (
      <div
        className={`bg-[#049FD9] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Cisco"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="11" width="2" height="6" rx="1" />
          <rect x="6" y="7" width="2" height="10" rx="1" />
          <rect x="10" y="4" width="2" height="13" rx="1" />
          <rect x="14" y="7" width="2" height="10" rx="1" />
          <rect x="18" y="11" width="2" height="6" rx="1" />
        </svg>
      </div>
    );
  }

  // 20. Capital One
  if (cleanName.includes("capital one")) {
    return (
      <div
        className={`bg-[#004879] text-white shadow-2xs flex items-center justify-center shrink-0 border border-red-500/30 ${sizeClasses} ${className}`}
        title="Capital One"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="#D03027" strokeWidth="3" strokeLinecap="round">
          <path d="M3 17C8 7 16 7 21 11" />
        </svg>
      </div>
    );
  }

  // 21. Garmin
  if (cleanName.includes("garmin")) {
    return (
      <div
        className={`bg-[#001489] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Garmin"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="#00D4BE">
          <polygon points="12 3 21 20 12 16 3 20 12 3" />
        </svg>
      </div>
    );
  }

  // 22. Epic Systems
  if (cleanName.includes("epic")) {
    return (
      <div
        className={`bg-[#BA0C2F] text-white shadow-2xs flex items-center justify-center shrink-0 font-bold ${sizeClasses} ${className}`}
        title="Epic Systems"
      >
        <span className="font-black tracking-widest text-xs">EPIC</span>
      </div>
    );
  }

  // 23. Enterprise Mobility
  if (cleanName.includes("enterprise")) {
    return (
      <div
        className={`bg-[#007A33] text-white shadow-2xs flex items-center justify-center shrink-0 font-black ${sizeClasses} ${className}`}
        title="Enterprise Mobility"
      >
        <span className="font-extrabold italic text-sm">e</span>
      </div>
    );
  }

  // 24. Radiant Digital
  if (cleanName.includes("radiant") || cleanName === "rd") {
    return (
      <div
        className={`bg-gradient-to-br from-[#FF6B00] to-[#EA580C] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Radiant Digital"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 25. Nelnet
  if (cleanName.includes("nelnet") || cleanName === "n") {
    return (
      <div
        className={`bg-[#007749] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Nelnet"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 3.8l5 3.1v6.2L12 18.2l-5-3.1V9l5-3.2z" />
        </svg>
      </div>
    );
  }

  // 26. DXC Technology
  if (cleanName.includes("dxc")) {
    return (
      <div
        className={`bg-[#5F259F] text-white shadow-2xs flex items-center justify-center shrink-0 font-black ${sizeClasses} ${className}`}
        title="DXC Technology"
      >
        <span className="font-extrabold tracking-tight text-xs">DXC</span>
      </div>
    );
  }

  // 27. Dev Technology Group
  if (cleanName.includes("dev technology") || cleanName === "dt") {
    return (
      <div
        className={`bg-[#0284C7] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Dev Technology Group"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>
    );
  }

  // 28. RideCo
  if (cleanName.includes("rideco") || cleanName === "rc") {
    return (
      <div
        className={`bg-[#2563EB] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="RideCo"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 16 14" />
        </svg>
      </div>
    );
  }

  // 29. Truveta
  if (cleanName.includes("truveta") || cleanName === "tv") {
    return (
      <div
        className={`bg-[#4338CA] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Truveta"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="18" r="3" />
          <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" />
          <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
          <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" />
        </svg>
      </div>
    );
  }

  // 30. Veritas Cloud
  if (cleanName.includes("veritas") || cleanName === "vc") {
    return (
      <div
        className={`bg-[#0891B2] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="Veritas Cloud"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
    );
  }

  // 31. NeuralFlow
  if (cleanName.includes("neuralflow") || cleanName === "nf") {
    return (
      <div
        className={`bg-gradient-to-tr from-[#0F766E] to-[#10B981] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="NeuralFlow"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 5-4 7 0" />
          <path d="M2 17c2.5-4 5-4 7.5 0s5 4 7.5 0 5-4 7 0" />
        </svg>
      </div>
    );
  }

  // 32. HyperScale Systems
  if (cleanName.includes("hyperscale") || cleanName === "hs" || cleanName === "ha") {
    return (
      <div
        className={`bg-gradient-to-tr from-[#312E81] via-[#4F46E5] to-[#00D4BE] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="HyperScale Systems"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
    );
  }

  // 33. ScyllaDB
  if (cleanName.includes("scylla") || cleanName === "cs") {
    return (
      <div
        className={`bg-[#002B49] text-[#00D4BE] border border-[#00D4BE]/30 shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="ScyllaDB"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M5 7l7 5 7-5M5 14l7 5 7-5" />
        </svg>
      </div>
    );
  }

  // 34. StreamDeploy
  if (cleanName.includes("streamdeploy") || cleanName === "sd") {
    return (
      <div
        className={`bg-gradient-to-tr from-[#0284C7] to-[#06B6D4] text-white shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="StreamDeploy"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 17 18 12 13 7" />
          <polyline points="6 17 11 12 6 7" />
        </svg>
      </div>
    );
  }

  // 35. MemCompute
  if (cleanName.includes("memcompute") || cleanName === "mc") {
    return (
      <div
        className={`bg-[#0F172A] text-[#38BDF8] border border-[#38BDF8]/30 shadow-2xs flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
        title="MemCompute"
      >
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
        </svg>
      </div>
    );
  }

  // Fallback: Modern stylized geometric corporate badge with brand initial
  const initials = (name || "SM")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`bg-gradient-to-br from-[#051C19] via-[#095964] to-[#0D3E35] text-white border border-[#00D4BE]/30 shadow-2xs flex items-center justify-center shrink-0 font-extrabold tracking-wider ${sizeClasses} ${className}`}
      title={name}
    >
      <span>{initials}</span>
    </div>
  );
};
