import ContactSection from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Asif Mahmud",
  description: "Get in touch with Asif Mahmud for AI engineering and full-stack development opportunities.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <ContactSection />
    </div>
  );
}
