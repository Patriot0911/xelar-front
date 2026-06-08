'use client';

import DiscordGuildCard from '@/components/discord/DiscordGuildCard';
import type { IDiscordGuildModel } from '@/lib/models/discord';

const MOCK_GUILDS: IDiscordGuildModel[] = [
  {
    id: '1', name: 'Overwatch UA', icon: null, banner: null, owner: true,
    permissions: '8', features: [], memberCount: 10, presenceCount: 4,
    balance: 0, notificationCount: 12, hasBot: true,
  },
  {
    id: '2', name: 'Valorant Hub', icon: null, banner: null, owner: false,
    permissions: '8', features: [], memberCount: 1200, presenceCount: 340,
    balance: 0, notificationCount: 86, hasBot: true,
  },
  {
    id: '3', name: 'Indie Devs', icon: null, banner: null, owner: false,
    permissions: '0', features: [], memberCount: 540, presenceCount: 88,
    balance: 0, notificationCount: 5, hasBot: true,
  },
  {
    id: '4', name: 'Pixel Art Club', icon: null, banner: null, owner: true,
    permissions: '8', features: [], memberCount: 1100, presenceCount: 0,
    balance: 0, notificationCount: 0, hasBot: false,
  },
];

export default function DevPreviewDiscordPage() {
  return (
    <div style={{ padding: 32, background: 'var(--bg-0)', minHeight: '100vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {MOCK_GUILDS.map((guild) => (
          <DiscordGuildCard key={guild.id} guild={guild} />
        ))}
      </div>
    </div>
  );
}
