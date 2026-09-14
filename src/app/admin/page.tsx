import { ArrowLeft, BarChart3, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import LoginForm from "./login-form";
import styles from "./admin.module.css";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin/dashboard");

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginStory}>
        <Link className={styles.adminBrand} href="/">
          <span className={styles.brandMark}>A</span>
          <span>
            alphamark<span>ai</span>
          </span>
        </Link>

        <div className={styles.storyContent}>
          <p className={styles.kicker}>ADMIN CONTROL ROOM</p>
          <h1>
            Keep every signal
            <br />
            <i>in one place.</i>
          </h1>
          <p>
            Monitor audience growth, subscriber activity, affiliate engagement,
            SEO health, and the operational status of AlphaMarkAI.
          </p>
          <div className={styles.storyStats}>
            <div>
              <BarChart3 size={19} />
              <span>
                <b>Traffic</b>
                Channel and content performance
              </span>
            </div>
            <div>
              <ShieldCheck size={19} />
              <span>
                <b>Protected</b>
                Private administration access
              </span>
            </div>
          </div>
        </div>

        <p className={styles.storyFoot}>ALPHAMARKAI / ADMIN · 2026</p>
      </section>

      <section className={styles.loginPanel}>
        <div className={styles.loginCard}>
          <span className={styles.lockBadge}>
            <LockKeyhole size={20} />
          </span>
          <p className={styles.kicker}>SECURE ACCESS</p>
          <h2>Welcome back, Sasi.</h2>
          <p className={styles.loginIntro}>
            Sign in with the temporary administrator credentials to open the
            AlphaMarkAI dashboard.
          </p>
          <LoginForm />
          <div className={styles.demoNote}>
            <span>DEMO MODE</span>
            Data shown in this dashboard is sample data. No database is
            connected.
          </div>
          <Link className={styles.backLink} href="/">
            <ArrowLeft size={15} /> Back to AlphaMarkAI
          </Link>
        </div>
      </section>
    </main>
  );
}
