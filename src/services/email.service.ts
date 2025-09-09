import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  // eslint-disable-next-line no-console
  console.warn("RESEND_API_KEY not set. Emails will fail until configured.");
}

const resend = new Resend(resendApiKey ?? "");

export interface FormEmailPayload {
  site:
    | "rentready-labor-solutions"
    | "stackgrowth"
    | "scarletoakcapital"
    | "prism-fs";
  recipientEmail: string;
  subject?: string;
  data: Record<string, unknown>;
}

export async function sendFormSubmissionEmail(
  payload: FormEmailPayload
): Promise<void> {
  const { site, recipientEmail, subject, data } = payload;

  const html = buildHtml(site, data);

  await resend.emails.send({
    from: `${recipientEmail}`,
    to: [recipientEmail],
    subject: subject || `New ${site} form submission`,
    html,
  });
}

function buildHtml(site: FormEmailPayload['site'], data: Record<string, unknown>): string {
  const rows: string[] = [];
  rows.push(`<p><strong>Site:</strong> ${site}</p>`);
  rows.push(`<p><strong>Submitted Fields</strong></p>`);

  const entries = Object.entries(data);
  if (entries.length === 0) {
    rows.push('<p><em>No fields included.</em></p>');
  } else {
    rows.push('<ul>');
    for (const [key, value] of entries) {
      const printable = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
      rows.push(`<li><strong>${escapeHtml(key)}:</strong> <pre style="display:inline; white-space:pre-wrap; margin:0">${escapeHtml(printable)}</pre></li>`);
    }
    rows.push('</ul>');
  }

  return `<!doctype html><html><body>${rows.join("")}</body></html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
