import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard | Arabesque by Mimo",
  description: "Restaurant management dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning style={{ minHeight: "100vh", background: "#060503" }}>
      {children}
    </div>
  );
}
