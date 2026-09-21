import { NextResponse } from "next/server";
import { db } from "@/db";
import { quizLeads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, vibe, lifestyle, length, texture } = body;

    let recommended = "The Lowveld Bounce 28\" Wet & Wavy HD Glueless Unit";
    if (texture === "straight" || lifestyle === "corporate") {
      recommended = "Mbombela Bone Straight 30\" Glass Hair 13x4 Frontal Unit";
    } else if (vibe === "bold_color") {
      recommended = "Sunset In Steiltes 24\" Copper Ginger #350 Deep Wave";
    } else if (length === "short") {
      recommended = "Riverside Royalty 10\" Asymmetrical Blunt Cut Bob";
    } else if (lifestyle === "active") {
      recommended = "2-Minute Slay 26\" Drawstring Ponytail & Wrap";
    }

    const saved = await db.insert(quizLeads).values({
      name: name || "Lowveld Baddie",
      phone: phone || "0000000000",
      vibe: vibe || "natural",
      lifestyle: lifestyle || "flexible",
      length: length || "long",
      texture: texture || "curly",
      recommendedProduct: recommended,
      couponCode: "NELSPRUITBADDIE",
    }).returning();

    return NextResponse.json({
      success: true,
      recommendation: recommended,
      couponCode: "NELSPRUITBADDIE",
      leadId: saved[0].id,
    });
  } catch (error) {
    console.error("Quiz error:", error);
    return NextResponse.json({ success: false, error: "Failed to process quiz" }, { status: 500 });
  }
}
