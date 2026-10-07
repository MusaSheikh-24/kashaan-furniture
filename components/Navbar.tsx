"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/data";

export default function Navbar() {
    const [solid, setSolid] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const on = () => setSolid(window.scrollY > 60);
        on();
        window.addEventListener("scroll", on, { passive: true });
        return () => window.removeEventListener("scroll", on);
    }, []);

    const light = !solid && !open;
    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid || open ? "bg-ivory/95 backdrop-blur border-b border-sand/70 py-3" : "py-6"}`}>
            <div className="mx-auto flex max-w-375 items-center justify-between px-5 md:px-10">
                <a href="/" className={`font-serif text-2xl tracking-wide transition-colors ${light ? "text-ivory" : "text-espresso"}`}>
                    Kashan <span className="italic">Furniture</span>
                </a>
                <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
                    {NAV.map((n) => (
                        <a key={n.href} href={n.href} className={`group relative text-xs uppercase tracking-[0.2em] transition-colors ${light ? "text-ivory" : "text-espresso"}`}>
                            {n.label}
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                    <a href="#showroom" className={`border px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${light ? "border-ivory text-ivory hover:bg-ivory hover:text-espresso" : "border-espresso text-espresso hover:bg-espresso hover:text-ivory"}`}>
                        Visit Showroom
                    </a>
                </nav>
                <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className={`md:hidden p-2 ${light ? "text-ivory" : "text-espresso"}`}>
                    {open ? <X /> : <Menu />}
                </button>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden md:hidden" aria-label="Mobile">
                        <ul className="flex flex-col gap-1 px-5 pb-8 pt-4">
                            {NAV.map((n, i) => (
                                <motion.li key={n.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}>
                                    <a href={n.href} onClick={() => setOpen(false)} className="block border-b border-sand py-4 font-serif text-3xl">{n.label}</a>
                                </motion.li>
                            ))}
                            <a href="#showroom" onClick={() => setOpen(false)} className="mt-6 bg-espresso py-4 text-center text-xs uppercase tracking-[0.2em] text-ivory">Visit Showroom</a>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}