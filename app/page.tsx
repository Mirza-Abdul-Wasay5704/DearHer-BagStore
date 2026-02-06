// app/page.tsx — Homepage
import HeroSection from "@/components/HeroSection";
import GiftForHer from "@/components/GiftForHer";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandStory from "@/components/BrandStory";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GiftForHer />
      <FeaturedProducts />
      <BrandStory />
      <WhatsAppCTA />
    </>
  );
}
