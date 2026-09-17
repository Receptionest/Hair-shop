import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, type OrderItem } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      fulfillment?: string;
      items?: OrderItem[];
    };

    const name = (body.name ?? "").trim();
    const phone = (body.phone ?? "").trim().replace(/[^\d+]/g, "");
    const items = Array.isArray(body.items) ? body.items : [];
    const fulfillment = body.fulfillment === "delivery" ? "delivery" : "pickup";

    if (name.length < 2) {
      return NextResponse.json(
        { error: "We need your name to put on the bag, gorgeous." },
        { status: 400 },
      );
    }
    if (phone.length < 9) {
      return NextResponse.json(
        { error: "That number is looking shy — give us a real phone number." },
        { status: 400 },
      );
    }
    if (items.length === 0) {
      return NextResponse.json(
        { error: "Your crown bag is empty." },
        { status: 400 },
      );
    }

    const cleanItems = items
      .map((item) => ({
        name: String(item.name ?? "").slice(0, 120),
        option: String(item.option ?? "").slice(0, 60),
        qty: Math.max(1, Math.min(20, Number(item.qty) || 1)),
        price: Math.max(0, Number(item.price) || 0),
      }))
      .filter((item) => item.name && item.price > 0);

    if (cleanItems.length === 0) {
      return NextResponse.json(
        { error: "Your crown bag is empty." },
        { status: 400 },
      );
    }

    const total = cleanItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const code = `HRY-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const [inserted] = await db
      .insert(orders)
      .values({
        code,
        customerName: name.slice(0, 80),
        phone: phone.slice(0, 20),
        fulfillment,
        items: cleanItems,
        total,
      })
      .returning({ code: orders.code });

    return NextResponse.json({ code: inserted.code, total });
  } catch (error) {
    console.error("Order failed", error);
    return NextResponse.json(
      { error: "Eish, something glitched on our side. Try again?" },
      { status: 500 },
    );
  }
}
