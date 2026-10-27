"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import PhotoTour from "./PhotoTour";
import { LISTING, HERO_IMAGES } from "./data";

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
const ShareIcon = () => (
  <svg viewBox="0 0 32 32" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23M6 11l10-8 10 8" />
  </svg>
);
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg viewBox="0 0 32 32" className="w-4 h-4" fill={filled ? "#FF385C" : "none"} stroke={filled ? "#FF385C" : "currentColor"} strokeWidth="2.5">
    <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-6.67c-2.67-.18-5.35 1.3-6.96 3.66C14.4 5.6 11.75 4.15 9 4.33 5 4.6 2 8 2 12c0 7 7 12.27 14 17z" />
  </svg>
);
const StarIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#FF385C" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="4" className="w-3.5 h-3.5">
    <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" />
  </svg>
);
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const GridIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const FlagIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" />
  </svg>
);

const AirbnbLogo = () => (
  <svg
    viewBox="0 0 3490 1080"
    style={{ display: "block", height: "32px", width: "auto", fill: "currentColor" }}
    aria-hidden="true"
  >
    <path d="M1494.71 456.953C1458.28 412.178 1408.46 389.892 1349.68 389.892C1233.51 389.892 1146.18 481.906 1146.18 605.892C1146.18 729.877 1233.51 821.892 1349.68 821.892C1408.46 821.892 1458.28 799.605 1494.71 754.83L1500.95 810.195H1589.84V401.588H1500.95L1494.71 456.953ZM1369.18 736.895C1295.33 736.895 1242.08 683.41 1242.08 605.892C1242.08 528.373 1295.33 474.888 1369.18 474.888C1443.02 474.888 1495.49 529.153 1495.49 605.892C1495.49 682.63 1443.8 736.895 1369.18 736.895ZM1656.11 810.195H1750.46V401.588H1656.11V810.195ZM948.912 666.715C875.618 506.859 795.308 344.664 713.438 184.809C698.623 155.177 670.554 98.2527 645.603 67.8412C609.736 24.1733 556.715 0.779785 502.915 0.779785C449.115 0.779785 396.094 24.1733 360.227 67.8412C335.277 98.2527 307.207 155.177 292.392 184.809C210.522 344.664 130.212 506.859 56.9187 666.715C47.5621 687.769 24.9504 737.675 16.3736 760.289C6.2373 787.581 0.779297 817.213 0.779297 846.845C0.779297 975.509 101.362 1079.22 235.473 1079.22C346.193 1079.22 434.3 1008.26 502.915 934.18C571.53 1008.26 659.638 1079.22 770.357 1079.22C904.468 1079.22 1005.83 975.509 1005.83 846.845C1005.83 817.213 999.593 787.581 989.457 760.289C980.88 737.675 958.268 687.769 948.912 666.715ZM502.915 810.195C447.555 738.455 396.094 649.56 396.094 577.819C396.094 506.079 446.776 470.209 502.915 470.209C559.055 470.209 610.516 508.419 610.516 577.819C610.516 647.22 558.275 738.455 502.915 810.195ZM770.357 998.902C688.362 998.902 618.032 941.557 555.741 872.656C619.966 792.541 690.826 679.121 690.826 577.819C690.826 458.513 598.04 389.892 502.915 389.892C407.79 389.892 315.784 458.513 315.784 577.819C315.784 679.098 386.145 792.478 450.144 872.593C387.845 941.526 317.491 998.902 235.473 998.902C146.586 998.902 81.0898 931.061 81.0898 846.845C81.0898 826.57 84.2087 807.856 91.2261 788.361C98.2436 770.426 120.855 720.52 130.212 701.025C203.505 541.17 282.256 380.534 364.126 220.679C378.941 191.047 403.891 141.921 422.605 119.307C442.877 94.3538 470.947 81.0975 502.915 81.0975C534.883 81.0975 562.953 94.3538 583.226 119.307C601.939 141.921 626.89 191.047 641.704 220.679C723.574 380.534 802.325 541.17 875.618 701.025C884.975 720.52 907.587 770.426 914.604 788.361C921.622 807.856 925.52 826.57 925.52 846.845C925.52 931.061 859.244 998.902 770.357 998.902ZM3285.71 389.892C3226.91 389.892 3175.97 413.098 3139.91 456.953V226.917H3045.56V810.195H3134.45L3140.69 754.83C3177.12 799.605 3226.94 821.892 3285.71 821.892C3401.89 821.892 3489.22 729.877 3489.22 605.892C3489.22 481.906 3401.89 389.892 3285.71 389.892ZM3266.22 736.895C3191.6 736.895 3139.91 682.63 3139.91 605.892C3139.91 529.153 3191.6 474.888 3266.22 474.888C3340.85 474.888 3393.32 528.373 3393.32 605.892C3393.32 683.41 3340.07 736.895 3266.22 736.895ZM2827.24 389.892C2766.15 389.892 2723.56 418.182 2699.37 456.953L2693.13 401.588H2604.24V810.195H2698.59V573.921C2698.59 516.217 2741.47 474.888 2800.73 474.888C2856.87 474.888 2888.84 513.097 2888.84 578.599V810.195H2983.19V566.903C2983.19 457.733 2923.15 389.892 2827.24 389.892ZM1911.86 460.072L1905.62 401.588H1816.73V810.195H1911.08V604.332C1911.08 532.592 1954.74 486.585 2027.26 486.585C2042.85 486.585 2058.44 488.144 2070.92 492.043V401.588C2059.22 396.91 2044.41 395.35 2028.04 395.35C1978.58 395.35 1936.66 421.177 1911.86 460.072ZM2353.96 389.892C2295.15 389.892 2244.21 413.098 2208.15 456.953V226.917H2113.8V810.195H2202.69L2208.93 754.83C2245.36 799.605 2295.18 821.892 2353.96 821.892C2470.13 821.892 2557.46 729.877 2557.46 605.892C2557.46 481.906 2470.13 389.892 2353.96 389.892ZM2334.46 736.895C2259.84 736.895 2208.15 682.63 2208.15 605.892C2208.15 529.153 2259.84 474.888 2334.46 474.888C2409.09 474.888 2461.56 528.373 2461.56 605.892C2461.56 683.41 2408.31 736.895 2334.46 736.895ZM1703.28 226.917C1669.48 226.917 1642.08 254.326 1642.08 288.13C1642.08 321.934 1669.48 349.343 1703.28 349.343C1737.09 349.343 1764.49 321.934 1764.49 288.13C1764.49 254.326 1737.09 226.917 1703.28 226.917Z" />
  </svg>
);

function AmenityIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    kitchen: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2v20M18 2v20M6 8h12M6 16h12" /></svg>,
    wifi: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" /></svg>,
    workspace: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    parking: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></svg>,
    tv: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="15" rx="2" /><polyline points="17 2 12 7 7 2" /></svg>,
    ac: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 16h8M2 12h20M12 3v18M5.636 5.636l2.829 2.829M15.536 15.536l2.828 2.828M18.364 5.636l-2.828 2.829M8.464 15.536l-2.828 2.828" /></svg>,
    washer: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="2" /><circle cx="12" cy="13" r="4" /><circle cx="8" cy="6" r="1" fill="currentColor" /><circle cx="12" cy="6" r="1" fill="currentColor" /></svg>,
    hotTub: <Image src="/images/chips/hot_tub.png" alt="hot tub" width={24} height={24} className="object-contain" />,
    pool: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1" /><path d="M2 16c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1" /><path d="M7 11l1-1a5 5 0 0 1 7 0l1 1" /><circle cx="17" cy="4" r="1.5" fill="currentColor" stroke="none" /></svg>,
    longTerms: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    luggage: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>,
    pets: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.1 2.344-1.56" /><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.1-2.344-1.56" /><path d="M8 14v.5A3.5 3.5 0 0 0 11.5 18h1a3.5 3.5 0 0 0 3.5-3.5V14a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2z" /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" /><circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" /></svg>,
  };
  return <>{icons[icon] ?? <div className="w-6 h-6 bg-gray-200 rounded" />}</>;
}

function HighlightIcon({ icon }: { icon: string }) {
  if (icon === "outdoor") return <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  if (icon === "cool") return <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 16h8M2 12h20M12 3v18M5.636 5.636l2.829 2.829M15.536 15.536l2.828 2.828M18.364 5.636l-2.828 2.829M8.464 15.536l-2.828 2.828" /></svg>;
  return <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>;
}

/* ------------------------------------------------------------------ */
/* Mini calendar                                                       */
/* ------------------------------------------------------------------ */
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
function MiniCalendar({ year, month }: { year: number; month: number }) {
  const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const checkInDate = new Date(2026, 9, 18);
  const checkOutDate = new Date(2026, 9, 23);
  return (
    <div className="flex-1 min-w-[200px]">
      <div className="text-center font-medium text-[15px] mb-3">{monthName}</div>
      <div className="grid grid-cols-7 gap-0 mb-1">
        {DAYS.map((d, i) => <div key={i} className="text-center text-[12px] font-medium text-[#717171] py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const date = new Date(year, month, day);
          const isCheckIn = date.getTime() === checkInDate.getTime();
          const isCheckOut = date.getTime() === checkOutDate.getTime();
          const isInRange = date > checkInDate && date < checkOutDate;
          return (
            <div key={i} className="flex items-center justify-center h-9">
              <span className={`flex items-center justify-center w-8 h-8 rounded-full text-[14px] cursor-pointer
                ${isCheckIn || isCheckOut ? "bg-[#222222] text-white font-medium" : ""}
                ${isInRange ? "bg-[#F0F0F0] rounded-none w-full" : "hover:bg-[#F7F7F7]"}
                ${!isCheckIn && !isCheckOut && !isInRange ? "text-[#222222]" : ""}
              `}>{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Booking widget (simplified; the wrapper in the page is sticky)      */
/* ------------------------------------------------------------------ */
function BookingWidget() {
  const labelCls = "text-[12px] font-bold text-[#222222] uppercase tracking-wide leading-none";
  const valueCls = "text-[16px] text-[#222222] leading-none";
  return (
    <div
      className="border border-[#DDDDDD] rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      style={{ padding: "32px" }}
    >
      {/* Price */}
      <div style={{ marginBottom: "24px" }}>
        <span className="text-[26px] font-semibold text-[#222222] underline">&#8377;28,499</span>
        <span className="text-[16px] text-[#222222]"> for {LISTING.nights} nights</span>
      </div>

      {/* Dates + guests */}
      <div className="border border-[#B0B0B0] rounded-xl overflow-hidden" style={{ marginBottom: "20px" }}>
        <div className="grid grid-cols-2 divide-x divide-[#B0B0B0]">
          <div className="hover:bg-[#F7F7F7] cursor-pointer transition-colors" style={{ padding: "16px" }}>
            <div className={labelCls}>Check-in</div>
            <div className={valueCls} style={{ marginTop: "10px" }}>10/18/2026</div>
          </div>
          <div className="hover:bg-[#F7F7F7] cursor-pointer transition-colors" style={{ padding: "16px" }}>
            <div className={labelCls}>Checkout</div>
            <div className={valueCls} style={{ marginTop: "10px" }}>10/23/2026</div>
          </div>
        </div>
        <div
          className="border-t border-[#B0B0B0] hover:bg-[#F7F7F7] cursor-pointer flex items-center justify-between transition-colors"
          style={{ padding: "16px" }}
        >
          <div>
            <div className={labelCls}>Guests</div>
            <div className={valueCls} style={{ marginTop: "10px" }}>2 guests</div>
          </div>
          <span className="text-[#222222]"><ChevronDownIcon /></span>
        </div>
      </div>

      {/* Free cancellation */}
      <div
        className="bg-[#F7F7F7] rounded-lg text-center text-[15px] text-[#717171]"
        style={{ padding: "12px 16px", marginBottom: "20px" }}
      >
        Free cancellation before <span className="font-semibold text-[#222222]">{LISTING.freeCancellationBefore}</span>
      </div>

      {/* Reserve */}
      <button
        className="w-full text-white rounded-full text-[18px] font-semibold hover:opacity-95 transition-opacity"
        style={{
          padding: "18px 24px",
          marginBottom: "20px",
          background: "linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)",
        }}
      >
        Reserve
      </button>
      <div className="text-center text-[16px] text-[#717171]">You won&apos;t be charged yet</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky sub nav                                                      */
/* ------------------------------------------------------------------ */
const NAV_TABS = ["Photos", "Amenities", "Reviews", "Location"];
function StickySubNav({ activeTab, onTabClick }: { activeTab: string; onTabClick: (tab: string) => void }) {
  return (
    <div className="fixed top-20 left-0 right-0 z-30 bg-white border-b border-[#DDDDDD] shadow-sm animate-fadeIn">
      <div className="max-w-[1020px] mx-auto px-6 flex items-center justify-between">
        <nav className="flex" role="navigation">
          {NAV_TABS.map((tab) => (
            <button key={tab} onClick={() => onTabClick(tab)} className={`py-4 px-1 mr-6 text-[14px] border-b-2 transition-colors ${activeTab === tab ? "border-[#222222] text-[#222222] font-medium" : "border-transparent text-[#717171] hover:text-[#222222]"}`}>{tab}</button>
          ))}
        </nav>
        <div className="flex items-center gap-3 py-3">
          <div className="text-[14px] font-medium text-[#222222]">&#8377;{LISTING.price.toLocaleString("en-IN")} <span className="font-normal text-[#717171]">for {LISTING.nights} nights</span></div>
          <div className="text-[13px] text-[#717171] flex items-center gap-1"><StarIcon className="w-3 h-3" /> {LISTING.rating} &middot; {LISTING.reviewCount} reviews</div>
          <button className="bg-[#FF385C] text-white px-5 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#e0314e] transition-colors">Reserve</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
const SIMILAR_STAYS = [
  { img: "/images/similar/s1.jpeg", title: "Beautiful Studio with a view to die for", price: "₹23,600", rating: "4.91" },
  { img: "/images/similar/s2.jpeg", title: "NAQAB - 1bhk with private pool", price: "₹42,218", rating: "4.95" },
  { img: "/images/similar/s3.jpeg", title: "Greentique Luxury Flat with plunge pool, Calangute", price: "₹44,506", rating: "4.94" },
  { img: "/images/similar/s4.jpeg", title: "The Tropical Studio | 5 mins to Beach", price: "₹22,824", rating: "4.96" },
  { img: "/images/similar/s5.jpeg", title: "Luxury Casa Bella 1BHK with plunge pool, Calangute", price: "₹39,942", rating: "4.95" },
];

function ListingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const showPhotoTour = modal === "PHOTO_TOUR_SCROLLABLE";
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("Photos");
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const photosRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky sub-nav once scrolled past hero photos (approx 580px)
      setShowStickyNav(window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openPhotoTour = (id?: number) => {
    if (id) {
      router.push(`/?modal=PHOTO_TOUR_SCROLLABLE&modalItem=${id}`, { scroll: false });
    } else {
      router.push("/?modal=PHOTO_TOUR_SCROLLABLE", { scroll: false });
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = { Photos: photosRef, Amenities: amenitiesRef, Reviews: reviewsRef, Location: locationRef };
    refs[tab]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const displayAmenities = showAllAmenities ? LISTING.amenities : LISTING.amenities.slice(0, 8);

  return (
    <>
      {showPhotoTour && <Suspense fallback={<div className="fixed inset-0 bg-white z-50" />}><PhotoTour /></Suspense>}
      <div className="bg-white min-h-screen" style={{ fontFamily: "Cereal, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif" }}>
        {/* ============ NAVBAR: full width ============ */}
        <header className="border-b border-[#DDDDDD] bg-white sticky top-0 z-40 w-full">
          <div className="relative w-full px-6 lg:px-[100px] h-20 flex items-center justify-between">
            {/* Logo */}
            <a href="/" aria-label="Airbnb home" className="flex items-center text-[#FF385C]">
              <AirbnbLogo />
            </a>

            {/* Search pill: centered on the page */}
            <div className="hidden md:flex items-center h-[58px] absolute left-1/2 -translate-x-1/2 border border-[#DDDDDD] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_6px_16px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer pl-5 pr-2">
              <div className="flex items-center gap-3 pr-5">
                <Image src="/images/ui/searchbar_house.png" alt="" width={40} height={40} className="object-contain w-10 h-10" />
                <span className="text-[16px] font-medium text-[#222222]">Anywhere</span>
              </div>
              <span className="h-6 w-px bg-[#DDDDDD]" />
              <div className="px-5 text-[16px] font-medium text-[#222222]">Anytime</div>
              <span className="h-6 w-px bg-[#DDDDDD]" />
              <div className="flex items-center gap-4 pl-5">
                <span className="text-[16px] text-[#717171]">Add guests</span>
                <span className="bg-[#FF385C] text-white rounded-full w-10 h-10 flex items-center justify-center"><SearchIcon /></span>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2.5">
              <button className="text-[16px] font-medium text-[#222222] px-5 py-2 rounded-full hover:bg-[#F7F7F7] transition-colors hidden md:block">Become a host</button>
              <button aria-label="Language" className="w-[50px] h-[50px] rounded-full bg-[#F2F2F2] hover:bg-[#EBEBEB] transition-colors flex items-center justify-center text-[#222222]"><GlobeIcon /></button>
              <button aria-label="Menu" className="w-[50px] h-[50px] rounded-full bg-[#F2F2F2] hover:bg-[#EBEBEB] transition-colors flex items-center justify-center text-[#222222]"><MenuIcon /></button>
            </div>
          </div>
        </header>

        {/* ============ MAIN ============ */}
        <main className="max-w-[1120px] mx-auto px-6">
          {/* Title */}
          <div className="flex items-center justify-between pt-6 pb-4" ref={photosRef}>
            <h1 className="text-[26px] font-semibold text-[#222222] leading-tight">{LISTING.title}</h1>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 text-[14px] font-medium text-[#222222] hover:bg-[#F7F7F7] px-3 py-2 rounded-lg underline"><ShareIcon /> Share</button>
              <button onClick={() => setSaved(!saved)} className="flex items-center gap-2 text-[14px] font-medium text-[#222222] hover:bg-[#F7F7F7] px-3 py-2 rounded-lg underline"><HeartIcon filled={saved} /> {saved ? "Saved" : "Save"}</button>
            </div>
          </div>

          {/* Photo grid */}
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[480px]">
              <button
                onClick={() => openPhotoTour(HERO_IMAGES[0].id)}
                className="col-span-2 row-span-2 relative group overflow-hidden focus:outline-none cursor-pointer"
                aria-label="View main photo"
              >
                <Image
                  src={HERO_IMAGES[0].src}
                  alt={HERO_IMAGES[0].alt}
                  fill
                  className="object-cover group-hover:brightness-90 transition-all duration-300"
                  priority
                  sizes="50vw"
                />
              </button>
              {HERO_IMAGES.slice(1).map((img) => (
                <button
                  key={img.id}
                  onClick={() => openPhotoTour(img.id)}
                  className="relative group overflow-hidden focus:outline-none cursor-pointer"
                  aria-label={`View photo: ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:brightness-90 transition-all duration-300"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>

            {/* Show all photos button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openPhotoTour();
              }}
              className="absolute bottom-5 right-5 z-20 flex items-center gap-2 bg-white text-[#222222] text-[14px] font-medium px-4 py-2 rounded-lg border border-[#222222] shadow-md hover:bg-[#F7F7F7] active:scale-95 transition-all cursor-pointer"
              aria-label="Show all photos"
            >
              <GridIcon />
              <span>Show all photos</span>
            </button>
          </div>

          {/* ============================================================
              TWO COLUMN SECTION: ends after the Calendar.
              The right column stretches to the same height as the left
              column, and the inner wrapper is sticky, so the booking card
              stops being sticky exactly where the calendar ends.
              ============================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-x-16">
            {/* Left column */}
            <div className="min-w-0">
              <div className="pb-6 border-b border-[#DDDDDD]">
                <h2 className="text-[22px] font-semibold text-[#222222] mb-1">{LISTING.type}</h2>
                <p className="text-[16px] text-[#222222]">{LISTING.guests} guests &middot; {LISTING.bedrooms} bedroom &middot; {LISTING.beds} bed &middot; {LISTING.bathrooms} bathroom</p>
              </div>

              {/* Guest favourite */}
              <div className="py-6 border-b border-[#DDDDDD]">
                <div className="flex items-center gap-4 border border-[#DDDDDD] rounded-xl p-4">
                  <div className="flex flex-col items-center min-w-[120px]">
                    <div className="flex items-center gap-1 mb-1">
                      <Image src="/images/ui/laurel_left.png" alt="" width={20} height={36} className="object-contain" />
                      <span className="text-[12px] font-semibold text-[#222222] text-center leading-tight">Guest<br />favourite</span>
                      <Image src="/images/ui/laurel_right.png" alt="" width={20} height={36} className="object-contain" />
                    </div>
                    <p className="text-[11px] text-[#717171] text-center">One of the most loved homes on Airbnb, according to guests</p>
                  </div>
                  <div className="h-10 w-px bg-[#DDDDDD]" />
                  <div className="flex flex-col items-center px-4">
                    <div className="text-[22px] font-semibold text-[#222222]">{LISTING.rating}</div>
                    <div className="flex gap-0.5 my-0.5">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
                  </div>
                  <div className="h-10 w-px bg-[#DDDDDD]" />
                  <div className="flex flex-col items-center px-4">
                    <div className="text-[22px] font-semibold text-[#222222]">{LISTING.reviewCount}</div>
                    <div className="text-[12px] text-[#717171] underline cursor-pointer">Reviews</div>
                  </div>
                </div>
              </div>

              {/* Host */}
              <div className="py-6 border-b border-[#DDDDDD] flex items-center gap-4">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image src={LISTING.hostAvatar} alt={LISTING.hostName} fill className="rounded-full object-cover" sizes="48px" />
                </div>
                <div>
                  <div className="text-[16px] font-medium text-[#222222]">Hosted by {LISTING.hostName}</div>
                  <div className="text-[14px] text-[#717171]">{LISTING.hostYears} years hosting</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="py-6 border-b border-[#DDDDDD] space-y-5">
                {LISTING.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-[#222222]"><HighlightIcon icon={h.icon} /></div>
                    <div>
                      <div className="text-[15px] font-medium text-[#222222]">{h.title}</div>
                      <div className="text-[14px] text-[#717171]">{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="py-6 border-b border-[#DDDDDD]">
                <div className="bg-[#F7F7F7] rounded-xl p-4 text-[14px] text-[#717171] mb-4">
                  Some info has been automatically translated. <span className="text-[#222222] font-medium underline cursor-pointer">Show original</span>
                </div>
                <div className="text-[15px] text-[#222222] leading-relaxed">
                  {showFullDesc ? <div className="whitespace-pre-line">{LISTING.descriptionFull}</div> : <p>{LISTING.descriptionShort}</p>}
                </div>
                {!showFullDesc && (
                  <button onClick={() => setShowFullDesc(true)} className="mt-4 flex items-center gap-1 text-[15px] font-semibold text-[#222222] underline">
                    Show more <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" /></svg>
                  </button>
                )}
              </div>

              {/* Sleeping arrangements */}
              <div className="py-6 border-b border-[#DDDDDD]">
                <h2 className="text-[22px] font-semibold text-[#222222] mb-4">Where you&apos;ll sleep</h2>
                <div className="grid grid-cols-2 gap-4">
                  {LISTING.sleepingArrangements.map((s, i) => (
                    <div key={i} className="border border-[#DDDDDD] rounded-xl overflow-hidden">
                      <div className="relative h-[160px]">
                        <Image src={s.image} alt={s.room} fill className="object-cover" sizes="250px" />
                      </div>
                      <div className="p-4">
                        <div className="text-[15px] font-semibold text-[#222222]">{s.room}</div>
                        <div className="text-[14px] text-[#717171]">{s.bed}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div ref={amenitiesRef} className="py-6 border-b border-[#DDDDDD]">
                <h2 className="text-[22px] font-semibold text-[#222222] mb-4">What this place offers</h2>
                <div className="grid grid-cols-2 gap-y-4">
                  {displayAmenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-4 text-[15px] text-[#222222]">
                      <AmenityIcon icon={a.icon} /> {a.label}
                    </div>
                  ))}
                </div>
                {!showAllAmenities && LISTING.amenities.length > 8 && (
                  <button onClick={() => setShowAllAmenities(true)} className="mt-6 border border-[#222222] text-[#222222] text-[15px] font-medium px-6 py-3 rounded-xl hover:bg-[#F7F7F7] transition-colors">
                    Show all {LISTING.amenities.length} amenities
                  </button>
                )}
              </div>

              {/* Calendar: LAST block of the two-column section (no border-b) */}
              <div className="py-6">
                <h2 className="text-[22px] font-semibold text-[#222222] mb-1">{LISTING.nights} nights in Candolim</h2>
                <p className="text-[15px] text-[#717171] mb-6">{LISTING.checkIn} &ndash; {LISTING.checkOut}</p>
                <div className="flex items-start gap-8">
                  <MiniCalendar year={2026} month={9} />
                  <MiniCalendar year={2026} month={10} />
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-5 h-5 border border-[#222222] rounded" />
                  <button className="text-[14px] font-medium text-[#222222] underline">Clear dates</button>
                </div>
              </div>
            </div>

            {/* Right column: stretches to the left column's height.
                The inner wrapper is sticky and can only travel inside this column,
                so it releases when the calendar ends. */}
            <div className="hidden lg:block">
              <div className="sticky top-[100px] pt-6">
                {/* Discount banner */}
                <div className="flex items-center justify-between border border-[#DDDDDD] rounded-2xl bg-white" style={{ padding: "16px 20px", marginBottom: "16px" }}>
                  <div className="flex items-center gap-3">
                    <Image src="/images/ui/discount.svg" alt="discount" width={28} height={28} className="flex-shrink-0" />
                    <div>
                      <div className="text-[15px] text-[#222222] leading-snug">Get 10% off your next stay.</div>
                      <div className="text-[15px]"><span className="font-semibold text-[#222222] underline cursor-pointer">Terms apply</span></div>
                    </div>
                  </div>
                  <button className="bg-[#F7F7F7] text-[#222222] text-[16px] font-medium rounded-lg hover:bg-[#EBEBEB] transition-colors flex-shrink-0" style={{ padding: "10px 20px" }}>Claim</button>
                </div>

                {/* Booking card */}
                <BookingWidget />
              </div>
            </div>
          </div>

          {/* ============================================================
              FULL WIDTH SECTIONS: everything below the calendar
              ============================================================ */}
          <div className="border-t border-[#DDDDDD]">
            {/* Reviews */}
            <div ref={reviewsRef} className="py-10 border-b border-[#DDDDDD] scroll-mt-40">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Image src="/images/ui/laurel_left.png" alt="" width={32} height={56} className="object-contain" />
                <div className="text-[72px] font-bold text-[#222222] leading-none">{LISTING.rating}</div>
                <Image src="/images/ui/laurel_right.png" alt="" width={32} height={56} className="object-contain" />
              </div>
              <div className="text-center mb-8">
                <div className="text-[18px] font-semibold text-[#222222]">Guest favourite</div>
                <p className="text-[14px] text-[#717171] max-w-md mx-auto mt-1">One of the most loved homes on Airbnb, based on ratings, reviews and reliability</p>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-0 mb-8">
                {LISTING.reviewCategories.map((rc, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-[#DDDDDD]">
                    <div className="flex-1">
                      <div className="text-[14px] text-[#222222] mb-1.5">{rc.label}</div>
                      <div className="h-1 bg-[#DDDDDD] rounded-full">
                        <div className="h-1 bg-[#222222] rounded-full" style={{ width: `${(rc.score / 5) * 100}%` }} />
                      </div>
                    </div>
                    <span className="text-[14px] font-medium text-[#222222] w-8 text-right">{rc.score}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-[18px] font-semibold text-[#222222] mb-5">{LISTING.reviewCount} reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LISTING.reviews.map((r, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image src={r.avatar} alt={r.author} fill className="rounded-full object-cover" sizes="40px" />
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-[#222222]">{r.author}</div>
                        <div className="text-[13px] text-[#717171]">{r.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">{[...Array(r.rating)].map((_, j) => <StarIcon key={j} className="w-3 h-3" />)}</div>
                    <p className="text-[14px] text-[#222222] leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
              <button className="mt-8 border border-[#222222] text-[#222222] text-[15px] font-medium px-6 py-3 rounded-xl hover:bg-[#F7F7F7] transition-colors">
                Show all {LISTING.reviewCount} reviews
              </button>
            </div>

            {/* Location */}
            <div ref={locationRef} className="py-10 border-b border-[#DDDDDD] scroll-mt-40">
              <h2 className="text-[22px] font-semibold text-[#222222] mb-1">Where you&apos;ll be</h2>
              <div className="text-[16px] text-[#222222] mb-6">Candolim, Goa, India</div>
              <div className="rounded-2xl overflow-hidden relative border border-[#DDDDDD] shadow-sm aspect-[2.1/1] w-full bg-[#f8f9fa]">
                <Image
                  src="/images/map.png"
                  alt="Map of Candolim, Goa, India"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute top-4 left-4 z-10 bg-white rounded-full p-2.5 shadow-md border border-black/10 hover:bg-[#F7F7F7] cursor-pointer">
                  <SearchIcon />
                </div>
                <div className="absolute top-4 right-4 z-10 flex flex-col bg-white rounded-lg shadow-md border border-black/10 overflow-hidden">
                  <button className="px-3 py-1.5 hover:bg-[#F7F7F7] text-[#222222] font-semibold text-[16px] border-b border-black/10">+</button>
                  <button className="px-3 py-1.5 hover:bg-[#F7F7F7] text-[#222222] font-semibold text-[16px]">&minus;</button>
                </div>
              </div>
              <div className="mt-6 text-[14px] text-[#222222]">
                Exact location will be provided after booking.
              </div>
              <div className="mt-8 max-w-3xl">
                <h3 className="text-[16px] font-semibold text-[#222222] mb-3">Neighbourhood highlights</h3>
                <p className="text-[15px] text-[#222222] leading-relaxed mb-3">
                  Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, caf&eacute;s, and popular attractions.
                </p>
                <button className="inline-flex items-center gap-1 text-[16px] font-semibold text-[#222222] underline cursor-pointer hover:text-black">
                  Show more <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" /></svg>
                </button>
              </div>
            </div>

            {/* Meet your host */}
            <div className="py-10 border-b border-[#DDDDDD]">
              <h2 className="text-[22px] font-semibold text-[#222222] mb-6">Meet your host</h2>
              <div className="grid grid-cols-1 md:grid-cols-[330px_1fr] gap-8">
                {/* Host card */}
                <div className="bg-white border border-[#EBEBEB] rounded-3xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.08)] flex items-center justify-between">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 mb-3">
                      <div className="w-24 h-24 rounded-full bg-[#1c3829] flex items-center justify-center text-white overflow-hidden shadow-sm">
                        <Image
                          src="/images/avatars/host.jpeg"
                          alt="Mirashya Homes"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1.5 rounded-full border-2 border-white shadow">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-[20px] font-bold text-[#222222]">Mirashya Homes</h3>
                    <p className="text-[13px] text-[#717171] mt-0.5">Host</p>
                  </div>

                  <div className="space-y-4 text-right pr-2">
                    <div>
                      <div className="text-[18px] font-bold text-[#222222]">1,463</div>
                      <div className="text-[11px] text-[#717171]">Reviews</div>
                    </div>
                    <div className="h-px bg-[#EBEBEB] w-full" />
                    <div>
                      <div className="text-[18px] font-bold text-[#222222] flex items-center justify-end gap-1">
                        4.68 <StarIcon className="w-3 h-3" />
                      </div>
                      <div className="text-[11px] text-[#717171]">Rating</div>
                    </div>
                    <div className="h-px bg-[#EBEBEB] w-full" />
                    <div>
                      <div className="text-[18px] font-bold text-[#222222]">2</div>
                      <div className="text-[11px] text-[#717171]">Years hosting</div>
                    </div>
                  </div>
                </div>

                {/* Co-hosts and host details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#222222] mb-4">Co-Hosts</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-4">
                      <div className="flex items-center gap-2.5">
                        <Image src="/images/avatars/co1.jpg" alt="Sharath" width={32} height={32} className="rounded-full object-cover w-8 h-8" />
                        <span className="text-[13px] text-[#222222]">Sharath</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Image src="/images/avatars/co2.jpg" alt="Aman Dev Pahwa" width={32} height={32} className="rounded-full object-cover w-8 h-8" />
                        <span className="text-[13px] text-[#222222]">Aman Dev Pahwa</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Image src="/images/avatars/co3.jpg" alt="Maria Karen Priyanka" width={32} height={32} className="rounded-full object-cover w-8 h-8" />
                        <span className="text-[13px] text-[#222222]">Maria Karen Priyanka</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Image src="/images/avatars/rev1.jpeg" alt="Simran" width={32} height={32} className="rounded-full object-cover w-8 h-8" />
                        <span className="text-[13px] text-[#222222]">Simran</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Image src="/images/avatars/rev2.jpeg" alt="Pallavi" width={32} height={32} className="rounded-full object-cover w-8 h-8" />
                        <span className="text-[13px] text-[#222222]">Pallavi</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Image src="/images/avatars/rev3.jpeg" alt="Sanyukta" width={32} height={32} className="rounded-full object-cover w-8 h-8" />
                        <span className="text-[13px] text-[#222222]">Sanyukta</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-[12px]">S</div>
                        <span className="text-[13px] text-[#222222]">Shruti</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[12px]">A</div>
                        <span className="text-[13px] text-[#222222]">Amisha</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EBEBEB]">
                    <h4 className="text-[15px] font-semibold text-[#222222] mb-1">Host details</h4>
                    <p className="text-[14px] text-[#717171]">Response rate: 100%</p>
                    <p className="text-[14px] text-[#717171]">Responds within an hour</p>
                    <button className="mt-4 bg-[#222222] text-white font-medium text-[14px] px-6 py-2.5 rounded-lg hover:bg-black transition-colors">
                      Message host
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-[14px] text-[#222222]">
                  <span className="text-[18px]">💡</span> Born in the 80s
                </div>
                <div className="flex items-center gap-3 text-[14px] text-[#222222]">
                  <span className="text-[18px]">🎓</span> Where I went to school: NICMAR GOA
                </div>
              </div>
            </div>

            {/* Things to know */}
            <div className="py-10 border-b border-[#DDDDDD]">
              <h2 className="text-[22px] font-semibold text-[#222222] mb-6">Things to know</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cancellation policy */}
                <div>
                  <div className="text-[20px] mb-3">📅</div>
                  <h3 className="text-[16px] font-semibold text-[#222222] mb-2">Cancellation policy</h3>
                  <p className="text-[14px] text-[#717171] leading-relaxed mb-2">
                    Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.
                  </p>
                  <p className="text-[14px] text-[#717171] leading-relaxed mb-4">
                    Review this host&apos;s full policy for details.
                  </p>
                  <button className="text-[14px] font-semibold text-[#222222] underline cursor-pointer">Learn more</button>
                </div>

                {/* House rules */}
                <div>
                  <div className="text-[20px] mb-3">🔑</div>
                  <h3 className="text-[16px] font-semibold text-[#222222] mb-2">House rules</h3>
                  <p className="text-[14px] text-[#717171] leading-relaxed mb-1">Check-in after 2:00 pm</p>
                  <p className="text-[14px] text-[#717171] leading-relaxed mb-1">Checkout before 11:00 am</p>
                  <p className="text-[14px] text-[#717171] leading-relaxed mb-4">3 guests maximum</p>
                  <button className="text-[14px] font-semibold text-[#222222] underline cursor-pointer">Learn more</button>
                </div>

                {/* Safety & property */}
                <div>
                  <div className="text-[20px] mb-3">🛡️</div>
                  <h3 className="text-[16px] font-semibold text-[#222222] mb-2">Safety &amp; property</h3>
                  <p className="text-[14px] text-[#717171] leading-relaxed mb-1">Carbon monoxide alarm not reported</p>
                  <p className="text-[14px] text-[#717171] leading-relaxed mb-1">Smoke alarm not reported</p>
                  <p className="text-[14px] text-[#717171] leading-relaxed mb-4">Exterior security cameras on property</p>
                  <button className="text-[14px] font-semibold text-[#222222] underline cursor-pointer">Learn more</button>
                </div>
              </div>
            </div>

            {/* More stays nearby */}
            <div className="py-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[22px] font-semibold text-[#222222]">More stays nearby</h2>
                <div className="flex items-center gap-2 text-[14px] text-[#717171]">
                  <span>1 / 2</span>
                  <button className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center hover:bg-[#F7F7F7] cursor-pointer" aria-label="Previous stays">&lt;</button>
                  <button className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center hover:bg-[#F7F7F7] cursor-pointer" aria-label="Next stays">&gt;</button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {SIMILAR_STAYS.map((stay, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-[#EBEBEB]">
                      <Image
                        src={stay.img}
                        alt={stay.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    </div>
                    <div className="text-[14px] font-medium text-[#222222] truncate">{stay.title}</div>
                    <div className="text-[13px] text-[#717171] mt-0.5">
                      <span className="font-semibold text-[#222222]">{stay.price}</span> &middot; ★ {stay.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom report link */}
            <div className="py-6 border-t border-[#DDDDDD]">
              <button className="flex items-center gap-2 text-[14px] text-[#222222] underline"><FlagIcon /> Report this listing</button>
            </div>
          </div>
        </main>
      </div>
      {showStickyNav && <StickySubNav activeTab={activeTab} onTabClick={handleTabClick} />}
    </>
  );
}

export default function ListingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ListingPageContent />
    </Suspense>
  );
}