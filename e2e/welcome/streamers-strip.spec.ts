import { expect, test } from '@playwright/test';
import showcase from '../fixtures/streamers-showcase.json';

const strip = (page: import('@playwright/test').Page) => page.getByRole('region', { name: 'Streamers on Xelar' });

test.describe('Welcome · streamers strip', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('sits right under the hero with a small gap', async ({ page }) => {
    const hero = await page.locator('#hero').boundingBox();
    const box = await strip(page).boundingBox();

    expect(hero && box).toBeTruthy();
    const gap = box!.y - (hero!.y + hero!.height);
    expect(gap).toBeGreaterThanOrEqual(0);
    expect(gap).toBeLessThanOrEqual(24);
  });

  test('shows platform stats in the caption', async ({ page }) => {
    const caption = strip(page).locator('p').first();
    await expect(caption).toContainText('137 streamers');
    await expect(caption).toContainText('9.3K alerts in 30 days');
    await expect(caption).toContainText('412 Discord servers');
  });

  test('renders every streamer once for assistive tech, linking to Twitch', async ({ page }) => {
    const links = strip(page).getByRole('link');
    await expect(links).toHaveCount(showcase.streamers.length);

    const first = showcase.streamers[0];
    const firstLink = strip(page).getByRole('link', { name: `${first.displayName} on Twitch` });
    await expect(firstLink).toHaveAttribute('href', `https://www.twitch.tv/${first.twitchLogin}`);
    await expect(firstLink).toHaveAttribute('target', '_blank');
  });

  test('marks only the top active streamer', async ({ page }) => {
    const top = strip(page).locator('a[data-top="true"]:not([tabindex="-1"])');
    await expect(top).toHaveCount(1);
    await expect(top).toContainText(showcase.streamers[0].displayName);
    await expect(top).toContainText('Top');
  });

  test('falls back to initials when there is no avatar', async ({ page }) => {
    const noAvatar = showcase.streamers.find((s) => !s.profileImageUrl)!;
    const card = strip(page).getByRole('link', { name: `${noAvatar.displayName} on Twitch` });
    await expect(card.locator('img')).toHaveCount(0);
    await expect(card).toContainText(noAvatar.displayName.slice(0, 1).toUpperCase());
  });

  test('loops with a hidden, unfocusable clone and pauses on hover', async ({ page }) => {
    const lists = strip(page).locator('ul');
    await expect(lists).toHaveCount(2);

    const clone = lists.nth(1);
    await expect(clone).toHaveAttribute('aria-hidden', 'true');
    for (const link of await clone.locator('a').all()) {
      await expect(link).toHaveAttribute('tabindex', '-1');
    }

    const track = lists.first().locator('..');
    await expect(track).toHaveCSS('animation-play-state', 'running');
    expect(await track.evaluate((el) => getComputedStyle(el).animationName)).not.toBe('none');

    // Cards never become "stable" while scrolling, so hover the static viewport around them.
    await strip(page).locator('[data-animated="true"]').hover();
    await expect(track).toHaveCSS('animation-play-state', 'paused');
  });

  test('matches the design', async ({ page }) => {
    // Playwright freezes CSS animations for screenshots, so the marquee is captured at its start.
    // `nextjs-portal` is the dev-server indicator; it overlaps the first card.
    await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
    await expect(strip(page)).toHaveScreenshot('streamers-strip.png');
  });
});

test.describe('Welcome · streamers strip · reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('becomes a static scrollable row without the clone', async ({ page }) => {
    await page.goto('/');
    const lists = strip(page).locator('ul');

    await expect(lists.nth(1)).toBeHidden();
    expect(await lists.first().locator('..').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  });
});
