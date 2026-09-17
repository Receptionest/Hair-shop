import { db } from "@/db";
import { products, testimonials } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { asc } from "drizzle-orm";
import { CartProvider } from "@/components/Cart";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Shop, ShopCta } from "@/components/Shop";
import { BlendBar } from "@/components/BlendBar";
import { Perks } from "@/components/Perks";
import { Testimonials } from "@/components/Testimonials";
import { Visit } from "@/components/Visit";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import type { Product, Testimonial } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  await ensureSeeded();

  const [productRows, testimonialRows] = await Promise.all([
    db.select().from(products).orderBy(asc(products.sort)),
    db.select().from(testimonials).orderBy(asc(testimonials.sort)),
  ]);

  const productData: Product[] = productRows.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    category: p.category,
    description: p.description,
    image: p.image,
    badge: p.badge,
    bg: p.bg,
    options: p.options,
    featured: p.featured,
    sort: p.sort,
  }));

  const testimonialData: Testimonial[] = testimonialRows.map((t) => ({
    id: t.id,
    author: t.author,
    from: t.from,
    style: t.style,
    quote: t.quote,
    rating: t.rating,
  }));

  return (
    <CartProvider>
      <div className="grain">
        <Header />
        <main>
          <Hero />
          <Shop products={productData} />
          <div className="bg-plum pb-20">
            <ShopCta />
          </div>
          <BlendBar products={productData} />
          <Perks />
          <Testimonials testimonials={testimonialData} />
          <Visit />
          <Faq />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
