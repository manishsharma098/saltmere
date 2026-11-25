// Fishing-charter replacement content for the Saltmere layout.
// Same shapes as `boats` / `toursRaw` in data.ts so pages can swap them in.
// All copy, prices, names and stats are PLACEHOLDERS, not verified facts.
// Headline accents use [brackets], matching the yacht copy's accent spans.
// Photos: /public/images/fishing (credits in CREDITS.md there).

const img = (name: string) => `/images/fishing/${name}.jpg`;

export const fishingBoats = [
  {
    "slug": "sailfin-42",
    "name": "Sailfin 42",
    "type": "Sportfisher, 42 ft",
    "tagline": "Outriggers out, flybridge up, blue water ahead.",
    "description": "The flagship of the fleet. A full tournament setup, a fighting chair in the cockpit and a flybridge with a clear view of every spread. Built for long days offshore and for anglers who want a real shot at a sailfish.",
    "length": "42 ft",
    "guests": 8,
    "cabins": "2",
    "crew": "3",
    "speed": "28 kn",
    "berth": "Dubai Harbour",
    "prices": [
      { "tour": "Sunset trip", "length": "3 hours", "price": "AED 2,900" },
      { "tour": "Half day", "length": "4 hours", "price": "AED 3,800" },
      { "tour": "Full day", "length": "8 hours", "price": "AED 6,900" },
      { "tour": "Dawn to dusk", "length": "12 hours", "price": "AED 9,800" }
    ],
    "onBoard": [
      "Fighting chair and outriggers",
      "Six trolling rods and reels",
      "Live well and bait freezer",
      "Sonar, radar and GPS",
      "Shaded flybridge and saloon",
      "Toilet and freshwater shower"
    ],
    "images": [img("boat-sailfin-42-1"), img("boat-sailfin-42-2"), img("boat-sailfin-42-3")]
  },
  {
    "slug": "marlin-36",
    "name": "Marlin 36",
    "type": "Convertible, 36 ft",
    "tagline": "The classic offshore day, done properly.",
    "description": "One cabin, a wide cockpit and a captain who knows every ledge and wreck off the coast. The Marlin is our most booked boat for trolling trips, small teams and anglers who want room to fight a fish.",
    "length": "36 ft",
    "guests": 6,
    "cabins": "1",
    "crew": "2",
    "speed": "26 kn",
    "berth": "Dubai Marina",
    "prices": [
      { "tour": "Sunset trip", "length": "3 hours", "price": "AED 2,400" },
      { "tour": "Half day", "length": "4 hours", "price": "AED 3,100" },
      { "tour": "Full day", "length": "8 hours", "price": "AED 5,600" },
      { "tour": "Dawn to dusk", "length": "12 hours", "price": "AED 8,000" }
    ],
    "onBoard": [
      "Fighting chair",
      "Outriggers and downrigger",
      "Rods, reels and lures",
      "Live well",
      "Fish finder and GPS",
      "Air-conditioned cabin and toilet"
    ],
    "images": [img("boat-marlin-36-1"), img("boat-marlin-36-2"), img("boat-marlin-36-3")]
  },
  {
    "slug": "kingfish-33",
    "name": "Kingfish 33",
    "type": "Center console, 33 ft",
    "tagline": "Fast, open and made for casting.",
    "description": "Twin outboards, a walk-around deck and nothing between you and the rail. The Kingfish is the quick choice for groups who like to troll, jig and cast at busting fish. It gets to the grounds before the bite goes quiet.",
    "length": "33 ft",
    "guests": 6,
    "cabins": "Console head",
    "crew": "2",
    "speed": "34 kn",
    "berth": "Jumeirah Fishing Harbour",
    "prices": [
      { "tour": "Sunset trip", "length": "3 hours", "price": "AED 1,900" },
      { "tour": "Half day", "length": "4 hours", "price": "AED 2,500" },
      { "tour": "Full day", "length": "8 hours", "price": "AED 4,400" },
      { "tour": "Dawn to dusk", "length": "12 hours", "price": "AED 6,300" }
    ],
    "onBoard": [
      "360° casting deck",
      "Rod holders and T-top rocket launcher",
      "Live well",
      "Sonar and GPS",
      "Ice box for the catch",
      "Toilet in the console"
    ],
    "images": [img("boat-kingfish-33-1"), img("boat-kingfish-33-2"), img("boat-kingfish-33-3")]
  },
  {
    "slug": "trevally-28",
    "name": "Trevally 28",
    "type": "Walkaround, 28 ft",
    "tagline": "A steady deck, a small cabin and a very good bite.",
    "description": "Stable and practical, with a cuddy cabin that is bigger than it has any right to be. Take it out for bottom fishing on the morning reefs and be back at the dock before the heat of the day.",
    "length": "28 ft",
    "guests": 5,
    "cabins": "Cuddy",
    "crew": "1",
    "speed": "27 kn",
    "berth": "Dubai Marina",
    "prices": [
      { "tour": "Sunset trip", "length": "3 hours", "price": "AED 1,500" },
      { "tour": "Half day", "length": "4 hours", "price": "AED 1,950" },
      { "tour": "Full day", "length": "8 hours", "price": "AED 3,500" },
      { "tour": "Dawn to dusk", "length": "12 hours", "price": "AED 5,000" }
    ],
    "onBoard": [
      "Cuddy cabin with toilet",
      "Bottom and jigging rods",
      "Bait and tackle",
      "Fish finder and GPS",
      "Shaded helm seating",
      "Ice box"
    ],
    "images": [img("boat-trevally-28-1"), img("boat-trevally-28-2"), img("boat-trevally-28-3")]
  },
  {
    "slug": "queenfish-25",
    "name": "Queenfish 25",
    "type": "Bay boat, 25 ft",
    "tagline": "Shallow water, light tackle, short notice.",
    "description": "An open boat with a T-top and plenty of room to cast. The Queenfish is the one to book when plans change on Friday and you want to be on the flats by Saturday morning.",
    "length": "25 ft",
    "guests": 4,
    "cabins": "Open deck",
    "crew": "1",
    "speed": "30 kn",
    "berth": "Jumeirah Fishing Harbour",
    "prices": [
      { "tour": "Sunset trip", "length": "3 hours", "price": "AED 1,200" },
      { "tour": "Half day", "length": "4 hours", "price": "AED 1,550" },
      { "tour": "Full day", "length": "8 hours", "price": "AED 2,800" },
      { "tour": "Dawn to dusk", "length": "12 hours", "price": "AED 4,000" }
    ],
    "onBoard": [
      "Casting decks fore and aft",
      "T-top shade",
      "Light spinning tackle",
      "Live bait well",
      "Ice box",
      "GPS fish finder"
    ],
    "images": [img("boat-queenfish-25-1"), img("boat-queenfish-25-2"), img("boat-queenfish-25-3")]
  },
  {
    "slug": "dorado-21",
    "name": "Dorado 21",
    "type": "Skiff, 21 ft",
    "tagline": "The easiest way onto the water.",
    "description": "Compact, quick and relaxed. Three anglers, one captain and a cool box. Pick a spot, drop a line and see what bites. For a first fishing trip this is the one we usually recommend.",
    "length": "21 ft",
    "guests": 3,
    "cabins": "Open deck",
    "crew": "1",
    "speed": "28 kn",
    "berth": "Dubai Harbour",
    "prices": [
      { "tour": "Sunset trip", "length": "3 hours", "price": "AED 850" },
      { "tour": "Half day", "length": "4 hours", "price": "AED 1,100" },
      { "tour": "Full day", "length": "8 hours", "price": "AED 2,000" },
      { "tour": "Dawn to dusk", "length": "12 hours", "price": "AED 3,100" }
    ],
    "onBoard": [
      "Bimini shade",
      "Spinning rods and reels",
      "Bait and tackle",
      "Cool box",
      "Fish finder",
      "Captain included"
    ],
    "images": [img("boat-dorado-21-1"), img("boat-dorado-21-2"), img("boat-dorado-21-3")]
  }
] as const;

export type FishingBoat = (typeof fishingBoats)[number];

const boatCovers = fishingBoats.map((b) => b.images[0]);

/** Per-boat prices for one trip length, in the toursRaw `prices` shape. */
const pricesFor = (i: 0 | 1 | 2 | 3) =>
  fishingBoats.map((b) => ({ boat: b.name, type: b.type, price: b.prices[i].price }));

// `raw` holds the trip page copy in reading order, same layout as toursRaw:
// title lines, description, duration, timing note, from-price, "The plan, …",
// time/step pairs, "Included", items, "Best for: …", "WhatsApp us".
export const fishingTrips = [
  {
    "slug": "sunset-fishing",
    "raw": [
      "Sunset",
      "fishing",
      "trip",
      "Out past the breakwater as the light turns. Queenfish and trevally on the feed, cold drinks in the cooler, the skyline glowing.",
      "3 hours",
      "leaves two hours before dusk",
      "from AED 850",
      "The plan, 3 hours",
      "15:30",
      "Meet the captain on the pontoon and pick your rods.",
      "15:45",
      "Cast off and run out to the first marks.",
      "16:15",
      "Cast and troll the reef edges as the sun drops.",
      "18:30",
      "Slow ride back under the first lights.",
      "Included",
      "Captain and mate",
      "Rods, reels, bait and lures",
      "Fishing licence for every angler",
      "Soft drinks, water and ice",
      "Best for: Couples, beginners, small groups",
      "WhatsApp us"
    ],
    "prices": pricesFor(0),
    "images": [img("trip-sunset-1"), img("trip-sunset-2"), ...boatCovers]
  },
  {
    "slug": "inshore-half-day",
    "raw": [
      "Inshore",
      "half",
      "day",
      "Light tackle along the reefs and channels close to the coast. Queenfish, trevally and barracuda, with the towers never far away.",
      "4 hours",
      "early morning",
      "from AED 1,100",
      "The plan, 4 hours",
      "06:00",
      "Board at Jumeirah Fishing Harbour, coffee in hand.",
      "06:30",
      "Run to the inshore reefs and rig up.",
      "07:00",
      "Cast poppers and soft plastics on the morning bite.",
      "10:00",
      "Back at the dock, catch cleaned and bagged.",
      "Included",
      "Captain and mate",
      "Light tackle, lures and live bait",
      "Fishing licence for every angler",
      "Fish cleaned at the dock",
      "Best for: First-timers, families, early risers",
      "WhatsApp us"
    ],
    "prices": pricesFor(1),
    "images": [img("trip-inshore-1"), img("trip-inshore-2"), ...boatCovers]
  },
  {
    "slug": "bottom-fishing",
    "raw": [
      "Bottom",
      "fishing",
      "A slow, steady morning over the reefs and wrecks. Hammour, sheri and snapper from the deep, a captain who knows exactly where to drop.",
      "4 hours",
      "morning or afternoon",
      "from AED 1,100",
      "The plan, 4 hours",
      "07:00",
      "Board, safety briefing and rods rigged.",
      "07:30",
      "Run out to the first reef mark.",
      "08:00",
      "Drop baits over the reef, move between marks.",
      "11:00",
      "Back at the dock, catch cleaned and bagged.",
      "Included",
      "Captain and mate",
      "Bottom rigs, weights and cut bait",
      "Fishing licence for every angler",
      "Size and bag limits explained",
      "Best for: Families, mixed groups, anglers who like to eat their catch",
      "WhatsApp us"
    ],
    "prices": pricesFor(1),
    "images": [img("trip-bottom-1"), img("trip-bottom-2"), ...boatCovers]
  },
  {
    "slug": "deep-sea-trolling",
    "raw": [
      "Deep",
      "sea",
      "trolling",
      "A full day in blue water with the spread out. Kingfish, longtail tuna and, in season, sailfish. We plan the grounds, you take the strikes.",
      "8 hours",
      "you choose the start",
      "from AED 2,000",
      "The plan, 8 hours",
      "06:00",
      "Briefing and cast off from the marina.",
      "07:00",
      "Lines out on the first offshore grounds.",
      "10:00",
      "Work the birds and bait balls for tuna.",
      "12:00",
      "Lunch on deck, then a second run for kingfish.",
      "14:00",
      "Back at the dock, catch cleaned and bagged.",
      "Included",
      "Captain and mate",
      "Trolling rods, lures and rigged baits",
      "Fishing licence for every angler",
      "Sailfish released, the rest cleaned at the dock",
      "Best for: Keen anglers, friends, teams",
      "WhatsApp us"
    ],
    "prices": pricesFor(2),
    "images": [img("trip-trolling-1"), img("trip-trolling-2"), ...boatCovers]
  },
  {
    "slug": "dawn-to-dusk",
    "raw": [
      "Dawn",
      "to",
      "dusk",
      "The long one. Leave in the dark, fish the far grounds all day, be home for dinner. Troll, jig and drop, as the sea allows.",
      "12 hours",
      "first light to sunset",
      "from AED 3,100",
      "The plan, 12 hours",
      "05:00",
      "Board, settle in, run out in the dark.",
      "06:00",
      "Lines out at first light on the offshore grounds.",
      "10:00",
      "Jig the deep marks for amberjack and grouper.",
      "13:00",
      "Lunch on deck, then troll back towards the coast.",
      "17:00",
      "Back at the dock, catch cleaned and bagged.",
      "Included",
      "Captain and mate",
      "All tackle, bait and lures",
      "Lunch, snacks and drinks",
      "Fuel for up to 80 nautical miles",
      "Best for: Serious anglers, tournaments practice, long days out",
      "WhatsApp us"
    ],
    "prices": pricesFor(3),
    "images": [img("trip-dawn-to-dusk-1"), img("trip-dawn-to-dusk-2"), ...boatCovers]
  }
];

// Short trip-length labels (replaces the 4 tour options in search and forms).
export const fishingTripLengths = [
  { "tour": "Sunset trip", "length": "3 hours" },
  { "tour": "Half day", "length": "4 hours" },
  { "tour": "Full day", "length": "8 hours" },
  { "tour": "Dawn to dusk", "length": "12 hours" }
] as const;

export const fishingCopy = {
  brand: "Saltmere",
  nav: {
    items: ["Fleet", "Trips", "About", "Contact"],
    cta: "Check dates",
    mobile: ["Home", "Fleet", "Trips", "About", "Contact"],
    quick: ["Chat", "Email", "Call"]
  },

  home: {
    hero: {
      tag: "Fishing charter in Dubai",
      headline: "The bite, [on your] schedule.",
      sub: "Six skippered fishing boats from Dubai Marina, Dubai Harbour and Jumeirah Fishing Harbour. Pick a day and see who is free.",
      search: {
        date: "Date",
        guests: "Anglers",
        tour: "Trip",
        options: fishingTripLengths,
        button: "Show boats",
        mobileTitle: "Find a boat",
        mobileSub: "Date, anglers, trip"
      }
    },
    stats: [
      { value: "6", unit: "", label: "boats, 21 to 42 ft" },
      { value: "100", unit: "%", label: "skippered, licence included" },
      { value: "24", unit: "h", label: "reply on every request" },
      { value: "0", unit: "", label: "hidden fees on the quote" }
    ],
    fleet: {
      headline: "Pick a boat, [not] a brochure.",
      sub: "Every boat is rigged and ready. Set your date above and the fleet answers on the spot.",
      priceNote: "Prices are for a [full day]. Pick a date and anglers above to see who is free.",
      units: { guests: "anglers", speed: "kn" },
      footnote: "Prices per charter in dirham, excluding VAT. We confirm every date by email.",
      link: "Open the fleet page"
    },
    trips: {
      headline: "Five ways to [wet a line.]",
      sub: "Every trip runs on every boat. Your choice sets length and price."
    },
    berths: {
      headline: "Three docks, [one coast.]",
      sub: "Each boat page shows where it departs from.",
      items: [
        { name: "Dubai Marina", text: "Towers on both sides and a short run to open water. Our home berth.", image: img("berth-dubai-marina") },
        { name: "Dubai Harbour", text: "Deep water at the mouth and the fastest way to the offshore grounds.", image: img("berth-dubai-harbour") },
        { name: "Jumeirah Fishing Harbour", text: "The working harbour in Umm Suqeim. Easy parking, early starts, reefs close by.", image: img("berth-jumeirah-fishing-harbour") }
      ]
    },
    band: {
      headline: "Blue water, [forty minutes] from the dock."
    },
    services: {
      headline: "Everything is [taken care of.]",
      items: [
        { title: "Captain and mate", text: "A licensed captain and a mate who rigs, baits and gaffs. You only have to reel." },
        { title: "Rigged and baited", text: "Rods, reels, lures and fresh bait are on board and ready before you arrive." },
        { title: "Licensed and insured", text: "Fishing licences for every angler, passenger insurance and a safety briefing before every trip." },
        { title: "Weather-proof dates", text: "If the wind picks up, we move your trip for free or refund it." }
      ]
    },
    steps: {
      headline: "From request to [lines out.]",
      items: [
        { title: "Choose a day", text: "Set date, anglers and trip. The fleet filters to what is free." },
        { title: "Send a request", text: "Pick a boat and ask for the date. We answer within a working day." },
        { title: "We plan it", text: "Target species, grounds and times, agreed with the captain. A deposit holds the boat." },
        { title: "Lines out", text: "Walk down the pontoon. The crew takes it from there." }
      ]
    },
    reviews: {
      headline: "What anglers [write after.]",
      sub: "Reviews from anglers after their trip.",
      items: [
        { quote: "We booked on Thursday and were trolling on Saturday. Two kingfish, one tuna and nobody wanted to go home.", name: "Anna K.", role: "Marlin 36, charter guest" },
        { quote: "Our whole team for a full day. Rods were rigged before we stepped on board.", name: "Marco T.", role: "Sailfin 42, charter guest" },
        { quote: "The captain found us a reef without another boat on it. We fished until the light went.", name: "Jule R.", role: "Dorado 21, charter guest" },
        { quote: "Sunset trip with my father. The mate handled every knot and never made a fuss of it.", name: "Omar H.", role: "Queenfish 25, charter guest" },
        { quote: "Fair price, clear quote, and the fish came back cleaned and bagged.", name: "Lena S.", role: "Kingfish 33, charter guest" },
        { quote: "My son caught his first hammour. The crew made it feel like a trophy.", name: "Daniel W.", role: "Trevally 28, charter guest" },
        { quote: "First sailfish of my life. Photo, release, and a crew as happy as I was.", name: "Mira P.", role: "Sailfin 42, charter guest" },
        { quote: "Booked from my phone in two minutes and had the date confirmed the same hour.", name: "Yusuf A.", role: "Kingfish 33, charter guest" }
      ]
    },
    faq: {
      headline: "Before you [ask.]",
      sub: "The short answers. For the rest, write to us.",
      link: "Contact us",
      items: [
        { q: "Do I need a fishing licence?", a: "No need to arrange one. We provide a recreational fishing licence for every angler on board as part of the trip." },
        { q: "What does the price include?", a: "The boat, captain and mate, rods and reels, bait, licences, ice and fuel for the planned trip. Food and drinks are quoted separately." },
        { q: "Where do the boats depart from?", a: "Dubai Marina, Dubai Harbour or Jumeirah Fishing Harbour. Each boat page shows its berth, and we send a map pin with your confirmation." },
        { q: "How do I book?", a: "Pick a date, a trip and a boat, then send a request. We confirm within one working day and a deposit holds the boat." },
        { q: "What if the weather is bad?", a: "The captain makes the call on the morning. If it is not safe or not fishable, we move your trip for free or refund it." },
        { q: "Can we keep what we catch?", a: "Yes, within UAE size and bag limits. Sailfish are always released. Everything else is cleaned and bagged at the dock." },
        { q: "Can beginners and children come?", a: "Of course. The crew teaches as they go, and we carry life jackets in every size. Sunset and inshore trips suit first-timers best." }
      ]
    },
    request: {
      headline: "Tell us the day. [We find the fish.]",
      sub: "Tell us the date and group size. We answer within one working day."
    }
  },

  fleet: {
    headline: "Six [boats,] one calendar.",
    sub: "Choose a day and the fleet filters to what is free and big enough for your group.",
    priceNote: "Prices are for a [full day]. Pick a date and anglers above to see who is free.",
    footnote: "Prices per charter in dirham, excluding VAT. We confirm every date by email."
  },

  boat: {
    photoNote: "Photos show boats of the same class.",
    specLabels: {
      length: "Length",
      guests: "Anglers",
      cabins: "Cabins",
      crew: "Crew",
      speed: "Cruising speed",
      berth: "Departs from"
    },
    pricesTitle: "Prices, captain and mate included",
    pricesNote: "Prices in dirham, excluding VAT. Food and drinks are quoted separately. Licences, bait and tackle are included.",
    onBoardTitle: "On board",
    chatTitle: "Prefer to chat?",
    chatText: "Questions about this boat? Write or call us any day.",
    nextDates: "Next free dates",
    nextBoat: "Next boat",
    request: "Request"
  },

  tours: {
    headline: "Five [ways] out.",
    sub: "Every trip runs on every boat, as long as it is free. The trip sets length and price.",
    footnote: "Prices per charter in dirham, excluding VAT.",
    back: "All trips",
    pricesTitle: "Prices for this trip",
    pricesNote: "Prices in dirham, excluding VAT.",
    next: "Next trip"
  },

  about: {
    headline: "A small fleet, [rigged right.]",
    sub: "Saltmere Charter has fished the waters off Dubai since 2014.",
    why: {
      title: "Why we keep it small",
      lead: "One boat, one idea: a fishing trip should feel like a day with friends who know the water. Six boats later we still answer every request ourselves.",
      text: "We are a small crew of captains and mates who know the Gulf coast well. Every trip is planned around the season and your group, not a fixed route.",
      cta: "Talk to us"
    },
    stats: [
      { value: "2014", label: "founded" },
      { value: "12", label: "permanent crew" },
      { value: "6,200", label: "anglers hosted" }
    ],
    crew: {
      headline: "The people on [your boat.]",
      sub: "The crew on board this season.",
      items: [
        { name: "Captain Yousef Haddad", role: "Head captain, 22 years offshore", image: img("crew-captain") },
        { name: "Ravi Menon", role: "First mate, rigging and tackle", image: img("crew-deckhand") },
        { name: "Tomas Reyes", role: "Captain on Sailfin and Marlin", image: img("crew-helm") },
        { name: "Lena Hartmann", role: "Charter manager, your first reply", image: img("crew-team") }
      ]
    },
    values: {
      title: "How we work",
      items: [
        { title: "People first", text: "A small permanent crew. The people who meet you on the pontoon run the boat." },
        { title: "Safety without drama", text: "Briefing, inspected gear and a captain who says no when the sea says no." },
        { title: "Respect the fish", text: "Size limits, catch-and-release for billfish, and only what you will eat goes home." }
      ]
    },
    images: {
      main: img("about-marina-golden"),
      secondary: img("about-reels-dock")
    }
  },

  contact: {
    headline: "Let us plan [your trip.]",
    sub: "Chat, call or send a request. We answer every day.",
    cards: [
      { title: "WhatsApp", text: "Message us on WhatsApp", note: "Daily 5 am to 10 pm" },
      { title: "Phone", text: "+971 50 000 0000", note: "hello@saltmere.example", extra: "Reply within one working day" },
      { title: "Harbour office", text: "Dubai Marina", note: "Berth 14, Dubai Marina, Dubai" }
    ],
    cta: "WhatsApp us",
    faqTitle: "Quick answers"
  },

  form: {
    step1: "About you",
    name: "Name",
    email: "Email",
    step2: "Your day on the water",
    date: "Date",
    guests: "Anglers",
    tour: "Trip",
    tourOptions: [
      "Sunset trip, 3 hours",
      "Half day, 4 hours",
      "Full day, 8 hours",
      "Dawn to dusk, 12 hours"
    ],
    boat: "Boat",
    boatPlaceholder: "Not sure yet",
    message: "Message",
    note: "We reply within one working day.",
    submit: "Request this date"
  },

  footer: {
    headline: "Your next catch [starts here.]",
    sub: "Tell us the date and how many anglers are coming. We reply within the hour.",
    phone: "+971 50 000 0000",
    address: "Berth 14, Dubai Marina, Dubai",
    columns: { charter: "Charter", legal: "Legal" },
    legalLinks: ["Imprint", "Privacy"],
    ctas: ["Request a date", "WhatsApp us"],
    copyright: "© 2026 Saltmere Charter, Dubai.",
    badges: ["Insured", "Licences included", "Weather-proof dates"]
  },

  images: {
    hero: img("hero-sunset-run"),
    band: img("band-rods-wake"),
    berths: {
      dubaiMarina: img("berth-dubai-marina"),
      dubaiHarbour: img("berth-dubai-harbour"),
      jumeirahFishingHarbour: img("berth-jumeirah-fishing-harbour")
    },
    about: {
      main: img("about-marina-golden"),
      secondary: img("about-reels-dock"),
      crew: [img("crew-captain"), img("crew-deckhand"), img("crew-helm"), img("crew-team")]
    },
    extras: {
      kidsCatch: img("extra-kids-catch"),
      release: img("extra-release"),
      reelSunset: img("extra-reel-sunset"),
      reelSpray: img("extra-reel-spray"),
      tuna: img("extra-tuna"),
      barracuda: img("extra-barracuda"),
      silhouette: img("extra-silhouette")
    }
  }
};
