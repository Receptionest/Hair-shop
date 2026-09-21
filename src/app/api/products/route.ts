import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    // Ensure database has initial data
    let allProducts = await db.select().from(products).orderBy(desc(products.id));
    if (allProducts.length === 0) {
      await seedDatabase();
      allProducts = await db.select().from(products).orderBy(desc(products.id));
    }

    let filtered = allProducts;
    if (category && category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (featured === "true") {
      filtered = filtered.filter((p) => p.featured);
    }

    return NextResponse.json({ success: true, products: filtered });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = await db.insert(products).values({
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: body.category || "glueless-wigs",
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
      rating: body.rating || "5.0",
      reviewCount: body.reviewCount ? Number(body.reviewCount) : 1,
      image: body.image,
      badge: body.badge || "New Nelspruit Drop 🔥",
      description: body.description,
      blendDetails: body.blendDetails || "70% Human Hair + 30% Heat-Safe Protein Silk",
      length: body.length || "26 Inch",
      lengths: body.lengths || ["20 Inch", "24 Inch", "28 Inch"],
      colors: body.colors || ["Natural 1B Jet Black"],
      capType: body.capType || "5x5 HD Glueless Closure",
      heatLimit: body.heatLimit || "Safe up to 200°C",
      inStock: body.inStock ?? true,
      featured: body.featured ?? false,
    }).returning();

    return NextResponse.json({ success: true, product: newProduct[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}
