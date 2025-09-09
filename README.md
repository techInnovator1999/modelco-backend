## Modelco Backend

Express + TypeScript backend for handling form submissions across multiple Lovable sites and sending emails via Resend.

### Setup

1. Create `.env` in project root:

```
PORT=3000
RESEND_API_KEY=your_resend_api_key
```

2. Install dependencies and start dev server:

```
npm install
npm run dev
```

### API

- `POST /api/v1/forms/submit`
  - Body (JSON):
    - `site`: one of `rentready-labor-solutions | stackgrowth | scarletoakcapital | prism-fs`
    - `name` (string, required)
    - `email` (string, email)
    - `phone` (string)
    - `subject` (string)
    - `message` (string, required)
    - `meta` (object, optional)

