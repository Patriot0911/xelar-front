export interface ITwitchCategoryModel {
  id: string;
  name: string;
  boxArtUrl: string;
}

export interface ITwitchCategoriesResponse {
  items: ITwitchCategoryModel[];
  meta: { cursor?: string };
}
