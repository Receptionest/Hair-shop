"use client";

import { useState } from "react";
import { Heart, Star, Sparkles, MessageSquarePlus, CheckCircle2, MapPin, X } from "lucide-react";
import { Review } from "@/types";
import { soundFX } from "@/utils/audio";
import confetti from "canvas-confetti";

interface BaddiesWallProps {
  initialReviews: Review[];
}

export default function BaddiesWall({ initialReviews }: BaddiesWallProps) {
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [showAddModal, setShowAddModal] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  // Form state
  const [name, setName] = useState("");
  const [suburb, setSuburb] = useState("West Acres, Nelspruit");
  const [wigStyle, setWigStyle] = useState("The Lowveld Bounce 28\"");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const handleLike = async (id: number) => {
    if (likedMap[id]) return;
    soundFX.playPop();

    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likesCount: r.likesCount + 1 } : r))
    );

    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", id }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim()) return;

    setSubmitting(true);
    soundFX.playSparkle();

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          suburb,
          wigStyle,
          comment,
          rating,
          verifiedLocation: `${suburb} (Verified Nelspruit Slay)`,
        }),
      });

      const data = await res.json();
      if (data.success && data.review) {
        setReviewsList([data.review, ...reviewsList]);
        confetti({ particleCount: 50, spread: 60 });
        setShowAddModal(false);
        setName("");
        setComment("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#FAF7F5] border-t border-[#F5E6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 border border-pink-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              Lowveld Wall of Fame
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-[#2B172A] tracking-tight">
              Nelspruit Baddies Speak The Truth 💅
            </h2>
            <p className="text-xs sm:text-sm text-[#6C4A64] mt-1">
              Real reviews from real queens surviving Mbombela heat in style.
            </p>
          </div>

          <button
            onClick={() => {
              soundFX.playPop();
              setShowAddModal(true);
            }}
            className="px-5 py-2.5 rounded-2xl sunset-gradient text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-200" />
            Share Your Hair Story
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-orange-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header: Name & Stars */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#2B172A]">{rev.customerName}</h4>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {rev.suburb}
                    </p>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Wig Style Tag */}
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold mb-3 border border-rose-100">
                  Unit: {rev.wigStyle}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#4A3245] leading-relaxed italic">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              {/* Bottom: Verified Tag & Like Button */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Nelspruit Buyer
                </span>

                <button
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    likedMap[rev.id]
                      ? "bg-rose-100 text-rose-700 font-bold"
                      : "text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                  }`}
                  title="Like this slay"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${likedMap[rev.id] ? "fill-rose-500 text-rose-500" : ""}`}
                  />
                  <span className="text-xs">{rev.likesCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-[#2B172A] font-serif mb-1">
              Add Your Nelspruit Slay Review 👑
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              How did your human hair blend survive the Lowveld heat?
            </p>

            <form onSubmit={handleAddReview} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sindi Ndaba"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nelspruit Suburb</label>
                <input
                  type="text"
                  placeholder="e.g. Steiltes, Nelspruit"
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Wig / Bundle Style</label>
                <input
                  type="text"
                  placeholder="e.g. 28 Inch Wet & Wavy"
                  value={wigStyle}
                  onChange={(e) => setWigStyle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Review *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the bounce, the lace melt, and how people reacted in Nelspruit..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-2xl sunset-gradient text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Posting Review..." : "Publish My Slay Story ✨"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
