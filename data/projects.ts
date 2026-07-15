export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  overview: string;
  problemStatement: string;
  architecture: string[];
  challenges: string[];
  solutions: string[];
  lessonsLearned: string[];
  featured: boolean;
  screenshots: string[];
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
  tags: string[];
  coverImage: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "brain-ct-classifier",
    title: "Brain CT Scan Classifier",
    description:
      "Multi-label classification system for brain CT scans using ConvNeXt-V2 and Multiple Instance Learning with a dual-head architecture.",
    overview:
      "A deep learning system for classifying brain CT scans into multiple pathology and anatomical location categories. Built as an undergraduate thesis project using real clinical data from 859 patients. The system uses Multiple Instance Learning to identify which slices in a CT volume are diagnostically relevant, and a dual-head architecture to simultaneously predict pathology type and anatomical location.",
    problemStatement:
      "Manual reading of brain CT scans is time-consuming and error-prone. Radiologists must review dozens of slices per scan to detect subtle pathologies. Automated classification can assist radiologists in faster, more consistent diagnosis — particularly in resource-limited settings.",
    architecture: [
      "ConvNeXt-V2 Tiny as the image encoder for feature extraction from CT slices",
      "Multiple Instance Learning (MIL) with attention mechanism to identify diagnostically relevant slices",
      "Dual-head architecture: one head for pathology classification, one for anatomical location",
      "Trained on 859 real patient CT scans with multi-label annotations",
    ],
    challenges: [
      "Limited dataset size (859 patients) for a complex multi-label task",
      "Severe class imbalance across pathology categories",
      "Multi-label nature of diagnoses — a single scan can have multiple findings",
      "High intra-class variability in CT appearance",
    ],
    solutions: [
      "Advanced loss functions (asymmetric loss) to handle class imbalance",
      "MIL attention mechanism to focus learning on relevant slices without slice-level labels",
      "Taxonomy-based label mapping to unify disparate clinical findings into structured categories",
      "Data augmentation tailored for medical imaging",
    ],
    lessonsLearned: [
      "MIL is highly effective when only bag-level (patient-level) labels are available",
      "Encoder pretraining quality has an outsized impact on downstream performance",
      "Clinical domain knowledge is essential for meaningful label design",
    ],
    featured: true,
    screenshots: [
      "/images/projects/brain-ct/placeholder-1.svg",
      "/images/projects/brain-ct/placeholder-2.svg",
      "/images/projects/brain-ct/placeholder-3.svg",
    ],
    githubUrl: "",
    liveUrl: "",
    techStack: ["Python", "PyTorch", "ConvNeXt-V2", "MIL", "NumPy", "scikit-learn"],
    tags: ["AI", "Computer Vision", "Research"],
    coverImage: "/images/projects/brain-ct/placeholder-1.svg",
  },
  {
    id: 2,
    slug: "microjobs-portal",
    title: "Microjobs Portal",
    description:
      "A local part-time job board with an AI-powered recommendation system using TF-IDF and FAISS for fast similarity search.",
    overview:
      "A full-stack job portal targeting local micro and part-time jobs, with an intelligent recommendation engine that matches users with relevant job listings based on their skills and interaction history.",
    problemStatement:
      "Existing job platforms are optimized for full-time, large-company listings. Local micro-job seekers struggle to find relevant opportunities efficiently. A tailored portal with smart recommendations can dramatically improve match quality and time-to-hire.",
    architecture: [
      "Frontend: Next.js with Tailwind CSS and Shadcn UI components",
      "TF-IDF vectorization for job description representation",
      "FAISS index for approximate nearest-neighbor similarity search",
      "Recommendation engine combining content-based and interaction-based signals",
    ],
    challenges: [
      "Cold start problem for new users with no interaction history",
      "Efficiently searching across a growing job listing database",
      "Balancing relevance vs. recency in recommendations",
    ],
    solutions: [
      "Content-based fallback using TF-IDF cosine similarity for cold-start users",
      "FAISS for sub-millisecond similarity search at scale",
      "Configurable sort: relevance score or geographic proximity",
    ],
    lessonsLearned: [
      "FAISS dramatically outperforms brute-force cosine similarity at scale",
      "Shadcn UI accelerates building accessible, polished components",
      "Good data preprocessing is 80% of recommendation quality",
    ],
    featured: true,
    screenshots: [
      "/images/projects/microjobs/placeholder-1.svg",
      "/images/projects/microjobs/placeholder-2.svg",
      "/images/projects/microjobs/placeholder-3.svg",
    ],
    githubUrl: "",
    liveUrl: "",
    techStack: ["Next.js", "Tailwind CSS", "Shadcn UI", "Python", "TF-IDF", "FAISS"],
    tags: ["Full Stack", "AI"],
    coverImage: "/images/projects/microjobs/placeholder-1.svg",
  },
  {
    id: 3,
    slug: "ai-customer-support-chatbot",
    title: "AI Customer Support Chatbot",
    description:
      "RAG-based chatbot that resolves customer complaints by retrieving similar past cases and generating responses with a local LLM.",
    overview:
      "A customer support chatbot powered by Retrieval-Augmented Generation (RAG). The system embeds historical complaint-solution pairs into a vector database and retrieves the most similar past cases to inform LLM-generated responses — all running locally without cloud API costs.",
    problemStatement:
      "Traditional rule-based chatbots fail to handle the natural language variability of real customer complaints. Large cloud LLMs are expensive and raise privacy concerns for sensitive support data. A local RAG pipeline offers the best of both worlds.",
    architecture: [
      "FastAPI backend for REST API endpoints",
      "PostgreSQL with pgvector extension for vector similarity search",
      "Sentence-transformers for generating high-quality text embeddings",
      "Ollama running the 'phi' model locally for response generation",
      "RAG pipeline: embed query → retrieve top-k similar past issues → generate response",
    ],
    challenges: [
      "Running a capable LLM locally with acceptable latency",
      "Storing and querying vector embeddings efficiently in PostgreSQL",
      "Designing prompts that ground the LLM to retrieved context",
    ],
    solutions: [
      "Used Ollama with the phi model — fast and lightweight for local inference",
      "pgvector enables native vector search without a separate vector database",
      "Carefully engineered system prompts to prevent hallucination",
    ],
    lessonsLearned: [
      "RAG is highly effective for domain-specific, knowledge-grounded chatbots",
      "pgvector is a great choice when you already have PostgreSQL in your stack",
      "Local LLMs like phi are surprisingly capable for structured support tasks",
    ],
    featured: true,
    screenshots: [
      "/images/projects/chatbot/placeholder-1.svg",
      "/images/projects/chatbot/placeholder-2.svg",
      "/images/projects/chatbot/placeholder-3.svg",
    ],
    githubUrl: "",
    liveUrl: "",
    techStack: ["FastAPI", "PostgreSQL", "pgvector", "Ollama", "Sentence-Transformers", "Python"],
    tags: ["AI", "LLMs", "Full Stack"],
    coverImage: "/images/projects/chatbot/placeholder-1.svg",
  },
  {
    id: 4,
    slug: "snake-maramari",
    title: "Snake Maramari — Multi-Snake AI Battle",
    description:
      "A competitive snake game in Python and Pygame where up to 4 AI snakes with different algorithms fight for survival and steal scores.",
    overview:
      "A competitive multi-agent snake game where autonomous AI snakes battle on the same board. Each snake runs a different algorithmic brain, and the game ends when only one snake remains. The score-stealing mechanic creates intense competitive dynamics.",
    problemStatement:
      "Classic snake games are single-player and deterministic. A multi-agent setting where different AI strategies compete reveals the strengths and weaknesses of each algorithm in a dynamic, adversarial environment.",
    architecture: [
      "Pygame for game loop, rendering, and event handling",
      "A* pathfinding for one AI agent (optimal path to food)",
      "Minimax algorithm for another agent (adversarial strategy)",
      "Greedy algorithm for another agent (myopic food-seeking)",
      "Collision detection and score-stealing mechanics",
    ],
    challenges: [
      "Handling real-time pathfinding for multiple agents simultaneously",
      "Balancing algorithm complexity vs. frame rate",
      "Designing fair starting conditions for agents with different strategies",
    ],
    solutions: [
      "Optimized A* with early termination for real-time performance",
      "Depth-limited Minimax to keep computation per frame bounded",
      "Randomized starting positions and food spawns for fairness",
    ],
    lessonsLearned: [
      "A* dominates in open boards; Minimax excels in tight, adversarial spaces",
      "Game state representation design is critical for AI performance",
      "Multi-agent systems expose emergent behaviors not visible in single-agent settings",
    ],
    featured: true,
    screenshots: [
      "/images/projects/snake/placeholder-1.svg",
      "/images/projects/snake/placeholder-2.svg",
      "/images/projects/snake/placeholder-3.svg",
    ],
    githubUrl: "",
    liveUrl: "",
    techStack: ["Python", "Pygame", "A*", "Minimax", "Greedy"],
    tags: ["AI", "Research"],
    coverImage: "/images/projects/snake/placeholder-1.svg",
  },
  {
    id: 5,
    slug: "ai-writing-agent",
    title: "AI Writing Agent",
    description:
      "A modular writing assistant powered by LangChain and GPT-4o-mini with specialized tools for grammar, style, simplification, and content completion.",
    overview:
      "A smart writing assistant built with LangChain's agent framework, offering a suite of specialized writing tools. The OpenAI Functions agent intelligently selects the right tool for each user request, while conversation memory ensures contextually aware suggestions.",
    problemStatement:
      "Generic LLM chat interfaces lack the structure needed for reliable writing assistance. A tool-based agent approach enables precise, auditable actions (grammar fix, formal rewrite, etc.) rather than unpredictable open-ended generation.",
    architecture: [
      "LangChain OpenAI Functions agent as the orchestration layer",
      "Grammar correction tool for fixing language errors",
      "Formal rewriting tool for professional tone conversion",
      "Sentence simplification tool for complex text",
      "Article completion tool for continuing partial content",
      "Conversation memory for multi-turn context",
    ],
    challenges: [
      "Ensuring the agent selects the right tool consistently",
      "Maintaining coherent context across multi-turn conversations",
      "Preventing over-generation that drifts from user intent",
    ],
    solutions: [
      "Carefully designed tool descriptions to guide agent tool selection",
      "ConversationBufferMemory for persistent context within a session",
      "Temperature tuning per tool (lower for grammar, higher for completion)",
    ],
    lessonsLearned: [
      "Tool descriptions are the most impactful lever for agent reliability",
      "OpenAI Functions calling is more reliable than ReAct-style agents for structured tasks",
      "Memory management is critical — long contexts degrade performance",
    ],
    featured: false,
    screenshots: [
      "/images/projects/writing-agent/placeholder-1.svg",
      "/images/projects/writing-agent/placeholder-2.svg",
      "/images/projects/writing-agent/placeholder-3.svg",
    ],
    githubUrl: "",
    liveUrl: "",
    techStack: ["Python", "LangChain", "GPT-4o-mini", "OpenAI Functions"],
    tags: ["AI", "LLMs"],
    coverImage: "/images/projects/writing-agent/placeholder-1.svg",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
