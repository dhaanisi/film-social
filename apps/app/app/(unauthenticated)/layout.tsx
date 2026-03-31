import type { ReactNode } from "react";

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="dark relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#0a0a0a]">
    {/* Grid overlay */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(oklch(0.2 0.05 190) 1px, transparent 1px),
          linear-gradient(90deg, oklch(0.2 0.05 190) 1px, transparent 1px)
        `,
        backgroundSize: "4px 4px",
      }}
    />

    {/* Ambient glow */}
    <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] rounded-full bg-cyan/5 blur-[120px]" />

    <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center gap-6 px-6 py-10">
      {children}
    </div>
  </div>
);

export default AuthLayout;
