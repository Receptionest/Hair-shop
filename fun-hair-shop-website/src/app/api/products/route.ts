import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.select().from(products).orderBy(asc(products.sort));
  return NextResponse.json({ products: rows });
}
