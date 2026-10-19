/* =====================================================================
   CONTENT FILE — edit this file to change text and images on the site.
   ---------------------------------------------------------------------
   • Text: change anything inside the quotes "like this".
   • Images: drop a new picture into the /images folder, then put its
     file name here (e.g. "images/my-painting.jpg"). Or simply replace
     an existing file (e.g. images/art-01.jpg) with one of the same name.
   • Keep the commas and brackets as they are.
   ===================================================================== */

window.SITE = {

  /* ---------- Basics ---------- */
  name: "Neha Perla",   /* shown in the menu bar and the big heading (first word on line 1, the rest on line 2) */
  tagline: ["Artist", "Dancer", "Storyteller"],
  heroIntro:
    "I make work about rhythm, memory and the quiet moments in between — on paper, on canvas, and on stage.",
  heroImage: { src: "images/hero.jpg", alt: "Detail of Two Skylines: a glass tower and a golden temple gopuram rising together against a blue sky" },

  /* ---------- Art portfolio ----------
     Add or remove items freely. Each item = one artwork.            */
  artworks: [
    /* Titles below are WORKING TITLES (placeholders) — rename them to the real titles.
       Years are placeholders too ("2025"). */
    { src: "images/art-01.jpg", title: "Two Skylines", medium: "Acrylic on canvas", year: "2025",
      alt: "Acrylic painting of a city skyline with a tall glass tower merging into a golden South Indian temple gopuram, with orange panels showing a sandwich ad marked 'Buy Now' and plates of Indian food" },
    { src: "images/art-02.jpg", title: "Sweet Sixteen", medium: "Acrylic", year: "2025",
      alt: "Warm-toned painted collage of girls at a 'Happy Sweet 16' party, their faces covered by mirror and coupon shapes, against a wall of photos and tickets" },
    { src: "images/art-03.jpg", title: "Kitchen, in Grey", medium: "Acrylic on canvas", year: "2025",
      alt: "Grayscale painting of an empty kitchen interior with dark cabinets, a window over the sink and a toaster oven on the counter" },
    { src: "images/art-04.jpg", title: "Signal", medium: "Mixed media on black paper", year: "2025",
      alt: "Portrait on black paper of a 1940s-style woman with dark curled hair and pearls, beside a glitchy green and yellow second figure, with faint circuit-diagram lines" },
    { src: "images/art-05.jpg", title: "Patterns of Self", medium: "Ink and watercolor", year: "2025",
      alt: "Ink and watercolor portrait of a faceless figure in soft blue with long wavy hair filled with intricate zentangle patterns" }
  ],

  /* ---------- Arangetram ---------- */
  arangetram: {
    heading: "Arangetram",
    subheading: "A first ascent to the stage",
    story: [
      "I began learning Bharatanatyam when I was five. For about ten years I trained with my guru, Smt. Mohana Narayan, and in July 2024 I stepped onto the stage for my arangetram, my first full solo performance, with a live orchestra beside me.",
      "Preparing for it taught me discipline, patience and how to tell a story without saying a word. It is the foundation of everything I make."
    ],
    /* "value" can be one line of text, or a list of lines in [ ] like Orchestra. */
    details: [
      { label: "Date",      value: "Sunday, July 14, 2024" },
      { label: "Venue",     value: "Visual & Performing Arts Center, De Anza College, Cupertino" },
      { label: "Guru",      value: "Smt. Mohana Narayan, SarvaGuna School of Bharatanatyam" },
      { label: "Orchestra", value: [
          "Nattuvangam · Smt. Mohana Narayan",
          "Vocal · Kum. Ranjani Ravindrabharathy",
          "Mrudangam · Shri Ravindra Bharathy Sridharan",
          "Violin · Shri Aditya M P",
          "Flute · Shri Visveshwar Nagarajan"
        ] }
    ],

    /* Photos: shown in the order below, in rows.
       rowPattern = how many photos go in each row on computers (the first row is the
       large feature row). Phones show the first photo alone, then two per row.
       Each photo has two files: "src" (1000px, shown on the page) and "full"
       (2000px, shown when someone clicks to enlarge). If you only have one file,
       just use "src". w / h = the photo's size in pixels (keeps the layout steady).
       Nothing is cropped. caption is optional. Add  placeholder: true  to hide one. */
    rowPattern: [2, 3, 2, 3, 2],
    photos: [
      { src: "images/arangetram/neha-4730-1000.jpg", full: "images/arangetram/neha-4730-2000.jpg", w: 2000, h: 1334,
        alt: "Neha mid-leap in a purple and teal Bharatanatyam costume, one knee drawn up and one arm arched overhead, against a black background" },
      { src: "images/arangetram/neha-4856-1000.jpg", full: "images/arangetram/neha-4856-2000.jpg", w: 1334, h: 2000,
        alt: "Neha balancing on one leg and holding the other foot up behind her head, the pleats of her purple and teal costume fanned wide" },

      { src: "images/arangetram/neha-4490-1000.jpg", full: "images/arangetram/neha-4490-2000.jpg", w: 1334, h: 2000,
        alt: "Neha in a red, green and gold costume in a half-sitting pose, the pleated fan of her costume spread in a full circle" },
      { src: "images/arangetram/neha-4847-1000.jpg", full: "images/arangetram/neha-4847-2000.jpg", w: 2000, h: 1334,
        alt: "Neha in purple and teal in a deep half-seated pose, both arms curved to frame her head" },
      { src: "images/arangetram/neha-4545-1000.jpg", full: "images/arangetram/neha-4545-2000.jpg", w: 1334, h: 2000,
        alt: "Neha in red and green with both arms raised overhead, fingertips touching, one foot crossed in front" },

      { src: "images/arangetram/neha-4644-1000.jpg", full: "images/arangetram/neha-4644-2000.jpg", w: 2000, h: 1334,
        alt: "Close-up of Neha in a red costume and gold temple jewelry, palms pressed together in namaste" },
      { src: "images/arangetram/neha-4673-1000.jpg", full: "images/arangetram/neha-4673-2000.jpg", w: 2000, h: 1334,
        alt: "Close-up of Neha in red, eyes turned to one side, one hand raised in a mudra and the other extended low" },

      { src: "images/arangetram/neha-4595-1000.jpg", full: "images/arangetram/neha-4595-2000.jpg", w: 1334, h: 2000,
        alt: "Neha in red and green holding one leg raised to the side, one arm curved overhead, the costume pleats fanned out" },
      { src: "images/arangetram/neha-4555-1000.jpg", full: "images/arangetram/neha-4555-2000.jpg", w: 1334, h: 2000, caption: "With my guru, Smt. Mohana Narayan",
        alt: "Neha in red and green beside her guru, Smt. Mohana Narayan, in a green sari, both holding the same pose with arms raised and extended" },
      { src: "images/arangetram/neha-4934-1000.jpg", full: "images/arangetram/neha-4934-2000.jpg", w: 1334, h: 2000,
        alt: "Neha in purple and teal in a Krishna pose, holding a flute with a peacock feather in her hair" },

      { src: "images/arangetram/neha-4446-1000.jpg", full: "images/arangetram/neha-4446-2000.jpg", w: 2000, h: 1334,
        alt: "Neha seated in a red and green costume, holding a veena across her lap and smiling" },
      { src: "images/arangetram/neha-4423-1000.jpg", full: "images/arangetram/neha-4423-2000.jpg", w: 2000, h: 1334,
        alt: "Neha in her red and green costume standing close beside her guru, Smt. Mohana Narayan, in a green and blue sari, both smiling" }
    ],

    /* ---- The program (margam). Add  intermission: true  for the break. ---- */
    margamTitle: "The Margam",
    margamNote: "In order · raga and tala",
    margam: [
      { title: "Pushpaswaram & Vinayaka Stuti", raga: "Hamsadhwani", tala: "Rupaka" },
      { title: "Thiruvenkata Kavithuvam", raga: "Challa Nattai", tala: "Tisra Dhruvam" },
      { title: "Amba Shambhavi", raga: "Ragamalika", tala: "Adi" },
      { title: "Maathe Malayadhwaja", kind: "Varnam", raga: "Khamas", tala: "Adi" },
      { intermission: true },
      { title: "Asaindadum Mayil", raga: "Simhendra Madhyamam", tala: "Adi" },
      { title: "Ananda Natamidum", raga: "Kedaragaula", tala: "Adi" },
      { title: "Nagumomu Ganaleni", raga: "Abheri", tala: "Adi" },
      { title: "Thillana", raga: "Gambhiravani", tala: "Adi" },
      { title: "Mangalam" }
    ],

    /* ---- Video ----
       FEATURED: a YouTube video. Paste ONLY its ID into youtubeId, e.g. for
       https://www.youtube.com/watch?v=7hakMtLNrSs  the ID is  7hakMtLNrSs
       The video only loads (from youtube-nocookie.com) when someone presses play;
       until then the page shows videoPoster. Leave youtubeId "" to hide it.
       CLIPS: short videos that live in the /media folder, shown below it.     */
    youtubeId: "7hakMtLNrSs",
    videoTitle: "Neha Perla Arangetram — Glimpses",
    videoPoster: "media/glimpses-poster.jpg",
    videoCaption: "Glimpses from my arangetram — July 14, 2024",
    videos: [
      { src: "media/stage-varnam-excerpt.mp4", poster: "media/stage-varnam-excerpt-poster.jpg",
        label: "Varnam — Maathe Malayadhwaja", alt: "Neha performing the varnam on stage in a red and green costume, brass lamps glowing behind her" },
      { src: "media/stage-redlight-excerpt.mp4", poster: "media/stage-redlight-excerpt-poster.jpg",
        label: "On stage, with the orchestra", alt: "Neha performing on stage under deep red light, in a low half-seated pose" }
    ]
  },

  /* ---------- About ---------- */
  about: {
    portrait: { src: "images/portrait.jpg", alt: "Portrait of Neha Perla smiling, one hand at her chin, in a purple and teal Bharatanatyam costume with gold jewelry and jasmine in her hair" },
    bio: [
      "I'm a high-school senior in California who works across painting, drawing and dance. My AP Art portfolio explores how movement and memory leave traces on a surface.",
      "Off the canvas, I'm curious about why people make the choices they do — which is drawing me toward business, behavioral economics and design."
    ],
    interests: [
      { title: "Business & Behavioral Economics", text: "How people decide, and how good design nudges better decisions." },
      { title: "Industrial Design", text: "Making objects and experiences that are useful and beautiful." },
      { title: "Drama Production Crew", text: "Sets, props and backstage problem-solving for school productions." },
      { title: "Community Work", text: "Volunteering with a charitable organization — placeholder for details." }
    ]
  },

  /* ---------- Contact ---------- */
  contact: {
    heading: "Let’s connect",
    text: "For commissions, collaborations, or just to say hello.",
    email: "hello@example.com"
  },

  footer: "© 2026 Neha Perla. All artwork shown is the artist’s own."
};
