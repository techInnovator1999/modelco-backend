import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { sendFormSubmissionEmail } from '../services/email.service';
import { getRecipientEmailForSite } from '../services/site-routing.service';

const formSchema = z
  .object({
    site: z.enum(['rentready-labor-solutions', 'stackgrowth', 'scarletoakcapital', 'prism-fs']),
  })
  .passthrough();

export async function submitFormController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = formSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parsed.error.flatten() });
    }

    const { site, ...rest } = parsed.data as { site: string; [k: string]: unknown };
    const recipientEmail = getRecipientEmailForSite(site as any);

    const subject = typeof rest.subject === 'string' && rest.subject.trim().length > 0 ? rest.subject : undefined;

    await sendFormSubmissionEmail({
      site: site as any,
      recipientEmail,
      data: rest,
      ...(subject ? { subject } : {}),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return next(err);
  }
}


