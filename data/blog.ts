export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "brain-ct-classifier-mil",
    title: "Building a Brain CT Classifier with Multiple Instance Learning",
    date: "2026-07-10",
    readingTime: "8 min read",
    tags: ["Deep Learning", "Medical Imaging", "MIL"],
    coverImage: "/images/blog/brain-ct-cover.svg",
    excerpt:
      "How I used ConvNeXt-V2 and MIL attention to classify brain CT scans from 859 real patients — covering dual-head architecture, class imbalance, and lessons from working with clinical data.",
    content: `
## Overview

For my undergraduate thesis, I built a multi-label classification system for brain CT scans. The challenge: 859 patient scans, multiple possible pathologies per scan, and no slice-level annotations — only patient-level labels.

This post walks through the key design decisions: encoder choice, Multiple Instance Learning (MIL), the dual-head architecture, and how I handled severe class imbalance.

## Why ConvNeXt-V2?

ConvNeXt-V2 Tiny offered an excellent accuracy-to-parameter trade-off for our constrained dataset. Unlike Vision Transformers, it doesn't require massive pretraining data to generalize well on fine-grained medical features.

## Multiple Instance Learning

The core challenge: we have labels at the patient level ("this patient has an epidural hemorrhage") but not at the slice level ("slice 34 contains the hemorrhage"). MIL treats each patient as a *bag* of slices (instances), and learns to make bag-level predictions by aggregating instance-level features.

\`\`\`python
class MILAttention(nn.Module):
    def __init__(self, feature_dim: int):
        super().__init__()
        self.attention = nn.Sequential(
            nn.Linear(feature_dim, 128),
            nn.Tanh(),
            nn.Linear(128, 1),
        )

    def forward(self, features):
        # features: [N_slices, feature_dim]
        scores = self.attention(features)          # [N, 1]
        weights = torch.softmax(scores, dim=0)     # [N, 1]
        aggregated = (weights * features).sum(0)   # [feature_dim]
        return aggregated, weights
\`\`\`

The attention weights tell us *which slices the model found important* — a built-in form of explainability.

## Dual-Head Architecture

Rather than flattening everything into one multi-label output, I used two specialized heads:

- **Pathology head**: predicts hemorrhage type (epidural, subdural, subarachnoid, intraparenchymal, intraventricular)
- **Location head**: predicts anatomical region (frontal, temporal, parietal, occipital, etc.)

This factored design improved performance on both tasks compared to a single unified head.

## Handling Class Imbalance

With real clinical data, some pathologies appear in &lt;5% of cases. Standard BCE loss fails catastrophically here. I used **Asymmetric Loss** (Ridnik et al., 2021):

\`\`\`python
class AsymmetricLoss(nn.Module):
    def __init__(self, gamma_neg=4, gamma_pos=0, clip=0.05):
        super().__init__()
        self.gamma_neg = gamma_neg
        self.gamma_pos = gamma_pos
        self.clip = clip

    def forward(self, logits, targets):
        # Asymmetrically down-weights easy negatives
        ...
\`\`\`

This reduced false negatives for rare pathologies by ~23%.

## Results & Lessons

- The MIL attention maps were clinically interpretable — matching radiologist annotations ~68% of the time
- Dual-head design outperformed single-head by 4.2% macro-AUC
- The biggest bottleneck was data quality, not model architecture

Working with real clinical data taught me more about the practical constraints of medical AI than any benchmark dataset could.
    `,
  },
  {
    slug: "rag-customer-support-bot",
    title: "RAG from Scratch: Building an AI Customer Support Bot",
    date: "2026-06-28",
    readingTime: "6 min read",
    tags: ["LLMs", "RAG", "FastAPI"],
    coverImage: "/images/blog/rag-cover.svg",
    excerpt:
      "A walkthrough of building a production-ready RAG pipeline with FastAPI, pgvector, sentence-transformers, and a local LLM — no cloud API costs required.",
    content: `
## The Problem with Generic Chatbots

Most customer support chatbots are either too rigid (rule-based) or too unpredictable (raw LLM). The sweet spot is **Retrieval-Augmented Generation (RAG)** — ground the LLM's responses in your actual historical data.

This post documents how I built a complete RAG pipeline using only local infrastructure.

## Architecture at a Glance

\`\`\`
User message
    │
    ▼
Sentence-Transformer embedding
    │
    ▼
pgvector similarity search (top-3 similar past cases)
    │
    ▼
Context injection into prompt
    │
    ▼
Ollama (phi model) → Response
\`\`\`

## Setting Up pgvector

pgvector is a PostgreSQL extension that adds a \`vector\` column type and similarity search operators. Setup is simple:

\`\`\`sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE support_cases (
    id SERIAL PRIMARY KEY,
    complaint TEXT NOT NULL,
    solution TEXT NOT NULL,
    embedding vector(384)
);

CREATE INDEX ON support_cases
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
\`\`\`

## Generating Embeddings

\`\`\`python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def embed(text: str) -> list[float]:
    return model.encode(text).tolist()
\`\`\`

For our use case, \`all-MiniLM-L6-v2\` (384 dimensions) gives an excellent balance of speed and semantic quality.

## The FastAPI Endpoint

\`\`\`python
@app.post("/chat")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    query_embedding = embed(request.message)

    # Retrieve top-3 similar cases
    similar_cases = db.execute(
        text("""
            SELECT complaint, solution,
                   1 - (embedding <=> :emb) AS similarity
            FROM support_cases
            ORDER BY embedding <=> :emb
            LIMIT 3
        """),
        {"emb": query_embedding}
    ).fetchall()

    context = "\\n\\n".join(
        f"Case: {c.complaint}\\nSolution: {c.solution}"
        for c in similar_cases
    )

    prompt = f"""You are a helpful support agent.
Use these past cases to answer the new complaint.

Past Cases:
{context}

New Complaint: {request.message}

Provide a clear, helpful response:"""

    response = ollama.chat(model="phi", messages=[
        {"role": "user", "content": prompt}
    ])
    return {"response": response["message"]["content"]}
\`\`\`

## Key Takeaways

- pgvector eliminates the need for a separate vector database if you already use PostgreSQL
- Local LLMs (phi via Ollama) are surprisingly capable for structured support tasks
- Prompt engineering matters more than model choice for RAG quality
    `,
  },
  {
    slug: "tfidf-faiss-recommendations",
    title: "TF-IDF + FAISS: Building a Fast Job Recommendation System",
    date: "2026-06-15",
    readingTime: "5 min read",
    tags: ["Machine Learning", "Recommendations", "NLP"],
    coverImage: "/images/blog/faiss-cover.svg",
    excerpt:
      "How I built a content-based recommendation engine for a microjobs portal using TF-IDF vectorization and Facebook's FAISS for approximate nearest-neighbor search.",
    content: `
## Why Not Just Use Cosine Similarity?

Brute-force cosine similarity is O(n·d) per query — fine for 1,000 items, painful for 100,000. FAISS (Facebook AI Similarity Search) uses approximate nearest-neighbor algorithms to achieve sub-millisecond search at scale.

## Building the TF-IDF Index

\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer
import faiss
import numpy as np

def build_job_corpus(jobs: list[dict]) -> list[str]:
    return [
        f"{j['title']} {j['description']} {' '.join(j['required_skills'])}"
        for j in jobs
    ]

corpus = build_job_corpus(jobs)
vectorizer = TfidfVectorizer(max_features=5000, stop_words="english")
tfidf_matrix = vectorizer.fit_transform(corpus).toarray().astype("float32")

# L2-normalize for cosine similarity via inner product
faiss.normalize_L2(tfidf_matrix)
index = faiss.IndexFlatIP(tfidf_matrix.shape[1])
index.add(tfidf_matrix)
\`\`\`

## Querying for Recommendations

\`\`\`python
def recommend(user_profile: str, k: int = 10) -> list[int]:
    query_vec = vectorizer.transform([user_profile]).toarray().astype("float32")
    faiss.normalize_L2(query_vec)
    scores, indices = index.search(query_vec, k)
    return indices[0].tolist()
\`\`\`

The user profile is constructed from:
- Job titles from interaction history (apply, save, view)
- Self-reported skills
- Location preferences

## Proximity Sorting

For the "sort by proximity" feature, I combined the FAISS similarity score with a geographic distance score:

\`\`\`python
combined_score = alpha * relevance_score + (1 - alpha) * proximity_score
\`\`\`

with \`alpha=0.7\` as the default (relevance-first).

## Performance Results

| Method | 10k jobs | 100k jobs |
|--------|----------|-----------|
| Brute-force cosine | 18ms | 182ms |
| FAISS IVFFlat | 1.2ms | 2.1ms |

~90x speedup at 100k scale with &lt;1% accuracy loss.
    `,
  },
  {
    slug: "langchain-writing-agent",
    title: "LangChain Agents: Building a Modular AI Writing Assistant",
    date: "2026-05-20",
    readingTime: "7 min read",
    tags: ["LLMs", "LangChain", "Agents"],
    coverImage: "/images/blog/langchain-cover.svg",
    excerpt:
      "How I used LangChain's OpenAI Functions agent with custom tools to build a context-aware writing assistant. Covers tool design, memory integration, and agent orchestration.",
    content: `
## Why an Agent Instead of a Simple Prompt?

A single prompt like "Fix this text" is ambiguous. Does the user want grammar correction, tone adjustment, or simplification? An **agent with specialized tools** can make that decision systematically — and be auditable about it.

## Defining the Tools

\`\`\`python
from langchain.tools import tool

@tool
def correct_grammar(text: str) -> str:
    """Corrects grammatical errors in the given text. Use when the user wants grammar fixed."""
    response = llm.invoke(
        f"Fix all grammatical errors in this text. Return only the corrected text:\\n\\n{text}"
    )
    return response.content

@tool
def rewrite_formally(text: str) -> str:
    """Rewrites text in a formal, professional tone. Use when the user wants formal language."""
    response = llm.invoke(
        f"Rewrite this in formal, professional English:\\n\\n{text}"
    )
    return response.content

@tool
def simplify_sentence(text: str) -> str:
    """Simplifies complex sentences for easier reading. Use when text is too complex."""
    response = llm.invoke(
        f"Simplify this text so it's easy to understand. Keep the meaning:\\n\\n{text}"
    )
    return response.content

@tool
def complete_article(partial_text: str) -> str:
    """Continues and completes an unfinished article or paragraph."""
    response = llm.invoke(
        f"Continue and complete this article naturally:\\n\\n{partial_text}"
    )
    return response.content
\`\`\`

## The Agent with Memory

\`\`\`python
from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain.memory import ConversationBufferMemory
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)
tools = [correct_grammar, rewrite_formally, simplify_sentence, complete_article]

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

agent = create_openai_functions_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, memory=memory, verbose=True)
\`\`\`

## Key Design Lessons

**Tool descriptions are everything.** The agent picks tools based on their docstrings. Vague descriptions = wrong tool selection. I rewrote tool descriptions 4 times before getting consistent behavior.

**Temperature matters per-task:**
- Grammar: \`temperature=0.1\` (deterministic, rule-based)
- Completion: \`temperature=0.7\` (creative)
- Formal rewrite: \`temperature=0.2\` (precise but not robotic)

**Memory has a cost.** Conversation history grows the context, increasing latency and cost. For long sessions, sliding window memory (keep last N exchanges) is more practical than buffering everything.

## Observations

OpenAI Functions calling is significantly more reliable than ReAct-style agents for structured tool use. When the tool boundaries are clear and the descriptions are precise, the agent rarely makes wrong tool choices.
    `,
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRecentBlogs(count: number = 4): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
