/**
 * TALK TO TIME (TTT) NEWS CHANNEL - Comprehensive News Dataset
 * Realistic editorial content with AI summaries, analytics, video broadcasts and timestamps
 */

const SEED_NEWS_DATA = [
  {
    id: "art-video-1",
    title: "LIVE BROADCAST: Quantum Superconducting Confinement Reaches Continuous Fusion Power Gain",
    slug: "live-broadcast-quantum-superconducting-fusion",
    category: "Science",
    categoryBadge: "Video Broadcast",
    isBreaking: true,
    isFeatured: true,
    isHero: false,
    isVideo: true,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // High compatibility demo video stream
    trendingRank: 1,
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Alistair Chen",
      role: "Chief Science Correspondent",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
    },
    publishedAt: "Just Now",
    date: "October 5, 2026",
    timestamp: Date.now() - 5 * 60 * 1000, // 5 mins ago
    readTime: "4 min watch",
    views: "58.4k",
    summary: "Watch Talk To Time's special scientific broadcast breaking down the first sustained room-temperature quantum coherence trials in Geneva.",
    content: `
      <p class="lead">Watch Talk To Time's special scientific broadcast breaking down the first sustained room-temperature quantum coherence trials in Geneva.</p>
      <h3>Continuous Clean Energy Generation</h3>
      <p>In this exclusive video dispatch, our science desk investigates how topological phononic bandgaps overcome thermal decoherence at ambient temperatures, unlocking portable quantum processors and lossless regional power grids.</p>
    `,
    aiInsights: {
      summaryPoints: [
        "Continuous 18-minute plasma confinement sustained at net Q=2.4 power gain.",
        "Room-temperature quantum sensors slated for semiconductor fabs in 2027.",
        "Video broadcast includes technical telemetry diagrams and lab interviews."
      ],
      sentiment: "Historic Breakthrough",
      sentimentScore: 98,
      factCheckScore: 99.8,
      keyEntities: ["Tokamak Fusion", "Quantum Telemetry", "Geneva Lab"],
      audioSummaryUrl: "#"
    }
  },
  {
    id: "art-1",
    title: "Artificial Intelligence Is Reshaping the Next Decade of Digital Innovation and Global Governance",
    slug: "artificial-intelligence-reshaping-next-decade",
    category: "AI",
    categoryBadge: "AI & Future",
    isBreaking: true,
    isFeatured: true,
    isHero: true,
    isVideo: false,
    trendingRank: 2,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=85",
    author: {
      name: "Dr. Elena Rostova",
      role: "Chief Technology Editor",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
    },
    publishedAt: "25 mins ago",
    date: "October 5, 2026",
    timestamp: Date.now() - 25 * 60 * 1000,
    readTime: "6 min read",
    views: "42.8k",
    summary: "From next-generation reasoning architectures to autonomous scientific discovery, artificial intelligence has crossed the threshold from experimental novelty to foundational global infrastructure.",
    content: `
      <p class="lead">From next-generation reasoning architectures to autonomous scientific discovery, artificial intelligence has crossed the threshold from experimental novelty to foundational global infrastructure, forcing worldwide regulatory bodies and industry titans to redefine technological sovereignty.</p>
      
      <h3>The Leap to Autonomous Cognitive Workflows</h3>
      <p>Over the past eighteen months, enterprise adoption of agentic workflows has surged by nearly 340%. Unlike early conversational models that served as passive search companions, current multi-agent networks actively plan, orchestrate complex software systems, design hardware architectures, and debug biological code with minimal human intervention.</p>
      
      <p>"We are no longer merely teaching machines to mimic language," explains Dr. Marcus Vance, Director of the Global Autonomous Systems Institute. "We are providing them with grounded causal reasoning and dynamic tool execution capabilities that match junior researcher proficiencies across specialized scientific fields."</p>
      
      <div class="editorial-quote">
        <blockquote>"The real revolution is not faster code generation; it is the democratization of high-level synthesis across every industry known to humanity."</blockquote>
        <cite>— World Economic AI Summit, Geneva</cite>
      </div>

      <h3>Global Policy and Compute Governance</h3>
      <p>As computational capacity concentrates within key geopolitical corridors, international policymakers are drafting binding multilateral frameworks to monitor high-tier compute clusters. The focus has shifted from hypothetical existential hazards to immediate real-world questions: supply chain resilience, optical interconnect security, and equitable distribution of medical discovery breakthroughs.</p>
      
      <p>Emerging markets across Southeast Asia and the Global South are simultaneously launching sovereign compute clusters, asserting independence from centralized cloud ecosystems. By 2028, analysts project over 60% of governmental data will be processed on locally trained, open-weight reasoning foundation models.</p>
    `,
    aiInsights: {
      summaryPoints: [
        "Multi-agent reasoning models now power over 340% more enterprise workflows than last year.",
        "Geopolitical focus is pivoting toward sovereign compute clusters and optical semiconductor supply chains.",
        "60% of state-level digital services are projected to run on open-weight foundation models by 2028."
      ],
      sentiment: "Bullish / Transformative",
      sentimentScore: 92,
      factCheckScore: 99.4,
      keyEntities: ["Global Autonomous Systems Institute", "Compute Sovereignty", "Multi-Agent AI", "Geneva Accord"],
      audioSummaryUrl: "#"
    }
  },
  {
    id: "art-2",
    title: "India Launches Next-Generation Deep Ocean Mission and Clean Hydrogen Corridors",
    slug: "india-launches-deep-ocean-hydrogen-corridors",
    category: "India",
    categoryBadge: "National Bureau",
    isBreaking: false,
    isFeatured: true,
    trendingRank: 3,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Rajeshwar Sen",
      role: "Senior Policy & Energy Analyst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    publishedAt: "1 hour ago",
    date: "October 5, 2026",
    timestamp: Date.now() - 60 * 60 * 1000,
    readTime: "4 min read",
    views: "29.4k",
    summary: "The Ministry of Earth Sciences initiates the Samudrayaan depth trials while unveiling four dedicated green hydrogen export corridors across coastal industrial zones.",
    content: `
      <p class="lead">In a landmark push for dual-spectrum resource security, India has initiated manned submersible trials targeting 6,000-meter abyssal zones while inaugurating multi-gigawatt green hydrogen corridors along the western maritime frontier.</p>
      <h3>Abyssal Exploration</h3>
      <p>The MATSYA 6000 submersible is engineered to map polymetallic nodules, rare earth minerals, and benthic biodiversity vital for indigenous battery and superconductor manufacturing. Scientists at the National Institute of Ocean Technology emphasized that environmental telemetry will be broadcast publicly in real time to uphold maritime ecology conventions.</p>
      <h3>Hydrogen Logistics</h3>
      <p>The adjoining green hydrogen hubs in Gujarat and Odisha represent a massive private-public capital deployment, aiming to supply green ammonia to European and East Asian clean shipping routes at record sub-$2/kg price points.</p>
    `,
    aiInsights: {
      summaryPoints: [
        "MATSYA 6000 aims to reach 6,000m depths to scout strategic rare-earth nodules sustainably.",
        "Green hydrogen export infrastructure is set to lower regional clean energy costs below $2 per kilogram.",
        "Direct industrial synergy between coastal renewables and green ammonia bunkering for maritime trade."
      ],
      sentiment: "Positive / Strategic",
      sentimentScore: 88,
      factCheckScore: 98.8,
      keyEntities: ["Ministry of Earth Sciences", "MATSYA 6000", "Green Hydrogen", "NIOT"],
      audioSummaryUrl: "#"
    }
  },
  {
    id: "art-3",
    title: "Quantum Supremacy in Room-Temperature Materials: MIT & Oxford Announce Discovery",
    slug: "quantum-supremacy-room-temperature-materials",
    category: "Science",
    categoryBadge: "Physics Breakthrough",
    isBreaking: true,
    isFeatured: true,
    trendingRank: 4,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Alistair Chen",
      role: "Quantum Physics Editor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
    },
    publishedAt: "2 hours ago",
    date: "October 5, 2026",
    timestamp: Date.now() - 120 * 60 * 1000,
    readTime: "5 min read",
    views: "38.1k",
    summary: "A newly synthesized polymer-graphene matrix maintains quantum coherence at 22°C, opening paths to lossless power grids and uncooled desktop quantum computers.",
    content: `
      <p class="lead">Researchers have confirmed sustained macroscopic quantum superposition in a synthetic chiral-layer lattice at ambient room temperatures, solving one of physics' most enduring bottlenecks.</p>
      <h3>Defeating Thermal Decoherence</h3>
      <p>For decades, quantum processors demanded cryogenic dilution refrigerators operating near absolute zero (-273.15°C). The new material utilizes self-stabilizing topological phononic bandgaps, preventing thermal vibrations from collapsing qubit wavefunctions.</p>
      <p>Commercial prototypes of room-temperature quantum sensor arrays are already scheduled for semiconductor metrology by Q3 next year.</p>
    `,
    aiInsights: {
      summaryPoints: [
        "Quantum coherence successfully maintained at 22°C without cryogenic chillers.",
        "Novel topological phononic lattice resists environmental decoherence.",
        "Potential applications include lossless electrical grids and portable MRI scanners."
      ],
      sentiment: "High Impact / Scientific",
      sentimentScore: 96,
      factCheckScore: 99.1,
      keyEntities: ["MIT", "Oxford Quantum Lab", "Topological Lattice", "Qubit Coherence"],
      audioSummaryUrl: "#"
    }
  },
  {
    id: "art-4",
    title: "Global Central Banks Coordinate Digital Currency Interoperability Framework at Basel",
    slug: "global-central-banks-cbdc-interoperability",
    category: "Business",
    categoryBadge: "Global Finance",
    isBreaking: false,
    isFeatured: true,
    trendingRank: 5,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Miriam Sterling",
      role: "Financial Markets Analyst",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    },
    publishedAt: "3 hours ago",
    date: "October 5, 2026",
    timestamp: Date.now() - 180 * 60 * 1000,
    readTime: "4 min read",
    views: "21.6k",
    summary: "Project Agora moves to Phase 3, allowing instant cross-border settlement in unified tokenized wholesale reserves across 34 national jurisdictions.",
    content: `
      <p class="lead">Financial settlement friction that previously trapped over $120 billion in transit capital will shrink to milliseconds under the newly codified Project Agora standard agreed upon in Basel.</p>
      <p>By connecting domestic central bank digital ledgers with multi-currency atomic swaps, commercial banks can execute forex exchanges with zero counterparty settlement lag.</p>
    `,
    aiInsights: {
      summaryPoints: [
        "34 Central Banks integrate tokenized reserve cross-border settlements.",
        "Settlement windows drop from T+2 days to sub-second atomic completion.",
        "Estimated global corporate liquidity savings of $85B annually."
      ],
      sentiment: "Constructive",
      sentimentScore: 84,
      factCheckScore: 97.9,
      keyEntities: ["Bank for International Settlements", "Project Agora", "Federal Reserve", "RBI"],
      audioSummaryUrl: "#"
    }
  },
  {
    id: "art-5",
    title: "Next-Gen Commercial Fusion Reactor Surpasses Net Energy Milestone in Tokamak Trials",
    slug: "commercial-fusion-net-energy-milestone",
    category: "Technology",
    categoryBadge: "Clean Tech",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 6,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Arthur Pendelton",
      role: "Energy Infrastructure Correspondent",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"
    },
    publishedAt: "4 hours ago",
    date: "October 5, 2026",
    timestamp: Date.now() - 240 * 60 * 1000,
    readTime: "5 min read",
    views: "18.3k",
    summary: "High-temperature superconducting magnets achieve continuous 18-minute plasma confinement with a Q-factor of 2.4, cementing commercial viability by 2030.",
    content: `
      <p class="lead">The elusive pursuit of near-limitless zero-carbon power reached historic operational validation today as magnetic confinement systems sustained energy output more than double the input load.</p>
      <p>The modular compact stellarator design avoids the enormous capital footprints of legacy experimental reactors, clearing pathways for regional power plant retrofits.</p>
    `,
    aiInsights: {
      summaryPoints: [
        "Plasma containment maintained stable for 18 minutes at 100M degrees Celsius.",
        "Net power gain ratio of Q = 2.4 achieved continuously.",
        "Modular construction allows deployment inside decommissioned coal infrastructure."
      ],
      sentiment: "Revolutionary",
      sentimentScore: 95,
      factCheckScore: 99.0,
      keyEntities: ["Tokamak Energy", "Superconducting Magnets", "Plasma Confinement"],
      audioSummaryUrl: "#"
    }
  },
  {
    id: "art-6",
    title: "Global Geopolitical Shifts: Indo-Pacific Maritime Security Pact Expanded",
    slug: "indo-pacific-maritime-security-pact",
    category: "World",
    categoryBadge: "Geopolitics",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 7,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Siddharth Nair",
      role: "International Affairs Analyst",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80"
    },
    publishedAt: "5 hours ago",
    date: "October 5, 2026",
    timestamp: Date.now() - 300 * 60 * 1000,
    readTime: "4 min read",
    views: "15.9k",
    summary: "Eight nations sign enhanced undersea telemetry and anti-piracy protocol to secure critical trade choke points in the Malacca and Sunda straits.",
    content: `
      <p class="lead">With over 40% of global sea-borne freight passing through narrow Southeast Asian straits, an eight-nation coalition has codified an automated seabed sensor network to shield underwater fiber optic cables and commercial convoys.</p>
      <p>Diplomats highlighted that the initiative is defensive and open to non-aligned observers to maintain regional neutrality and open navigation.</p>
    `,
    aiInsights: {
      summaryPoints: [
        "8 nations coordinate autonomous seabed acoustic telemetry.",
        "Protection expanded for trans-oceanic fiber optic communications cables.",
        "Reinforces freedom of navigation across high-density commerce corridors."
      ],
      sentiment: "Stabilizing",
      sentimentScore: 82,
      factCheckScore: 96.5,
      keyEntities: ["Indo-Pacific Forum", "Subsea Cabling", "Maritime Security"],
      audioSummaryUrl: "#"
    }
  },
  {
    id: "art-7",
    title: "The Billion-Dollar Autonomous Racing League Draws Record Global Viewership",
    slug: "autonomous-racing-league-record-viewership",
    category: "Sports",
    categoryBadge: "Motorsport",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 8,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Chloe Vane",
      role: "Sports & Innovation Editor",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
    },
    publishedAt: "6 hours ago",
    date: "October 5, 2026",
    timestamp: Date.now() - 360 * 60 * 1000,
    readTime: "3 min read",
    views: "24.5k",
    summary: "Speeds exceeding 320 km/h with wheel-to-wheel algorithmic overtakes mesmerize 45 million online viewers in the Yas Marina championship final.",
    content: `
      <p class="lead">Driverless Dallara chassis powered by neural visual-inertial odometry competed in extreme split-second overtakes with zero safety incidents, proving AI racing has evolved into high-octane entertainment.</p>
      <p>The winning algorithm from Technical University Munich executed a slipstream maneuver at 318 km/h with merely 4 centimeters of clearance on the final chicane.</p>
    `,
    aiInsights: {
      summaryPoints: [
        "45M live viewers tuned in to the autonomous Grand Prix finale in Abu Dhabi.",
        "Vehicles ran sub-5ms latency perception-to-actuation loops without telemetry delays.",
        "Algorithm-versus-algorithm vehicle dynamics provide testbeds for consumer autonomous safety."
      ],
      sentiment: "Exciting / High Energy",
      sentimentScore: 90,
      factCheckScore: 99.3,
      keyEntities: ["A2RL League", "Autonomous Dallara", "TUM Racing AI"],
      audioSummaryUrl: "#"
    }
  },
  {
    id: "art-8",
    title: "Cinematic VR & Holographic Cinema: Hollywood's New Interactive Era Unveiled",
    slug: "cinematic-vr-holographic-cinema-hollywood",
    category: "Entertainment",
    categoryBadge: "Culture & Media",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 9,
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Lucas Romero",
      role: "Culture & Arts Critic",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80"
    },
    publishedAt: "7 hours ago",
    date: "October 5, 2026",
    timestamp: Date.now() - 420 * 60 * 1000,
    readTime: "4 min read",
    views: "19.2k",
    summary: "Major studios debut spatial volumetric experiences where viewers choose observational vantage points inside live-rendered photorealistic storylines.",
    content: `
      <p class="lead">The boundary between movie theatre and navigable virtual world dissolved this week as Warner and Sony showcased 'Volumetric Cinema' theatres equipped with light-field wave projectors.</p>
      <p>Audiences wear featherweight polarized lenses while dynamic acoustic beamforming delivers personalized spatial audio tailored to each viewer's position in the auditorium.</p>
    `,
    aiInsights: {
      summaryPoints: [
        "Light-field projection brings 6-degrees-of-freedom viewing to standard cinema halls.",
        "Interactive narrative branching created with neural Gaussian splatting.",
        "First major theatrical release slated across 400 global IMAX spatial screens."
      ],
      sentiment: "Creative / Forward-Looking",
      sentimentScore: 91,
      factCheckScore: 97.4,
      keyEntities: ["Light-Field Projection", "Gaussian Splatting", "Spatial Cinema"],
      audioSummaryUrl: "#"
    }
  },
  {
    id: "art-9",
    title: "Parliament Debates landmark Digital Data Protection & Algorithmic Ethics Bill",
    slug: "parliament-debates-data-protection-algorithmic-ethics",
    category: "Politics",
    categoryBadge: "Legislation",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 10,
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Ananya Sharma",
      role: "Parliamentary Affairs Bureau",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
    },
    publishedAt: "8 hours ago",
    date: "October 5, 2026",
    timestamp: Date.now() - 480 * 60 * 1000,
    readTime: "5 min read",
    views: "22.3k",
    summary: "Lawmakers propose mandatory transparency watermarks on synthetic media and establish citizens' right to algorithmic explanation in public sector decisions.",
    content: `
      <p class="lead">A bipartisan legislative committee presented a unified statutory code requiring automated risk audits for all AI systems deployed in credit scoring, policing, and welfare eligibility verification.</p>
      <p>The proposed legislation sets punitive penalties of up to 4% of global turnover for bad-faith biometric scraping while creating regulatory sandboxes for open-source AI startups.</p>
    `,
    aiInsights: {
      summaryPoints: [
        "Mandatory public transparency registry for automated decision systems in governance.",
        "Cryptographic provenance watermarks mandated on all commercial generative media.",
        "Regulatory sandbox created for indigenous research labs and university incubators."
      ],
      sentiment: "Balanced / Regulatory",
      sentimentScore: 78,
      factCheckScore: 98.7,
      keyEntities: ["Digital Ethics Commission", "Legislative Assembly", "Algorithmic Transparency"],
      audioSummaryUrl: "#"
    }
  }
];

// Helper to get all articles sorted chronologically by timestamp (newest on top)
function getSortedNewsData() {
  const customArticles = JSON.parse(localStorage.getItem('talktotime_custom_articles') || '[]');
  const combined = [...customArticles, ...SEED_NEWS_DATA];
  // Sort descending by timestamp: Newest on top!
  return combined.sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
}

function saveCustomNewsItem(article) {
  const customArticles = JSON.parse(localStorage.getItem('talktotime_custom_articles') || '[]');
  // Unset previous hero flags if this new one is Hero
  if (article.isHero) {
    customArticles.forEach(a => a.isHero = false);
    SEED_NEWS_DATA.forEach(a => a.isHero = false);
  }
  customArticles.unshift(article);
  localStorage.setItem('talktotime_custom_articles', JSON.stringify(customArticles));
  NEWS_DATA = getSortedNewsData();
  return NEWS_DATA;
}

window.getSortedNewsData = getSortedNewsData;
window.saveCustomNewsItem = saveCustomNewsItem;

let NEWS_DATA = getSortedNewsData();

const BREAKING_TICKER = [
  "Global economic forums ratify unified AI compute standards in Geneva",
  "Tech indices rally +2.4% following room-temperature superconductor confirmation",
  "Lunar Artemis base successfully connects first continuous laser broadband link with Earth",
  "Record solar-hydrogen generation registered across western renewable parks in Gujarat",
  "International taskforce neutralizes distributed quantum-decryption syndicate"
];

const MARKET_DATA = [
  { symbol: "SENSEX", value: "84,920.45", change: "+1.12%", up: true },
  { symbol: "NIFTY 50", value: "25,870.10", change: "+0.95%", up: true },
  { symbol: "NASDAQ", value: "19,840.22", change: "+1.64%", up: true },
  { symbol: "S&P 500", value: "5,890.30", change: "+0.88%", up: true },
  { symbol: "GOLD", value: "$2,695.40", change: "-0.24%", up: false },
  { symbol: "BTC/USD", value: "$71,450.00", change: "+3.45%", up: true }
];

const CATEGORIES = [
  { id: "all", name: "All Stories" },
  { id: "India", name: "India" },
  { id: "World", name: "World" },
  { id: "Politics", name: "Politics" },
  { id: "Technology", name: "Technology" },
  { id: "Business", name: "Business" },
  { id: "Sports", name: "Sports" },
  { id: "Entertainment", name: "Entertainment" },
  { id: "Science", name: "Science" },
  { id: "AI", name: "AI" }
];
