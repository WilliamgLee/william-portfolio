// All editable text and links for the site live here.
// Change this file to update content; you shouldn't need to touch the components.

export const site = {
  name: "William Lee",
  tagline: "Student · AI Tinkerer · Indonesia",
  intro:
    "I build interfaces for the web, then spend the rest of my time poking at AI models to see what they can actually do.",
  description:
    "William Lee is a student from Indonesia who tinkers with AI. Selected work, skills and contact.",

  // Your site's address once it's online, e.g. "https://williamlee.my.id".
  // Link previews (WhatsApp, LinkedIn, X) need it to find the preview image.
  url: "https://william-lee.dev",

  about: {
    // Shown large, like a pull quote.
    lead: "I like building small things that feel finished.",
    // One string per paragraph. [text](/path) becomes a link.
    body: [
      "I'm William, a first year computer science student at Binus. My first \"project\" wasn't code: in high school I ran a YouTube Shorts channel to earn money without losing study time. It made its first $7, then died from copyright claims because I never set clear rules for the friend I hired to help. That taught me more than the $7 did: systems break where the rules are unwritten.",
      "That idea shows up in everything I build now. [Kiki Classroom](/work/kiki-classroom) is my second attempt at kids' videos, rebuilt as six local AI agents with written rules, automated checks, and me approving every video. [Loop Quest](/work/loop-quest) came from seeing people around me, myself included, struggle with C loops, so I wrote a small C interpreter in JavaScript to make each loop visible step by step. [Bingolah](/projects/bingolah.html) turns a classroom quiz into a game show, because learning sticks better when it's loud.",
      "I care about details people feel but rarely notice: a button sound, an animation that makes a page feel alive, a layout that works on a cheap phone. I use AI like Claude and Gemini daily, but I want to understand what my code actually does.",
      "[Right now I'm still finding new ideas, and I'm open to collaboration!](/contact)",
    ],
  },

  // Each skill points at a project that proves it. wide: spans both columns.
  skills: [
    {
      group: "web",
      title: "JavaScript",
      description: "The language behind Bingolah and Loop Quest, including the small C interpreter that powers Loop Quest's step-by-step view.",
    },
    {
      group: "web",
      title: "React & Next.js",
      description: "This site: App Router pages, shared components, and all content kept in one data file so updates don't touch the layout.",
    },
    {
      group: "web",
      title: "Tailwind CSS",
      description: "Layouts that hold up from a cheap phone to a wide monitor, without a pile of custom CSS.",
    },
    {
      group: "web",
      title: "Canvas & Web Audio",
      description: "The blocky mascot on this site is drawn by my own pixel renderer, and the chiptune music and button sounds in my projects are generated in code.",
    },
    {
      group: "ai",
      title: "Local LLM pipelines",
      description: "Kiki Classroom: six agents on Python, Ollama and Qwen2.5, with strict JSON outputs checked by code, a fact dictionary, and 268 automated tests.",
    },
    {
      group: "ai",
      title: "AI-assisted development",
      description: "I build with Claude and Gemini every day, but I read and test what they write. I'd rather understand my code than just ship it.",
    },
    {
      group: "tools",
      title: "Git, GitHub & Vercel",
      description: "Every project is versioned on GitHub, and this site deploys to Vercel automatically on every push.",
      wide: true,
    },
    {
      group: "learning",
      title: "C",
      description: "First-year coursework. Building Loop Quest and practising with 100 C problems is how I'm getting comfortable with loops and arrays.",
    },
    {
      group: "modding",
      title: "Minecraft Bedrock add-ons",
      description: "Custom blocks, items and behaviour. It's where the blocky avatar on this site comes from.",
    },
  ],

  // hook: one punchy line, shown big on the Work page.
  // pitch: 2–3 sentences of marketing, typed out in the intro.
  // description: what it is, shown on the Work page.
  // tags: tech used, shown as small pills under the description.
  //
  // To add a project, copy the block below, fill it in, and put its preview
  // image in public/img (e.g. foto2.jpg). The intro and Work page adapt to
  // however many projects are listed here. Add `intro: false` to keep a
  // project on Work but out of the opening intro.
  projects: [
    {
      title: "Kiki Classroom",
      badge: "BIGGEST",
      hook: "A tiny AI office that makes videos for kids.",
      pitch:
        "Six AI staff in a pixel-art office turn a topic into a 30-second learning video for toddlers, with me approving every script and every video.",
      description:
        "A local pipeline of six AI agents: a scriptwriter, a child-safety advisor, a voice, an animator, an editor and a delivery desk, all running on one laptop GPU. Every frame and every note is made by code, nothing borrowed, and a person has the last word.",
      tags: ["Python", "Ollama", "Qwen2.5", "XTTS-v2", "ffmpeg"],
      image: "/img/kiki-classroom.jpg",
      url: "/work/kiki-classroom",
      cta: "Read the story",
      links: [
        { label: "Watch the demo", url: "https://youtu.be/0EmKHYFijgc" },
        { label: "GitHub", url: "https://github.com/WilliamgLee/newIdea" },
      ],
    },
    {
      title: "Bingolah",
      hook: "Any class, turned into a game show.",
      pitch:
        "A bingo quiz for the whole class: seven subjects, five levels, up to five teams racing to line up four tiles.",
      description:
        "A quiz game for 2–5 teams sharing one screen, built for real classrooms. 300+ questions across seven subjects (grade 12 Kurikulum Merdeka, plus AI and IT). Math questions get fresh random numbers every round, so nobody can memorise answers. Digit, a calculator mascot, cheers every team on.",
      tags: ["HTML", "CSS", "JavaScript", "Web Audio"],
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
        "C loops are hard to picture, so I made them visible. Every iteration becomes a tile, nested loops get their own platform, and each step is explained in plain words. Under the hood is a small C interpreter I wrote in JavaScript, checked against GCC.",
      tags: ["JavaScript", "C", "Interpreter"],
      image: "/img/loop-quest.jpg",
      url: "/work/loop-quest",
      cta: "Read the story",
      links: [{ label: "Play Loop Quest", url: "/projects/loop-quest.html" }],
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
