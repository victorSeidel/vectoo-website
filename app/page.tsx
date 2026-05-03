import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { AboutSection } from "@/components/sections/about";
import { PortfolioSection } from "@/components/sections/portfolio";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ContactSection } from "@/components/sections/contact";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
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
