import { NextResponse } from "next/server";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
    return NextResponse.json({ success: true, appointments: list });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newAppointment = await db.insert(appointments).values({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail,
      service: body.service || "Wig Fitting & Lace Tinting",
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      suburb: body.suburb || "Nelspruit",
      notes: body.notes || "",
      status: "Confirmed",
    }).returning();

    return NextResponse.json({ success: true, appointment: newAppointment[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ success: false, error: "Failed to book appointment" }, { status: 500 });
  }
}
