import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About AlphaMarkAI",
  description: "Learn how AlphaMarkAI independently researches, reviews, and compares AI tools and SaaS products.",
  alternates: { canonical: "/about" },
};

const principles = [
  ["01", "Independent", "Our conclusions are driven by research and hands-on evaluation—not by vendor talking points."],
  ["02", "Practical", "We focus on real workflows, usability, value, and the details that matter after the demo ends."],
  ["03", "Curated", "We narrow a crowded software market into a considered set of tools worth your attention."],
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="site-header">
        <div className="nav-shell">
          <Link className="logo" href="/" aria-label="AlphaMarkAI home">
            <span className="logo-mark">A</span><span>alphamark<span>ai</span></span>
          </Link>
          <Link className="nav-cta" href="/">Back to home <span aria-hidden="true">→</span></Link>
        </div>
      </header>

      <section className="about-hero section-shell">
        <p className="eyebrow"><span /> ABOUT ALPHAMARKAI</p>
        <h1>Better software decisions<br /><i>start with better research.</i></h1>
        <p className="about-lead">AlphaMarkAI is an independent guide to the AI tools and SaaS products shaping modern work. We test, compare, and explain software so you can choose with clarity—not hype.</p>
      </section>

      <section className="about-story">
        <div className="section-shell about-story-grid">
          <div><p className="section-number">OUR PURPOSE</p><h2>Signal over noise.</h2></div>
          <div>
            <p>The software landscape moves quickly. New products launch every day, feature lists blur together, and marketing claims often get in the way of a useful decision.</p>
            <p>AlphaMarkAI exists to make that decision simpler. Our reviews look beyond launch-day excitement to examine how a product works, who it serves, what it costs, and whether it earns a place in your workflow.</p>
          </div>
        </div>
      </section>

      <section className="section-shell section about-values">
        <p className="section-number">HOW WE WORK</p>
        <div className="about-value-list">{principles.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="about-cta">
        <div className="section-shell"><p className="section-number">START EXPLORING</p><h2>Find software worth your time.</h2><Link className="button primary" href="/#tools">Explore AI tools <span aria-hidden="true">→</span></Link></div>
      </section>
    </main>
  );
}
