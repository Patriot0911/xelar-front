/** A server saved to favorites — just enough to render it in the nav and open its page. */
export interface IFavoriteGuild {
  /** Discord guild id (snowflake) — used for the page URL and requests. */
  id: string;
  name: string;
  /** Discord CDN logo URL; `null` when the server has no icon. */
  iconUrl: string | null;
};
