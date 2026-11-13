import 'server-only';
import { z } from 'zod';
import { STREAMERS_SHOWCASE_REVALIDATE_SECONDS, STREAMERS_SHOWCASE_TIMEOUT_MS } from '@/lib/constants/welcome';
import type { IStreamersShowcase } from '@/lib/models/welcome';

/**
 * Server-only reads of the backend's unauthenticated `/api/public/*` endpoints for the public site.
 *
 * Unlike the other services this does not go through `apiClient`: that one is browser-oriented
 * (localStorage tokens, refresh flow). Here we use `fetch` so Next caches the result (ISR) and the
 * section ships in the HTML. Failures resolve to `null` — the public page must never break because
 * the API is down or older than the client; the section is simply hidden.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const showcaseSchema = z.object({
  streamers: z.array(z.object({
    twitchLogin: z.string(),
    displayName: z.string(),
    profileImageUrl: z.string().nullable().catch(null),
    isPartner: z.boolean().catch(false),
    rank: z.number(),
    isTopActive: z.boolean().catch(false),
    notificationsDelivered: z.number().catch(0),
    communitiesReached: z.number().catch(0),
    lastNotifiedAt: z.string().nullable().catch(null),
  })),
  stats: z.object({
    totalStreamers: z.number(),
    notificationsDelivered: z.number(),
    notificationsDeliveredRecent: z.number(),
    communitiesReached: z.number(),
  }),
  activityWindowDays: z.number(),
  generatedAt: z.string(),
});

const responseSchema = z.object({ data: showcaseSchema });

const PublicService = {
  getStreamersShowcase: async (): Promise<IStreamersShowcase | null> => {
    const endpoint = '/api/public/streamers/showcase';
    if (!API_URL) return null;

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        next: { revalidate: STREAMERS_SHOWCASE_REVALIDATE_SECONDS, tags: ['streamers-showcase'] },
        signal: AbortSignal.timeout(STREAMERS_SHOWCASE_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const parsed = responseSchema.safeParse(await response.json());
      if (!parsed.success) {
        console.error('[contract] Unexpected API response', { endpoint, issues: parsed.error.issues });
        return null;
      }
      return parsed.data.data;
    } catch (error) {
      console.error(`[public] ${endpoint} failed`, error);
      return null;
    }
  },
};

export default PublicService;
