# West Wood Design — Website

Static site for [westwooddsgn.com](https://westwooddsgn.com), hosted on Azure Static Web Apps.

## Structure

```
westwooddsgn-web/
├── index.html              # Home
├── portfolio.html          # Portfolio gallery
├── about.html              # About page
├── quote.html              # Quote request form
├── css/
│   └── style.css           # All styles
├── js/
│   └── main.js             # Navigation, scroll effects, form handling
├── images/                 # All site images
├── staticwebapp.config.json  # Azure routing + security headers
└── .github/
    └── workflows/
        └── azure-static-web-apps.yml  # CI/CD pipeline
```

## Quote Form Setup

The quote form uses [Formspree](https://formspree.io) for serverless form handling.

1. Create a free account at formspree.io
2. Create a new form (target: `info@westwooddsgn.com` or `woody@westwooddsgn.com`)
3. Copy your form endpoint (looks like `https://formspree.io/f/xabcdefg`)
4. Replace `YOUR_FORM_ID` in `quote.html`

## Azure Deployment

1. Create an Azure Static Web Apps resource in Azure Portal
2. Connect to this GitHub repo
3. Azure auto-generates `AZURE_STATIC_WEB_APPS_API_TOKEN` as a repo secret
4. Every push to `main` auto-deploys

## Custom Domain

After Azure deploy:
1. In Azure Static Web Apps → Custom Domains → Add
2. Set CNAME: `westwooddsgn.com` → `<your-app>.azurestaticapps.net`
3. Azure provisions SSL automatically

## TODO

- [ ] Replace `(360) 555-0000` with actual phone number
- [ ] Replace `YOUR_FORM_ID` with Formspree endpoint
- [ ] Add team photos to About page
- [ ] Add more portfolio photos as projects complete
- [ ] Set up Formspree account and form
- [ ] Azure Static Web Apps resource creation
- [ ] DNS cutover from Squarespace
