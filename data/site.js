// All editable text and links for the site live here.
// Change this file to update content; you shouldn't need to touch the components.

export const site = {
  name: "William Lee",
  tagline: "AI Tinkerer · Frontend Engineer · Indonesia",
  // Shown as a badge on Home and Contact. Set to "" to hide it.
  status: "Open to internships",
  intro:
    "I build interfaces for the web, then spend the rest of my time poking at AI models to see what they can actually do.",
  description:
    "William Lee is a frontend engineer from Indonesia who tinkers with AI. Selected work, skills and contact.",

  // Your site's address once it's online, e.g. "https://williamlee.my.id".
  // Link previews (WhatsApp, LinkedIn, X) need it to find the preview image.
  url: "https://william-lee.dev",

  // Profile photo (not used on the site yet; the link preview uses app/opengraph-image.png).
  profilePhoto: "/img/fotoprofil.jpg",

  about: {
    // Shown large, like a pull quote.
    lead: "I like building small things that feel finished.",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus. Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum, nullam quis risus eget urna mollis ornare vel eu leo.",
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
      title: "Bingo Math",
      hook: "Math class, turned into a game show.",
      pitch:
        "Turn any math lesson into a game show. Bingo Math puts up to five teams against the clock across 35 questions, from easy addition to triple-hard permutations. Solve it, claim the tile, and line up four for a 50-point BINGO.",
      description:
        "A classroom quiz game for 2 to 5 teams on one screen. Seven topics from addition to nCr and nPr, five difficulty levels, a timer on every question, and Digit, a calculator mascot who cheers every team on.",
      image: "/img/foto1.jpg",
      url: "/projects/bingo-math.html",
      cta: "Play Bingo Math",
    },
  ],

  contact: {
    heading: "Have something in mind?",
    line: "Email is the fastest way to reach me.",
    email: "your.email@example.com", // replace with your real email
  },

  socials: [
    { label: "Instagram", url: "#" },
    { label: "GitHub", url: "#" },
    { label: "Hugging Face", url: "#" },
    { label: "LinkedIn", url: "#" },
  ],
};
