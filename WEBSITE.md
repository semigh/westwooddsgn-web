# westwooddsgn.com — Site Reference

## Hosting & Infrastructure

| Component | Details |
|---|---|
| **Canonical URL** | https://www.westwooddsgn.com |
| **Apex redirect** | `westwooddsgn.com` → `https://www.westwooddsgn.com` via Network Solutions URL Forwarding (301) |
| **Hosting** | Azure Static Web Apps (Free tier) |
| **DNS / Domain registrar** | Network Solutions (Register.com) |
| **GitHub repo** | `semigh/westwooddsgn-web`, branch `main` |
| **Deployment** | Auto-deploy on push to `main` (GitHub Actions / Azure SWA workflow) |
| **SSL cert** | DigiCert, CN=www.westwooddsgn.com — provisioned by Azure SWA |

## ⚠️ DNS History Note
On 2026-06-12, Scott set up web forwarding in Network Solutions which overwrote the `www` DNS record with an A record pointing to Network Solutions' servers (209.17.116.163). This broke SSL on `www`. Fixed 2026-06-16 by adding explicit `www` CNAME.

**Lesson:** Network Solutions' web forwarding feature modifies DNS records for ALL subdomains via wildcard. Always add an explicit `www` CNAME after enabling web forwarding.

## ⚠️ Known SSL Limitation

Network Solutions does **not** support ALIAS/ANAME records, so the apex domain (`westwooddsgn.com`) cannot point directly to Azure SWA. Instead it uses HTTP URL forwarding.

**Problem:** If a browser attempts `https://westwooddsgn.com` directly (before the Network Solutions redirect resolves), it hits a server without a valid cert for the apex domain → `NET::ERR_CERT_COMMON_NAME_INVALID`.

**Workaround options:**
1. *(Current)* URL forwarding works for HTTP; most browsers will follow the redirect fine.
2. *(Better)* Move DNS to Cloudflare — supports CNAME flattening + free SSL proxy for apex domain.
3. Provision a cert for the apex domain in Azure SWA (requires ALIAS record support at registrar — not available at Network Solutions).

**Current status:** Acceptable for now. Canonical URL is `www.westwooddsgn.com`. Document this with Scott before changing DNS providers.

## Site Structure

```
westwooddsgn-web/
├── index.html          # Landing page / hero
├── about.html          # About page
├── portfolio.html      # Portfolio gallery
├── quote.html          # Quote request form
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # All JS (form handling, nav, etc.)
├── images/
│   └── hero.jpg        # Current hero background (to be replaced with wood round photo)
├── fonts/              # Self-hosted fonts
└── staticwebapp.config.json  # Azure SWA routing rules
```

## Quote Form

- **Provider:** Formspree — endpoint `https://formspree.io/f/xgobljdy`
- **Notifications go to:** woody@westwooddsgn.com
- **Implementation:** `quote.html` + `js/main.js` fetch POST with `Accept: application/json`
- **Formspree safe-sender fix (2026-06-12):** Scott added `formspree.io` to M365 safe senders so notifications don't land in junk

## Email — Woody's Inbox

- **Address:** woody@westwooddsgn.com (Microsoft 365)
- **Access method:** Microsoft Graph API (app registration)
  - Tenant ID: `4e0dab55-4eab-42ce-bae0-1339247b73a3`
  - Client ID: `bc0bda1e-9ce4-48d0-943e-300e721f44bb`
  - Secret: stored in `M365_Email_Acct.txt`
- **Scripts:** `scripts/email/graph_client.py`, `check_inbox.py`, `send_email.py`
- **Cron:** inbox polled every 15 min; Scott notified on Telegram for new mail

## CSS Notes

| Element | Current Value |
|---|---|
| Nav logo height | 144px (3× from original 48px — updated 2026-06-16) |
| Hero background | `background-image: url('images/hero.jpg')` — pending replacement with wood round photo |
| Color scheme | Dark charcoal nav, warm wood accent tones |

## Pending Work

- [ ] Replace hero background with wood round photo (Scott to provide image)

## Deployment Workflow

1. Edit files in `/home/semigh/.openclaw/workspace/westwooddsgn-web/`
2. `git add -A && git commit -m "description" && git push`
3. Azure SWA auto-deploys within ~1-2 minutes
4. Verify at https://www.westwooddsgn.com

## Change Log

| Date | Change | Who |
|---|---|---|
| 2026-05-31 | Initial site build + Azure SWA deployment | Woody |
| 2026-05-31 | Formspree quote form integrated | Woody |
| 2026-05-31 | woody@westwooddsgn.com email + Graph API setup | Woody/Scott |
| 2026-06-11 | Formspree endpoint wired to quote form, JS fixed | Woody |
| 2026-06-12 | Apex domain forwarding set up (Network Solutions) | Scott |
| 2026-06-12 | Formspree safe-sender fixed in M365 | Scott |
| 2026-06-16 | Nav logo scaled 48px → 144px (3×) | Woody |
| 2026-06-16 | Hero background — pending wood round photo | Pending |
| 2026-06-16 | DNS broken: `www` A record was pointing to Network Solutions (209.17.116.163) due to web forwarding setup | Scott/Woody |
| 2026-06-16 | DNS fixed: added `www` CNAME → `wonderful-smoke-05fd4c810.azurestaticapps.net` | Scott |
| 2026-06-16 | Azure managed SSL cert for `www.westwooddsgn.com` re-provisioning (auto, ~1-2 hrs) | Azure |
| 2026-06-24 | DNS migrated to Cloudflare (nameservers adam.ns / karsyn.ns) | Scott |
| 2026-07-02 | Confirmed local clone + push access fully working; re-verified for Scott | Woody |
