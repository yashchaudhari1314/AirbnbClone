// Airbnb listing data - Romantic Jacuzzi 1BHK Candolim | Mirashya UG10

export const LISTING = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  type: "Entire serviced apartment in Candolim, India",
  guests: 3,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  rating: 4.95,
  reviewCount: 19,
  isGuestFavourite: true,
  hostName: "Mirashya Homes",
  hostYears: 2,
  hostAvatar: "/images/avatars/host.jpeg",
  price: 28499,
  nights: 5,
  checkIn: "10/18/2026",
  checkOut: "10/23/2026",
  freeCancellationBefore: "17 October",
  descriptionShort: "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy and stylish Jacuzzi apartment in the heart of Candolim. Enjoy high-speed WiFi 📶, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🌅. It's perfect for couples and solo travellers seeking a chic and comfortable stay.",
  descriptionFull: "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy and stylish Jacuzzi apartment in the heart of Candolim. Enjoy high-speed WiFi 📶, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🌅. It's perfect for couples and solo travellers seeking a chic and comfortable stay.\n\n🏡 The Space: 1 Bedroom | 1 Bathroom | Max 2 Adults + 1 Child\nOur beautifully designed apartment features a private outdoor Jacuzzi, a fully equipped kitchen, a comfortable bedroom with quality linens, a modern bathroom, and a living area to relax in style.\n\n📍 The Neighborhood: Candolim, North Goa\nLocated in the vibrant Candolim area, you're steps away from some of North Goa's most famous beaches, beach shacks, and local markets.\n\n🚗 Getting Around: A rental scooter or car is recommended to explore Goa at your own pace.",
  highlights: [
    { icon: "outdoor", title: "Outdoor entertainment", desc: "The pool and alfresco dining are great for summer trips." },
    { icon: "cool", title: "Designed for staying cool", desc: "Beat the heat with the A/C and ceiling fan." },
    { icon: "checkin", title: "Self check-in", desc: "You can check in with the building staff." },
  ],
  amenities: [
    { icon: "kitchen", label: "Kitchen" },
    { icon: "wifi", label: "Wifi" },
    { icon: "workspace", label: "Dedicated workspace" },
    { icon: "parking", label: "Free parking on premises" },
    { icon: "tv", label: "TV" },
    { icon: "ac", label: "Air conditioning" },
    { icon: "washer", label: "Washer" },
    { icon: "hotTub", label: "Private hot tub" },
    { icon: "pool", label: "Pool" },
    { icon: "longTerms", label: "Long term stays allowed" },
    { icon: "luggage", label: "Luggage dropoff allowed" },
    { icon: "pets", label: "Pets allowed" },
  ],
  sleepingArrangements: [
    { room: "Bedroom", bed: "1 double bed", image: "/images/79f59adb_5a5f_4d6c_8109_1f01f4ca0d03.jpeg" },
    { room: "Living room", bed: "1 sofa", image: "/images/3c90338e_86b4_423f_aae1_279e0ccc3a18.jpeg" },
  ],
  reviewCategories: [
    { label: "Cleanliness", score: 4.9, icon: "cleanliness" },
    { label: "Accuracy", score: 4.8, icon: "accuracy" },
    { label: "Check-in", score: 4.9, icon: "cleanliness" },
    { label: "Location", score: 4.8, icon: "location" },
    { label: "Value", score: 4.8, icon: "comfort" },
    { label: "Amenities", score: 4.5, icon: "amenities" },
  ],
  reviews: [
    { author: "Sarah", avatar: "/images/avatars/co1.jpg", date: "September 2026", rating: 5, text: "Amazing stay! The jacuzzi was perfect, and the location is great. Mirashya was an excellent host. Highly recommend this place for a romantic getaway." },
    { author: "David", avatar: "/images/avatars/co2.jpg", date: "August 2026", rating: 5, text: "Loved everything about this place. Very clean, stylish, and the host was super responsive. The outdoor jacuzzi was our favorite part. Will definitely come back!" },
    { author: "Priya", avatar: "/images/avatars/co3.jpg", date: "July 2026", rating: 5, text: "Great apartment in Candolim! The jacuzzi was wonderful and the amenities were top-notch. Walking distance to the beach and good restaurants nearby." },
    { author: "James", avatar: "/images/avatars/rev1.jpeg", date: "June 2026", rating: 5, text: "Perfect retreat. The apartment was spotless and very well-equipped. The jacuzzi under the stars was a dream. Thank you Mirashya for a wonderful experience!" },
    { author: "Emma", avatar: "/images/avatars/rev2.jpeg", date: "May 2026", rating: 5, text: "Wonderful experience overall. Location is ideal, apartment is beautiful, and the jacuzzi is an absolute bonus. Would highly recommend to anyone visiting Goa." },
    { author: "Rohit", avatar: "/images/avatars/rev3.jpeg", date: "April 2026", rating: 5, text: "Had a fantastic stay. The property was exactly as described. Clean, comfortable, and stylish. The host was very helpful with local recommendations." },
  ],
};

export interface Photo {
  id: number;
  src: string;
  category: string;
  alt: string;
}

export const PHOTOS: Photo[] = [
  { id: 1001, src: "/images/0622ab42_b851_4d55_9d9f_df3143bc5909.jpeg", category: "Living area", alt: "Outdoor living area with wicker chairs and jacuzzi" },
  { id: 1002, src: "/images/23ea6621_6f74_4baa_acea_2fd03e312b41.jpeg", category: "Living area", alt: "Stylish lounge seating area" },
  { id: 1003, src: "/images/153aa732_4935_48b8_a6fe_b469b6af5efc.jpeg", category: "Living area", alt: "Indoor seating and lounge" },
  { id: 1004, src: "/images/1c827136_4a85_4fe0_8e69_3fd8ea19bb17.jpeg", category: "Living area", alt: "Living room with sofa" },
  { id: 1005, src: "/images/929545d3_e241_46c0_8a70_c24531ce7b54.jpeg", category: "Living area", alt: "Cozy living space" },
  { id: 1006, src: "/images/79f59adb_5a5f_4d6c_8109_1f01f4ca0d03.jpeg", category: "Bedroom", alt: "Main bedroom with double bed" },
  { id: 1007, src: "/images/3c90338e_86b4_423f_aae1_279e0ccc3a18.jpeg", category: "Bedroom", alt: "Bedroom interior" },
  { id: 1008, src: "/images/2367476f_11c4_4a14_a7c6_267be62c1d59.jpeg", category: "Bedroom", alt: "Comfortable bedroom" },
  { id: 1009, src: "/images/5b856fde_a393_41bf_b373_c9d02e64221f.jpeg", category: "Bedroom", alt: "Bedroom with wardrobe" },
  { id: 1010, src: "/images/c904e1ab_a39d_4ef0_bdea_8c0bd16b9e3d.jpeg", category: "Bedroom", alt: "Bedroom view" },
  { id: 1011, src: "/images/34529829_a971_44d3_ac2f_90ea3678a34d.jpeg", category: "Bathroom", alt: "Private hot tub / jacuzzi" },
  { id: 1012, src: "/images/42befad7_fb29_473d_91db_b03e7a544d1d.jpeg", category: "Bathroom", alt: "Modern bathroom" },
  { id: 1013, src: "/images/48a8ffbc_fbf7_4f84_bc29_ee400da3f08b.jpeg", category: "Bathroom", alt: "Clean bathroom" },
  { id: 1014, src: "/images/5adfdf3e_d497_4efc_ab8c_fc559dab311e.jpeg", category: "Bathroom", alt: "Bathroom with modern fittings" },
  { id: 1015, src: "/images/3cf31697_f3f3_4c60_82c4_029acb119ae4.jpeg", category: "Kitchen and dining", alt: "Fully equipped kitchen" },
  { id: 1016, src: "/images/3c6e6809_1bb1_47a6_8e24_aff593e1c28f.jpeg", category: "Kitchen and dining", alt: "Dining area" },
  { id: 1017, src: "/images/608748cd_6ee7_4a71_88a2_ba79d3ddba5a.jpeg", category: "Kitchen and dining", alt: "Kitchen counter" },
  { id: 1018, src: "/images/246bd88d_4dd6_4117_a401_02a36ebfcf16.jpeg", category: "Outdoor", alt: "Building exterior - Mirashya complex" },
  { id: 1019, src: "/images/56c44812_52c0_4481_90d8_101ec1f34c7a.jpeg", category: "Outdoor", alt: "Pool area" },
  { id: 1020, src: "/images/9642a60d_e9de_4e1a_89c2_9ebd230f4a74.jpeg", category: "Outdoor", alt: "Pool deck" },
  { id: 1021, src: "/images/fe37b80e_da8a_4225_b27b_dfbb5d763c01.jpeg", category: "Outdoor", alt: "Outdoor terrace" },
  { id: 1022, src: "/images/30ad93b2_293f_494d_b645_626303c6cb93.jpeg", category: "Living area", alt: "Another view of the living area" },
  { id: 1023, src: "/images/70325367_cbae_4993_b560_18cd3f6edd53.jpeg", category: "Living area", alt: "Lounge area at night" },
  { id: 1024, src: "/images/79addceb_8c2d_419b_80ff_e29af426a94c.jpeg", category: "Living area", alt: "Living space details" },
  { id: 1025, src: "/images/862d936c_0f34_4e50_af87_b519e2781d19.jpeg", category: "Living area", alt: "Cozy living room corner" },
  { id: 1026, src: "/images/8eb65a8b_e795_4870_b141_6f63b1be24ae.jpeg", category: "Living area", alt: "Open living area" },
  { id: 1027, src: "/images/97c78f8a_5090_4663_aebc_ba4e13b47092.jpeg", category: "Living area", alt: "Sitting area" },
  { id: 1028, src: "/images/9aa8e65f_94ac_4ba0_9a10_9ec91e536d22.jpeg", category: "Outdoor", alt: "Space overview" },
  { id: 1029, src: "/images/9be71047_fc52_438a_9270_75cb470f6752.jpeg", category: "Bedroom", alt: "Bedroom corner" },
  { id: 1030, src: "/images/a45feaa2_b607_4092_83ac_5fd4b2894959.jpeg", category: "Outdoor", alt: "Exterior view" },
  { id: 1031, src: "/images/a74e3c0b_3188_4442_9146_1cd4d6ea45df.jpeg", category: "Outdoor", alt: "Building facade" },
  { id: 1032, src: "/images/a9831aeb_f441_44f5_a38f_4cf54e3f0fcf.jpeg", category: "Kitchen and dining", alt: "Kitchen appliances" },
  { id: 1033, src: "/images/b6599f26_d65c_4df0_baf2_ef18c82a86a3.jpeg", category: "Bathroom", alt: "Shower area" },
  { id: 1034, src: "/images/cc7a56bd_242c_498a_9aef_0cffac619e54.jpeg", category: "Bathroom", alt: "Bathroom details" },
  { id: 1035, src: "/images/dc01fd46_b119_48d3_a43b_f6c093e26eca.jpeg", category: "Living area", alt: "Entry area" },
  { id: 1036, src: "/images/ddc853d7_e658_405c_bedc_8f31106c447e.jpeg", category: "Outdoor", alt: "Outdoor seating" },
  { id: 1037, src: "/images/f19d8c0a_1d88_42a4_9218_686d4f0db7e4.jpeg", category: "Bedroom", alt: "Bedroom window" },
  { id: 1038, src: "/images/f1da1c3d_0d10_481e_9b63_c71f9073f30b.jpeg", category: "Kitchen and dining", alt: "Dining table" },
  { id: 1039, src: "/images/f6de1663_4e9c_4414_b63b_29a154a92ee1.jpeg", category: "Outdoor", alt: "Terrace view" },
  { id: 1040, src: "/images/fc02f48f_a937_42c5_895d_f9cc3113d6ca.jpeg", category: "Bathroom", alt: "Bathroom vanity" },
  { id: 1041, src: "/images/67c61c6f_6260_4809_9510_0360e58a345d.jpeg", category: "Outdoor", alt: "Garden area" },
  { id: 1042, src: "/images/4fede77d_7a71_446f_89e3_263af937f3fa.jpeg", category: "Outdoor", alt: "Outdoor view" },
  { id: 1043, src: "/images/090d8b0b_b539_42c0_84f8_e1fb0cdf9a93.jpeg", category: "Living area", alt: "Extra living space" },
];

export const HERO_IMAGES = [PHOTOS[0], PHOTOS[1], PHOTOS[10], PHOTOS[5], PHOTOS[17]];

export const PHOTO_CATEGORIES = ["Living area", "Bedroom", "Bathroom", "Kitchen and dining", "Outdoor"];

