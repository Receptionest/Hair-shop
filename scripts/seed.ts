import { seedDatabase } from "../src/db/seed";

async function main() {
  console.log("Starting seed...");
  await seedDatabase();
  console.log("Seeding finished successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
