# MongoDB Atlas setup for AlphaMarkAI

The application stores newsletter subscribers and first-party analytics in MongoDB.

## Vercel environment variables

Add these values in **Vercel → AlphaMarkAI → Settings → Environment Variables**:

```text
MONGODB_URI=mongodb+srv://<database-user>:<password>@<cluster-host>/?retryWrites=true&w=majority
MONGODB_DB_NAME=alphamarkai
```

Apply them to Production, Preview, and Development as needed, then redeploy.

Do not place the real connection string in `.env.example` or commit it to GitHub.

## Atlas access

1. Create a MongoDB Atlas database user with read/write access to the `alphamarkai` database.
2. In Atlas Network Access, allow Vercel's required outbound access. For an initial serverless setup this is commonly `0.0.0.0/0`; use strong credentials and least-privilege database permissions.
3. Copy the Node.js connection string and replace its username and password placeholders.
4. URL-encode special characters in the database password.

The app creates these collections and indexes automatically:

- `subscribers`: unique email, source, campaign, status, creation date
- `page_views`: anonymous visitor ID, page, source, referrer, creation date
- `affiliate_clicks`: anonymous visitor ID, affiliate, placement, creation date

No visitor IP addresses or admin passwords are stored in MongoDB.
