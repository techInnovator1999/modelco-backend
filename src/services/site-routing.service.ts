const SITE_TO_EMAIL: Record<string, string> = {
  'rentready-labor-solutions': 'rohit@stackgs.com',
  'stackgrowth': 'rohit@stackgs.com',
  'scarletoakcapital': 'rohit@stackgs.com',
  'prism-fs': 'rohit@stackgs.com',
  // 'rentready-labor-solutions': 'rohit@rentreadyls.com',
  // 'stackgrowth': 'rohit@stackgs.com',
  // 'scarletoakcapital': 'rohitk@scarletoakcapital.com',
  // 'prism-fs': 'rohit@prism-fs.com',
};

export type SiteKey = keyof typeof SITE_TO_EMAIL;

export function getRecipientEmailForSite(site: SiteKey): string {
  const email = SITE_TO_EMAIL[site];
  if (!email) {
    throw new Error(`No recipient configured for site: ${site}`);
  }
  return email;
}

export function getSupportedSites(): SiteKey[] {
  return Object.keys(SITE_TO_EMAIL) as SiteKey[];
}


