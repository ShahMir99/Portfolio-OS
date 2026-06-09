import { Metadata } from "next";
import { Desktop } from "@/components/desktop/Desktop";

export const metadata: Metadata = {
  title: "Portfolio OS — Shah Mir, Full Stack Engineer",
  description:
    "An interactive desktop portfolio for full-stack engineer Shah Mir. Open windows, browse projects, and explore the file system.",
  openGraph: {
    title: "Portfolio OS — Shah Mir",
    description: "Interactive Windows-inspired developer portfolio.",
  },
};

export default function HomePage() {
  return <Desktop />;
}