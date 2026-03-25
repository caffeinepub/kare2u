import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Minus,
  PartyPopper,
  Phone,
  Play,
  Plus,
  Shield,
  ShoppingCart,
  Star,
  ThumbsUp,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { SiTiktok } from "react-icons/si";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const packages = [
  {
    id: "silver",
    name: "Silver",
    price: "$500",
    numPrice: 500,
    tag: "GREAT START",
    color: "border-gray-300",
    tagBg: "bg-gray-100 text-gray-600",
    items: [
      "1 Custom Backdrop",
      "Basic Decorations",
      "1 Fun Activity",
      "1 Food Station",
      "Up to 25 Guests",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "$1,200",
    numPrice: 1200,
    tag: "MOST POPULAR",
    color: "border-yellow-400",
    tagBg: "bg-yellow-400 text-yellow-900",
    featured: true,
    items: [
      "Custom Backdrop",
      "Full Decorations",
      "Bouncy House",
      "Photo Booth",
      "Game Truck",
      "Catered Food",
      "Photographer (2 hrs)",
      "Up to 75 Guests",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "$2,500",
    numPrice: 2500,
    tag: "ALL INCLUSIVE",
    color: "border-purple-400",
    tagBg: "bg-purple-100 text-purple-700",
    items: [
      "Everything in Gold",
      "360 Camera Booth",
      "Water Slide",
      "Food Truck",
      "Security Guards",
      "Live Activities",
      "Photographer (4 hrs)",
      "Up to 150 Guests",
    ],
  },
];

const rentals = [
  {
    id: "bouncy-house",
    name: "Bouncy House",
    price: "Starting at $250/day",
    numPrice: 250,
    img: "/assets/generated/bouncy-house.dim_600x400.jpg",
    desc: "Commercial-grade bounce houses for kids of all ages. Safe, clean, and full of fun.",
  },
  {
    id: "water-slide",
    name: "Water Slide",
    price: "Starting at $350/day",
    numPrice: 350,
    img: "/assets/generated/water-slide.dim_600x400.jpg",
    desc: "Beat the heat with our massive inflatable water slides — the highlight of any summer party.",
  },
  {
    id: "360-camera",
    name: "360 Camera Booth",
    price: "$400/event",
    numPrice: 400,
    img: "/assets/generated/360-camera.dim_600x400.jpg",
    desc: "Capture stunning slow-motion 360° videos your guests will share for years.",
  },
  {
    id: "photo-booth",
    name: "Photo Booth",
    price: "$300/event",
    numPrice: 300,
    img: "/assets/generated/photo-booth.dim_600x400.jpg",
    desc: "Premium photo booth with fun props, instant prints, and digital sharing.",
  },
  {
    id: "food-truck-rental",
    name: "Food Truck",
    price: "Starting at $500/event",
    numPrice: 500,
    img: "/assets/generated/food-truck.dim_600x400.jpg",
    desc: "Gourmet food truck catering with diverse menus tailored to your event.",
  },
  {
    id: "game-truck",
    name: "Game Truck",
    price: "$400/event",
    numPrice: 400,
    img: "/assets/generated/game-truck.dim_600x400.jpg",
    desc: "State-of-the-art mobile gaming lounge with the latest consoles and flat screens.",
  },
  {
    id: "decorations",
    name: "Decorations",
    price: "Starting at $150",
    numPrice: 150,
    img: "/assets/generated/decorations.dim_600x400.jpg",
    desc: "Theme-based balloon arches, centerpieces, lighting, and custom décor setups.",
  },
  {
    id: "backdrop",
    name: "Custom Backdrops",
    price: "Starting at $100",
    numPrice: 100,
    img: "/assets/generated/backdrop.dim_600x400.jpg",
    desc: "Stunning custom-printed backdrops designed to match any theme or color scheme.",
  },
  {
    id: "photographer",
    name: "Professional Photographer",
    price: "$350 / 2 hrs",
    numPrice: 350,
    img: "/assets/generated/photographer.dim_600x400.jpg",
    desc: "Experienced event photographers to capture every magical moment of your celebration.",
  },
  {
    id: "security",
    name: "Security Guards",
    price: "$200/guard/event",
    numPrice: 200,
    img: "/assets/generated/security.dim_600x400.jpg",
    desc: "Licensed and professional security personnel to keep your event safe and worry-free.",
  },
  {
    id: "activities",
    name: "Fun Activities",
    price: "Starting at $200",
    numPrice: 200,
    img: "/assets/generated/activities.dim_600x400.jpg",
    desc: "Face painting, carnival games, arts & crafts, and more curated party activities.",
  },
];

const foodTruckItems = [
  {
    id: "ft-tacos",
    name: "Street Tacos",
    price: 8,
    unit: "/person",
    img: "/assets/generated/food-truck-tacos.dim_600x400.jpg",
    desc: "Authentic street-style tacos with your choice of filling",
  },
  {
    id: "ft-sliders",
    name: "Gourmet Sliders",
    price: 9,
    unit: "/person",
    img: "/assets/generated/food-truck-sliders.dim_600x400.jpg",
    desc: "Juicy mini burgers loaded with fresh toppings",
  },
  {
    id: "ft-nachos",
    name: "Loaded Nachos",
    price: 7,
    unit: "/person",
    img: "/assets/generated/food-truck-nachos.dim_600x400.jpg",
    desc: "Crispy tortilla chips piled high with all the goods",
  },
  {
    id: "ft-wings",
    name: "Crispy Wings",
    price: 10,
    unit: "/person",
    img: "/assets/generated/food-truck-wings.dim_600x400.jpg",
    desc: "Perfectly seasoned wings in your choice of sauce",
  },
  {
    id: "ft-drinks",
    name: "Fresh Lemonade Bar",
    price: 5,
    unit: "/person",
    img: "/assets/generated/food-truck-drinks.dim_600x400.jpg",
    desc: "Refreshing house-made lemonades in fun flavors",
  },
  {
    id: "ft-fries",
    name: "Seasoned Fries",
    price: 5,
    unit: "/person",
    img: "/assets/generated/food-truck-fries.dim_600x400.jpg",
    desc: "Golden crispy fries tossed in signature seasoning",
  },
];

const cateringItems = [
  {
    id: "cat-bbq",
    name: "BBQ",
    price: 25,
    unit: "/person",
    img: "/assets/generated/catering-bbq.dim_600x400.jpg",
    desc: "Ribs, pulled pork, brisket & all the fixins",
  },
  {
    id: "cat-soul",
    name: "Soul Food",
    price: 22,
    unit: "/person",
    img: "/assets/generated/catering-soul-food.dim_600x400.jpg",
    desc: "Fried chicken, mac n cheese, collards & cornbread",
  },
  {
    id: "cat-mexican",
    name: "Mexican",
    price: 20,
    unit: "/person",
    img: "/assets/generated/catering-mexican.dim_600x400.jpg",
    desc: "Enchiladas, rice, beans, guac & fresh salsas",
  },
  {
    id: "cat-italian",
    name: "Italian",
    price: 23,
    unit: "/person",
    img: "/assets/generated/catering-italian.dim_600x400.jpg",
    desc: "Pasta, lasagna, garlic bread & antipasto",
  },
  {
    id: "cat-vegan",
    name: "Vegan",
    price: 18,
    unit: "/person",
    img: "/assets/generated/catering-vegan.dim_600x400.jpg",
    desc: "Fresh, colorful plant-based spread",
  },
  {
    id: "cat-seafood",
    name: "Seafood",
    price: 35,
    unit: "/person",
    img: "/assets/generated/catering-seafood.dim_600x400.jpg",
    desc: "Shrimp cocktail, crab legs & oysters on ice",
  },
];

const decorThemes = [
  {
    id: "pink-gold",
    name: "Pink & Gold",
    swatch: "linear-gradient(135deg, #f9a8d4 0%, #fbbf24 100%)",
    img: "/assets/generated/decor-pink-gold.dim_600x400.jpg",
  },
  {
    id: "blue-silver",
    name: "Blue & Silver",
    swatch: "linear-gradient(135deg, #60a5fa 0%, #d1d5db 100%)",
    img: "/assets/generated/decor-blue-silver.dim_600x400.jpg",
  },
  {
    id: "black-gold",
    name: "Black & Gold",
    swatch: "linear-gradient(135deg, #1f2937 0%, #fbbf24 100%)",
    img: "/assets/generated/decor-black-gold.dim_600x400.jpg",
  },
  {
    id: "tropical",
    name: "Tropical",
    swatch: "linear-gradient(135deg, #22c55e 0%, #fbbf24 50%, #f97316 100%)",
    img: "/assets/generated/decor-tropical.dim_600x400.jpg",
  },
  {
    id: "princess",
    name: "Princess",
    swatch: "linear-gradient(135deg, #c4b5fd 0%, #f5f3ff 100%)",
    img: "/assets/generated/decor-princess.dim_600x400.jpg",
  },
  {
    id: "rwb",
    name: "Red, White & Blue",
    swatch: "linear-gradient(135deg, #ef4444 0%, #ffffff 50%, #3b82f6 100%)",
    img: "/assets/generated/decor-red-white-blue.dim_600x400.jpg",
  },
];

const galleryItems = [
  {
    img: "/assets/generated/gallery-party1.dim_600x400.jpg",
    label: "Birthday Party, Tampa FL",
  },
  {
    img: "/assets/generated/gallery-party2.dim_600x400.jpg",
    label: "Sweet 16, Orlando FL",
  },
  {
    img: "/assets/generated/gallery-party3.dim_600x400.jpg",
    label: "Quinceañera, Miami FL",
  },
  {
    img: "/assets/generated/gallery-party4.dim_600x400.jpg",
    label: "Graduation Party, Jacksonville FL",
  },
  {
    img: "/assets/generated/bouncy-house.dim_600x400.jpg",
    label: "Bouncy House Setup",
  },
  {
    img: "/assets/generated/360-camera.dim_600x400.jpg",
    label: "360 Camera Booth",
  },
  {
    img: "/assets/generated/food-truck.dim_600x400.jpg",
    label: "Food Truck Catering",
  },
  {
    img: "/assets/generated/photo-booth.dim_600x400.jpg",
    label: "Photo Booth Fun",
  },
];

const reviews = [
  {
    quote:
      "Ready Up made my daughter's birthday absolutely magical. Every detail was perfect — from the bouncy house to the food truck!",
    name: "Tamara J.",
    event: "Birthday Party",
    initials: "TJ",
  },
  {
    quote:
      "The 360 camera booth was a HIT. Our guests are still talking about it. Best party investment we've ever made!",
    name: "Marcus & Keisha W.",
    event: "Anniversary",
    initials: "MW",
  },
  {
    quote:
      "They traveled all the way from Florida to Georgia for our son's graduation and knocked it out the park. Worth every penny!",
    name: "Desiree M.",
    event: "Graduation Party, Atlanta GA",
    initials: "DM",
  },
  {
    quote:
      "The decor was stunning — pink and gold everywhere. They set up while we slept and it was a dream when we walked in!",
    name: "Keyla R.",
    event: "Quinceañera, Miami FL",
    initials: "KR",
  },
  {
    quote:
      "Booked 3 months out like they recommend and everything went flawless. Professional, punctual, and SO fun to work with.",
    name: "The Johnson Family",
    event: "Family Reunion",
    initials: "JF",
  },
];

const whyPoints = [
  {
    icon: <Zap className="w-5 h-5" />,
    text: "Stress-free, full-service planning",
  },
  {
    icon: <Award className="w-5 h-5" />,
    text: "Experienced, passionate event team",
  },
  {
    icon: <ThumbsUp className="w-5 h-5" />,
    text: "Fully customizable packages",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    text: "Always on time, never a detail missed",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    text: "Licensed, insured & background-checked",
  },
  {
    icon: <Star className="w-5 h-5" />,
    text: "5-star reviews from 200+ happy families",
  },
];

const tiktokVideos = [
  {
    id: "tt1",
    thumb: "/assets/generated/tiktok-thumb1.dim_400x600.jpg",
    label: "Birthday Reveal 🎉",
  },
  {
    id: "tt2",
    thumb: "/assets/generated/tiktok-thumb2.dim_400x600.jpg",
    label: "360 Booth Highlights",
  },
  {
    id: "tt3",
    thumb: "/assets/generated/tiktok-thumb3.dim_400x600.jpg",
    label: "Decor Setup Time-lapse",
  },
];

// ─── Cart Hook ───────────────────────────────────────────────────────────────

function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    toast.success(`${item.name} added to cart!`);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i,
        )
        .filter((i) => i.qty > 0),
    );
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return { items, addItem, removeItem, updateQty, total, count };
}

// ─── Cart Drawer ─────────────────────────────────────────────────────────────

function CartDrawer({ cart }: { cart: ReturnType<typeof useCart> }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating cart button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-ocid="cart.open_modal_button"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-party-pink text-white px-4 py-3 rounded-full shadow-hover font-bold text-sm hover:opacity-90 transition-opacity"
      >
        <ShoppingCart className="w-5 h-5" />
        {cart.count > 0 && (
          <span className="bg-white text-party-pink rounded-full px-2 py-0.5 text-xs font-extrabold">
            {cart.count}
          </span>
        )}
        {cart.total > 0 && <span>${cart.total.toLocaleString()}</span>}
        {cart.count === 0 && <span>My Cart</span>}
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <span />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[420px] flex flex-col"
          data-ocid="cart.sheet"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-party-pink" />
              My Party Cart
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {cart.items.length === 0 ? (
              <div
                className="text-center py-16 text-muted-foreground"
                data-ocid="cart.empty_state"
              >
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-semibold">Your cart is empty</p>
                <p className="text-sm mt-1">
                  Add services to start building your party!
                </p>
              </div>
            ) : (
              cart.items.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-muted/40 rounded-xl p-3"
                  data-ocid={`cart.item.${i + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${item.price.toLocaleString()} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => cart.updateQty(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-white border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold w-5 text-center">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => cart.updateQty(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-party-pink text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-sm font-bold w-16 text-right">
                    ${(item.price * item.qty).toLocaleString()}
                  </div>
                  <button
                    type="button"
                    onClick={() => cart.removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    data-ocid={`cart.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between font-extrabold text-lg">
                <span>Estimated Total</span>
                <span className="text-party-pink">
                  ${cart.total.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Final price confirmed during consultation. Pricing may vary by
                guest count.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                data-ocid="cart.book.button"
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-party-pink text-white font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Book My Custom Party 🎉
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Custom Builder", href: "#food-truck" },
    { label: "Food & Catering", href: "#catering" },
    { label: "Décor", href: "#decor" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Packages", href: "#packages" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <PartyPopper className="w-6 h-6 text-party-pink" />
            <span className="font-bold text-lg leading-tight text-foreground">
              Ready Up
              <span className="text-party-teal"> Party Planning</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-4 overflow-x-auto">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-ocid={`nav.${l.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
                className="text-xs font-semibold text-foreground/70 hover:text-party-pink transition-colors whitespace-nowrap"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              data-ocid="nav.book_now.button"
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-sm font-bold text-white bg-party-pink hover:opacity-90 transition-opacity shadow-sm"
            >
              Book Now!
            </a>
            <button
              type="button"
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white border-t border-border"
          >
            <div className="px-4 py-3 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm font-semibold text-foreground hover:text-party-pink transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  window.location.hash = "contact";
                }}
                className="mt-2 inline-flex justify-center items-center px-5 py-2 rounded-full text-sm font-bold text-white bg-party-pink"
              >
                Book Now!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[600px] flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/assets/generated/hero-party.dim_1200x600.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-bold tracking-widest text-party-teal uppercase mb-3">
            Florida&apos;s #1 Party Planning Company
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            MAKE EVERY MOMENT{" "}
            <span className="text-party-pink">UNFORGETTABLE</span>
          </h1>
          <p className="text-lg text-white/85 mb-8 max-w-xl">
            From bouncy castles to gourmet food trucks — we handle everything so
            you can just celebrate.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#packages"
              data-ocid="hero.packages.button"
              className="inline-flex items-center px-7 py-3 rounded-full bg-white text-foreground font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg"
            >
              EXPLORE OUR PACKAGES
            </a>
            <a
              href="#contact"
              data-ocid="hero.book.button"
              className="inline-flex items-center px-7 py-3 rounded-full bg-party-pink text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
              BOOK NOW
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Packages ─────────────────────────────────────────────────────────────────

function Packages({
  onAddToCart,
}: { onAddToCart: (item: Omit<CartItem, "qty">) => void }) {
  return (
    <section id="packages" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            Party Packages
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose the perfect package for your celebration. Every package
            includes full setup, coordination, and teardown.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative bg-card rounded-2xl shadow-card border-2 ${pkg.color} flex flex-col overflow-hidden ${
                pkg.featured ? "scale-105 shadow-hover" : ""
              }`}
              data-ocid={`packages.item.${i + 1}`}
            >
              {pkg.featured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400" />
              )}
              <div className="p-6 flex flex-col flex-1">
                <span
                  className={`inline-block self-start text-xs font-bold px-3 py-1 rounded-full mb-4 ${pkg.tagBg}`}
                >
                  {pkg.tag}
                </span>
                <h3 className="text-xl font-extrabold text-foreground uppercase tracking-wide mb-1">
                  {pkg.name} Package
                </h3>
                <div className="text-4xl font-extrabold text-party-pink mb-5">
                  {pkg.price}
                </div>
                <ul className="space-y-2 flex-1 mb-6">
                  {pkg.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-party-teal flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() =>
                    onAddToCart({
                      id: `pkg-${pkg.id}`,
                      name: `${pkg.name} Package`,
                      price: pkg.numPrice,
                    })
                  }
                  data-ocid={`packages.${pkg.id}.button`}
                  className={`w-full text-center px-5 py-3 rounded-full font-bold text-sm transition-opacity ${
                    pkg.featured
                      ? "bg-party-pink text-white hover:opacity-90"
                      : "bg-party-teal text-white hover:opacity-90"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Food Truck Section ───────────────────────────────────────────────────────

function FoodTruckSection({
  onAddToCart,
}: { onAddToCart: (item: Omit<CartItem, "qty">) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "right" ? 320 : -320,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="food-truck" className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            🚚 Add a Food Truck to Your Party
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Scroll through our food truck menu — pick what you want, add it to
            your cart!
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop scroll arrows */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-hover items-center justify-center hover:bg-muted transition-colors"
            data-ocid="food_truck.pagination_prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-hover items-center justify-center hover:bg-muted transition-colors"
            data-ocid="food_truck.pagination_next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {foodTruckItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-72 bg-card rounded-2xl overflow-hidden shadow-card snap-start"
                data-ocid={`food_truck.item.${foodTruckItems.indexOf(item) + 1}`}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-party-pink text-white text-xs font-bold px-2 py-1 rounded-full">
                    ${item.price}
                    {item.unit}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-extrabold text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {item.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      onAddToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      })
                    }
                    data-ocid="food_truck.add_button"
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-party-teal text-white text-sm font-bold hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Catering Section ─────────────────────────────────────────────────────────

function CateringSection({
  onAddToCart,
}: { onAddToCart: (item: Omit<CartItem, "qty">) => void }) {
  return (
    <section id="catering" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            🍽️ Full Catering Service
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose your cuisine type and we'll handle everything
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cateringItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-shadow group"
              data-ocid={`catering.item.${i + 1}`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-party-pink text-white text-xs font-bold px-2 py-1 rounded-full">
                  ${item.price}
                  {item.unit}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-extrabold text-foreground mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {item.desc}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onAddToCart({
                      id: item.id,
                      name: `${item.name} Catering`,
                      price: item.price,
                    })
                  }
                  data-ocid="catering.add_button"
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-party-pink text-white text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Decor Section ────────────────────────────────────────────────────────────

function DecorSection({
  onAddToCart,
}: { onAddToCart: (item: Omit<CartItem, "qty">) => void }) {
  const [selected, setSelected] = useState(decorThemes[0]);

  return (
    <section id="decor" className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            🎨 Design Your Décor
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pick your color theme — we bring it to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Color swatches */}
          <div>
            <p className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Choose Your Theme
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {decorThemes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelected(theme)}
                  data-ocid={`decor.${theme.id}.toggle`}
                  className={`relative rounded-xl overflow-hidden p-0.5 transition-all ${
                    selected.id === theme.id
                      ? "ring-4 ring-party-pink scale-105 shadow-hover"
                      : "hover:scale-102 hover:shadow-card"
                  }`}
                >
                  <div
                    className="h-16 w-full rounded-lg"
                    style={{ background: theme.swatch }}
                  />
                  <span className="block text-xs font-semibold text-center mt-1 text-foreground/80 pb-1">
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-5 shadow-card">
              <h3 className="font-extrabold text-lg text-foreground mb-2">
                {selected.name} Theme
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Starting at <strong className="text-party-pink">$150</strong> —
                pricing varies by event size. We'll customize your quote.
              </p>
              <button
                type="button"
                onClick={() =>
                  onAddToCart({
                    id: `decor-${selected.id}`,
                    name: `Décor: ${selected.name} Theme`,
                    price: 150,
                  })
                }
                data-ocid="decor.add.button"
                className="w-full flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-party-pink text-white font-bold text-sm hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" /> Add This Theme to Cart
              </button>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative rounded-2xl overflow-hidden shadow-hover h-96">
            <AnimatePresence mode="wait">
              <motion.img
                key={selected.id}
                src={selected.img}
                alt={selected.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>
            <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              {selected.name}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Rentals ─────────────────────────────────────────────────────────────────

function Rentals({
  onAddToCart,
}: { onAddToCart: (item: Omit<CartItem, "qty">) => void }) {
  return (
    <section id="rentals" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            Top Party Rentals & Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Add individual services to any package or build your own custom
            event.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rentals.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-shadow group flex flex-col"
              data-ocid={`rentals.item.${i + 1}`}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-xs font-bold tracking-wide">
                    {r.price}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-extrabold text-foreground mb-1 text-sm uppercase tracking-wide">
                  {r.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">
                  {r.desc}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onAddToCart({ id: r.id, name: r.name, price: r.numPrice })
                  }
                  data-ocid={`rentals.add_button.${i + 1}`}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-party-teal text-white text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-3 h-3" /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            📸 Parties We've Done
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real events. Real memories. All Ready Up.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.img}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-2xl shadow-card group cursor-pointer ${
                i === 0 || i === 4 ? "md:row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 || i === 4 ? "1 / 1.8" : "1 / 1" }}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                <span className="text-white text-xs font-bold p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Our Story ────────────────────────────────────────────────────────────────

function OurStory() {
  const stats = [
    { value: "200+", label: "Events" },
    { value: "5-Star", label: "Average" },
    { value: "8 Years", label: "Experience" },
    { value: "10+", label: "States Served" },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-hover"
          >
            <img
              src="/assets/generated/team-photo.dim_800x500.jpg"
              alt="Ready Up Party Planning Team"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-bold tracking-widest text-party-teal uppercase mb-3">
              Our Story
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-5">
              The Ready Up Story
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Ready Up Party Planning was born in Florida with one mission: to
              make every celebration stress-free and unforgettable. We&apos;re a
              family-run team that has turned hundreds of birthdays,
              graduations, quinceañeras, and reunions into memories that last a
              lifetime.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-6">
              From setting up the bouncy house at sunrise to the last cleanup
              after midnight — we show up, we hustle, and we love what we do.
            </p>
            <p className="text-sm font-semibold text-party-teal mb-8">
              📍 Based in Florida, we proudly travel to Georgia, South Carolina,
              North Carolina, Alabama, Tennessee, and other nearby states.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-muted/40 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-extrabold text-party-pink">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-semibold mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof ─────────────────────────────────────────────────────────────

function SocialProof() {
  return (
    <section id="social" className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            📱 See Us in Action
          </h2>
          <p className="text-muted-foreground">
            Follow <strong>@ReadyUpPartyFL</strong> on TikTok &amp; Instagram
          </p>
        </motion.div>

        {/* TikTok Videos */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <SiTiktok className="w-6 h-6" />
            <h3 className="font-extrabold text-lg text-foreground">
              TikTok Highlights
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tiktokVideos.map((v, i) => (
              <motion.a
                key={v.id}
                href="https://tiktok.com/@readyuppartyfl"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative block rounded-2xl overflow-hidden shadow-card group cursor-pointer"
                style={{ aspectRatio: "2/3" }}
                data-ocid={`social.tiktok.item.${i + 1}`}
              >
                <img
                  src={v.thumb}
                  alt={v.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                  <span className="text-white text-sm font-bold text-center px-4">
                    {v.label}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-black text-white flex items-center gap-1">
                    <SiTiktok className="w-3 h-3" /> TikTok
                  </Badge>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-6">
            <a
              href="https://tiktok.com/@readyuppartyfl"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="social.tiktok.button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-bold text-sm hover:opacity-80 transition-opacity"
            >
              <SiTiktok className="w-4 h-4" /> Follow on TikTok
            </a>
          </div>
        </div>

        {/* Instagram */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Instagram className="w-6 h-6 text-party-pink" />
            <h3 className="font-extrabold text-lg text-foreground">
              Instagram Feed
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8 bg-card rounded-2xl shadow-card p-6">
            <div className="relative rounded-xl overflow-hidden shadow-card flex-shrink-0">
              <img
                src="/assets/generated/instagram-preview.dim_600x600.jpg"
                alt="Instagram Feed Preview"
                className="w-64 h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Instagram className="w-12 h-12 text-white opacity-70" />
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-foreground mb-2">
                @readyuppartyfl
              </h4>
              <p className="text-muted-foreground mb-4">
                Follow us for behind-the-scenes setup videos, party inspo, and
                exclusive deals!
              </p>
              <a
                href="https://instagram.com/readyuppartyfl"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="social.instagram.button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white hover:opacity-90 transition-opacity"
                style={{
                  background:
                    "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                }}
              >
                <Instagram className="w-4 h-4" /> Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose ───────────────────────────────────────────────────────────────

function WhyChoose() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            Why Choose Ready Up?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We&apos;re not just vendors — we&apos;re your celebration partners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Bullet list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyPoints.map((pt, i) => (
              <motion.div
                key={pt.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-3 bg-card rounded-xl p-4 shadow-card"
              >
                <span className="p-2 rounded-lg bg-party-pink/10 text-party-pink flex-shrink-0">
                  {pt.icon}
                </span>
                <span className="text-sm font-semibold text-foreground/85 leading-snug">
                  {pt.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* First 2 Reviews */}
          <div className="space-y-5">
            {reviews.slice(0, 2).map((t, i) => (
              <ReviewCard key={t.name} review={t} delay={i * 0.15} />
            ))}
          </div>
        </div>

        {/* All 5 reviews in a row */}
        <div>
          <h3 className="text-xl font-extrabold text-foreground text-center mb-8">
            What Our Clients Say
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((t, i) => (
              <ReviewCard key={`full-${t.name}`} review={t} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  delay,
}: { review: (typeof reviews)[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-2xl shadow-card p-6 relative"
    >
      <div className="text-5xl leading-none text-party-pink/20 font-serif absolute top-3 left-5">
        &ldquo;
      </div>
      <div className="flex gap-1 mb-3">
        {["s1", "s2", "s3", "s4", "s5"].map((k) => (
          <Star key={k} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed mb-4 italic">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-party-teal flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {review.initials}
        </div>
        <div>
          <div className="font-bold text-sm text-foreground">{review.name}</div>
          <div className="text-xs text-muted-foreground">{review.event}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Booking Form ─────────────────────────────────────────────────────────────

function BookingForm() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    packageId: "",
    guestCount: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventDate || !form.packageId) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      if (!actor) throw new Error("Not connected");
      await actor.addInquiry({
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        eventDate: form.eventDate,
        eventType: form.eventType,
        packageId: form.packageId,
        guestCount: BigInt(Number.parseInt(form.guestCount) || 0),
        message: form.message,
      });
      setSubmitted(true);
      toast.success("Your inquiry was sent! We'll reach out within 24 hours.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            Book Your Event
          </h2>
          <p className="text-muted-foreground">
            Ready to celebrate? Fill out the form and we&apos;ll get back to you
            within 24 hours.
          </p>
        </motion.div>

        {/* Booking Notice */}
        <div className="bg-amber-50 border border-amber-300 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
          <span className="text-2xl">📅</span>
          <p className="text-sm font-semibold text-amber-800">
            We book up fast — reserve your date{" "}
            <strong>at least 2 months in advance!</strong> The sooner you book,
            the better your chances of securing your preferred date.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-2xl shadow-card p-12 text-center"
              data-ocid="contact.success_state"
            >
              <CheckCircle2 className="w-16 h-16 text-party-teal mx-auto mb-4" />
              <h3 className="text-2xl font-extrabold text-foreground mb-2">
                You&apos;re on the list! 🎉
              </h3>
              <p className="text-muted-foreground mb-6">
                We received your inquiry and will contact you within 24 hours to
                confirm your event.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    eventDate: "",
                    eventType: "",
                    packageId: "",
                    guestCount: "",
                    message: "",
                  });
                }}
                className="rounded-full bg-party-pink hover:opacity-90 text-white"
                data-ocid="contact.new_inquiry.button"
              >
                Submit Another Inquiry
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl shadow-card p-8 space-y-5"
              data-ocid="contact.modal"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    data-ocid="contact.name.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@email.com"
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                    data-ocid="contact.email.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    data-ocid="contact.phone.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => set("eventDate")(e.target.value)}
                    data-ocid="contact.event_date.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Input
                    id="eventType"
                    placeholder="Birthday, Graduation, Baby Shower..."
                    value={form.eventType}
                    onChange={(e) => set("eventType")(e.target.value)}
                    data-ocid="contact.event_type.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="guestCount">Estimated Guests</Label>
                  <Input
                    id="guestCount"
                    type="number"
                    min="1"
                    placeholder="50"
                    value={form.guestCount}
                    onChange={(e) => set("guestCount")(e.target.value)}
                    data-ocid="contact.guest_count.input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="packageId">Package *</Label>
                <Select value={form.packageId} onValueChange={set("packageId")}>
                  <SelectTrigger data-ocid="contact.package.select">
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="silver">
                      Silver Package — $500
                    </SelectItem>
                    <SelectItem value="gold">Gold Package — $1,200</SelectItem>
                    <SelectItem value="platinum">
                      Platinum Package — $2,500
                    </SelectItem>
                    <SelectItem value="custom">Custom / À La Carte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Additional Details</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your event vision, theme, special requests..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  data-ocid="contact.message.textarea"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-party-pink hover:opacity-90 text-white font-bold py-3 text-base"
                data-ocid="contact.submit.button"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send My Inquiry 🎉"
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-party-footer text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <PartyPopper className="w-6 h-6 text-party-pink" />
              <span className="font-extrabold text-lg">
                Ready Up Party Planning
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              South Florida&apos;s #1 full-service party planning company.
              Making every celebration unforgettable since 2018.
            </p>
            <p className="text-white/60 text-xs mt-2">
              Serving Florida &amp; nearby states: GA, SC, NC, AL, TN
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com/readyuppartyfl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                data-ocid="footer.instagram.link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@readyuppartyfl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                data-ocid="footer.tiktok.link"
              >
                <SiTiktok className="w-4 h-4" />
              </a>
              <button
                type="button"
                aria-label="Facebook"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/50">
              Navigate
            </h4>
            <ul className="space-y-2 text-sm">
              {["Home", "Packages", "Gallery", "About", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/50">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>Bouncy Houses</li>
              <li>Water Slides</li>
              <li>360 Camera Booth</li>
              <li>Food Trucks</li>
              <li>Game Trucks</li>
              <li>Photographers</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/50">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-white/75">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:readyuppartyplanning@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  readyuppartyplanning@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/75">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:5558675309"
                  className="hover:text-white transition-colors"
                >
                  (555) 867-5309
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/75">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>South Florida</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} Ready Up Party Planning. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const cart = useCart();

  return (
    <>
      <Toaster richColors position="top-right" />
      <Header />
      <main>
        <Hero />
        <Packages onAddToCart={cart.addItem} />
        <FoodTruckSection onAddToCart={cart.addItem} />
        <CateringSection onAddToCart={cart.addItem} />
        <DecorSection onAddToCart={cart.addItem} />
        <Rentals onAddToCart={cart.addItem} />
        <Gallery />
        <OurStory />
        <SocialProof />
        <WhyChoose />
        <BookingForm />
      </main>
      <Footer />
      <CartDrawer cart={cart} />
    </>
  );
}
