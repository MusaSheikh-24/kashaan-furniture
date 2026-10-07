"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Armchair, Hammer, Maximize2, MapPin, Phone, Clock, Ruler, Sofa, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { COLLECTIONS, FEATURED, GALLERY, IMG, PACKAGES, NAV, SHOWROOM_MAPS, CONTACT, SERVICES } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0, className = "", y = 40 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay, ease }}
        >
            {children}
        </motion.div>
    );
}

function Mask({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={inView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
                transition={{ duration: 1.4, ease }}
            >
                {children}
            </motion.div>
        </div>
    );
}

const Label = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
    <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className={`mb-4 md:mb-5 text-[10px] md:text-[11px] uppercase tracking-[0.35em] ${light ? "text-sand" : "text-walnut"}`}
    >
        {children}
    </motion.p>
);

const Btn = ({ href, children, variant = "dark", ...p }: { href: string; children: React.ReactNode; variant?: "dark" | "light" | "outline"; target?: string; rel?: string }) => {
    const v = {
        dark: "bg-espresso text-ivory hover:bg-walnut",
        light: "bg-ivory text-espresso hover:bg-sand",
        outline: "border border-ivory/70 text-ivory hover:bg-ivory hover:text-espresso"
    }[variant];
    return (
        <motion.a
            href={href}
            {...p}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group inline-flex min-h-11 md:min-h-12 items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-3.5 text-[10px] md:text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${v}`}
        >
            {children}
            <ArrowRight size={14} className="md:hidden transition-transform duration-300 group-hover:translate-x-1" />
            <ArrowRight size={16} className="hidden md:block transition-transform duration-300 group-hover:translate-x-1.5" />
        </motion.a>
    );
};

export function Hero() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section id="home" ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal">
            <motion.div style={{ y, scale }} className="absolute inset-x-0 top-[-10%] h-[120%]">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease }}
                    className="relative h-full w-full"
                >
                    <Image
                        src={IMG.hero}
                        alt="Warm, minimal living room with premium furniture"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                </motion.div>
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-espresso/85 via-espresso/30 to-espresso/45" />
            <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-375 px-4 pb-16 pt-24 md:px-10 md:pb-28 md:pt-0">
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1, ease }}
                    className="mb-5 md:mb-6 text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-sand"
                >
                    Kashan Furniture • Gujranwala
                </motion.p>
                <h1 className="max-w-4xl font-serif text-[clamp(2.4rem,9vw,7rem)] md:text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.95] text-ivory">
                    {["Furniture That", "Defines Your Space"].map((l, i) => (
                        <span key={l} className="block overflow-hidden pb-2">
                            <motion.span
                                className={`block ${i ? "italic" : ""}`}
                                initial={{ y: "120%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.8 + i * 0.18, duration: 1.3, ease }}
                            >
                                {l}
                            </motion.span>
                        </span>
                    ))}
                </h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 1, ease }}
                    className="mt-5 md:mt-7 max-w-lg text-sm md:text-base lg:text-lg leading-relaxed text-ivory/90"
                >
                    Discover thoughtfully designed furniture that brings comfort, character and timeless style into every space.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 1, ease }}
                    className="mt-7 md:mt-10 flex flex-col gap-3 sm:flex-row"
                >
                    <Btn href="#collections" variant="light">Explore Collection</Btn>
                    <Btn href="#showroom" variant="outline">Visit Showroom</Btn>
                </motion.div>
            </motion.div>
            <motion.a
                href="#about"
                aria-label="Scroll down"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-5 right-4 hidden flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-ivory/85 md:right-10 md:flex"
            >
                Scroll
                <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}>
                    <ChevronDown size={16} />
                </motion.span>
            </motion.a>
        </section>
    );
}

const ABOUT_POINTS = [
    { t: "Manufacturer & retailer", d: "Furniture made and sold from our Gujranwala base." },
    { t: "Modern & traditional", d: "Pieces for contemporary homes and classic tastes alike." },
    { t: "Complete packages", d: "Bridal and wedding furniture packages for a new home." },
];

export function About() {
    return (
        <section id="about" className="mx-auto max-w-375 px-4 py-16 md:px-10 md:py-28">
            <div className="grid gap-x-8 gap-y-10 md:gap-y-12 md:grid-cols-12">
                <div className="md:col-span-7">
                    <Label>01 — About Kashan</Label>
                    <Reveal delay={0.1}>
                        <h2 className="font-serif text-[clamp(2.2rem,6vw,5rem)] md:text-[clamp(2.8rem,5.5vw,5rem)] leading-[1.02]">
                            Designed for the way <span className="italic text-walnut">you live.</span>
                        </h2>
                    </Reveal>
                    <Mask className="mt-8 md:mt-14 aspect-4/3">
                        <Image
                            src={IMG.about}
                            alt="Furniture on display at the Kashan Furniture showroom"
                            fill
                            sizes="(min-width:768px) 58vw, 100vw"
                            className="object-cover transition-transform duration-[2000ms] hover:scale-105"
                        />
                    </Mask>
                    <Reveal delay={0.1}>
                        <p className="mt-3 md:mt-4 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-walnut">
                            Rahwali Cantt, GT Road · Gujranwala
                        </p>
                    </Reveal>
                </div>
                <div className="flex flex-col gap-10 md:gap-12 md:col-span-4 md:col-start-9 md:justify-between md:pt-16">
                    <Reveal delay={0.2}>
                        <p className="text-base md:text-lg leading-relaxed text-espresso/85">
                            Kashan Furniture is a Gujranwala furniture manufacturer and retailer offering modern and traditional home furnishing. From bridal furniture and king-size beds to luxury dining sets and sofas, every piece is made to balance comfort, quality and lasting style.
                        </p>
                    </Reveal>
                    <ul className="border-t border-espresso/20">
                        {ABOUT_POINTS.map((pt, i) => (
                            <motion.li
                                key={pt.t}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.9, delay: i * 0.15, ease }}
                                className="flex gap-4 md:gap-5 border-b border-espresso/20 py-5 md:py-6"
                            >
                                <span className="pt-1.5 text-[10px] md:text-[11px] tracking-[0.35em] text-walnut">0{i + 1}</span>
                                <div>
                                    <h3 className="font-serif text-xl md:text-2xl">{pt.t}</h3>
                                    <p className="mt-1.5 text-xs md:text-sm leading-relaxed text-espresso/70">{pt.d}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                    <Reveal delay={0.2}>
                        <a href="#collections" className="group inline-flex min-h-11 md:min-h-12 items-center gap-2 md:gap-3 text-[10px] md:text-xs uppercase tracking-[0.25em]">
                            <span className="border-b border-espresso pb-1 transition-colors group-hover:text-walnut group-hover:border-walnut">Explore collections</span>
                            <ArrowRight size={14} className="md:hidden transition-transform duration-300 group-hover:translate-x-1" />
                            <ArrowRight size={16} className="hidden md:block transition-transform duration-300 group-hover:translate-x-1.5" />
                        </a>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

export function Collections() {
    return (
        <section id="collections" className="bg-cream py-16 md:py-28">
            <div className="mx-auto max-w-375 px-4 md:px-10">
                <div className="mb-10 md:mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <Label>02 — Collections</Label>
                        <Reveal delay={0.1}>
                            <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] md:text-[clamp(2.6rem,5vw,4.5rem)] leading-tight">
                                Explore Our <span className="italic">Collections</span>
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={0.15}>
                        <p className="max-w-sm text-xs md:text-sm leading-relaxed text-espresso/70">
                            Curated furniture collections designed to transform your living spaces into something extraordinary.
                        </p>
                    </Reveal>
                </div>
                <div className="grid gap-3 md:gap-5 md:grid-cols-12 md:grid-rows-[repeat(3,auto)]">
                    {COLLECTIONS.map((c, i) => {
                        const layouts = [
                            "md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto",
                            "md:col-span-5 md:row-span-1 aspect-[4/3]",
                            "md:col-span-5 md:row-span-1 aspect-[4/3]",
                            "md:col-span-4 md:row-span-1 aspect-[4/3]",
                            "md:col-span-4 md:row-span-1 aspect-[4/3]",
                            "md:col-span-4 md:row-span-1 aspect-[4/3]",
                        ];
                        return (
                            <motion.a
                                key={c.name}
                                href="#showroom"
                                aria-label={`${c.name} collection`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 1, delay: (i % 3) * 0.15, ease }}
                                whileHover={{ y: -8 }}
                                className={`group relative block overflow-hidden ${layouts[i] || "md:col-span-4 aspect-[4/3]"}`}
                            >
                                <Image
                                    src={c.img}
                                    alt={`${c.name} furniture`}
                                    fill
                                    sizes="(min-width:768px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-espresso/80 via-espresso/20 to-transparent transition-all duration-700 group-hover:from-espresso/90" />
                                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 text-ivory">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease }}
                                        className="mb-3 flex items-center gap-3"
                                    >
                                        <span className="text-[10px] md:text-[11px] tracking-[0.35em] text-sand">0{i + 1}</span>
                                        <div className="h-px w-8 bg-sand/60" />
                                    </motion.div>
                                    <h3 className="font-serif text-2xl md:text-4xl transition-transform duration-500 group-hover:-translate-y-2">
                                        {c.name}
                                    </h3>
                                    <div className="mt-3 flex items-center justify-between overflow-hidden">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease }}
                                            className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-sand/80"
                                        >
                                            View Collection
                                        </motion.div>
                                        <ArrowUpRight className="opacity-0 transition-all duration-500 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0" />
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function Card({ p, i }: { p: (typeof FEATURED)[number]; i: number }) {
    return (
        <article className="group w-[82vw] shrink-0 snap-center sm:w-[56vw] md:w-[30vw] md:max-w-115">
            <div className="relative aspect-4/5 overflow-hidden">
                <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(min-width:768px) 30vw, 82vw"
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-108"
                />
            </div>
            <div className="mt-4 md:mt-5 flex items-start justify-between gap-3 md:gap-4 border-t border-sand pt-3 md:pt-4">
                <div>
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-walnut">0{i + 1} — {p.tag}</p>
                    <h3 className="mt-1.5 md:mt-2 font-serif text-xl md:text-3xl">{p.name}</h3>
                </div>
                <motion.a
                    href="#showroom"
                    aria-label={`Enquire about ${p.name}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-1 grid h-10 w-10 md:h-11 md:w-11 shrink-0 place-items-center border border-espresso/30 transition-colors hover:bg-espresso hover:text-ivory"
                >
                    <ArrowUpRight size={16} className="md:hidden" />
                    <ArrowUpRight size={18} className="hidden md:block" />
                </motion.a>
            </div>
        </article>
    );
}

export function Featured() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

    return (
        <section ref={ref} className="relative md:h-[280vh]">
            <div className="flex flex-col justify-center py-16 md:sticky md:top-0 md:h-svh md:overflow-hidden md:py-0">
                <div className="mx-auto mb-10 md:mb-12 w-full max-w-375 px-4 md:px-10">
                    <Label>03 — Featured Furniture</Label>
                    <Reveal delay={0.1}>
                        <h2 className="max-w-2xl font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] md:text-[clamp(2.6rem,5vw,4.5rem)] leading-tight">
                            Made to Become <span className="italic text-walnut">Part of Your Home</span>
                        </h2>
                    </Reveal>
                </div>
                <motion.div style={{ x }} className="hidden w-max gap-7 md:gap-8 px-6 md:px-10 md:flex">
                    {FEATURED.map((p, i) => <Card key={p.name} p={p} i={i} />)}
                </motion.div>
                <div className="mx-auto mt-10 md:mt-12 hidden w-full max-w-375 px-6 md:px-10 md:block" aria-hidden>
                    <div className="h-px bg-sand">
                        <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-espresso" />
                    </div>
                </div>
                <div className="flex snap-x snap-mandatory gap-3 md:gap-4 overflow-x-auto px-4 pb-5 md:hidden scrollbar-none">
                    {FEATURED.map((p, i) => <Card key={p.name} p={p} i={i} />)}
                </div>
            </div>
        </section>
    );
}

export function Packages() {
    return (
        <section id="packages" className="bg-cream py-16 md:py-28">
            <div className="mx-auto max-w-375 px-4 md:px-10">
                <div className="mb-10 md:mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                        <Label>04 — Packages</Label>
                        <Reveal delay={0.1}>
                            <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] md:text-[clamp(2.6rem,5vw,4.5rem)] leading-tight">
                                Complete <span className="italic text-walnut">Furniture Packages</span>
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={0.15}>
                        <p className="max-w-sm text-xs md:text-sm leading-relaxed text-espresso/70">
                            Bridal and home furniture packages put together for a new start. Visit the showroom or call us to see what each package includes.
                        </p>
                    </Reveal>
                </div>
                <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {PACKAGES.map((src, i) => (
                        <motion.article
                            key={src}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-70px" }}
                            transition={{ duration: 1, delay: (i % 2) * 0.15, ease }}
                            whileHover={{ y: -10 }}
                            className={`group relative overflow-hidden ${i === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto" : "aspect-[4/5]"}`}
                        >
                            <Image
                                src={src}
                                alt={`Kashan Furniture package ${i + 1}`}
                                fill
                                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-115"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-espresso/85 via-espresso/30 to-transparent transition-all duration-700 group-hover:from-espresso/95" />

                            {/* Top badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease }}
                                className="absolute left-4 top-4 md:left-5 md:top-5"
                            >
                                <div className="flex items-center gap-2 rounded-full bg-ivory/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 border border-ivory/20">
                                    <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-ivory uppercase">Package</span>
                                    <span className="text-[10px] md:text-[11px] font-serif text-ivory">0{i + 1}</span>
                                </div>
                            </motion.div>

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-ivory">
                                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl transition-transform duration-500 group-hover:-translate-y-2">
                                    Package {i + 1}
                                </h3>
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    whileInView={{ opacity: 1, height: "auto" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease }}
                                    className="mt-2 overflow-hidden"
                                >
                                    <p className="text-[10px] md:text-[11px] leading-relaxed text-ivory/80 max-w-xs">
                                        {i === 0 ? "Complete bridal furniture set for your new home" : "Essential furniture package for modern living"}
                                    </p>
                                </motion.div>
                                <div className="mt-4 flex items-center justify-between">
                                    <motion.a
                                        href={CONTACT.phones[0].tel}
                                        aria-label={`Enquire about package ${i + 1}`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="grid h-10 w-10 md:h-11 md:w-11 place-items-center border border-ivory/50 bg-ivory/10 backdrop-blur-sm transition-all duration-300 hover:bg-ivory hover:text-espresso hover:border-ivory"
                                    >
                                        <ArrowUpRight size={16} className="md:hidden" />
                                        <ArrowUpRight size={18} className="hidden md:block" />
                                    </motion.a>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease }}
                                        className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-sand"
                                    >
                                        Enquire
                                    </motion.div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}


export function VisualBreak() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <section ref={ref} className="relative grid h-[65svh] md:h-[75svh] min-h-100 md:min-h-128 place-items-center overflow-hidden bg-charcoal">
            <motion.div style={{ y }} className="absolute inset-x-0 top-[-15%] h-[130%]">
                <Image
                    src={IMG.room}
                    alt="Cinematic view of a warmly lit interior"
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
            </motion.div>
            <div className="absolute inset-0 bg-espresso/60" />
            <Reveal className="relative px-4 md:px-6 text-center" y={50}>
                <h2 className="font-serif text-[clamp(2.2rem,7.5vw,6rem)] md:text-[clamp(2.6rem,7vw,6rem)] leading-[1.05] text-ivory">
                    Spaces with character.<br />
                    <span className="italic text-sand">Furniture with purpose.</span>
                </h2>
            </Reveal>
        </section>
    );
}

const WHY = [
    { icon: Ruler, t: "Thoughtful Design", d: "Pieces chosen for proportion, balance and the way they sit in a real room." },
    { icon: Hammer, t: "Quality Craftsmanship", d: "Careful construction and honest materials, built to be lived with." },
    { icon: Armchair, t: "Comfort First", d: "Furniture that looks refined and feels even better to use every day." },
    { icon: Sofa, t: "Made for Modern Spaces", d: "Timeless forms that suit contemporary homes and working spaces." },
];

export function Why() {
    return (
        <section className="mx-auto max-w-375 px-4 py-20 md:px-10 md:py-40">
            <Label>05 — Why Kashan</Label>
            <Reveal delay={0.1}>
                <h2 className="mb-10 md:mb-12 max-w-3xl font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] md:text-[clamp(2.6rem,5vw,4.5rem)] leading-tight">
                    Considered in every <span className="italic">detail.</span>
                </h2>
            </Reveal>
            <div className="grid border-t border-sand sm:grid-cols-2 lg:grid-cols-4">
                {WHY.map((w, i) => (
                    <Reveal
                        key={w.t}
                        delay={i * 0.12}
                        className="border-b border-sand py-7 md:py-8 sm:pr-6 md:sm:pr-8 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:px-6 md:lg:px-8 lg:first:pl-0"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease }}
                        >
                            <w.icon strokeWidth={1.2} size={28} className="md:hidden text-walnut" />
                            <w.icon strokeWidth={1.2} size={34} className="hidden md:block text-walnut" />
                        </motion.div>
                        <h3 className="mt-6 md:mt-8 font-serif text-xl md:text-2xl">{w.t}</h3>
                        <p className="mt-2 md:mt-3 text-xs md:text-sm leading-relaxed text-espresso/70">{w.d}</p>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

export function Services() {
    return (
        <section className="bg-espresso py-20 md:py-36 text-ivory">
            <div className="mx-auto max-w-375 px-4 md:px-10">
                <Label light>06 — Services</Label>
                <Reveal delay={0.1}>
                    <h2 className="mb-8 md:mb-10 max-w-3xl font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] md:text-[clamp(2.6rem,5vw,4.5rem)] leading-tight">
                        Beyond the <span className="italic text-sand">showroom floor</span>
                    </h2>
                </Reveal>
                <div className="grid gap-8 md:gap-12 md:grid-cols-2 md:gap-16">
                    {SERVICES.map((sv, i) => (
                        <Reveal key={sv.t} delay={i * 0.15} className="border-t border-ivory/20 pt-7 md:pt-8">
                            <h3 className="font-serif text-2xl md:text-4xl">{sv.t}</h3>
                            <p className="mt-3 md:mt-4 max-w-md text-sm md:text-base leading-relaxed text-ivory/75">{sv.d}</p>
                            <a
                                href={sv.href}
                                {...(sv.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className="group mt-6 md:mt-8 inline-flex min-h-11 md:min-h-12 items-center gap-2 md:gap-3 text-[10px] md:text-xs uppercase tracking-[0.25em] text-sand"
                            >
                                <span className="border-b border-sand/50 pb-1 transition-colors group-hover:border-sand">{sv.cta}</span>
                                <ArrowRight size={14} className="md:hidden transition-transform duration-300 group-hover:translate-x-1" />
                                <ArrowRight size={16} className="hidden md:block transition-transform duration-300 group-hover:translate-x-1.5" />
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Gallery() {
    const [open, setOpen] = useState<number | null>(null);
    const n = GALLERY.length;

    useEffect(() => {
        if (open === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(null);
            if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % n));
            if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + n) % n));
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, n]);

    const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n));

    return (
        <section id="gallery" className="bg-cream py-16 md:py-28">
            <div className="mx-auto max-w-375 px-4 md:px-10">
                <div className="mb-10 md:mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                        <Label>07 — Interior Showcase</Label>
                        <Reveal delay={0.1}>
                            <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] md:text-[clamp(2.6rem,5vw,4.5rem)] leading-tight">
                                A look <span className="italic">inside</span>
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={0.15}>
                        <p className="max-w-sm text-xs md:text-sm leading-relaxed text-espresso/70">
                            Explore our curated interior designs and see how our furniture transforms real spaces.
                        </p>
                    </Reveal>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 md:grid-rows-[repeat(3,auto)]">
                    {GALLERY.map((g, i) => {
                        const layouts = [
                            "col-span-2 row-span-2 aspect-square md:aspect-auto",
                            "col-span-1 row-span-1 aspect-[4/5]",
                            "col-span-1 row-span-1 aspect-[4/5]",
                            "col-span-1 row-span-1 aspect-[4/5]",
                            "col-span-1 row-span-1 aspect-[4/5]",
                            "col-span-2 row-span-1 aspect-[2/1] md:aspect-auto",
                            "col-span-2 row-span-1 aspect-[2/1] md:aspect-auto",
                        ];
                        return (
                            <motion.button
                                key={i}
                                onClick={() => setOpen(i)}
                                aria-label={`View image: ${g.alt}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.9, delay: (i % 4) * 0.1, ease }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`group relative overflow-hidden ${layouts[i] || "aspect-[4/5]"}`}
                            >
                                <Image
                                    src={g.img}
                                    alt={g.alt}
                                    fill
                                    sizes="(min-width:768px) 25vw, 50vw"
                                    className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-espresso/0 transition-all duration-500 group-hover:bg-espresso/50" />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                >
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        whileHover={{ scale: 1 }}
                                        className="grid h-12 w-12 md:h-14 md:w-14 place-items-center border border-ivory/60 bg-ivory/10 backdrop-blur-sm"
                                    >
                                        <Maximize2 size={20} className="md:hidden" />
                                        <Maximize2 size={24} className="hidden md:block" />
                                    </motion.div>
                                    <p className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ivory/90">
                                        View Image
                                    </p>
                                </motion.div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-sand">
                                        {String(i + 1).padStart(2, "0")}
                                    </p>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
            <AnimatePresence>
                {open !== null && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Image viewer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(null)}
                        className="fixed inset-0 z-60 flex items-center justify-center bg-charcoal/95 backdrop-blur-sm p-3 md:p-12"
                    >
                        <motion.button
                            aria-label="Close"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute right-3 top-3 md:right-5 md:top-5 grid h-11 w-11 md:h-12 md:w-12 place-items-center text-ivory hover:bg-ivory/10 transition-colors rounded-full"
                            onClick={() => setOpen(null)}
                        >
                            <X />
                        </motion.button>
                        <motion.button
                            aria-label="Previous image"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="absolute left-2 z-10 grid h-11 w-11 md:h-12 md:w-12 place-items-center text-ivory hover:bg-ivory/10 transition-colors rounded-full md:left-6"
                            onClick={(e) => { e.stopPropagation(); step(-1); }}
                        >
                            <ChevronLeft size={28} className="md:hidden" />
                            <ChevronLeft size={32} className="hidden md:block" />
                        </motion.button>
                        <motion.button
                            aria-label="Next image"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute right-2 z-10 grid h-11 w-11 md:h-12 md:w-12 place-items-center text-ivory hover:bg-ivory/10 transition-colors rounded-full md:right-6"
                            onClick={(e) => { e.stopPropagation(); step(1); }}
                        >
                            <ChevronRight size={28} className="md:hidden" />
                            <ChevronRight size={32} className="hidden md:block" />
                        </motion.button>
                        <motion.div
                            key={open}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.5, ease }}
                            className="relative h-full w-full max-w-6xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={GALLERY[open].img}
                                alt={GALLERY[open].alt}
                                fill
                                sizes="100vw"
                                className="object-contain"
                            />
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-3 md:bottom-5 text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-sand"
                        >
                            {open + 1} / {n} — {GALLERY[open].alt}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export function Showroom() {
    return (
        <section id="showroom" className="mx-auto grid max-w-375 gap-8 md:gap-16 px-4 py-20 md:px-10 md:py-40 md:grid-cols-2">
            <div className="flex flex-col justify-center">
                <Label>08 — Showroom</Label>
                <Reveal delay={0.1}>
                    <h2 className="font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] md:text-[clamp(2.6rem,5vw,4.5rem)] leading-tight">
                        Visit Our <span className="italic text-walnut">Showroom</span>
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <address className="mt-7 md:mt-9 not-italic leading-relaxed text-espresso/85">
                        <strong className="font-serif text-xl md:text-2xl font-medium text-espresso">Kashan Furniture</strong><br />
                        Opp. D.C. Colony, Rahwali Cantt, GT Road<br />
                        Gujranwala, Pakistan
                    </address>
                    <dl className="mt-7 md:mt-9 grid gap-5 md:gap-6 border-t border-sand pt-5 md:pt-6 sm:grid-cols-2">
                        {CONTACT.phones.map((ph) => (
                            <div key={ph.tel}>
                                <dt className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-walnut">{ph.label}</dt>
                                <dd className="mt-1.5">
                                    <a href={ph.tel} className="font-serif text-xl md:text-2xl transition-colors hover:text-walnut">{ph.number}</a>
                                </dd>
                            </div>
                        ))}
                        <div className="sm:col-span-2">
                            <dt className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-walnut">Showroom Hours</dt>
                            <dd className="mt-1.5 text-xs md:text-sm text-espresso/80">{CONTACT.hours}</dd>
                        </div>
                    </dl>
                    <div className="mt-8 md:mt-10 flex flex-col gap-3 sm:flex-row">
                        <Btn href={SHOWROOM_MAPS} target="_blank" rel="noopener noreferrer">Get Directions</Btn>
                        <motion.a
                            href={CONTACT.phones[0].tel}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex min-h-11 md:min-h-12 items-center justify-center border border-espresso/40 px-6 md:px-8 text-[10px] md:text-xs uppercase tracking-[0.25em] transition-colors hover:bg-espresso hover:text-ivory"
                        >
                            Contact Us
                        </motion.a>
                    </div>
                </Reveal>
            </div>
            <Mask className="min-h-80 md:min-h-140 bg-sand">
                <a
                    href={SHOWROOM_MAPS}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open showroom location in Google Maps"
                    className="absolute inset-0 block"
                >
                    <svg className="absolute inset-0 h-full w-full text-walnut/25" aria-hidden>
                        <defs>
                            <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
                                <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#g)" />
                        <path d="M-20 300 Q 200 220 400 260 T 900 120" stroke="currentColor" strokeWidth="14" fill="none" />
                    </svg>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                            className="mx-auto grid h-12 w-12 md:h-14 md:w-14 place-items-center bg-espresso text-ivory shadow-lg"
                        >
                            <MapPin />
                        </motion.div>
                        <p className="mt-4 md:mt-5 font-serif text-xl md:text-2xl">Rahwali Cantt, GT Road</p>
                        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-walnut mt-2">Open in Maps</p>
                    </div>
                </a>
            </Mask>
        </section>
    );
}

export function CTA() {
    return (
        <section id="contact" className="relative overflow-hidden bg-charcoal py-20 md:py-32">
            <Image src={IMG.about} alt="" fill sizes="100vw" className="object-cover opacity-45" />
            <div className="absolute inset-0 bg-espresso/65" />
            <Reveal className="relative mx-auto max-w-3xl px-4 md:px-6 text-center text-ivory" y={50}>
                <h2 className="font-serif text-[clamp(2.2rem,6.5vw,5rem)] md:text-[clamp(2.6rem,6vw,5rem)] leading-tight">
                    Ready to Transform <span className="italic text-sand">Your Space?</span>
                </h2>
                <p className="mx-auto mt-5 md:mt-7 max-w-xl text-sm md:text-base text-ivory/90 leading-relaxed">
                    Visit Kashan Furniture and discover pieces designed to bring comfort, style and character into your space.
                </p>
                <div className="mt-8 md:mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                    <Btn href="#showroom" variant="light">Visit Showroom</Btn>
                    <Btn href={CONTACT.phones[0].tel} variant="outline">Contact Kashan Furniture</Btn>
                </div>
            </Reveal>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="bg-espresso px-4 py-12 md:px-10 md:py-14 text-ivory">
            <div className="mx-auto grid max-w-375 gap-10 md:gap-12 md:grid-cols-12">
                <div className="md:col-span-5">
                    <p className="font-serif text-2xl md:text-3xl">Kashan <span className="italic">Furniture</span></p>
                    <p className="mt-4 md:mt-5 max-w-sm text-xs md:text-sm leading-relaxed text-ivory/75">
                        Furniture and interior pieces designed to bring timeless character to modern spaces.
                    </p>
                </div>
                <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
                    <ul className="space-y-2.5 md:space-y-3 text-xs md:text-sm">
                        {NAV.map((n) => (
                            <li key={n.href}>
                                <a href={n.href} className="text-ivory/75 transition-colors hover:text-ivory">{n.label}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="md:col-span-3">
                    <ul className="space-y-2.5 md:space-y-3 text-xs md:text-sm text-ivory/75">
                        <li className="flex gap-2">
                            <MapPin size={14} className="md:hidden mt-0.5 shrink-0" />
                            <MapPin size={16} className="hidden md:block mt-0.5 shrink-0" />
                            Opp. D.C. Colony, Rahwali Cantt, GT Road, Gujranwala, Pakistan
                        </li>
                        {CONTACT.phones.map((ph) => (
                            <li key={ph.tel}>
                                <a href={ph.tel} className="flex gap-2 transition-colors hover:text-ivory">
                                    <Phone size={14} className="md:hidden mt-0.5 shrink-0" />
                                    <Phone size={16} className="hidden md:block mt-0.5 shrink-0" />
                                    {ph.number}
                                </a>
                            </li>
                        ))}
                        <li className="flex gap-2">
                            <Clock size={14} className="md:hidden mt-0.5 shrink-0" />
                            <Clock size={16} className="hidden md:block mt-0.5 shrink-0" />
                            {CONTACT.hours}
                        </li>
                    </ul>
                    <div className="mt-6 md:mt-7 flex gap-4 md:gap-6 text-[10px] md:text-xs uppercase tracking-[0.25em]">
                        <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-sand">
                            Facebook <ArrowUpRight size={12} className="md:hidden" />
                            <ArrowUpRight size={14} className="hidden md:block" />
                        </a>
                        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-sand">
                            Instagram <ArrowUpRight size={12} className="md:hidden" />
                            <ArrowUpRight size={14} className="hidden md:block" />
                        </a>
                    </div>
                </div>
            </div>
            <p className="mx-auto mt-10 md:mt-12 max-w-375 border-t border-ivory/15 pt-6 md:pt-7 text-[10px] md:text-xs text-ivory/55">
                © 2026 Kashan Furniture. Demo website.
            </p>
        </footer>
    );
}