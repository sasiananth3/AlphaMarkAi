import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Captions,
  Check,
  Clock3,
  LayoutTemplate,
  Minus,
  Scissors,
  Share2,
  Sparkles,
} from "lucide-react";
import AffiliateLink from "@/app/components/AffiliateLink";
import styles from "./page.module.css";

const siteUrl = "https://alphamarkai.vercel.app";
const pageUrl = `${siteUrl}/reviews/quso-ai`;
const affiliateUrl =
  process.env.NEXT_PUBLIC_QUSO_AFFILIATE_URL ?? "https://quso.ai?via=w3mpxs";

const faqs = [
  {
    question: "Is Quso AI free?",
    answer:
      "Yes. Quso currently advertises a free plan with 75 monthly credits, 720p watermarked exports, and no credit card required. Plan limits can change, so confirm them on the official pricing page before choosing.",
  },
  {
    question: "What happened to Vidyo.ai?",
    answer:
      "Vidyo.ai was renamed to Quso AI. The product has expanded from AI clipping into a broader content repurposing, editing, scheduling, and analytics suite.",
  },
  {
    question: "Can Quso AI create YouTube Shorts?",
    answer:
      "Yes. It can find moments in a longer video, reframe them vertically, add captions, and prepare clips for YouTube Shorts and other short-form platforms.",
  },
  {
    question: "Does Quso AI add captions automatically?",
    answer:
      "Yes. Automatic animated captions and multilingual subtitles are part of its video repurposing workflow.",
  },
  {
    question: "Who is Quso AI best for?",
    answer:
      "It is best suited to creators, podcasters, marketers, agencies, and small teams that regularly turn long videos into multiple social posts.",
  },
  {
    question: "Is Quso AI better than manual editing?",
    answer:
      "It can save time on repetitive work such as finding clips, reframing, captioning, and scheduling. Manual editing still offers more precise creative control for highly polished or complex videos.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Quso AI Review 2026: Features, Pricing, Pros & Cons",
    description:
      "An independent, research-based review of Quso AI for video clipping, content repurposing, captions, and social scheduling.",
    datePublished: "2026-09-13",
    dateModified: "2026-09-13",
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: "AlphaMarkAI", url: siteUrl },
    publisher: { "@type": "Organization", name: "AlphaMarkAI", url: siteUrl },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Quso AI",
    alternateName: "Vidyo.ai",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: "https://quso.ai/",
    description:
      "An AI content repurposing platform for turning long videos into captioned short-form clips and scheduling social content.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Reviews", item: `${siteUrl}/#reviews` },
      { "@type": "ListItem", position: 3, name: "Quso AI Review", item: pageUrl },
    ],
  },
];

export const metadata: Metadata = {
  title: "Quso AI Review 2026: Features, Pricing, Pros & Cons",
  description:
    "Is Quso AI worth using in 2026? Explore its AI video clipping, captions, social scheduling, free plan, pricing, advantages, drawbacks, and alternatives.",
  alternates: { canonical: "/reviews/quso-ai" },
  keywords: [
    "Quso AI review",
    "Quso AI pricing",
    "Quso AI free plan",
    "Vidyo AI",
    "AI video clipping tool",
    "turn long videos into shorts",
  ],
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Quso AI Review 2026: Is It Worth Using?",
    description:
      "A practical look at Quso AI features, pricing, free plan, pros, cons, and the workflows it suits best.",
    siteName: "AlphaMarkAI",
    publishedTime: "2026-09-13",
    modifiedTime: "2026-09-13",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quso AI Review 2026: Is It Worth Using?",
    description:
      "Features, pricing, free plan, pros, cons, and a clear AlphaMarkAI verdict.",
  },
};

function Logo() {
  return (
    <Link className={styles.logo} href="/" aria-label="AlphaMarkAI home">
      <span className={styles.logoMark}>A</span>
      <span>
        alphamark<span>ai</span>
      </span>
    </Link>
  );
}

function Cta({ placement, inverse = false }: { placement: string; inverse?: boolean }) {
  return (
    <AffiliateLink
      className={`${styles.cta} ${inverse ? styles.ctaInverse : ""}`}
      href={affiliateUrl}
      placement={placement}
    >
      Try Quso AI free <ArrowRight size={17} />
    </AffiliateLink>
  );
}

export default function QusoAiReview() {
  return (
    <main className={styles.page}>
      {structuredData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}

      <div className={styles.disclosure}>
        <div className={styles.shell}>
          <b>Affiliate disclosure:</b> AlphaMarkAI may earn a commission if you
          purchase through links on this page, at no extra cost to you.
        </div>
      </div>

      <header className={styles.header}>
        <div className={`${styles.shell} ${styles.nav}`}>
          <Logo />
          <nav aria-label="Review navigation">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#verdict">Verdict</a>
            <a href="#faq">FAQ</a>
          </nav>
          <Cta placement="header" />
        </div>
      </header>

      <section className={`${styles.shell} ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link><span>/</span><Link href="/#reviews">Reviews</Link><span>/</span><b>Quso AI</b>
          </div>
          <p className={styles.eyebrow}><span /> ALPHAMARKAI / REVIEW</p>
          <h1>Quso AI review <i>2026</i></h1>
          <p className={styles.deck}>
            Can one tool turn long videos into useful short-form content and
            handle the publishing work around them? Here is the practical case
            for Quso AI—and where manual control still matters.
          </p>
          <div className={styles.heroActions}>
            <Cta placement="hero" />
            <a className={styles.textLink} href="#verdict">
              Read our verdict <ArrowRight size={15} />
            </a>
          </div>
          <div className={styles.byline}>
            <span>RESEARCHED BY ALPHAMARKAI</span>
            <span>UPDATED SEPTEMBER 13, 2026</span>
            <span>10 MIN READ</span>
          </div>
        </div>

        <aside className={styles.verdictCard} aria-label="Quso AI quick verdict">
          <div className={styles.cardTop}>
            <span>QUICK VERDICT</span>
            <b>Worth a look</b>
          </div>
          <div className={styles.productVisual}>
            <span className={styles.qMark}>Q</span>
            <div className={styles.clipStack}>
              <span>LONG VIDEO</span>
              <ArrowRight size={18} />
              <b>SHORT CLIPS</b>
            </div>
          </div>
          <dl>
            <div><dt>Best for</dt><dd>Creators & marketers</dd></div>
            <div><dt>Free plan</dt><dd>Yes</dd></div>
            <div><dt>Paid plans</dt><dd>From $29/mo*</dd></div>
            <div><dt>Core strength</dt><dd>Repurposing workflow</dd></div>
          </dl>
          <p>*Current advertised monthly starting price. Annual billing may be lower.</p>
        </aside>
      </section>

      <nav className={styles.toc} aria-label="Table of contents">
        <div className={styles.shell}>
          <span>IN THIS REVIEW</span>
          <a href="#overview">Overview</a>
          <a href="#workflow">Workflow</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#pros-cons">Pros & cons</a>
          <a href="#faq">FAQ</a>
        </div>
      </nav>

      <section className={`${styles.shell} ${styles.section}`} id="overview">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionNumber}>01 / THE SHORT VERSION</p>
          <h2>What is <i>Quso AI?</i></h2>
        </div>
        <div className={styles.twoColumnCopy}>
          <p className={styles.lead}>
            Quso AI—formerly Vidyo.ai—is a browser-based content repurposing
            suite built around a simple idea: one long video should produce more
            than one piece of content.
          </p>
          <div>
            <p>
              Upload a video or import a link, and Quso identifies candidate
              moments, reframes them for vertical viewing, adds captions, and
              prepares them for social publishing. Its wider toolkit includes a
              text-based editor, brand controls, scheduling, content planning,
              and analytics.
            </p>
            <p>
              The strongest reason to consider it is workflow consolidation.
              The trade-off is familiar to most AI editors: automated clip
              choices can accelerate the first draft, but a human still needs to
              check context, pacing, captions, and brand fit before publishing.
            </p>
          </div>
        </div>
        <div className={styles.researchNote}>
          <b>Our review standard</b>
          <p>
            This is a research-based editorial assessment using current public
            product information. We do not claim a hands-on result we have not
            independently reproduced. Pricing and limits were checked on
            September 13, 2026.
          </p>
        </div>
      </section>

      <section className={styles.darkSection} id="workflow">
        <div className={`${styles.shell} ${styles.section}`}>
          <div className={styles.sectionIntroLight}>
            <p className={styles.sectionNumber}>02 / HOW IT WORKS</p>
            <h2>From one recording<br />to a week of <i>content.</i></h2>
          </div>
          <div className={styles.workflow}>
            {[
              ["01", "Import", "Upload a file or bring in a video link from a supported source."],
              ["02", "Find moments", "AI scans the recording and suggests sections that can stand alone."],
              ["03", "Refine", "Check the crop, edit the transcript, choose captions, and apply your brand."],
              ["04", "Publish", "Export the finished clips or schedule approved posts from the same workflow."],
            ].map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.shell} ${styles.section}`} id="features">
        <div className={styles.splitHeading}>
          <div>
            <p className={styles.sectionNumber}>03 / KEY FEATURES</p>
            <h2>More than an<br /><i>AI clipper.</i></h2>
          </div>
          <p>
            Quso is most compelling when these tools are used as one connected
            workflow, rather than judged as isolated features.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {[
            [Scissors, "AI clip discovery", "Surfaces candidate moments from long recordings so editors can start with a shortlist."],
            [LayoutTemplate, "Auto reframing", "Adapts horizontal footage for vertical short-form layouts and keeps the subject in view."],
            [Captions, "Captions & subtitles", "Creates animated captions and multilingual subtitles that can be reviewed before export."],
            [Sparkles, "Text-based editing", "Lets you edit through the transcript, remove filler words, and refine the generated cut."],
            [CalendarDays, "Social scheduling", "Plans and schedules approved content across major social platforms from one calendar."],
            [Share2, "Brand & analytics", "Applies reusable visual settings and brings publishing performance into the same workspace."],
          ].map(([Icon, title, body], index) => {
            const FeatureIcon = Icon as typeof Scissors;
            return (
              <article key={title as string}>
                <span className={styles.featureIndex}>0{index + 1}</span>
                <FeatureIcon size={24} strokeWidth={1.5} />
                <h3>{title as string}</h3>
                <p>{body as string}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.pricingSection} id="pricing">
        <div className={`${styles.shell} ${styles.section}`}>
          <div className={styles.splitHeading}>
            <div>
              <p className={styles.sectionNumber}>04 / PRICING</p>
              <h2>Start free.<br /><i>Upgrade for output.</i></h2>
            </div>
            <p>
              Prices and limits change. Use this as a quick orientation and
              confirm the final plan details on Quso before subscribing.
            </p>
          </div>
          <div className={styles.pricingGrid}>
            <article>
              <span>FREE</span>
              <h3>$0</h3>
              <p>Best for exploring the workflow before committing.</p>
              <ul>
                <li><Check size={15} /> 75 monthly credits advertised</li>
                <li><Check size={15} /> 720p exports</li>
                <li><Check size={15} /> No credit card required</li>
                <li><Minus size={15} /> Quso watermark</li>
              </ul>
            </article>
            <article className={styles.featuredPlan}>
              <span>PAID PLANS</span>
              <h3>From $29<small>/mo</small></h3>
              <p>Best for repeat publishing and higher-quality exports.</p>
              <ul>
                <li><Check size={15} /> 1080p exports advertised</li>
                <li><Check size={15} /> No Quso watermark</li>
                <li><Check size={15} /> More processing credits</li>
                <li><Check size={15} /> Wider scheduling workflow</li>
              </ul>
              <Cta placement="pricing" inverse />
            </article>
            <aside>
              <Clock3 size={25} strokeWidth={1.5} />
              <h3>Annual option</h3>
              <p>
                Quso currently advertises paid access from $19 per month when
                billed yearly. Compare the full-year cost—not only the displayed
                monthly equivalent.
              </p>
              <b>PRICE CHECKED: SEP 13, 2026</b>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${styles.shell} ${styles.section}`} id="pros-cons">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionNumber}>05 / TRADE-OFFS</p>
          <h2>The good—and the<br /><i>important limits.</i></h2>
        </div>
        <div className={styles.prosCons}>
          <article>
            <span>WHAT WE LIKE</span>
            {[
              "A free route to evaluate the core workflow",
              "Clipping, captions, editing, and scheduling in one product",
              "Useful fit for repeatable podcast and creator workflows",
              "Human review remains possible before anything is published",
            ].map((item) => <p key={item}><Check size={17} />{item}</p>)}
          </article>
          <article>
            <span>WHAT TO CONSIDER</span>
            {[
              "Free exports carry a watermark and lower resolution",
              "Credit limits matter for long or frequent uploads",
              "AI-selected moments still need editorial judgment",
              "Specialist editors offer more detailed creative control",
            ].map((item) => <p key={item}><Minus size={17} />{item}</p>)}
          </article>
        </div>
      </section>

      <section className={styles.comparisonSection}>
        <div className={`${styles.shell} ${styles.section}`}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionNumber}>06 / QUSO VS MANUAL EDITING</p>
            <h2>Speed or<br /><i>fine control?</i></h2>
          </div>
          <div className={styles.comparisonTable} role="table" aria-label="Quso AI compared with manual editing">
            <div className={styles.tableHead} role="row"><span>WORKFLOW</span><b>MANUAL EDITING</b><b>QUSO AI</b></div>
            {[
              ["Finding clip moments", "Watch and select", "AI-assisted shortlist"],
              ["Captions", "Create or import", "Generated automatically"],
              ["Vertical reframing", "Adjust shot by shot", "Automated starting point"],
              ["Brand consistency", "Build templates", "Reusable brand controls"],
              ["Creative control", "Highest", "Faster, more guided"],
              ["Publishing", "Separate workflow", "Scheduling included"],
            ].map(([label, manual, quso]) => (
              <div role="row" key={label}><span>{label}</span><span>{manual}</span><span>{quso}</span></div>
            ))}
          </div>
          <p className={styles.tableNote}>
            The practical answer is often hybrid: let Quso create the first cut,
            then apply human judgment before the final export.
          </p>
        </div>
      </section>

      <section className={`${styles.shell} ${styles.section}`} id="verdict">
        <div className={styles.finalVerdict}>
          <div>
            <p className={styles.sectionNumber}>07 / ALPHAMARKAI VERDICT</p>
            <h2>A practical shortlist for <i>repeat creators.</i></h2>
          </div>
          <div>
            <p className={styles.verdictLead}>
              Quso AI makes the strongest case for people who already produce
              long-form video and need a repeatable way to multiply its value.
            </p>
            <p>
              Podcasters, educators, marketers, and small teams should find its
              connected workflow more useful than someone making occasional,
              highly polished edits. Start with the free plan, run one real
              recording through the complete workflow, and judge the result on
              clip relevance, caption accuracy, editing time, and publish-ready
              quality—not only on the number of clips generated.
            </p>
            <Cta placement="final_verdict" />
            <small>No credit card is currently required for the advertised free plan.</small>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={`${styles.shell} ${styles.section}`}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionNumber}>08 / FAQ</p>
            <h2>Questions,<br /><i>answered.</i></h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary><span>0{index + 1}</span>{faq.question}<b>+</b></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.methodology}>
        <div className={styles.shell}>
          <b>EDITORIAL NOTE</b>
          <p>
            AlphaMarkAI writes independent software research. Affiliate
            relationships do not determine our conclusions. Product features,
            pricing, and limits can change; verify purchase details on the
            provider’s website.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <div className={styles.footerTop}>
            <div><Logo /><p>Independent intelligence for the modern software stack.</p></div>
            <div><b>EXPLORE</b><Link href="/#tools">AI Tools</Link><Link href="/#reviews">Reviews</Link><Link href="/#compare">Comparisons</Link></div>
            <div><b>THIS REVIEW</b><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#verdict">Verdict</a></div>
          </div>
          <div className={styles.footerBottom}>
            <span>© 2026 ALPHAMARKAI. INDEPENDENT BY DESIGN.</span>
            <Link href="/">BACK TO HOME</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
