// All editable text and links for the site live here.
// Change this file to update content; you shouldn't need to touch the components.

export const site = {
  name: "William Lee",
  tagline: "AI Tinkerer · Frontend Engineer · Indonesia",
  intro:
    "I build interfaces for the web, then spend the rest of my time poking at AI models to see what they can actually do.",
  description:
    "William Lee is a frontend engineer from Indonesia who tinkers with AI. Selected work, skills and contact.",

  // Your site's address once it's online, e.g. "https://williamlee.my.id".
  // Link previews (WhatsApp, LinkedIn, X) need it to find the preview image.
  url: "https://william-lee.dev",

  about: {
    // Shown large, like a pull quote.
    lead: "I like building small things that feel finished.",
    body:
      "I'm a frontend engineer and a student at Binus. I'd rather finish one small project properly than start ten big ones: the sound when a button is pressed, the animation that makes a page feel alive, a layout that still works on a cheap phone. Those details are where I spend my time. I also use AI tools like Claude and Gemini every day, and I like finding out what they can really do. That's how things like Bingolah, a classroom quiz game, and Loop Quest, a pixel game that explains C loops, came to be.",
  },

  skills: [
    {
      group: "frontend",
      title: "Tailwind CSS",
      description: "Layouts that hold up from a phone to a wide monitor, without a pile of custom CSS.",
    },
    {
      group: "frontend",
      title: "JavaScript",
      description: "Interactive pieces of the page: menus, motion, small tools that run in the browser.",
    },
    {
      group: "ai tools",
      title: "Claude",
      description: "Planning, writing and building with an AI pair, from first idea to working code.",
    },
    {
      group: "ai tools",
      title: "Gemini",
      description: "Testing prompts and ideas across models to find what each one is good at.",
    },
    {
      group: "modding",
      title: "Minecraft Bedrock modding",
      description: "Add-ons with custom blocks, items and behaviour. Where the blocky avatar on this site comes from.",
      wide: true,
    },
  ],

  // hook: one punchy line, shown big on the Work page.
  // pitch: 2–3 sentences of marketing, typed out in the intro.
  // description: what it is, shown on the Work page.
  //
  // To add a project, copy the block below, fill it in, and put its preview
  // image in public/img (e.g. foto2.jpg). The intro and Work page adapt to
  // however many projects are listed here.
  projects: [
    {
      title: "Bingolah",
      hook: "Any class, turned into a game show.",
      pitch:
        "A bingo quiz for the whole class: seven subjects, five levels, up to five teams racing to line up four tiles.",
      description:
        "A classroom quiz game for 2 to 5 teams on one screen. Seven subjects: Math, Indonesian History, Biology, Physics and Chemistry for grade 12 (Kurikulum Merdeka), plus AI and IT. Over 300 multiple-choice questions, calculation questions with fresh random numbers every time, and Digit, a calculator mascot who cheers every team on.",
      image: "/img/bingolah.jpg",
      url: "/projects/bingolah.html",
      cta: "Play Bingolah",
    },
    {
      title: "Loop Quest",
      hook: "Watch your C loops come alive.",
      pitch:
        "Type a C loop and watch it run, one step at a time, as a tiny pixel game with chiptune sound.",
      description:
        "A step-by-step C loop visualizer. Every trip through a loop becomes a tile, nested loops get their own platform, and each step is explained in plain words. It runs on a small C interpreter I wrote in JavaScript, checked against GCC.",
      image: "/img/loop-quest.jpg",
      url: "/projects/loop-quest.html",
      cta: "Play Loop Quest",
    },
    {
      title: "Pixel Birthday",
      hook: "A birthday card you can play.",
      pitch:
        "A birthday surprise built like a tiny video game. Two pixel avatars meet at a cake, four gifts wait to be opened, and every gift unlocks a message. Open them all, then blow out the candles.",
      description:
        "An interactive pixel-art birthday card on a single canvas. Original chiptune music made with the Web Audio API, RPG-style dialog boxes, an item-collected animation, and layouts tuned for phones in portrait and landscape.",
      image: "/img/ultah.jpg",
      url: "/projects/happy-birthday.html",
      cta: "Open the surprise",
    },
  ],

  // The "Built with friends" page (/together), opened from a button on Work.
  // Projects use the same fields as above; friends are links to their sites.
  together: {
    projects: [
      {
        title: "100 C Problems",
        hook: "A hundred ways to practice C.",
        pitch:
          "A hundred Online Judge problems for learning C, from the first printf to nested loops. Every solution compiled, tested, and explained.",
        description:
          "A 99-page practice book in Indonesian: input/output, selection, operators, and loops. Each problem has a clear statement, constraints, and sample tests, with tested solutions and short explanations at the back.",
        image: "/img/soal-c.jpg",
        url: "/projects/100-soal-pemrograman-c.pdf",
        cta: "Open the PDF",
      },
    ],
    friends: [
      { name: "jomontolalu.com", url: "https://jomontolalu.com", line: "My friend's website." },
    ],
  },

  contact: {
    heading: "Have something in mind?",
    line: "Email is the fastest way to reach me.",
    email: "hello@william-lee.dev", // forwarded to Gmail via Name.com Email Forwarding
  },

  // icon: camera | terminal | robot | briefcase (pixel icons in components/PixelIcon.jsx)
  // line: what the avatar says when the button is hovered on the Contact page.
  socials: [
    { label: "GitHub", url: "https://github.com/WilliamgLee", icon: "terminal", line: "That's where my code lives." },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/williamglee", icon: "briefcase", line: "The serious me." },
    { label: "Instagram", url: "https://www.instagram.com/_lee.willi4m/", icon: "camera", line: "Photos and stories!" },
    // Add back once the profile exists:
    // { label: "Hugging Face", url: "https://huggingface.co/...", icon: "robot", line: "My AI experiments!" },
  ],
};
