"use client";

import { useState, useEffect } from "react";
import { X, ShoppingBag, Calendar, PlusCircle, CheckCircle, Clock, Truck, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";
import { Order, Appointment, Product } from "@/types";
import { soundFX } from "@/utils/audio";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (product: Product) => void;
}

export default function AdminModal({
  isOpen,
  onClose,
  onProductCreated,
}: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "appointments" | "add-product">("orders");
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // New product form
  const [newProd, setNewProd] = useState({
    name: "",
    category: "glueless-wigs",
    price: 850,
    originalPrice: 1100,
    badge: "Nelspruit Fresh Drop 🔥",
    description: "",
    blendDetails: "70% Virgin Human Cuticle + 30% Lowveld Heat Memory Silk",
    length: "26 Inch",
    image: "/images/hero-hair-baddie.jpg",
  });
  const [creatingProd, setCreatingProd] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordRes, appRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/appointments"),
      ]);
      const ordData = await ordRes.json();
      const appData = await appRes.json();

      if (ordData.success) setOrdersList(ordData.orders);
      if (appData.success) setAppointmentsList(appData.appointments);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    soundFX.playPop();
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrdersList((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingProd(true);
    soundFX.playSparkle();

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProd,
          price: Number(newProd.price),
          originalPrice: Number(newProd.originalPrice),
          lengths: ["20 Inch", "24 Inch", "26 Inch", "30 Inch"],
          colors: ["Natural 1B", "Honey Blonde #4/27", "Copper Ginger"],
        }),
      });

      const data = await res.json();
      if (data.success && data.product) {
        onProductCreated(data.product);
        alert("Product added successfully!");
        setActiveTab("orders");
        setNewProd({
          name: "",
          category: "glueless-wigs",
          price: 850,
          originalPrice: 1100,
          badge: "Nelspruit Fresh Drop 🔥",
          description: "",
          blendDetails: "70% Virgin Human Cuticle + 30% Lowveld Heat Memory Silk",
          length: "26 Inch",
          image: "/images/hero-hair-baddie.jpg",
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreatingProd(false);
    }
  };

  if (!isOpen) return null;

  const totalRevenue = ordersList.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-gray-300 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-black uppercase">
                Nelspruit Hub Admin
              </span>
              <button
                onClick={fetchData}
                className="text-xs text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer"
                title="Refresh database"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#2B172A] font-serif mt-1">
              Store & Appointment Operations
            </h2>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-gray-50 p-2.5 rounded-2xl border border-gray-200 text-xs">
            <div>
              <p className="text-gray-500">Total Orders</p>
              <p className="font-bold text-sm text-gray-900">{ordersList.length}</p>
            </div>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <p className="text-gray-500">Total Sales</p>
              <p className="font-mono font-bold text-sm text-emerald-600">R{totalRevenue}</p>
            </div>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <p className="text-gray-500">Studio Fittings</p>
              <p className="font-bold text-sm text-purple-700">{appointmentsList.length}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-[#2B172A] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Customer Orders ({ordersList.length})
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "appointments"
                ? "bg-[#2B172A] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Studio Appointments ({appointmentsList.length})
          </button>

          <button
            onClick={() => setActiveTab("add-product")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "add-product"
                ? "bg-[#2B172A] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            Add Hair Drop
          </button>
        </div>

        {/* Tab 1: Orders List */}
        {activeTab === "orders" && (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {ordersList.length > 0 ? (
              ordersList.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-rose-700 text-sm">
                        #{ord.orderNumber}
                      </span>
                      <span className="font-bold text-gray-900">{ord.customerName}</span>
                      <span className="text-gray-500 font-mono">({ord.customerPhone})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-500">Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-300 font-bold bg-white text-xs cursor-pointer focus:ring-1 focus:ring-rose-400"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Ready For Pickup">Ready For Pickup</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-gray-600">
                    <div>
                      <span className="font-semibold text-gray-800">Suburb:</span> {ord.suburb}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Delivery:</span>{" "}
                      {ord.deliveryMethod === "store_pickup_sonpark" ? "Sonpark Pickup" : "Door-to-Door"}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Total:</span>{" "}
                      <strong className="text-emerald-700 font-mono">R{ord.total}</strong>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="bg-white p-2.5 rounded-xl border border-gray-200 space-y-1">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px]">
                        <span className="text-gray-800 font-medium">
                          {it.quantity}x {it.name} ({it.length}, {it.color})
                        </span>
                        <span className="font-mono text-gray-600 font-bold">R{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {ord.notes && (
                    <p className="text-[11px] text-gray-500 italic">
                      Note from buyer: &quot;{ord.notes}&quot;
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center py-8">No orders found yet.</p>
            )}
          </div>
        )}

        {/* Tab 2: Appointments */}
        {activeTab === "appointments" && (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {appointmentsList.length > 0 ? (
              appointmentsList.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#2B172A]">{app.customerName}</span>
                      <span className="text-gray-500 font-mono">({app.customerPhone})</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {app.status}
                      </span>
                    </div>
                    <p className="text-purple-700 font-bold">{app.service}</p>
                    <p className="text-gray-500">
                      📅 {app.preferredDate} at ⏰ {app.preferredTime}
                    </p>
                    {app.notes && (
                      <p className="text-gray-600 italic text-[11px]">&quot;{app.notes}&quot;</p>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/${app.customerPhone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 self-start sm:self-auto shrink-0"
                  >
                    WhatsApp Client
                  </a>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center py-8">No appointments scheduled.</p>
            )}
          </div>
        )}

        {/* Tab 3: Add Hair Product */}
        {activeTab === "add-product" && (
          <form onSubmit={handleCreateProduct} className="space-y-3 text-xs sm:text-sm max-h-96 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 32 Inch French Curl Blend Unit"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white font-medium focus:ring-2 focus:ring-rose-400 focus:outline-none"
                >
                  <option value="glueless-wigs">Glueless Wigs</option>
                  <option value="bundles">3-Bundle Packs</option>
                  <option value="colored">Sunset & Colored Blends</option>
                  <option value="bobs">Bobs & Pixies</option>
                  <option value="ponytails">Drawstring Ponytails</option>
                  <option value="care">Care & Styling</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Price in ZAR (R) *</label>
                <input
                  type="number"
                  required
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Original Price (R)</label>
                <input
                  type="number"
                  value={newProd.originalPrice}
                  onChange={(e) => setNewProd({ ...newProd, originalPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={newProd.badge}
                  onChange={(e) => setNewProd({ ...newProd, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description *</label>
              <textarea
                required
                rows={2}
                placeholder="Product description and Nelspruit heat features..."
                value={newProd.description}
                onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={newProd.image}
                onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={creatingProd}
              className="w-full py-3 rounded-2xl sunset-gradient text-white font-bold text-sm shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              {creatingProd ? "Adding Drop..." : "Publish Hair Drop to Store 🚀"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
