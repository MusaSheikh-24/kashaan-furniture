// Swap any URL here. Confirm each loads; replace with your own showroom photos when available.
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`;

// Only the hero stays remote. Everything else is from /public (kashaan*.png).
// Reorder or swap any of these to match which photo suits which spot.
export const IMG = {
    hero: u("photo-1618221195710-dd6b41faaea6"),
    about: "/kashaan.png",
    living: "/kashaan1.png",
    bedroom: "/kashaan2.png",
    dining: "/kashaan3.png",
    office: "/kashaan4.png",
    decor: "/kashaan5.png",
    lounge: "/kashaan6.png",
    chair: "/kashaan7.png",
    room: "/kashaan8.png",
};

export const PACKAGES = [
    "/kashaan-package.png",
    "/kashaan-package1.png",
    "/kashaan-package2.png",
    "/kashaan-package3.png",
    "/kashaan-package4.png",
];

export const SHOWROOM_MAPS = "https://www.google.com/maps/search/?api=1&query=Kashan+Furniture+Rahwali+Cantt+GT+Road+Gujranwala";

export const NAV = [
    { label: "Home", href: "#home" },
    { label: "Collections", href: "#collections" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#showroom" },
];

export const COLLECTIONS = [
    { name: "Living Room", img: IMG.living, cls: "md:col-span-7 md:row-span-2 aspect-4/5 md:aspect-auto" },
    { name: "Bedroom & Bridal", img: IMG.bedroom, cls: "md:col-span-5 aspect-4/3" },
    { name: "Dining", img: IMG.dining, cls: "md:col-span-5 aspect-4/3" },
    { name: "Kitchens & Wardrobes", img: IMG.office, cls: "md:col-span-6 aspect-4/3" },
    { name: "Interior Design", img: IMG.decor, cls: "md:col-span-6 aspect-4/3" },
];

export const FEATURED = [
    { name: "Bridal Furniture Sets", tag: "Bedroom", img: IMG.bedroom },
    { name: "King-Size Beds", tag: "Bedroom", img: IMG.room },
    { name: "Luxury Dining Sets", tag: "Dining", img: IMG.dining },
    { name: "Sofa-cum-Beds", tag: "Living", img: IMG.living },
    { name: "Crown Diwans", tag: "Seating", img: IMG.lounge },
    { name: "Nesting Tables", tag: "Decor", img: IMG.decor },
];

export const GALLERY = [
    { img: IMG.room, alt: "Warm modern living room", cls: "md:col-span-2 md:row-span-2 aspect-4/5 md:aspect-auto" },
    { img: IMG.chair, alt: "Wooden accent chair", cls: "aspect-square" },
    { img: IMG.decor, alt: "Styled interior corner", cls: "aspect-3/4" },
    { img: IMG.dining, alt: "Dining room setting", cls: "aspect-4/3 md:col-span-2" },
    { img: IMG.lounge, alt: "Lounge armchair", cls: "aspect-3/4" },
];

export const CONTACT = {
    phones: [
        { label: "Sales", number: "+92 312 4610610", tel: "tel:+923124610610" },
        { label: "Interior Design Consultation", number: "+92 315 7775292", tel: "tel:+923157775292" },
    ],
    hours: "Saturday – Thursday, 10:00 AM – 10:00 PM · Closed on Fridays",
    facebook: "https://www.facebook.com/KashanFurniture/",
    instagram: "https://www.instagram.com/kashan.furniture/",
    kitchensInstagram: "https://www.instagram.com/kashankitchens/",
};

export const SERVICES = [
    { t: "Interior Design Consultation", d: "2D and 3D visualization with professional space planning, to help you plan a home upgrade with confidence.", cta: "Call for a consultation", href: CONTACT.phones[1].tel },
    { t: "Kashan Kitchens", d: "Our sister concern for modern modular kitchen cabinets and premium home interior fit-outs, at Shaheen Abad, Main G.T. Road.", cta: "See Kashan Kitchens", href: CONTACT.kitchensInstagram },
];