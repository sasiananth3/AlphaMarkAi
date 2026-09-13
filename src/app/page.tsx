"use client";

import { ArrowRight, Check, Menu, Minus, Search, X } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Tool = {
  name: string;
  mark: string;
  desc: string;
  category: string;
  score: string;
  pick?: boolean;
  logo?: string;
  tone: string;
};

const tools: Tool[] = [
  { name: "Claude", mark: "AI", logo: "/logos/claude.svg", tone: "logo-claude", desc: "Thoughtful AI for writing, analysis, and complex knowledge work.", category: "AI Assistants", score: "9.4", pick: true },
  { name: "Cursor", mark: "C", logo: "/logos/cursor.svg", tone: "logo-cursor", desc: "An AI-first code editor that understands your entire codebase.", category: "AI Coding", score: "9.2", pick: true },
  { name: "Perplexity", mark: "P", logo: "/logos/perplexity.svg", tone: "logo-perplexity", desc: "Research with sourced, direct answers from across the web.", category: "AI Search", score: "8.9" },
  { name: "Granola", mark: "G", tone: "logo-granola", desc: "A quieter, more useful way to take meeting notes.", category: "Productivity", score: "8.7" },
  { name: "Midjourney", mark: "M", tone: "logo-midjourney", desc: "High-quality image generation with a distinct creative edge.", category: "Design", score: "8.8" },
];
const categories = ["AI Writing", "Coding", "Design", "Marketing", "Productivity", "Sales", "Automation", "Analytics", "Customer Support", "Project Management", "Finance"];
const softwareIcons: Record<string, { src: string; tone: string }> = {
  Claude: { src: "/logos/claude.svg", tone: "logo-claude" },
  Cursor: { src: "/logos/cursor.svg", tone: "logo-cursor" },
  Perplexity: { src: "/logos/perplexity.svg", tone: "logo-perplexity" },
  Granola: { src: "/logos/granola.svg", tone: "logo-granola" },
  Midjourney: { src: "/logos/midjourney.svg", tone: "logo-midjourney" },
  "Quso AI": { src: "/logos/quso.svg", tone: "logo-quso" },
  Notion: { src: "/logos/notion.svg", tone: "logo-notion" },
  Linear: { src: "/logos/linear.svg", tone: "logo-linear" },
  ChatGPT: { src: "/logos/chatgpt.svg", tone: "logo-chatgpt" },
  ClickUp: { src: "/logos/clickup.svg", tone: "logo-clickup" },
  Jira: { src: "/logos/jira.svg", tone: "logo-jira" },
  "GitHub Copilot": { src: "/logos/github-copilot.svg", tone: "logo-github-copilot" },
};
const comparisonPairs = [
  ["Notion", "ClickUp"],
  ["Linear", "Jira"],
  ["Cursor", "GitHub Copilot"],
];

function Logo() { return <a className="logo" href="#top"><span className="logo-mark">A</span><span>alphamark<span>ai</span></span></a>; }
function Score({ value }: { value: string }) { return <span className="score"><b>{value}</b><small>/10</small></span>; }
function SoftwareMark({ name, className = "" }: { name: string; className?: string }) {
  const icon = softwareIcons[name];
  return <span className={`product-mark ${icon?.tone ?? ""} ${className}`.trim()} aria-hidden="true">{icon ? <Image src={icon.src} alt="" width={24} height={24} /> : name.slice(0, 1)}</span>;
}
function ToolMark({ tool, className = "" }: { tool: Tool; className?: string }) {
  return <SoftwareMark name={tool.name} className={className} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All tools");
  const results = useMemo(() => tools.filter((tool) => `${tool.name} ${tool.category} ${tool.desc}`.toLowerCase().includes(query.toLowerCase())), [query]);
  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);
  function subscribe(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }

  return <main id="top">
    <header className="site-header"><div className="nav-shell"><Logo/><nav className={menuOpen ? "nav-links open" : "nav-links"}>{["AI Tools","SaaS Reviews","Comparisons","Categories","Resources"].map((x,i)=><a key={x} href={["#tools","#reviews","#compare","#categories","#insights"][i]} onClick={()=>setMenuOpen(false)}>{x}</a>)}</nav><div className="nav-actions"><button className="search-trigger" onClick={()=>setSearchOpen(!searchOpen)} aria-label="Search tools" aria-expanded={searchOpen}><Search size={16}/><span>Search tools…</span><kbd>⌘ K</kbd></button><a className="nav-cta" href="#tools">Explore tools <ArrowRight size={15}/></a><button className="menu-btn" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen?<X/>:<Menu/>}</button></div></div>{searchOpen&&<div className="global-search"><Search size={20}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tools, reviews, or categories…"/><span>{results.length} results</span></div>}</header>

    <section className="hero section-shell"><div className="hero-copy"><p className="eyebrow"><span/> The modern AI & SaaS index</p><h1>Find software<br/>worth your time.</h1><p className="hero-deck">Independent reviews, intelligent comparisons, and carefully curated insights on the AI tools and SaaS products shaping modern work.</p><div className="hero-actions"><a className="button primary" href="#tools">Explore AI tools <ArrowRight size={17}/></a><a className="text-link" href="#reviews">Browse SaaS reviews <ArrowRight size={15}/></a></div><p className="updated"><span/> Independently researched · Updated weekly</p></div><div className="discovery-panel"><div className="panel-top"><div><span className="panel-kicker">ALPHAMARKAI / DISCOVER</span><h2>Find your next essential tool.</h2></div><span className="edition">ISSUE 09.26</span></div><label className="tool-search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="What are you looking for?"/><kbd>⌘ K</kbd></label><div className="filter-row">{["All tools","AI writing","Coding","Productivity"].map(x=><button onClick={()=>setActiveCategory(x)} className={activeCategory===x?"active":""} key={x}>{x}</button>)}</div><div className="panel-list">{(query?results:tools.slice(0,3)).slice(0,3).map(tool=><a href="#tools" className="panel-tool" key={tool.name}><ToolMark tool={tool}/><span><b>{tool.name}</b><small>{tool.category}</small></span>{tool.pick&&<em>EDITOR’S PICK</em>}<Score value={tool.score}/></a>)}{query&&results.length===0&&<p className="no-results">No exact match. Try “coding” or “productivity”.</p>}</div><div className="panel-verdict"><span>THIS WEEK’S VERDICT</span><p><b>Claude remains our choice for deep work.</b> Its writing quality and measured reasoning set the standard.</p><ArrowRight size={18}/></div></div></section>

    <section className="trust-band"><div className="section-shell trust-inner"><div className="trust-heading"><span>THE SIGNAL, NOT THE NOISE</span><h2>Trusted research for the software decisions that matter.</h2></div><div className="stats"><div><b>Focused</b><span>Research, not volume</span></div><div><b>Clear</b><span>Pros and trade-offs</span></div><div><b>Weekly</b><span>Software discoveries</span></div></div></div><div className="category-ticker">{["AI WRITING","AI CODING","PRODUCTIVITY","DESIGN","MARKETING","AUTOMATION","ANALYTICS","CUSTOMER SUPPORT"].map(x=><span key={x}>{x}</span>)}</div></section>

    <section className="section-shell section" id="tools"><div className="section-head"><div><p className="section-number">01 / CURATED TOOLS</p><h2>The tools getting<br/><i>our attention.</i></h2></div><div><p>A sharper look at the AI products worth knowing about—tested, compared, and put into context.</p><a className="text-link" href="#categories">View all AI tools <ArrowRight size={15}/></a></div></div><div className="tools-grid"><article className="feature-tool"><div className="feature-art"><Image className="feature-product-logo" src="/logos/cursor.svg" alt="Cursor" width={72} height={72}/><div className="code-lines"><span/><span/><span/><span/></div><p>BUILD<br/>AT THE SPEED<br/>OF THOUGHT</p></div><div className="tool-content"><div className="meta"><span>AI CODING</span><span>EDITOR’S PICK</span></div><h3>Cursor</h3><p>The code editor that made AI-assisted development feel less like a feature—and more like a new way of working.</p><div className="rating-line"><Score value="9.2"/><span>Exceptional</span></div><a href="#reviews">Read the full review <ArrowRight size={15}/></a></div></article><div className="tool-stack">{tools.filter(t=>t.name!=="Cursor").slice(0,3).map(tool=><article className="tool-row" key={tool.name}><ToolMark tool={tool}/><div><span className="tool-category">{tool.category}</span><h3>{tool.name}</h3><p>{tool.desc}</p><a href="#reviews">Read review <ArrowRight size={14}/></a></div><Score value={tool.score}/></article>)}</div></div></section>

    <section className="reviews section" id="reviews"><div className="section-shell"><div className="section-head light"><div><p className="section-number">02 / DEEP REVIEWS</p><h2>Software,<br/><i>properly reviewed.</i></h2></div><p>No endless feature lists. We look at what actually matters—usability, pricing, performance, flexibility, and whether a product earns a place in your stack.</p></div><div className="review-table"><div className="review-head"><span>LATEST REVIEW</span><span>THE VERDICT</span><span>SCORE</span></div>{[["Q","AI VIDEO · FREE / FROM $29","Quso AI","A practical all-in-one workflow for turning long recordings into social-ready clips.","Free plan to evaluate","AI clips need review","NEW","2026 REVIEW","/reviews/quso-ai"],["N","PRODUCTIVITY · $10–18/MO","Notion","Still the most flexible workspace for teams that value adaptability over rigid structure.","Remarkably flexible","Setup takes time","9.0","EXCELLENT","#"],["L","PROJECT MANAGEMENT · $0–14/MO","Linear","A focused issue tracker that proves business software can be fast, calm, and genuinely enjoyable.","Best-in-class speed","Opinionated workflow","9.3","EXCEPTIONAL","#"]].map(r=><article className="review-item" key={r[2]}><div className="review-name"><SoftwareMark name={r[2]} className="review-product-logo"/><div><small>{r[1]}</small><h3>{r[2]}</h3></div></div><div className="verdict"><p>{r[3]}</p><div className="pros-cons"><span><Check size={13}/> {r[4]}</span><span><Minus size={13}/> {r[5]}</span></div><a href={r[8]}>Read full review <ArrowRight size={14}/></a></div><div className="big-score">{r[6]}{r[6]!=="NEW"&&<small>/10</small>}<span>{r[7]}</span></div></article>)}</div></div></section>

    <section className="section-shell section" id="compare"><div className="compare-intro"><p className="section-number">03 / HEAD TO HEAD</p><h2>Before you choose, <i>compare.</i></h2><p>Side-by-side research for decisions too important to leave to a feature checklist.</p></div><div className="comparison"><div className="comparison-title"><span>AI ASSISTANTS / 2026</span><h3><b><SoftwareMark name="ChatGPT" className="comparison-product-logo"/>ChatGPT</b><i>versus</i><b><SoftwareMark name="Claude" className="comparison-product-logo"/>Claude</b></h3><p>Two exceptional assistants. One clearer choice for your work.</p></div><div className="comparison-grid"><div className="criteria"><span>OVERALL SCORE</span><span>BEST FOR</span><span>STARTING PRICE</span><span>EASE OF USE</span><span>WRITING QUALITY</span></div><div><Score value="9.2"/><span>General purpose</span><span>$20 / month</span><span className="dots">●●●●○</span><span className="dots">●●●●○</span></div><div className="winner"><Score value="9.4"/><span>Knowledge work</span><span>$20 / month</span><span className="dots">●●●●●</span><span className="dots">●●●●●</span></div></div><div className="recommendation"><span>ALPHAMARKAI RECOMMENDS</span><p><b>Choose Claude for thoughtful, long-form work.</b> Choose ChatGPT for its wider toolset and everyday versatility.</p><a href="#">Full comparison <ArrowRight size={15}/></a></div></div><div className="comparison-links">{comparisonPairs.map(([left,right],i)=><a href="#" key={left}><span>0{i+2}</span><span className="comparison-pair"><SoftwareMark name={left} className="pair-product-logo"/><b>{left}</b><em>vs</em><SoftwareMark name={right} className="pair-product-logo"/><b>{right}</b></span><ArrowRight/></a>)}</div></section>

    <section className="insights section" id="insights"><div className="section-shell"><div className="section-head"><div><p className="section-number">04 / PERSPECTIVE</p><h2>Ideas behind<br/><i>the tools.</i></h2></div><a href="#" className="text-link">All insights <ArrowRight size={15}/></a></div><div className="editorial-grid"><article className="lead-story"><div className="story-art story-one"><span>THE<br/>PAID<br/>LIST</span><small>01—26</small></div><small>FIELD GUIDE · 12 MIN READ</small><h3>The AI tools actually worth paying for in 2026</h3><p>We tested 42 subscriptions. These are the nine that stayed in our workflow.</p></article><div className="side-stories"><article><div className="story-art story-two"><span>SUB<br/>SCRIPT<br/>IONS</span></div><small>OPINION · 6 MIN READ</small><h3>What to look for before adding another SaaS subscription</h3></article><article><div className="story-art story-three"><span>CODE<br/>/NEXT</span></div><small>ANALYSIS · 9 MIN READ</small><h3>The new generation of AI coding tools</h3></article></div></div></div></section>

    <section className="section-shell section categories" id="categories"><div className="section-head"><div><p className="section-number">05 / BROWSE</p><h2>Explore by<br/><i>what you need.</i></h2></div><p>Start with the job, not the software. Find considered recommendations for every part of your stack.</p></div><div className="category-list">{categories.map((cat,i)=><a key={cat} href="#tools"><span>{String(i+1).padStart(2,"0")}</span><b>{cat}</b><span className="cat-count">{12+i*7} TOOLS</span><ArrowRight/></a>)}</div></section>

    <section className="principles section"><div className="section-shell principles-grid"><div><p className="section-number">WHY ALPHAMARKAI</p><h2>Less noise.<br/><i>Better software decisions.</i></h2></div><div className="principle-list">{[["01","Independent","Clear opinions without turning every product into a sales pitch."],["02","Practical","Reviews focused on how software performs in real workflows."],["03","Curated","We filter the overwhelming software landscape so you don’t have to."]].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>

    <section className="newsletter"><div className="section-shell newsletter-inner"><div><p className="eyebrow"><span/> THE WEEKLY BRIEFING</p><h2>The useful side<br/><i>of AI.</i></h2></div><div>{submitted?<div className="success"><Check/> You’re on the list. See you next week.</div>:<><p>A concise weekly briefing of the tools, products, and software trends worth your attention.</p><form onSubmit={subscribe}><label><span className="sr-only">Your email address</span><input required type="email" placeholder="Your email address"/><button>Join Alphamarkai <ArrowRight size={16}/></button></label></form><small>No hype. No daily noise. Unsubscribe anytime.</small></>}</div></div></section>

    <footer><div className="section-shell"><div className="footer-top"><div><Logo/><p>Independent intelligence for<br/>the modern software stack.</p></div>{[["Explore","AI Tools","SaaS Reviews","Comparisons","Categories","New Tools"],["Resources","Guides","Insights","Newsletter","Methodology"],["Company","About","Contact","Editorial Policy","Privacy","Terms"]].map(([head,...links])=><div className="footer-col" key={head}><b>{head}</b>{links.map(link=>link === "About" ? <Link href="/about" key={link}>{link}</Link> : <a href="#" key={link}>{link}</a>)}</div>)}</div><div className="footer-bottom"><span>© 2026 ALPHAMARKAI. INDEPENDENT BY DESIGN.</span><div><a href="#">X / TWITTER</a><a href="#">LINKEDIN</a><a href="#">RSS</a></div><span>MADE FOR BETTER DECISIONS</span></div></div></footer>
  </main>;
}
