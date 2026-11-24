/* =====================================================================
   PORTFOLIO CONTENT. This is the only file you need to edit.
   Both the game and the recruiter view are built from it.

   ADD A PROJECT: copy one block inside `projects: [ ... ]`, paste it
   where you want it to appear (order here = order in the game and in
   the recruiter view), and change the text. That's it: a new stop,
   its skill chips and its route button are created automatically.

   Fields for a project:
     id       unique short name, no spaces           "my-robot"
     short    label on the building + route strip    "Robot Arm"
     title    full title                             "6-DOF Robot Arm Controller"
     kind     one line: type of project              "Embedded · team of 4"
     role     optional: what YOU did on a team       "I wrote the motor driver."
     stack    tools used. Each becomes a skill chip in the game.
     metric   { v: big number, l: what it means }, or null if there is no real number
     bullets  2 to 5 sentences: what, how, result
     links    [] or [{ label: "Source on GitHub", href: "https://..." }]
     demo     optional animation: "pong" | "bars" | "stream" | "queue" |
              "pipeline" | "capstone" | null (no animation)
     caption  one line under the animation

   Tips: keep metrics true and checkable. Delete a project by removing
   its block. Save the file and refresh the page to see changes.
   ===================================================================== */
const CONFIG = {
  name: "Mohammad Mustafidur Rahman",
  short: "Mustafid",                         // big greeting in the game
  headline: "Computer Engineering student, York University",
  location: "Scarborough / Toronto, ON",
  availability: "Open to co-op, internship and 2027 new-grad roles",
  email: "mdnaimrn@gmail.com",
  phone: "(647) 648-2210",
  github: "https://github.com/NRhaman2000",
  linkedin: "https://www.linkedin.com/in/mohammad-mustafidur-rahman-286210248",
  resumePdf: "Mohammad-Rahman-Resume.pdf",   // keep this file next to index.html

  summary: "Fourth-year Computer Engineering student at York University's Lassonde School of Engineering, graduating September 2027. My recent work: a real-time fraud-detection pipeline (Kafka, XGBoost, FastAPI) that scores card transactions in 14–17 ms at p95, a RISC-V processor on an FPGA that runs Pong over VGA, a texture-classification study where transfer learning reached 75.9% on 47 classes (the classical baseline got 31.0%), and the React Native client for a real-time voice assistant. For my capstone I built a 2.64 KB battery State-of-Health model and I'm now writing the ESP32-S3 firmware it runs on.",

  // Four headline numbers for the recruiter view.
  glance: [
    { v: "75.9%", l: "top-1 on the 47-class DTD texture set with my CNN ensemble (classical baseline 31.0%)" },
    { v: "RV32I", l: "custom CPU running Pong over VGA on an FPGA, in ~4% of its logic" },
    { v: "0.94",  l: "fraud precision (0.93 recall) on 556k held-out transactions, streamed through Kafka at 14–17 ms p95" },
    { v: "2.64 KB", l: "TinyML battery-health model for an ESP32-S3 (capstone), 2.42% error on an unseen cell" }
  ],

  skills: {
    "Languages":         ["Python", "C", "Java", "JavaScript", "TypeScript", "SQL", "Verilog", "SystemVerilog", "RISC-V Assembly", "HTML/CSS"],
    "Web & mobile":      ["React", "React Native", "Node.js", "Express.js", "FastAPI", "REST APIs", "WebSockets", "WordPress", "JavaFX"],
    "ML & data":         ["XGBoost", "PyTorch", "Scikit-Learn", "OpenCV", "NumPy", "Pandas", "Streamlit", "Plotly", "TensorFlow Lite Micro"],
    "Hardware":          ["Intel DE10-Lite", "Quartus Prime", "MMIO", "VGA", "Test benches", "ESP32-S3"],
    "Tools & platforms": ["Git", "GitHub", "GitHub Actions", "Docker", "Kafka", "pytest", "PostgreSQL", "MongoDB", "Prometheus", "Grafana", "AWS", "Linux", "Excel", "ALMA"]
  },

  education: {
    school: "York University, Lassonde School of Engineering",
    degree: "B.Eng. in Computer Engineering",
    when: "Expected Sep 2027",
    place: "Toronto, ON",
    coursework: ["Data Structures & Algorithms", "Operating Systems", "Database Systems", "Software Design", "Digital Logic & Computer Architecture", "Probability & Statistics"]
  },

  projects: [
    {
      id: "fraud", short: "Fraud Stream",
      title: "fraud-stream: Real-Time Card Fraud Detection",
      kind: "Streaming ML system · personal project",
      stack: ["Kafka", "XGBoost", "FastAPI", "PostgreSQL", "Docker", "Prometheus"],
      metric: { v: "0.94 / 0.93", l: "fraud precision / recall on 555,719 held-out transactions the model never saw" },
      bullets: [
        "Built a streaming pipeline where card transactions flow through Kafka, a scorer builds 24 live per-card features, an XGBoost model behind FastAPI scores each one, and flagged transactions land in a Postgres review queue on a live dashboard.",
        "Trained on a time-based split and evaluated the test set once: 0.940 precision and 0.931 recall (1,997 of 2,145 frauds caught, 128 false alarms).",
        "Found why live precision fell to 0.86 against 0.94 offline: the scorer only had 7 days of card history. Loading the full history at startup made the live dashboard match the offline numbers exactly, and a unit test keeps it that way.",
        "Benchmarked 14–17 ms p95 end-to-end latency at 1,000 tx/s across two runs. Above 2,500 tx/s the tail grows, and I traced it to the single Python scorer falling behind on the Kafka leg, not the model.",
        "Ran an outage drill under load (scorer killed, model API and Postgres stopped): 60,000 transactions scored exactly once, with 0 lost and 0 double counted, using at-least-once offsets, backoff retries and idempotent inserts.",
        "Hardened it like a real service: API key auth, Host allowlist, non-root read-only containers, a least-privilege database role, about 300 unit tests at ~90% coverage with strict mypy, and GitHub Actions CI that publishes the Docker image."
      ],
      links: [{ label: "Source on GitHub", href: "https://github.com/NRhaman2000/fraud-stream" }],
      demo: "fraud",
      caption: "Each dot is a transaction. The scorer builds its features, the model scores it, and the rare red ones become alerts for a reviewer."
    },
    {
      id: "fpga", short: "FPGA SoC",
      title: "RISC-V System-on-Chip Pong",
      kind: "Hardware / software co-design · EECS 3216 · 2-person team",
      role: "Built with Kafi Anan for EECS 3216 at York University.",
      stack: ["Verilog", "RISC-V Assembly", "Quartus Prime", "Intel DE10-Lite", "MMIO", "Test benches"],
      metric: { v: "RV32I", l: "custom single-cycle core running the game at 60 Hz in ~4% of the FPGA's logic, with zero block RAM" },
      bullets: [
        "Built a single-player Pong game on an Intel DE10-Lite (MAX 10) FPGA, controlled by a custom single-cycle RV32I processor that implements 7 instructions (LUI, ADDI, ANDI, LW, SW, BEQ, JAL).",
        "Wrote the paddle-control program as a 13-instruction RISC-V loop, hand-assembled into a ROM. It reads the buttons and writes the paddle position through memory-mapped I/O.",
        "Designed the hardware game engine (ball physics, collisions, BCD scoring, lives) updating once per frame at 60 Hz, and rendered 640x480 VGA pixel by pixel with no framebuffer, using a PLL for the ~25.175 MHz pixel clock.",
        "Built the external circuits from datasheets: debounced pushbuttons (RC filter plus 74HC14 Schmitt trigger) and an 8-bit R-2R ladder DAC into an LM386 amplifier for 48 kHz sound effects.",
        "Fit the whole system in about 2,200 logic elements (~4%) and 0 block RAM bits, with a full title, countdown, pause, game-over and win state machine, validated with test benches and waveform simulation."
      ],
      links: [{ label: "Source on GitHub", href: "https://github.com/NRhaman2000/riscv-fpga-pong" }],
      demo: "pong",
      caption: "A browser version of the game. Move your pointer or finger over the screen to control the paddle. On the board, the RV32I core reads the buttons and writes the paddle position through MMIO, and hardware draws each VGA pixel."
    },
    {
      id: "texture", short: "Texture ML",
      title: "Texture Classification: Classical vs Deep Learning",
      kind: "Computer vision · EECS 4422",
      role: "I designed the classical feature pipeline and fine-tuned the transfer-learning models.",
      stack: ["Python", "PyTorch", "Scikit-Learn", "OpenCV", "NumPy"],
      metric: { v: "75.9%", l: "top-1 on 47 texture classes (DTD) with my CNN ensemble, vs 31.0% classical and 19.0% CNN from scratch" },
      bullets: [
        "Compared a classical texture-recognition pipeline against CNNs on the Describable Textures Dataset (47 classes, 1,880 images each for train, validation and test).",
        "Designed the classical pipeline: Gabor magnitude-energy, Fourier ring/wedge and LBP features, standardized and fed to an RBF-SVM tuned by grid search (31.01% top-1, 30.70% macro-F1).",
        "Showed a 3-layer CNN trained from scratch overfits this small dataset: training loss fell to 0.62 while validation accuracy plateaued near 19% (18.99% ± 0.24% over 3 seeds).",
        "Extended the study with transfer learning: ResNet-50 frozen (64.3%), EfficientNetV2-S fine-tuned (72.3%), ConvNeXt-Tiny with test-time augmentation (74.8%), and a ConvNeXt + EfficientNetV2 ensemble with TTA (75.9%).",
        "Measured data efficiency at 25%, 50% and 100% of the training set (classical 21.3% → 25.4% → 31.0%), and built a resumable experiment runner with cached features and generated figures."
      ],
      links: [{ label: "Source on GitHub", href: "https://github.com/NRhaman2000/Texture-Classification" }],
      demo: "bars",
      caption: "Top-1 test accuracy for every model in the study. Chance on 47 classes is 1/47 ≈ 2.1%."
    },
    {
      id: "unburnt", short: "UnBurnt",
      title: "UnBurnt: Multimodal Voice Assistant",
      kind: "Real-time mobile AI · team project",
      role: "I built the cross-platform mobile client.",
      stack: ["React Native", "JavaScript", "AWS", "WebSockets"],
      metric: null,   // no hard number for this one yet. Add { v, l } when you have one.
      bullets: [
        "Built the React Native client for a conversational AI assistant, streaming live bidirectional voice audio to backend AWS cloud services over WebSockets.",
        "Structured real-time JSON event handling between the app and cloud endpoints so voice responses stay in sync with the conversation.",
        "Tracked down and fixed client-side causes of response lag and audio dropouts in the async audio-encoding and state-management code."
      ],
      links: [],   // The UnBurnt repo link (github.com/Nityzt/UnBurnt) didn't load publicly. Add it back here once it does.
      demo: "stream",
      caption: "Mint packets are encoded audio chunks going up; amber ones are JSON events and responses coming back on the same socket."
    },
    {
      id: "capstone", short: "Battery BMS",
      title: "Fault-Tolerant Battery Management System: TinyML State-of-Health",
      kind: "ENG 4000 capstone · embedded ML · in progress",
      role: "I built the ML pipeline and I'm now working on the ESP32-S3 microcontroller side.",
      stack: ["Python", "TensorFlow Lite Micro", "ESP32-S3"],
      metric: { v: "2.42%", l: "State-of-Health error (MAE) on an unseen battery cell, from a model that fits in 2.64 KB of flash" },
      bullets: [
        "Capstone team building a fault-tolerant active battery management system for a 4-cell (4S, ~14.8 V nominal) lithium-ion pack, controlled by an ESP32-S3-WROOM-1.",
        "Built a TinyML State-of-Health model: a 193-parameter MLP trained on NASA PCoE battery data, INT8-quantized to 2.64 KB of flash and exported as a C header for TensorFlow Lite Micro.",
        "Validated with cell-wise splits: 2.42% MAE on an unseen test cell (B0018), 2.70 ± 0.66% across 10 training seeds, and 2.02% mean / 2.27% worst-cell MAE in leave-one-cell-out cross-validation.",
        "Measured only 0.124% SoH drift between the Float32 and INT8 models, so quantizing for the microcontroller costs almost no accuracy.",
        "Kept the model advisory by design: cell isolation, bypass and shutdown stay with deterministic firmware. Now working on the ESP32-S3 side, with on-device testing next."
      ],
      links: [{ label: "Source on GitHub", href: "https://github.com/NRhaman2000/eng-4k-project-ml" }],
      demo: "capstone",
      caption: "Project status from the repo. The ML pipeline is done; firmware and on-device testing are in progress."
    },
    {
      id: "queue", short: "Advising Queue",
      title: "Virtual Advising Queue",
      kind: "Full-stack web app",
      stack: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JavaScript", "HTML/CSS"],
      metric: null,
      bullets: [
        "Built a full-stack web app that lets students join academic advising queues online instead of waiting in line, while staff see live queue status.",
        "Designed the Node.js/Express REST endpoints and the MongoDB schemas that track active tickets and service logs.",
        "Connected the front-end views (JavaScript, HTML/CSS) to the API through JSON payloads.",
        "Added server-side validation that blocks duplicate submissions before they reach the queue.",
        "Wrote setup, user and administrator documentation so department staff could run it themselves."
      ],
      links: [],
      demo: "queue",
      caption: "Tickets flow browser → API → database. Duplicates are rejected at the API before they reach the queue."
    },
    {
      id: "nasa", short: "NASA Space Apps",
      title: "NASA Space Apps: Data Pipeline & Dashboard",
      kind: "Hackathon · 6-person team",
      role: "I built the core Python data pipeline and the dashboard.",
      stack: ["Python", "Pandas", "NumPy", "Streamlit", "Plotly"],
      metric: null,
      bullets: [
        "Worked in a 6-person team at the NASA Space Apps Challenge and shipped a working prototype within the 48-hour hackathon.",
        "Wrote the core Python data pipeline (Pandas, NumPy) that cleans, filters and structures noisy scientific signal data.",
        "Built the interactive Streamlit dashboard with Plotly charts, used both to validate pipeline output and to explore the data.",
        "Presented the analysis and findings to the evaluation judges."
      ],
      links: [],
      demo: "pipeline",
      caption: "Raw, noisy signal on top; the cleaned, structured series the dashboard plots below."
    }
  ],

  // Most recent first.
  experience: [
    {
      role: "Library Collections Support Assistant", org: "York University, Collections Maintenance", when: "Sep 2026 – Present", place: "Toronto, ON",
      bullets: [
        "Maintain catalog accuracy in the ALMA library database by processing record updates, item withdrawals and deletions.",
        "Audit physical collections across campus libraries against Excel inventory sheets to locate missing items and fix record discrepancies.",
        "Inspect sections, shift materials to prevent overcrowding and report damaged items."
      ]
    },
    {
      role: "Freelance Web Developer", org: "ShantiSutra", when: "2023 – Present", place: "Toronto, ON",
      link: { label: "shantisutra.ca", href: "https://shantisutra.ca" },
      bullets: [
        "Designed, built and deployed a responsive production website (HTML, CSS, JavaScript, WordPress) and keep it running at 99% uptime.",
        "Turn client requirements into layout updates, new features and cross-browser fixes, testing each change before release."
      ]
    },
    {
      role: "Closing Manager / Grocery Clerk", org: "Food Basics", when: "Mar 2022 – Present", place: "Toronto, ON",
      bullets: [
        "Supervise closing shifts: assign floor duties and sign off nightly safety, cleaning and lock-up checklists on schedule.",
        "Reconcile register balances, debit/credit receipts and inventory logs, and resolve customer issues at the front desk."
      ]
    },
    {
      role: "Peer Mentor & Orientation Leader", org: "Lassonde School of Engineering, York University", when: "Sep 2025 – Dec 2025", place: "Toronto, ON",
      bullets: [
        "Advised first-year engineering students one-on-one on course planning, degree requirements and university systems.",
        "Led Week Zero orientation cohorts of 30+ incoming students and volunteered on YFS RedPack event logistics for 500+ attendees.",
        "Collected feedback on recurring academic hurdles and presented structured summaries to program coordinators."
      ]
    }
  ],

  // Smaller repos, listed under "More on GitHub". Add { label, href, desc } entries freely.
  moreRepos: [
    { label: "TicTacToe", href: "https://github.com/NRhaman2000/TicTacToe",
      desc: "Two-player Tic Tac Toe desktop app in Java and JavaFX: object-oriented design, win/draw detection, alerts and reset." },
    { label: "Resource-allocation spec lab", href: "https://github.com/NRhaman2000/EECS4312_Lab5_SpecificationLab_B_220081014",
      desc: "EECS 4312 requirements lab: a Python feasibility check for allocating limited resources across requests, tested with pytest." },
    { label: "my-multimodal-app", href: "https://github.com/NRhaman2000/my-multimodal-app",
      desc: "Backend and frontend app (work in progress)." }
  ]
};
