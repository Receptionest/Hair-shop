import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    const allReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
    return NextResponse.json({ success: true, reviews: allReviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.action === "like" && body.id) {
      const updated = await db.update(reviews)
        .set({ likesCount: sql`${reviews.likesCount} + 1` })
        .where(eq(reviews.id, body.id))
        .returning();
      return NextResponse.json({ success: true, review: updated[0] });
    }

    const newReview = await db.insert(reviews).values({
      customerName: body.customerName,
      suburb: body.suburb || "Nelspruit",
      rating: Number(body.rating || 5),
      wigStyle: body.wigStyle || "Lowveld Blend Unit",
      comment: body.comment,
      verifiedLocation: body.verifiedLocation || "Nelspruit, Mpumalanga",
      likesCount: 1,
    }).returning();

    return NextResponse.json({ success: true, review: newReview[0] }, { status: 201 });
  } catch (error) {
    console.error("Error saving review:", error);
    return NextResponse.json({ success: false, error: "Failed to save review" }, { status: 500 });
  }
}
