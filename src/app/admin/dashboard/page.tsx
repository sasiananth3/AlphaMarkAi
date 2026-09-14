import {
  Activity,
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
import { getDashboardData } from "@/lib/site-data";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

const sourceColors: Record<string, string> = {
  "Google Search": "#1546d8",
  Direct: "#151715",
  YouTube: "#d6573b",
  Meta: "#6f7fa9",
  Other: "#c4bfae",
};

function relativeTime(date: Date) {
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  const data = await getDashboardData();
  const navigation = [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "Traffic analytics", icon: BarChart3 },
    { label: "Email subscribers", icon: Mail, badge: String(data.totalSubscribers) },
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
      value: data.visitorsToday.toLocaleString(),
      icon: Users,
      note: `${data.pageViewsToday} page views`,
    },
    {
      label: "Email leads today",
      value: data.subscribersToday.toLocaleString(),
      icon: Mail,
      note: `${data.totalSubscribers} total subscribers`,
    },
    {
      label: "Affiliate clicks",
      value: data.affiliateClicksToday.toLocaleString(),
      icon: MousePointerClick,
      note: "Recorded today",
    },
    {
      label: "Page views today",
      value: data.pageViewsToday.toLocaleString(),
      icon: Gauge,
      note: "First-party analytics",
    },
  ];

  const maxTraffic = Math.max(...data.trafficTrend.map((item) => item.count), 1);
  const totalSevenDayVisitors = data.trafficTrend.reduce((sum, item) => sum + item.count, 0);
  const averageVisitors = Math.round(totalSevenDayVisitors / 7);
  const sources = data.trafficSources.length
    ? data.trafficSources
    : [{ label: "No traffic yet", value: 0 }];

  return (
    <main className={styles.dashboardPage}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <Link className={styles.adminBrand} href="/">
            <span className={styles.brandMark}>A</span>
            <span>alphamark<span>ai</span></span>
          </Link>
          <span className={styles.adminTag}>ADMIN</span>
        </div>

        <nav className={styles.sideNav} aria-label="Admin navigation">
          <p>WORKSPACE</p>
          {navigation.slice(0, 7).map((item) => (
            <a className={item.active ? styles.navActive : undefined} href={`#${item.label.toLowerCase().replaceAll(" ", "-")}`} key={item.label}>
              <item.icon size={17} />
              <span>{item.label}</span>
              {item.badge ? <b>{item.badge}</b> : null}
            </a>
          ))}
          <p>MANAGE</p>
          {navigation.slice(7).map((item) => (
            <a href={`#${item.label.toLowerCase().replaceAll(" ", "-")}`} key={item.label}>
              <item.icon size={17} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className={styles.sidebarFoot}>
          <div className={styles.adminAvatar}>SA</div>
          <span><b>Sasi Admin</b>Administrator</span>
          <form action="/api/admin/logout" method="post">
            <button type="submit" aria-label="Sign out"><ExternalLink size={16} /></button>
          </form>
        </div>
      </aside>

      <section className={styles.dashboardMain}>
        <header className={styles.dashboardHeader}>
          <button className={styles.mobileMenu} aria-label="Open navigation"><Menu size={20} /></button>
          <div><p>ALPHAMARKAI / OVERVIEW</p><h1>Dashboard</h1></div>
          <div className={styles.headerActions}>
            <span className={styles.liveStatus}><i /> {data.connected ? "MongoDB live" : "Database setup required"}</span>
            <button aria-label="Notifications"><Bell size={18} /><i /></button>
            <Link href="/" target="_blank">View website <ExternalLink size={14} /></Link>
          </div>
        </header>

        <div className={styles.dashboardContent}>
          <div className={styles.welcomeRow}>
            <div><h2>Good afternoon, Sasi.</h2><p>Live AlphaMarkAI activity and subscriber data.</p></div>
            <label className={styles.dateControl}>
              <span>DATE RANGE</span>
              <select defaultValue="7-days" aria-label="Date range">
                <option value="7-days">Last 7 days</option>
              </select>
            </label>
          </div>

          <section className={styles.metricGrid} aria-label="Website metrics">
            {metrics.map((metric) => (
              <article className={styles.metricCard} key={metric.label}>
                <div className={styles.metricTop}><span>{metric.label}</span><metric.icon size={18} /></div>
                <strong>{metric.value}</strong>
                <p><span className={styles.positive}><ArrowUpRight size={13} />LIVE</span>{metric.note}</p>
              </article>
            ))}
          </section>

          <section className={styles.dashboardGrid}>
            <article className={`${styles.panel} ${styles.trafficPanel}`} id="traffic-analytics">
              <div className={styles.panelHead}>
                <div><p>TRAFFIC PERFORMANCE</p><h3>Unique visitor trend</h3></div>
                <span><b>{totalSevenDayVisitors.toLocaleString()}</b> last 7 days</span>
              </div>
              <div className={styles.barChart}>
                {data.trafficTrend.map((item) => (
                  <div className={styles.barColumn} key={item.day}>
                    <div className={styles.barTrack}>
                      <span title={`${item.count} visitors`} style={{ height: `${item.count ? Math.max(10, Math.round((item.count / maxTraffic) * 100)) : 3}%` }} />
                    </div>
                    <small>{item.day}</small>
                  </div>
                ))}
              </div>
              <div className={styles.chartLegend}><span><i /> Unique visitors</span><span>Average {averageVisitors} / day</span></div>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHead}>
                <div><p>ACQUISITION</p><h3>Traffic sources</h3></div><Globe2 size={19} />
              </div>
              <div className={styles.sourceBar}>
                {sources.map((source) => <span key={source.label} style={{ width: `${source.value}%`, background: sourceColors[source.label] ?? "#c4bfae" }} />)}
              </div>
              <div className={styles.sourceList}>
                {sources.map((source) => (
                  <div key={source.label}>
                    <span><i style={{ background: sourceColors[source.label] ?? "#c4bfae" }} />{source.label}</span>
                    <b>{source.value}%</b>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${styles.panel} ${styles.leadsPanel}`} id="email-subscribers">
              <div className={styles.panelHead}>
                <div><p>LEAD ACTIVITY</p><h3>Recent email subscribers</h3></div>
                <button>Live data <ChevronRight size={14} /></button>
              </div>
              <div className={styles.tableWrap}>
                <table>
                  <thead><tr><th>Email</th><th>Source</th><th>Received</th><th>Status</th></tr></thead>
                  <tbody>
                    {data.leads.length ? data.leads.map((lead) => (
                      <tr key={lead.email}>
                        <td><span className={styles.emailIcon}><Mail size={14} /></span>{lead.email}</td>
                        <td>{lead.source}</td>
                        <td>{relativeTime(lead.createdAt)}</td>
                        <td><span className={styles.statusNew}>{lead.status}</span></td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4}>No email subscribers have been recorded yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </article>

            <article className={styles.panel} id="seo-overview">
              <div className={styles.panelHead}>
                <div><p>SEARCH VISIBILITY</p><h3>SEO health</h3></div><ShieldCheck size={19} />
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
            <span>{data.connected ? "LIVE DATA" : "SETUP REQUIRED"}</span>
            {data.connected
              ? "Subscriber, traffic, and affiliate figures are being read from MongoDB. SEO figures remain placeholders until Search Console is connected."
              : "Add MONGODB_URI and MONGODB_DB_NAME in Vercel to activate subscriber and analytics tracking."}
            <Link2 size={15} />
          </p>
        </div>
      </section>
    </main>
  );
}
