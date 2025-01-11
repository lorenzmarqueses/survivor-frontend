export interface Item {
  id: number;
  name: string;
  description: string;
  type: "WATER" | "FOOD" | "MEDICATION" | "CVIRUS_VACCINE";
}

export interface FetchItemsResponse {
  data: FetchItemsResponseData;
  total: number;
  page: number;
  limit: number;
}

export interface FetchItemsResponseData {
  items: Item[];
}
