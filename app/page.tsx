import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import PromotionsSection from "@/components/sections/PromotionsSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedDishes from "@/components/sections/FeaturedDishes";
import MenuSection from "@/components/sections/MenuSection";
import GallerySection from "@/components/sections/GallerySection";
import OrderSection from "@/components/sections/OrderSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PromotionsSection />
      <AboutSection />
      <FeaturedDishes />
      <MenuSection />
      <GallerySection />
      <OrderSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
