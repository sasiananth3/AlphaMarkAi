import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  FileText,
  Gauge,
  Globe2,
  LayoutDashboard,
  Link2,
  Mail,
  Menu,
  MousePointerClick,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import styles from "../admin.module.css";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Traffic analytics", icon: BarChart3 },
  { label: "Email subscribers", icon: Mail, badge: "18" },
  { label: "Affiliate products", icon: CircleDollarSign },
  { label: "Click analytics", icon: MousePointerClick },
  { label: "SEO overview", icon: Search, badge: "7" },
  { label: "Website health", icon: Activity },
  { label: "Content", icon: FileText },
  { label: "Settings", icon: Settings },
];

const metrics = [
  {
    label: "Visitors today",
    value: "347",
    change: "+12.4%",
    trend: "up",
    icon: Users,
    note: "vs. yesterday",
  },
  {
    label: "Email leads",
    value: "18",
    change: "+5.8%",
    trend: "up",
    icon: Mail,
    note: "6.2% conversion",
  },
  {
    label: "Affiliate clicks",
    value: "63",
    change: "+18.1%",
    trend: "up",
    icon: MousePointerClick,
    note: "18.2% CTR",
  },
  {
    label: "Bounce rate",
    value: "38.6%",
    change: "−2.4%",
    trend: "down-good",
    icon: Gauge,
    note: "Healthy range",
  },
];

const traffic = [
  { day: "Mon", value: 38 },
  { day: "Tue", value: 53 },
  { day: "Wed", value: 46 },
  { day: "Thu", value: 68 },
  { day: "Fri", value: 61 },
  { day: "Sat", value: 82 },
  { day: "Sun", value: 74 },
];

const sources = [
  { label: "Google Search", value: 51, color: "#1546d8" },
  { label: "Direct", value: 18, color: "#151715" },
  { label: "YouTube", value: 12, color: "#d6573b" },
  { label: "Meta", value: 9, color: "#6f7fa9" },
  { label: "Other", value: 10, color: "#c4bfae" },
];

const leads = [
  { email: "priya.marketing@example.com", source: "Google", time: "12 min ago", status: "New" },
  { email: "arun.builds@example.com", source: "YouTube", time: "38 min ago", status: "New" },
  { email: "meena.tools@example.com", source: "Direct", time: "1 hr ago", status: "Contacted" },
  { email: "karthik.saas@example.com", source: "Meta", time: "2 hrs ago", status: "New" },
];

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  return (
    <main className={styles.dashboardPage}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <Link className={styles.adminBrand} href="/">
            <span className={styles.brandMark}>A</span>
            <span>
              alphamark<span>ai</span>
            </span>
          </Link>
          <span className={styles.adminTag}>ADMIN</span>
        </div>

        <nav className={styles.sideNav} aria-label="Admin navigation">
          <p>WORKSPACE</p>
          {navigation.slice(0, 7).map((item) => (
            <a
              className={item.active ? styles.navActive : undefined}
              href={`#${item.label.toLowerCase().replaceAll(" ", "-")}`}
              key={item.label}
            >
              <item.icon size={17} />
              <span>{item.label}</span>
              {item.badge ? <b>{item.badge}</b> : null}
            </a>
          ))}
          <p>MANAGE</p>
          {navigation.slice(7).map((item) => (
            <a
              href={`#${item.label.toLowerCase().replaceAll(" ", "-")}`}
              key={item.label}
            >
              <item.icon size={17} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className={styles.sidebarFoot}>
          <div className={styles.adminAvatar}>SA</div>
          <span>
            <b>Sasi Admin</b>
            Administrator
          </span>
          <form action="/api/admin/logout" method="post">
            <button type="submit" aria-label="Sign out">
              <ExternalLink size={16} />
            </button>
          </form>
        </div>
      </aside>

      <section className={styles.dashboardMain}>
        <header className={styles.dashboardHeader}>
          <button className={styles.mobileMenu} aria-label="Open navigation">
            <Menu size={20} />
          </button>
          <div>
            <p>ALPHAMARKAI / OVERVIEW</p>
            <h1>Dashboard</h1>
          </div>
          <div className={styles.headerActions}>
            <span className={styles.liveStatus}>
              <i /> Website operational
            </span>
            <button aria-label="Notifications">
              <Bell size={18} />
              <i />
            </button>
            <Link href="/" target="_blank">
              View website <ExternalLink size={14} />
            </Link>
          </div>
        </header>

        <div className={styles.dashboardContent}>
          <div className={styles.welcomeRow}>
            <div>
              <h2>Good afternoon, Sasi.</h2>
              <p>Here is what is happening across AlphaMarkAI today.</p>
            </div>
            <label className={styles.dateControl}>
              <span>DATE RANGE</span>
              <select defaultValue="7-days">
                <option value="today">Today</option>
                <option value="7-days">Last 7 days</option>
                <option value="30-days">Last 30 days</option>
              </select>
            </label>
          </div>

          <section className={styles.metricGrid} aria-label="Website metrics">
            {metrics.map((metric) => (
              <article className={styles.metricCard} key={metric.label}>
                <div className={styles.metricTop}>
                  <span>{metric.label}</span>
                  <metric.icon size={18} />
                </div>
                <strong>{metric.value}</strong>
                <p>
                  <span className={metric.trend === "up" || metric.trend === "down-good" ? styles.positive : styles.negative}>
                    {metric.trend === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {metric.change}
                  </span>
                  {metric.note}
                </p>
              </article>
            ))}
          </section>

          <section className={styles.dashboardGrid}>
            <article className={`${styles.panel} ${styles.trafficPanel}`} id="traffic-analytics">
              <div className={styles.panelHead}>
                <div>
                  <p>TRAFFIC PERFORMANCE</p>
                  <h3>Visitor trend</h3>
                </div>
                <span>
                  <b>2,418</b> total visitors
                </span>
              </div>
              <div className={styles.barChart}>
                {traffic.map((item) => (
                  <div className={styles.barColumn} key={item.day}>
                    <div className={styles.barTrack}>
                      <span style={{ height: `${item.value}%` }} />
                    </div>
                    <small>{item.day}</small>
                  </div>
                ))}
              </div>
              <div className={styles.chartLegend}>
                <span><i /> Visitors</span>
                <span>Average 345 / day</span>
              </div>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHead}>
                <div>
                  <p>ACQUISITION</p>
                  <h3>Traffic sources</h3>
                </div>
                <Globe2 size={19} />
              </div>
              <div className={styles.sourceBar}>
                {sources.map((source) => (
                  <span
                    key={source.label}
                    style={{ width: `${source.value}%`, background: source.color }}
                  />
                ))}
              </div>
              <div className={styles.sourceList}>
                {sources.map((source) => (
                  <div key={source.label}>
                    <span><i style={{ background: source.color }} />{source.label}</span>
                    <b>{source.value}%</b>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${styles.panel} ${styles.leadsPanel}`} id="email-subscribers">
              <div className={styles.panelHead}>
                <div>
                  <p>LEAD ACTIVITY</p>
                  <h3>Recent email subscribers</h3>
                </div>
                <button>View all <ChevronRight size={14} /></button>
              </div>
              <div className={styles.tableWrap}>
                <table>
                  <thead>
                    <tr><th>Email</th><th>Source</th><th>Received</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.email}>
                        <td><span className={styles.emailIcon}><Mail size={14} /></span>{lead.email}</td>
                        <td>{lead.source}</td>
                        <td>{lead.time}</td>
                        <td><span className={lead.status === "New" ? styles.statusNew : styles.statusContacted}>{lead.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className={styles.panel} id="seo-overview">
              <div className={styles.panelHead}>
                <div>
                  <p>SEARCH VISIBILITY</p>
                  <h3>SEO health</h3>
                </div>
                <ShieldCheck size={19} />
              </div>
              <div className={styles.seoScore}>
                <div><strong>82</strong><span>/100</span></div>
                <p><b>Good foundation</b>7 items need attention</p>
              </div>
              <div className={styles.seoRows}>
                <div><span>Indexed pages</span><b>34</b></div>
                <div><span>Keywords in top 10</span><b>8</b></div>
                <div><span>Broken links</span><b className={styles.warning}>2</b></div>
                <div><span>Missing descriptions</span><b className={styles.warning}>5</b></div>
              </div>
              <button className={styles.panelAction}>Open SEO report <ChevronRight size={14} /></button>
            </article>
          </section>

          <p className={styles.demoBanner}>
            <span>DEMO DATA</span>
            Analytics, subscriber, affiliate, and SEO figures are placeholders until their services are connected.
            <Link2 size={15} />
          </p>
        </div>
      </section>
    </main>
  );
}
