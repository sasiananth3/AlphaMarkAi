import "server-only";

import { getDatabase, isMongoConfigured } from "@/lib/mongodb";

type SubscriberInput = {
  email: string;
  source: string;
  utmCampaign?: string;
  utmMedium?: string;
};

type PageViewInput = {
  visitorId: string;
  path: string;
  source: string;
  referrer: string;
};

type AffiliateClickInput = {
  visitorId: string;
  affiliate: string;
  placement: string;
};

export type DashboardData = {
  connected: boolean;
  visitorsToday: number;
  pageViewsToday: number;
  subscribersToday: number;
  totalSubscribers: number;
  affiliateClicksToday: number;
  trafficTrend: Array<{ day: string; count: number }>;
  trafficSources: Array<{ label: string; value: number }>;
  leads: Array<{
    email: string;
    source: string;
    createdAt: Date;
    status: string;
  }>;
};

function cleanSource(value: string) {
  const source = value.trim().toLowerCase();
  if (!source || source === "direct") return "Direct";
  if (source.includes("google")) return "Google Search";
  if (source.includes("youtube") || source.includes("youtu.be")) return "YouTube";
  if (
    source.includes("facebook") ||
    source.includes("instagram") ||
    source.includes("meta")
  ) return "Meta";
  return value.trim().slice(0, 80) || "Other";
}

async function ensureIndexes() {
  const db = await getDatabase();
  await Promise.all([
    db.collection("subscribers").createIndex({ email: 1 }, { unique: true }),
    db.collection("subscribers").createIndex({ createdAt: -1 }),
    db.collection("page_views").createIndex({ createdAt: -1 }),
    db.collection("page_views").createIndex({ visitorId: 1, createdAt: -1 }),
    db.collection("affiliate_clicks").createIndex({ createdAt: -1 }),
  ]);
  return db;
}

export async function saveSubscriber(input: SubscriberInput) {
  const db = await ensureIndexes();
  const email = input.email.trim().toLowerCase();
  const result = await db.collection("subscribers").updateOne(
    { email },
    {
      $setOnInsert: {
        email,
        source: cleanSource(input.source),
        utmCampaign: input.utmCampaign?.slice(0, 100) || null,
        utmMedium: input.utmMedium?.slice(0, 100) || null,
        status: "New",
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );

  return { alreadySubscribed: result.upsertedCount === 0 };
}

export async function recordPageView(input: PageViewInput) {
  const db = await ensureIndexes();
  await db.collection("page_views").insertOne({
    visitorId: input.visitorId,
    path: input.path.slice(0, 200),
    source: cleanSource(input.source),
    referrer: input.referrer.slice(0, 300),
    createdAt: new Date(),
  });
}

export async function recordAffiliateClick(input: AffiliateClickInput) {
  const db = await ensureIndexes();
  await db.collection("affiliate_clicks").insertOne({
    visitorId: input.visitorId,
    affiliate: input.affiliate.slice(0, 80),
    placement: input.placement.slice(0, 100),
    createdAt: new Date(),
  });
}

function startOfUtcDay(value = new Date()) {
  const date = new Date(value);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function emptyDashboardData(): DashboardData {
  const start = startOfUtcDay();
  const trend = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() - (6 - index));
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
      count: 0,
    };
  });

  return {
    connected: false,
    visitorsToday: 0,
    pageViewsToday: 0,
    subscribersToday: 0,
    totalSubscribers: 0,
    affiliateClicksToday: 0,
    trafficTrend: trend,
    trafficSources: [],
    leads: [],
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  if (!isMongoConfigured()) return emptyDashboardData();

  try {
    const db = await ensureIndexes();
    const today = startOfUtcDay();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setUTCDate(today.getUTCDate() - 6);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setUTCDate(today.getUTCDate() - 29);

    const pageViews = db.collection("page_views");
    const subscribers = db.collection("subscribers");
    const affiliateClicks = db.collection("affiliate_clicks");

    const [
      visitorIds,
      pageViewsToday,
      subscribersToday,
      totalSubscribers,
      affiliateClicksToday,
      trendRows,
      sourceRows,
      leadRows,
    ] = await Promise.all([
      pageViews.distinct("visitorId", { createdAt: { $gte: today } }),
      pageViews.countDocuments({ createdAt: { $gte: today } }),
      subscribers.countDocuments({ createdAt: { $gte: today } }),
      subscribers.countDocuments(),
      affiliateClicks.countDocuments({ createdAt: { $gte: today } }),
      pageViews.aggregate<{ _id: string; count: number }>([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: "UTC",
              },
            },
            visitors: { $addToSet: "$visitorId" },
          },
        },
        { $project: { count: { $size: "$visitors" } } },
      ]).toArray(),
      pageViews.aggregate<{ _id: string; count: number }>([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: "$source", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]).toArray(),
      subscribers
        .find({}, { projection: { email: 1, source: 1, createdAt: 1, status: 1 } })
        .sort({ createdAt: -1 })
        .limit(6)
        .toArray(),
    ]);

    const trendMap = new Map(trendRows.map((row) => [row._id, row.count]));
    const trafficTrend = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(sevenDaysAgo);
      date.setUTCDate(sevenDaysAgo.getUTCDate() + index);
      const key = date.toISOString().slice(0, 10);
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
        count: trendMap.get(key) ?? 0,
      };
    });

    const sourceTotal = sourceRows.reduce((sum, row) => sum + row.count, 0);
    const trafficSources = sourceRows.slice(0, 5).map((row) => ({
      label: row._id || "Other",
      value: sourceTotal ? Math.round((row.count / sourceTotal) * 100) : 0,
    }));

    return {
      connected: true,
      visitorsToday: visitorIds.length,
      pageViewsToday,
      subscribersToday,
      totalSubscribers,
      affiliateClicksToday,
      trafficTrend,
      trafficSources,
      leads: leadRows.map((lead) => ({
        email: String(lead.email),
        source: String(lead.source ?? "Direct"),
        createdAt: lead.createdAt instanceof Date ? lead.createdAt : new Date(lead.createdAt),
        status: String(lead.status ?? "New"),
      })),
    };
  } catch {
    return emptyDashboardData();
  }
}
