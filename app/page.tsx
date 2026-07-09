import { Header } from "@/components/Landing Page/Sections/Header";
import { HeroSection } from "@/components/Landing Page/Sections/Hero";
import { ServicesSection } from "@/components/Landing Page/Sections/Services";
import { AboutSection } from "@/components/Landing Page/Sections/About";
import { PortfolioSection } from "@/components/Landing Page/Sections/Portfolio";
import { TestimonialsSection } from "@/components/Landing Page/Sections/Testimonials";
import { ContactSection } from "@/components/Landing Page/Sections/Contact";
import { CTASection } from "@/components/Landing Page/Sections/Cta";
import { Footer } from "@/components/Landing Page/Sections/Footer";
import { FloatingCTA } from "@/components/Landing Page/FloatingCta";
import { SectionDivider } from "@/components/Landing Page/SectionDivider";
import { TechMarquee } from "@/components/Landing Page/TechMarquee";

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