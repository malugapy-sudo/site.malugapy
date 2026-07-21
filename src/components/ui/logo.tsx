interface LogoProps {
  className?: string;
  isWhite?: boolean;
}

export function Logo({ className = "", isWhite = false }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/LogoMaluga.png"
        alt="Maluga Telecom"
        className={`h-12 w-auto object-contain ${isWhite ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
}
