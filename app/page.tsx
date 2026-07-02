import { Header } from "@/components/Header";
import { HeroSection } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/Services";
import { AboutSection } from "@/components/sections/About";
import { PortfolioSection } from "@/components/sections/Portfolio";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/Contact";
import { CTASection } from "@/components/sections/Cta";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCta";
import { SectionDivider } from "@/components/section-divider";
import { TechMarquee } from "@/components/tech-marquee";

export default function HomePage() 
{
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <TechMarquee />
                <SectionDivider variant="code" />
                <ServicesSection />
                <SectionDivider variant="wave" />
                <AboutSection />
                <SectionDivider variant="dots" />
                <PortfolioSection />
                <SectionDivider variant="code" />
                <TestimonialsSection />
                <SectionDivider variant="wave" />
                <ContactSection />
                <CTASection />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    );
}
