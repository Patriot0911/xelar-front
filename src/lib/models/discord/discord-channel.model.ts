export interface IDiscordChannelModel {
  id: string;
  name: string;
  position: number;
  parentId: string | null;
  topic: string | null;
}
