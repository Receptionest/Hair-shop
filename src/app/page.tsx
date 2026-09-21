"use client";

import { useState, useEffect } from "react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HumidityChamber from "@/components/HumidityChamber";
import CrownStudio from "@/components/CrownStudio";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import BlendCareGuide from "@/components/BlendCareGuide";
import BaddiesWall from "@/components/BaddiesWall";
import NelspruitDeliveryBanner from "@/components/NelspruitDeliveryBanner";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import OrderConfirmationModal from "@/components/OrderConfirmationModal";
import StudioBookingModal from "@/components/StudioBookingModal";
import HairQuizModal from "@/components/HairQuizModal";
import Soundboard from "@/components/Soundboard";
import AdminModal from "@/components/AdminModal";
import Footer from "@/components/Footer";
import { Product, CartItem, Order, Review } from "@/types";
import { MessageCircle, Sparkles, Volume2 } from "lucide-react";
import { soundFX } from "@/utils/audio";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [soundboardOpen, setSoundboardOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Checkout pricing state
  const [checkoutPricing, setCheckoutPricing] = useState({
    discount: 0,
    shippingFee: 60,
    couponCode: "",
    deliveryMethod: "same_day_nelspruit",
  });

  // Load products & reviews on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, revRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/reviews"),
        ]);
        const prodData = await prodRes.json();
        const revData = await revRes.json();

        if (prodData.success) {
          setProducts(prodData.products);
        }
        if (revData.success) {
          setReviews(revData.reviews);
        }
      } catch (err) {
        console.error("Error loading store data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();

    // Load saved cart from localStorage
    try {
      const saved = localStorage.getItem("mane_tropics_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem("mane_tropics_cart", JSON.stringify(newCart));
    } catch {
      // ignore
    }
  };

  const handleAddToCart = (item: CartItem) => {
    const existingIndex = cart.findIndex(
      (c) => c.id === item.id && c.length === item.length && c.color === item.color
    );
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += item.quantity;
      saveCart(updated);
    } else {
      saveCart([...cart, item]);
    }
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, length: string, color: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id, length, color);
      return;
    }
    const updated = cart.map((item) =>
      item.id === id && item.length === length && item.color === color
        ? { ...item, quantity: qty }
        : item
    );
    saveCart(updated);
  };

  const handleRemoveItem = (id: number, length: string, color: string) => {
    const updated = cart.filter(
      (item) => !(item.id === id && item.length === length && item.color === color)
    );
    saveCart(updated);
  };

  const handleProceedToCheckout = (
    discountAmount: number,
    shippingCost: number,
    coupon: string,
    deliveryType: string
  ) => {
    setCheckoutPricing({
      discount: discountAmount,
      shippingFee: shippingCost,
      couponCode: coupon,
      deliveryMethod: deliveryType,
    });
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderComplete = (order: Order) => {
    setCheckoutOpen(false);
    setConfirmedOrder(order);
    saveCart([]); // Clear cart
  };

  const handleProductCreated = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5]">
      {/* Top promotional bar */}
      <TopBanner onOpenQuiz={() => setQuizOpen(true)} />

      {/* Main navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenQuiz={() => setQuizOpen(true)}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenSoundboard={() => setSoundboardOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenQuiz={() => setQuizOpen(true)}
        onOpenBooking={() => setBookingOpen(true)}
        onExploreShop={() => {
          const el = document.getElementById("shop");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Signature Feature 1: The Lowveld Heat & Humidity Stress Chamber */}
      <HumidityChamber />

      {/* Signature Feature 2: Interactive Crown Studio (Wig Customizer) */}
      <CrownStudio onAddToCart={handleAddToCart} />

      {/* Product Catalog with Categories & Search */}
      <ProductGrid
        products={products}
        onQuickView={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

      {/* Human Hair Blend Care & Longevity Masterclass */}
      <BlendCareGuide />

      {/* Nelspruit Baddies Wall of Fame & Customer Testimonials */}
      <BaddiesWall initialReviews={reviews} />

      {/* Nelspruit & Lowveld Delivery Breakdown */}
      <NelspruitDeliveryBanner />

      {/* Footer */}
      <Footer
        onOpenBooking={() => setBookingOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenSoundboard={() => setSoundboardOpen(true)}
      />

      {/* Floating Quick Action: Soundboard & WhatsApp */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => {
            soundFX.playSparkle();
            setSoundboardOpen(true);
          }}
          className="w-12 h-12 rounded-full sunset-gradient text-white shadow-xl shadow-orange-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white"
          title="Open Slay Soundboard"
        >
          <Volume2 className="w-5 h-5 text-amber-200" />
        </button>

        <a
          href="https://wa.me/27720000000?text=Hi%20Mane%20Tropics%20Nelspruit!%20I'm%20looking%20for%20a%20human%20hair%20blend%20unit."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFX.playPop()}
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white"
          title="Chat with Nelspruit Stylist on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        discount={checkoutPricing.discount}
        shippingFee={checkoutPricing.shippingFee}
        couponCode={checkoutPricing.couponCode}
        deliveryMethod={checkoutPricing.deliveryMethod}
        onOrderComplete={handleOrderComplete}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      <HairQuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        products={products}
        onAddToCart={handleAddToCart}
      />

      <StudioBookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenBooking={() => setBookingOpen(true)}
      />

      <Soundboard
        isOpen={soundboardOpen}
        onClose={() => setSoundboardOpen(false)}
      />

      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onProductCreated={handleProductCreated}
      />
    </div>
  );
}
