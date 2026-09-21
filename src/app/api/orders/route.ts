import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");

    if (orderNumber) {
      const order = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
      if (order.length === 0) {
        return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, order: order[0] });
    }

    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    return NextResponse.json({ success: true, orders: allOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Generate random order number like NEL-4921
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `NEL-${randomSuffix}`;

    const newOrder = await db.insert(orders).values({
      orderNumber,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail,
      suburb: body.suburb || "Nelspruit",
      streetAddress: body.streetAddress || "Nelspruit Central",
      city: body.city || "Nelspruit",
      deliveryMethod: body.deliveryMethod || "same_day_nelspruit",
      paymentMethod: body.paymentMethod || "instant_eft",
      items: body.items,
      subtotal: Number(body.subtotal),
      discount: Number(body.discount || 0),
      shippingFee: Number(body.shippingFee || 0),
      total: Number(body.total),
      status: "Processing",
      notes: body.notes || "",
    }).returning();

    return NextResponse.json({ success: true, order: newOrder[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }

    const updated = await db.update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();

    return NextResponse.json({ success: true, order: updated[0] });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 });
  }
}
