import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu, X, Phone, Mail, MapPin, Clock, Star, Utensils, Leaf, ChefHat,
  Timer, Sofa, Instagram, Facebook, Twitter, ArrowRight, Calendar,
} from "lucide-react";
import { toast } from "sonner";

import heroImg from "@/assets/hero.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Afrikanna Downtown Restaurant — Authentic African Flavors in Eldoret" },
      { name: "description", content: "Premium African dining in downtown Eldoret. Reserve a table and experience signature Kenyan dishes, warm hospitality, and a luxury atmosphere." },
      { property: "og:title", content: "Afrikanna Downtown Restaurant — Eldoret" },
      { property: "og:description", content: "Authentic African flavors in the heart of Eldoret. Book your table today." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const FEATURED = [
  { img: dish1, name: "Nyama Choma", desc: "Slow-grilled prime beef with kachumbari and chili oil.", price: "KSh 1,450" },
  { img: dish2, name: "Ugali na Sukuma", desc: "House-made ugali, sautéed greens and stewed beef.", price: "KSh 950" },
  { img: dish3, name: "Pilau ya Mbuzi", desc: "Spiced basmati pilau with tender goat and crisp onions.", price: "KSh 1,250" },
  { img: dish4, name: "Samaki wa Kupaka", desc: "Whole grilled tilapia in coconut curry, served with coastal rice.", price: "KSh 1,650" },
  { img: dish5, name: "Mukimo & Kuku Kienyeji", desc: "Mashed greens & maize with free-range roasted chicken.", price: "KSh 1,350" },
  { img: dish6, name: "Chapati & Githeri", desc: "Soft layered chapati served with rich maize-and-bean stew.", price: "KSh 780" },
];

const MENU = {
  Breakfast: [
    { n: "Mandazi & Spiced Chai", d: "Cardamom-scented chai with warm coconut mandazi.", p: "KSh 350" },
    { n: "African Breakfast Plate", d: "Eggs, beef sausage, baked beans, avocado & toast.", p: "KSh 750" },
    { n: "Uji Power Bowl", d: "Millet porridge with honey, banana and roasted nuts.", p: "KSh 420" },
    { n: "Chapati Roll", d: "Scrambled eggs and vegetables in a soft chapati.", p: "KSh 480" },
  ],
  Lunch: [
    { n: "Pilau ya Mbuzi", d: "Spiced basmati with tender goat and onions.", p: "KSh 1,250" },
    { n: "Ugali Sukuma & Beef", d: "Classic Kenyan plate, hearty and generous.", p: "KSh 950" },
    { n: "Wet Fry Chicken", d: "Slow-cooked tomato-onion chicken with chapati.", p: "KSh 1,100" },
    { n: "Veggie Githeri Bowl", d: "Maize and bean stew with avocado and chili.", p: "KSh 780" },
  ],
  Dinner: [
    { n: "Nyama Choma Platter", d: "Grilled beef, goat ribs, kachumbari & chili oil.", p: "KSh 2,200" },
    { n: "Samaki wa Kupaka", d: "Whole tilapia in coconut curry with coastal rice.", p: "KSh 1,650" },
    { n: "Mukimo & Kuku Kienyeji", d: "Mashed greens with free-range roasted chicken.", p: "KSh 1,350" },
    { n: "Coastal Prawn Curry", d: "Tiger prawns simmered in spiced coconut sauce.", p: "KSh 1,950" },
  ],
  Drinks: [
    { n: "Dawa Cocktail", d: "Vodka, honey, lime and crushed ice — the cure.", p: "KSh 650" },
    { n: "Tamarind Cooler", d: "House-made tamarind soda with mint.", p: "KSh 320" },
    { n: "Spiced Masala Chai", d: "Slow-brewed black tea with whole spices.", p: "KSh 220" },
    { n: "Tusker Lager", d: "Kenya's iconic lager, served ice-cold.", p: "KSh 380" },
  ],
};

const WHY = [
  { icon: Leaf, title: "Fresh Ingredients", text: "Sourced daily from local Eldoret farms and the coast." },
  { icon: ChefHat, title: "Experienced Chefs", text: "Decades of mastery in authentic African cuisine." },
  { icon: Timer, title: "Fast Service", text: "Warm, attentive and never rushed — perfectly timed." },
  { icon: Sofa, title: "Comfortable Atmosphere", text: "Elegant, candlelit interiors made for lingering." },
];

const REVIEWS = [
  { name: "Achieng O.", role: "Food Writer, Nairobi", text: "The pilau was extraordinary — perfectly spiced, warm hospitality, and a setting that feels like a getaway in the city.", rating: 5 },
  { name: "Daniel K.", role: "Visitor from Kisumu", text: "Best nyama choma I've had outside the coast. The atmosphere is genuinely premium. We'll be back next month.", rating: 5 },
  { name: "Mercy W.", role: "Local Regular", text: "Their samaki wa kupaka is a love letter to coastal cooking. Service is impeccable every single visit.", rating: 5 },
];

function HomePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState<keyof typeof MENU>("Dinner");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onReserve = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    if (!name) return toast.error("Please enter your name");
    toast.success(`Karibu, ${name}! We'll confirm your reservation shortly.`);
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <nav
          className={`mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "glass-dark rounded-full mx-4 sm:mx-8 py-2.5 shadow-lg"
              : "py-3"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-full grid place-items-center text-cream font-display font-bold text-lg"
                  style={{ background: "var(--gradient-warm)" }}>A</span>
            <span className={`font-display text-lg sm:text-xl font-semibold tracking-tight ${scrolled ? "text-cream" : "text-cream drop-shadow"}`}>
              Afrikanna
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}
                 className="text-sm font-medium text-cream/85 hover:text-accent transition-colors drop-shadow">
                {n.label}
              </a>
            ))}
            <a href="#reserve"
               className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-cream shadow-lg hover:scale-[1.03] transition"
               style={{ background: "var(--gradient-warm)" }}>
              <Calendar className="w-4 h-4" /> Book a Table
            </a>
          </div>

          <button
            className="md:hidden text-cream p-2"
            aria-label="Toggle menu"
            onClick={() => setNavOpen((s) => !s)}
          >
            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {navOpen && (
          <div className="md:hidden mx-4 mt-2 rounded-2xl glass-dark p-5 animate-float-up">
            <div className="flex flex-col gap-1">
              {NAV.map((n) => (
                <a key={n.href} href={n.href}
                   onClick={() => setNavOpen(false)}
                   className="px-3 py-3 rounded-lg text-cream/90 hover:bg-white/10 transition">
                  {n.label}
                </a>
              ))}
              <a href="#reserve" onClick={() => setNavOpen(false)}
                 className="mt-2 text-center rounded-full px-5 py-3 font-semibold text-cream"
                 style={{ background: "var(--gradient-warm)" }}>
                Book a Table
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[100svh] flex items-center justify-center">
        <img
          src={heroImg}
          alt="Afrikanna restaurant interior in Eldoret"
          width={1920} height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0"
             style={{ background: "linear-gradient(180deg, rgba(20,10,5,0.55) 0%, rgba(20,10,5,0.35) 40%, rgba(20,10,5,0.85) 100%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-cream/90 text-xs sm:text-sm mb-6 animate-float-up">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-shimmer" />
            Downtown Eldoret · Open Tonight
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-cream text-balance leading-[1.05] animate-float-up"
              style={{ animationDelay: "80ms" }}>
            Authentic <span className="italic" style={{ color: "var(--gold)" }}>African</span> Flavors
          </h1>
          <p className="mt-6 text-base sm:text-xl text-cream/80 max-w-2xl mx-auto text-balance animate-float-up"
             style={{ animationDelay: "160ms" }}>
            Experience the taste of Africa in the heart of Eldoret — slow-cooked traditions,
            modern plating, and a warm welcome at every table.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center animate-float-up"
               style={{ animationDelay: "240ms" }}>
            <a href="#menu"
               className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-cream shadow-warm hover:scale-[1.03] transition"
               style={{ background: "var(--gradient-warm)" }}>
              View Menu <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#reserve"
               className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-cream glass hover:bg-white/15 transition">
              Book a Table
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-cream/60 text-xs tracking-[0.3em] uppercase">
          Scroll
          <span className="mt-2 w-px h-10 bg-cream/40 animate-shimmer" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">Our Story</p>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-balance">
              A celebration of <span className="italic" style={{ color: "var(--terracotta)" }}>African heritage</span>, served warm.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Afrikanna was born from a simple love letter — to grandmother's kitchens,
              market spices and the long, unhurried meals that bring people together.
              From our downtown Eldoret home, we honor the recipes of the highlands
              and the coast, prepared with the care they deserve.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our mission is simple: serve the soul of Africa on every plate, in a
              space that feels like home — only a little more elegant.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "12+", v: "Years" },
                { k: "60k", v: "Guests" },
                { k: "4.9", v: "★ Rating" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl font-bold text-primary">{s.k}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl -z-10 opacity-50"
                 style={{ background: "var(--gradient-gold)" }} />
            <img src={gallery1} alt="Restaurant interior" loading="lazy" width={1280} height={960}
                 className="rounded-3xl shadow-elegant aspect-[4/5] object-cover w-full"
                 style={{ boxShadow: "var(--shadow-elegant)" }} />
            <div className="absolute -bottom-6 -left-6 glass-dark text-cream rounded-2xl p-5 max-w-[220px] hidden sm:block">
              <Utensils className="w-5 h-5 text-accent mb-2" />
              <p className="text-sm">Crafted daily from ingredients sourced within 100km of Eldoret.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="py-24 sm:py-32" style={{ background: "oklch(0.96 0.018 75)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">Signature</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-balance">Featured Dishes</h2>
            <p className="mt-4 text-muted-foreground">Six house favorites our chefs have perfected over the years.</p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {FEATURED.map((d) => (
              <article key={d.name}
                       className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={d.img} alt={d.name} loading="lazy" width={1024} height={768}
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold">{d.name}</h3>
                    <span className="text-primary font-semibold whitespace-nowrap">{d.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FULL MENU */}
      <section id="menu" className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">The Menu</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">From Sunrise to Late Night</h2>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {(Object.keys(MENU) as Array<keyof typeof MENU>).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCat === cat
                    ? "text-cream shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
                style={activeCat === cat ? { background: "var(--gradient-warm)" } : undefined}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-x-10 gap-y-6">
            {MENU[activeCat].map((it, i) => (
              <div key={it.n}
                   className="flex gap-4 items-start border-b border-border/60 pb-6 animate-float-up"
                   style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl font-semibold">{it.n}</h3>
                    <span className="flex-1 border-b border-dotted border-border" />
                    <span className="font-semibold text-primary">{it.p}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 sm:py-32 text-cream relative overflow-hidden"
               style={{ background: "var(--ebony)" }}>
        <div className="absolute inset-0 opacity-20"
             style={{ background: "radial-gradient(circle at 20% 30%, var(--terracotta), transparent 50%), radial-gradient(circle at 80% 70%, var(--gold), transparent 50%)" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold">Why Afrikanna</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Crafted for the Senses</h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="glass rounded-2xl p-7 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl grid place-items-center mb-4"
                     style={{ background: "var(--gradient-gold)" }}>
                  <Icon className="w-6 h-6 text-ebony" />
                </div>
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-cream/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">Gallery</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">A Glimpse Inside</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <img src={gallery1} alt="Dining room" loading="lazy" className="col-span-2 row-span-2 aspect-square md:aspect-auto h-full w-full object-cover rounded-2xl" />
            <img src={dish1} alt="Nyama choma" loading="lazy" className="aspect-square w-full object-cover rounded-2xl" />
            <img src={gallery2} alt="Chef plating" loading="lazy" className="aspect-square w-full object-cover rounded-2xl" />
            <img src={dish4} alt="Grilled tilapia" loading="lazy" className="aspect-square w-full object-cover rounded-2xl" />
            <img src={gallery3} alt="Guests dining" loading="lazy" className="aspect-square w-full object-cover rounded-2xl" />
            <img src={dish3} alt="Pilau" loading="lazy" className="col-span-2 aspect-[2/1] w-full object-cover rounded-2xl" />
            <img src={dish5} alt="Mukimo" loading="lazy" className="aspect-square w-full object-cover rounded-2xl" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-24 sm:py-32" style={{ background: "oklch(0.96 0.018 75)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">Guest Stories</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Loved by Eldoret</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="bg-card rounded-3xl p-7 shadow-sm hover:shadow-xl transition">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-foreground leading-relaxed">"{r.text}"</blockquote>
                <figcaption className="mt-5 pt-5 border-t border-border">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="reserve" className="py-24 sm:py-32 relative overflow-hidden text-cream"
               style={{ background: "var(--gradient-warm)" }}>
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cream/80 font-semibold">Reservations</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-balance">Reserve your table tonight.</h2>
            <p className="mt-4 text-cream/85 leading-relaxed">
              Walk-ins welcome — but a reservation guarantees your favorite spot.
              We'll confirm by phone within minutes.
            </p>
            <div className="mt-6 space-y-2 text-cream/85 text-sm">
              <p className="flex items-center gap-3"><Phone className="w-4 h-4" /> +254 712 345 678</p>
              <p className="flex items-center gap-3"><Clock className="w-4 h-4" /> Daily 7:00 — 23:00</p>
            </div>
          </div>
          <form onSubmit={onReserve}
                className="bg-card text-foreground rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider">Full Name</label>
              <input name="name" required maxLength={80}
                     className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider">Phone</label>
                <input name="phone" type="tel" required maxLength={20}
                       className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider">Guests</label>
                <input name="guests" type="number" min={1} max={20} defaultValue={2} required
                       className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider">Date</label>
                <input name="date" type="date" required
                       className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider">Time</label>
                <input name="time" type="time" required defaultValue="19:00"
                       className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <button type="submit"
                    className="w-full mt-2 rounded-full px-6 py-3.5 text-cream font-semibold shadow-lg hover:scale-[1.01] transition"
                    style={{ background: "var(--gradient-warm)" }}>
              Confirm Reservation
            </button>
          </form>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">Visit Us</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Downtown Eldoret</h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Find us at the heart of the city — moments from the Eldoret CBD.
              Free parking available for guests.
            </p>
            <div className="mt-8 space-y-5">
              {[
                { Icon: MapPin, title: "Address", text: "Uganda Road, Downtown, Eldoret, Kenya" },
                { Icon: Phone, title: "Phone", text: "+254 712 345 678" },
                { Icon: Mail, title: "Email", text: "hello@afrikanna.co.ke" },
                { Icon: Clock, title: "Hours", text: "Mon — Sun · 7:00 AM — 11:00 PM" },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl grid place-items-center text-cream flex-shrink-0"
                       style={{ background: "var(--gradient-warm)" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{title}</div>
                    <div className="font-medium">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-elegant aspect-[4/3] lg:aspect-auto min-h-[400px]"
               style={{ boxShadow: "var(--shadow-elegant)" }}>
            <iframe
              title="Afrikanna location in Eldoret"
              src="https://www.google.com/maps?q=Eldoret%20Kenya&output=embed"
              width="100%" height="100%" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-cream pt-16 pb-8" style={{ background: "var(--ebony)" }}>
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 rounded-full grid place-items-center text-cream font-display font-bold"
                    style={{ background: "var(--gradient-warm)" }}>A</span>
              <span className="font-display text-xl font-semibold">Afrikanna Downtown</span>
            </div>
            <p className="mt-4 text-cream/70 max-w-sm leading-relaxed">
              Authentic African dining in the heart of Eldoret — slow food,
              warm hospitality and an atmosphere to savor.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link"
                   className="w-10 h-10 grid place-items-center rounded-full glass hover:bg-white/15 transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-accent transition">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Visit</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>Uganda Road, Eldoret</li>
              <li>+254 712 345 678</li>
              <li>hello@afrikanna.co.ke</li>
              <li>Daily · 7:00 — 23:00</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Afrikanna Downtown Restaurant. All rights reserved.</p>
          <p>Crafted with care in Eldoret, Kenya.</p>
        </div>
      </footer>
    </div>
  );
}
