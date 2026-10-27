"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { PHOTOS } from "./data";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TourSection {
    id: string;
    title: string;
    amenities: string[];
    thumbnail: string;
    images: string[];
}

// ─── Tour Data ────────────────────────────────────────────────────────────────
const TOUR_SECTIONS: TourSection[] = [
    {
        id: "living-room-1",
        title: "Living room 1",
        amenities: ["Sofa", "Air conditioning", "Ceiling fan", "TV"],
        thumbnail: "/images/0622ab42_b851_4d55_9d9f_df3143bc5909.jpeg",
        images: [
            "/images/0622ab42_b851_4d55_9d9f_df3143bc5909.jpeg",
            "/images/23ea6621_6f74_4baa_acea_2fd03e312b41.jpeg",
            "/images/153aa732_4935_48b8_a6fe_b469b6af5efc.jpeg",
        ],
    },
    {
        id: "living-room-2",
        title: "Living room 2",
        amenities: ["Ceiling fan", "Hot tub"],
        thumbnail: "/images/1c827136_4a85_4fe0_8e69_3fd8ea19bb17.jpeg",
        images: [
            "/images/1c827136_4a85_4fe0_8e69_3fd8ea19bb17.jpeg",
            "/images/929545d3_e241_46c0_8a70_c24531ce7b54.jpeg",
            "/images/30ad93b2_293f_494d_b645_626303c6cb93.jpeg",
            "/images/70325367_cbae_4993_b560_18cd3f6edd53.jpeg",
            "/images/79addceb_8c2d_419b_80ff_e29af426a94c.jpeg",
            "/images/862d936c_0f34_4e50_af87_b519e2781d19.jpeg",
        ],
    },
    {
        id: "kitchen",
        title: "Full kitchen",
        amenities: ["Freezer", "Fridge", "Blender", "Cooker", "Cooking basics", "Kettle", "Microwave", "Toaster", "Wine glasses", "Coffee", "Crockery and cutlery"],
        thumbnail: "/images/3cf31697_f3f3_4c60_82c4_029acb119ae4.jpeg",
        images: [
            "/images/3cf31697_f3f3_4c60_82c4_029acb119ae4.jpeg",
            "/images/3c6e6809_1bb1_47a6_8e24_aff593e1c28f.jpeg",
            "/images/608748cd_6ee7_4a71_88a2_ba79d3ddba5a.jpeg",
            "/images/a9831aeb_f441_44f5_a38f_4cf54e3f0fcf.jpeg",
            "/images/f1da1c3d_0d10_481e_9b63_c71f9073f30b.jpeg",
        ],
    },
    {
        id: "bedroom",
        title: "Bedroom",
        amenities: ["Double bed", "Air conditioning", "Bed linen", "Ceiling fan", "Clothes storage", "Cot", "Hangers", "Iron", "Room-darkening blinds", "Cleaning products", "Long-term stays allowed", "Private entrance", "Wifi"],
        thumbnail: "/images/79f59adb_5a5f_4d6c_8109_1f01f4ca0d03.jpeg",
        images: [
            "/images/79f59adb_5a5f_4d6c_8109_1f01f4ca0d03.jpeg",
            "/images/3c90338e_86b4_423f_aae1_279e0ccc3a18.jpeg",
            "/images/2367476f_11c4_4a14_a7c6_267be62c1d59.jpeg",
            "/images/5b856fde_a393_41bf_b373_c9d02e64221f.jpeg",
            "/images/c904e1ab_a39d_4ef0_bdea_8c0bd16b9e3d.jpeg",
            "/images/9be71047_fc52_438a_9270_75cb470f6752.jpeg",
            "/images/f19d8c0a_1d88_42a4_9218_686d4f0db7e4.jpeg",
        ],
    },
    {
        id: "bathroom",
        title: "Full bathroom",
        amenities: ["Hair dryer", "Hot water", "Shampoo", "Shower gel"],
        thumbnail: "/images/34529829_a971_44d3_ac2f_90ea3678a34d.jpeg",
        images: [
            "/images/34529829_a971_44d3_ac2f_90ea3678a34d.jpeg",
            "/images/42befad7_fb29_473d_91db_b03e7a544d1d.jpeg",
            "/images/48a8ffbc_fbf7_4f84_bc29_ee400da3f08b.jpeg",
            "/images/5adfdf3e_d497_4efc_ab8c_fc559dab311e.jpeg",
            "/images/b6599f26_d65c_4df0_baf2_ef18c82a86a3.jpeg",
            "/images/cc7a56bd_242c_498a_9aef_0cffac619e54.jpeg",
            "/images/fc02f48f_a937_42c5_895d_f9cc3113d6ca.jpeg",
        ],
    },
    {
        id: "outdoor",
        title: "Outdoor",
        amenities: ["Private hot tub", "Outdoor seating", "Alfresco dining"],
        thumbnail: "/images/56c44812_52c0_4481_90d8_101ec1f34c7a.jpeg",
        images: [
            "/images/56c44812_52c0_4481_90d8_101ec1f34c7a.jpeg",
            "/images/9642a60d_e9de_4e1a_89c2_9ebd230f4a74.jpeg",
            "/images/fe37b80e_da8a_4225_b27b_dfbb5d763c01.jpeg",
            "/images/9aa8e65f_94ac_4ba0_9a10_9ec91e536d22.jpeg",
            "/images/a45feaa2_b607_4092_83ac_5fd4b2894959.jpeg",
            "/images/a74e3c0b_3188_4442_9146_1cd4d6ea45df.jpeg",
        ],
    },
    {
        id: "exterior",
        title: "Exterior",
        amenities: ["Building complex", "Free parking on premises"],
        thumbnail: "/images/246bd88d_4dd6_4117_a401_02a36ebfcf16.jpeg",
        images: [
            "/images/246bd88d_4dd6_4117_a401_02a36ebfcf16.jpeg",
            "/images/ddc853d7_e658_405c_bedc_8f31106c447e.jpeg",
            "/images/f6de1663_4e9c_4414_b63b_29a154a92ee1.jpeg",
            "/images/67c61c6f_6260_4809_9510_0360e58a345d.jpeg",
            "/images/4fede77d_7a71_446f_89e3_263af937f3fa.jpeg",
        ],
    },
    {
        id: "additional",
        title: "Additional photos",
        amenities: [],
        thumbnail: "/images/8eb65a8b_e795_4870_b141_6f63b1be24ae.jpeg",
        images: [
            "/images/8eb65a8b_e795_4870_b141_6f63b1be24ae.jpeg",
            "/images/97c78f8a_5090_4663_aebc_ba4e13b47092.jpeg",
            "/images/dc01fd46_b119_48d3_a43b_f6c093e26eca.jpeg",
            "/images/090d8b0b_b539_42c0_84f8_e1fb0cdf9a93.jpeg",
        ],
    },
];

const ALL_PHOTOS: string[] = TOUR_SECTIONS.flatMap((s) => s.images);

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChevronLeftIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 28L8 16 20 4" />
        </svg>
    );
}
function ShareIcon() {
    return (
        <svg viewBox="0 0 32 32" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23M6 11l10-8 10 8" />
        </svg>
    );
}
function HeartIcon({ filled }: { filled?: boolean }) {
    return (
        <svg viewBox="0 0 32 32" className="w-[18px] h-[18px]" fill={filled ? "#FF385C" : "none"} stroke={filled ? "#FF385C" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-6.67c-2.67-.18-5.35 1.3-6.96 3.66C14.4 5.6 11.75 4.15 9 4.33 5 4.6 2 8 2 12c0 7 7 12.27 14 17z" />
        </svg>
    );
}
function GridDotsIcon() {
    const pts = [3, 12, 21];
    return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
            {pts.flatMap((cy) => pts.map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" />))}
        </svg>
    );
}
function CloseXIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
        </svg>
    );
}
function ArrowLeftIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
        </svg>
    );
}
function ArrowRightIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
        </svg>
    );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function PhotoTourHeader({ onClose, saved, onSave }: { onClose: () => void; saved: boolean; onSave: () => void }) {
    return (
        <header className="flex items-center justify-between px-6 flex-shrink-0 bg-white relative" style={{ height: "72px" }}>
            <button id="photo-tour-back" onClick={onClose} className="flex items-center justify-center w-8 h-8 -ml-1 rounded-full hover:bg-[#f7f7f7] transition-colors" aria-label="Close photo tour">
                <ChevronLeftIcon />
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 text-[14px] font-semibold text-[#222222] pointer-events-none select-none">Photo tour</span>
            <div className="flex items-center gap-1">
                <button className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f7f7f7] transition-colors" aria-label="Share">
                    <ShareIcon />
                </button>
                <button onClick={onSave} className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f7f7f7] transition-colors" aria-label={saved ? "Unsave" : "Save to wishlist"}>
                    <HeartIcon filled={saved} />
                </button>
            </div>
        </header>
    );
}

// ─── Thumbnail Strip ──────────────────────────────────────────────────────────
function PhotoTourThumbnails({ sections, activeId, onSelect }: { sections: TourSection[]; activeId: string; onSelect: (id: string) => void }) {
    return (
        <div className="flex flex-wrap gap-x-3 gap-y-3 py-5 border-b border-[#DDDDDD]" role="navigation" aria-label="Photo tour sections">
            {sections.map((section) => {
                const isActive = activeId === section.id;
                return (
                    <button key={section.id} onClick={() => onSelect(section.id)} className="flex flex-col items-center gap-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] rounded-md" aria-label={`Jump to ${section.title}`} aria-pressed={isActive}>
                        <div className="relative overflow-hidden rounded-md transition-all duration-150" style={{ width: "130px", height: "122px", outline: isActive ? "2px solid #222222" : "1px solid transparent", outlineOffset: "1px", opacity: isActive ? 1 : 0.75 }}>
                            <Image src={section.thumbnail} alt={section.title} fill className="object-cover" sizes="130px" />
                        </div>
                        <span className="text-center leading-tight" style={{ width: "130px", fontSize: "10px", color: "#717171", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
                            {section.title}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function PhotoTourSection({ section, sectionRef, onPhotoClick }: { section: TourSection; sectionRef: (el: HTMLElement | null) => void; onPhotoClick: (src: string) => void }) {
    const groups: string[][] = [];
    for (let i = 0; i < section.images.length; i += 3) {
        groups.push(section.images.slice(i, i + 3));
    }
    return (
        <section ref={sectionRef} data-section-id={section.id} aria-label={section.title} style={{ display: "grid", gridTemplateColumns: "1fr 47%", columnGap: "32px", marginBottom: "64px" }}>
            <div style={{ paddingTop: "32px" }}>
                <h2 style={{ fontSize: "36px", fontWeight: 600, color: "#222222", lineHeight: 1.3, margin: 0 }}>{section.title}</h2>
                {section.amenities.length > 0 && (
                    <p style={{ fontSize: "12px", color: "#717171", marginTop: "6px", lineHeight: 1.5 }}>{section.amenities.join(" \u00B7 ")}</p>
                )}
            </div>
            <div style={{ paddingTop: "32px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {groups.map((group, gi) => (
                    <div key={gi} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <button onClick={() => onPhotoClick(group[0])} className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]" aria-label={`View photo from ${section.title}`} style={{ position: "relative", aspectRatio: "3/2", borderRadius: "10px", overflow: "hidden", display: "block" }}>
                            <Image src={group[0]} alt={`${section.title} photo`} fill className="object-cover transition-transform duration-300 hover:scale-[1.03]" sizes="290px" />
                        </button>
                        {group.length > 1 && (
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                                {group.slice(1).map((src, si) => (
                                    <button key={si} onClick={() => onPhotoClick(src)} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]" aria-label={`View photo from ${section.title}`} style={{ position: "relative", aspectRatio: "3/2", borderRadius: "10px", overflow: "hidden", display: "block" }}>
                                        <Image src={src} alt={`${section.title} photo`} fill className="object-cover transition-transform duration-300 hover:scale-[1.03]" sizes="142px" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const LB_HEADER_H = 56; // px
const LB_IMG_MAX_W = 880; // px
const LB_ARROW = 42; // px
const LB_ARROW_OFFSET = 25; // px

const lbIconBtn =
    "flex items-center justify-center w-7 h-7 rounded-full text-[#222222] hover:bg-[#F7F7F7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]";
const lbArrowBtn =
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full bg-white text-[#222222] border border-[#222222] hover:bg-[#F7F7F7] active:scale-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] focus-visible:ring-offset-2";

function Lightbox({ src, onClose, onNavigate }: { src: string; onClose: () => void; onNavigate: (src: string) => void }) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const idx = ALL_PHOTOS.indexOf(src);
    const hasPrev = idx > 0;
    const hasNext = idx < ALL_PHOTOS.length - 1;
    const sectionTitle = TOUR_SECTIONS.find((s) => s.images.includes(src))?.title ?? "";

    const goPrev = useCallback(() => { if (hasPrev) onNavigate(ALL_PHOTOS[idx - 1]); }, [idx, hasPrev, onNavigate]);
    const goNext = useCallback(() => { if (hasNext) onNavigate(ALL_PHOTOS[idx + 1]); }, [idx, hasNext, onNavigate]);

    // Keyboard: Esc / ← / → and Tab focus trap
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                goPrev();
            } else if (e.key === "ArrowRight") {
                goNext();
            } else if (e.key === "Tab" && dialogRef.current) {
                const focusables = Array.from(
                    dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]):not([tabindex='-1'])")
                ).filter((el) => el.offsetParent !== null);
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, goPrev, goNext]);

    // Focus management + body scroll lock
    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialogRef.current?.focus();
        return () => {
            document.body.style.overflow = prevOverflow;
            previouslyFocused?.focus?.();
        };
    }, []);

    return (
        <div
            ref={dialogRef}
            tabIndex={-1}
            className="fixed inset-0 z-[60] bg-white flex flex-col outline-none"
            role="dialog"
            aria-modal="true"
            aria-label={`${sectionTitle}, photo ${idx + 1} of ${ALL_PHOTOS.length}`}
        >
            {/* Header */}
            <div className="relative flex items-center justify-between flex-shrink-0 px-6" style={{ height: `${LB_HEADER_H}px` }}>
                <button onClick={onClose} className={lbIconBtn} aria-label="Back to photo tour">
                    <GridDotsIcon />
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 text-[14px] font-semibold text-[#222222] select-none whitespace-nowrap">
                    {sectionTitle}
                </span>
                <div className="flex items-center gap-4">
                    <span className="text-[16px] text-[#484848] select-none" aria-live="polite">
                        {idx + 1} of {ALL_PHOTOS.length}
                    </span>
                    <button onClick={onClose} className={lbIconBtn} aria-label="Close">
                        <CloseXIcon />
                    </button>
                </div>
            </div>

            {/* Stage */}
            <div className="relative flex-1 min-h-0 flex items-center justify-center" style={{ paddingBottom: `${LB_HEADER_H}px` }}>
                {hasPrev && (
                    <button onClick={goPrev} className={lbArrowBtn} style={{ left: `${LB_ARROW_OFFSET}px`, width: `${LB_ARROW}px`, height: `${LB_ARROW}px` }} aria-label="Previous photo">
                        <ArrowLeftIcon />
                    </button>
                )}

                <div
                    className="relative"
                    style={{
                        width: `min(${LB_IMG_MAX_W}px, calc(100% - ${2 * (LB_ARROW + LB_ARROW_OFFSET + 24)}px), calc((100vh - ${LB_HEADER_H * 2 + 24}px) * 4 / 3))`,
                        aspectRatio: "4 / 3",
                    }}
                >
                    <Image
                        key={src}
                        src={src}
                        alt={`${sectionTitle} photo ${idx + 1}`}
                        fill
                        className="object-contain animate-fadeIn"
                        sizes="922px"
                        priority
                    />
                </div>

                {hasNext && (
                    <button onClick={goNext} className={lbArrowBtn} style={{ right: `${LB_ARROW_OFFSET}px`, width: `${LB_ARROW}px`, height: `${LB_ARROW}px` }} aria-label="Next photo">
                        <ArrowRightIcon />
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function PhotoTour() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [saved, setSaved] = useState(false);
    const [activeSectionId, setActiveSectionId] = useState(TOUR_SECTIONS[0].id);
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

    const contentRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    // Open lightbox for hero photo clicked on listing page
    useEffect(() => {
        const modalItem = searchParams.get("modalItem");
        if (!modalItem) return;
        const id = parseInt(modalItem, 10);
        const photo = PHOTOS.find((p) => p.id === id);
        if (!photo) return;
        if (ALL_PHOTOS.includes(photo.src)) setLightboxSrc(photo.src);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Escape to close tour
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !lightboxSrc) router.push("/", { scroll: false });
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [router, lightboxSrc]);

    // Scroll spy
    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;
        const onScroll = () => {
            const ct = container.getBoundingClientRect().top;
            const threshold = ct + 160;
            let active = TOUR_SECTIONS[0].id;
            for (const s of TOUR_SECTIONS) {
                const el = sectionRefs.current[s.id];
                if (el && el.getBoundingClientRect().top <= threshold) active = s.id;
            }
            setActiveSectionId(active);
        };
        container.addEventListener("scroll", onScroll, { passive: true });
        return () => container.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToSection = useCallback((id: string) => {
        const el = sectionRefs.current[id];
        const container = contentRef.current;
        if (!el || !container) return;
        const cr = container.getBoundingClientRect();
        const er = el.getBoundingClientRect();
        container.scrollBy({ top: er.top - cr.top - 24, behavior: "smooth" });
    }, []);

    const openLightbox = useCallback((src: string) => setLightboxSrc(src), []);
    const closeLightbox = useCallback(() => setLightboxSrc(null), []);
    const navigateLightbox = useCallback((src: string) => setLightboxSrc(src), []);
    const closeTour = useCallback(() => router.push("/", { scroll: false }), [router]);

    return (
        <>
            <div className="fixed inset-0 z-50 bg-white flex flex-col" role="dialog" aria-modal="true" aria-label="Photo tour">
                <PhotoTourHeader onClose={closeTour} saved={saved} onSave={() => setSaved((s) => !s)} />
                <div ref={contentRef} className="flex-1 overflow-y-auto overscroll-contain">
                    <div className="mx-auto w-full px-5" style={{ maxWidth: "1180px" }}>
                        <PhotoTourThumbnails sections={TOUR_SECTIONS} activeId={activeSectionId} onSelect={scrollToSection} />
                        {TOUR_SECTIONS.map((section) => (
                            <PhotoTourSection
                                key={section.id}
                                section={section}
                                sectionRef={(el) => { sectionRefs.current[section.id] = el; }}
                                onPhotoClick={openLightbox}
                            />
                        ))}
                        <div style={{ height: "60px" }} />
                    </div>
                </div>
            </div>
            {lightboxSrc && (
                <Lightbox src={lightboxSrc} onClose={closeLightbox} onNavigate={navigateLightbox} />
            )}
        </>
    );
}