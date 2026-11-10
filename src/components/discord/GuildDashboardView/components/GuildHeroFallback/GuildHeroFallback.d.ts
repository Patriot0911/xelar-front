export interface IGuildHeroFallbackProps {
  guildId: string;
  error: unknown;
  onRetry: () => void;
};
