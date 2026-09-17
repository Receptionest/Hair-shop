import { db } from "@/db";
import { products, testimonials } from "@/db/schema";
import { count } from "drizzle-orm";

const seedProducts = [
  {
    slug: "silky-straight",
    name: "Silky Straight",
    tagline: "The grow-out legend",
    category: "bundles",
    description:
      "Our ride-or-die straight blend. Flat-irons like a dream, holds a curl for days, and moves like it grew from your head. 100% human hair blend, double-drawn and tangle-tested.",
    image: "/images/products/straight.jpg",
    badge: "Best seller",
    bg: "#FFD23F",
    options: [
      { label: '12"', price: 480 },
      { label: '14"', price: 560 },
      { label: '16"', price: 640 },
      { label: '18"', price: 720 },
      { label: '20"', price: 800 },
      { label: '22"', price: 910 },
      { label: '24"', price: 1030 },
      { label: '26"', price: 1150 },
    ],
    featured: true,
    sort: 1,
  },
  {
    slug: "body-wave",
    name: "Body Wave",
    tagline: "The S-curve queen",
    category: "bundles",
    description:
      "Soft, romantic waves that drop into a gorgeous looseness after the first wash. The one your auntie will try to borrow. Permanent side-eye included at no extra cost.",
    image: "/images/products/bodywave.jpg",
    badge: "Crowd fave",
    bg: "#C9B6FF",
    options: [
      { label: '12"', price: 520 },
      { label: '14"', price: 600 },
      { label: '16"', price: 690 },
      { label: '18"', price: 780 },
      { label: '20"', price: 870 },
      { label: '22"', price: 990 },
      { label: '24"', price: 1120 },
      { label: '26"', price: 1250 },
    ],
    featured: false,
    sort: 2,
  },
  {
    slug: "kinky-curly",
    name: "Kinky Curly",
    tagline: "Maximum volume, zero vuss",
    category: "bundles",
    description:
      "Big, springy, unbothered curls for the natural-hair girlies who want drama without the damage. Fluff it out or keep it defined — either way, heads will turn at Crossing Mall.",
    image: "/images/products/kinky.jpg",
    badge: "Newie",
    bg: "#9BF0C0",
    options: [
      { label: '12"', price: 560 },
      { label: '14"', price: 650 },
      { label: '16"', price: 740 },
      { label: '18"', price: 830 },
      { label: '20"', price: 940 },
      { label: '22"', price: 1060 },
      { label: '24"', price: 1200 },
      { label: '26"', price: 1350 },
    ],
    featured: false,
    sort: 3,
  },
  {
    slug: "baddie-bob",
    name: "The Baddie Bob",
    tagline: "Chop, but make it reversible",
    category: "wigs",
    description:
      "A glueless 13x4 bob unit with a blunt cut sharper than your comebacks. Put her on, adjust the straps, walk out. Glueless means glueless, my love.",
    image: "/images/products/bobwig.jpg",
    badge: "Glueless",
    bg: "#FF9E5E",
    options: [
      { label: '8"', price: 1150 },
      { label: '10"', price: 1350 },
      { label: '12"', price: 1550 },
    ],
    featured: true,
    sort: 4,
  },
  {
    slug: "mermaid-unit",
    name: "The Mermaid Unit",
    tagline: "27 inches of main character",
    category: "wigs",
    description:
      "Honey-balayage waves down to your back pockets. Lace front, pre-plucked, pre-everything. People will ask if it's yours. It is now.",
    image: "/images/products/longwig.jpg",
    badge: "Steal the show",
    bg: "#FFB3C7",
    options: [
      { label: '22"', price: 1890 },
      { label: '26"', price: 2290 },
      { label: "30\" (babe…)", price: 2690 },
    ],
    featured: false,
    sort: 5,
  },
  {
    slug: "hd-frontal",
    name: "HD Lace Frontal 13×4",
    tagline: "Invisible, babes. Invisible.",
    category: "lace",
    description:
      "Ear-to-ear HD lace that melts into every skin tone, pre-plucked with baby hairs. Your 'this is my natural hair' era starts here.",
    image: "/images/products/frontal.jpg",
    badge: "HD lace",
    bg: "#A8D8FF",
    options: [
      { label: '12"', price: 1250 },
      { label: '14"', price: 1380 },
      { label: '16"', price: 1520 },
      { label: '18"', price: 1690 },
    ],
    featured: false,
    sort: 6,
  },
  {
    slug: "hd-closure",
    name: "HD Lace Closure 4×4",
    tagline: "For the no-glue gang",
    category: "lace",
    description:
      "Low-commitment crown security. Free part, free middle, free soul — melt it, flip it, forget about it. The safest third wheel your bundles will ever have.",
    image: "/images/products/closure.jpg",
    badge: null,
    bg: "#B8E6B8",
    options: [
      { label: '10"', price: 690 },
      { label: '12"', price: 780 },
      { label: '14"', price: 880 },
      { label: '16"', price: 990 },
    ],
    featured: false,
    sort: 7,
  },
  {
    slug: "mswenko-set",
    name: "The Mswenko Set",
    tagline: "The full crowning, sorted",
    category: "bundles",
    description:
      "Three silky-straight bundles plus a 13×4 HD frontal, length-matched by our team. One bag, whole look, pension-day price. You bring the outfit.",
    image: "/images/hero.jpg",
    badge: "Save R480",
    bg: "#FF7BAC",
    options: [
      { label: '16" + 14" + 12"', price: 1899 },
      { label: '20" + 18" + 16"', price: 2349 },
      { label: '26" + 24" + 22"', price: 2999 },
    ],
    featured: true,
    sort: 8,
  },
  {
    slug: "glow-serum",
    name: "Argan Glow Serum",
    tagline: "The polish after the party",
    category: "care",
    description:
      "Two drops of this Moroccan argan blend and your unit goes from 'okay' to 'oh OKAY'. Heat protect to 180°C, smells like a holiday in Durban.",
    image: "/images/products/serum.jpg",
    badge: "Add it, trust",
    bg: "#FFD9B8",
    options: [{ label: "50ml", price: 120 }],
    featured: false,
    sort: 9,
  },
];

const seedTestimonials = [
  {
    author: "Thandi M.",
    from: "KaNyamazane",
    style: "26\" Silky Straight",
    quote:
      "Caught a taxi with the box still sealed and by festival weekend I looked like the main act. Two years later and she still flat-irons bone straight.",
    rating: 5,
    sort: 1,
  },
  {
    author: "Naledi K.",
    from: "White River",
    style: "The Baddie Bob",
    quote:
      "I said 'I want to look expensive but pay like a student'. The bob understood the assignment. My ex saw me at Spar and I kept walking.",
    rating: 5,
    sort: 2,
  },
  {
    author: "Sibongile N.",
    from: "Nelspruit CBD",
    style: "Kinky Curly",
    quote:
      "Lay-bye'd three bundles on a Tuesday, collected on payday, installed upstairs on a Saturday. Sharp sharp, zero stress, all crowns.",
    rating: 5,
    sort: 3,
  },
  {
    author: "Lerato D.",
    from: "Hazyview",
    style: "The Mswenko Set",
    quote:
      "The girls melt the lace like they're defusing something. Baby hairs laid like they're applying for a job. Worth every rand.",
    rating: 5,
    sort: 4,
  },
  {
    author: "Ayanda P.",
    from: "Nelspruit Central",
    style: "Body Wave",
    quote:
      "Wore Body Wave to a wedding at a lodge near Kruger. Humidity tried me. The wave simply waved back. 10/10.",
    rating: 5,
    sort: 5,
  },
  {
    author: "Karabo S.",
    from: "Kamagugu",
    style: "HD Frontal 13×4",
    quote:
      "My gogo genuinely asked when my hair 'quickly grew'. I simply said the ancestors favour me. The HD and I know the truth.",
    rating: 5,
    sort: 6,
  },
  {
    author: "Zanele T.",
    from: "Pine Lake",
    style: "22\" Silky Straight",
    quote:
      "Delivery came faster than my weekend plans change. Free delivery over R800 in Mbombela is not a deal, it's a love language.",
    rating: 5,
    sort: 7,
  },
  {
    author: "Nompumelelo G.",
    from: "Matsulu",
    style: "The Baddie Bob",
    quote:
      "Walked in for serum, walked out with a bob and a personality upgrade. The vibes in that shop should be prescribed by doctors.",
    rating: 5,
    sort: 8,
  },
];

export async function ensureSeeded() {
  try {
    const [{ value }] = await db.select({ value: count() }).from(products);
    if (value > 0) return;
    await db.insert(products).values(seedProducts).onConflictDoNothing();
    await db.insert(testimonials).values(seedTestimonials).onConflictDoNothing();
  } catch (error) {
    console.error("Seeding failed", error);
  }
}
