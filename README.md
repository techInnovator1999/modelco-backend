## Modelco Backend

Express + TypeScript backend to accept contact form submissions from multiple Lovable sites and send emails via Resend.

### Setup

1. Create `.env` in project root:

```
PORT=3000
RESEND_API_KEY=your_resend_api_key
```

2. Install & run:

```
npm install
npm run dev
```

### API

- POST `/api/v1/forms/submit`
  - Body: must include `site` and may include any other fields (all are forwarded and rendered in email).
  - Example base URL: `{Deployed_backend_url_here}`
  - Example: `POST {Deployed_backend_url_here}/api/v1/forms/submit`


### Lovable integration prompts (copy/paste)

For each site, add a hidden field `site` with the specified value. Configure the form to POST JSON to `{Deployed_backend_url_here}/api/v1/forms/submit` including all form fields.

1) rentready-labor-solutions
```
On submit of contact form, send a POST request to {Deployed_backend_url_here}/api/v1/forms/submit
Content-Type: application/json
Body: include all form fields as JSON
Also add a hidden field named "site" with value "rentready-labor-solutions"
```

2) stackgrowth
```
On submit of contact form, send a POST request to {Deployed_backend_url_here}/api/v1/forms/submit
Content-Type: application/json
Body: include all form fields as JSON
Also add a hidden field named "site" with value "stackgrowth"
```

3) scarletoakcapital
```
On submit of contact form, send a POST request to {Deployed_backend_url_here}/api/v1/forms/submit
Content-Type: application/json
Body: include all form fields as JSON
Also add a hidden field named "site" with value "scarletoakcapital"
```

4) prism-fs
```
On submit of contact form, send a POST request to {Deployed_backend_url_here}/api/v1/forms/submit
Content-Type: application/json
Body: include all form fields as JSON
Also add a hidden field named "site" with value "prism-fs"
```

Notes:
- Only `site` is required; all other fields are passed through.
- Emails are sent using Resend. Ensure `RESEND_API_KEY` and `MAIL_FROM` (verified domain) are configured if you switch sender settings.

