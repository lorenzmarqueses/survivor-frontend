import { Item } from "./item";

export interface RequestItemInputs {
  survivorId: number;
  itemId: number;
  quantity: number;
}

export interface Inventory {
  id: number;
  name: string;
  quantity: number;
  itemID: number;
  survivorID: number;
  item: Item;
}

export interface SurvivorInventory {
  id: number;
  name: string;
  inventory: Inventory[];
  infected: boolean;
  createdAt: string;
}

export interface FetchSurvivorsInventoryResponse {
  data: FetchSurvivorsInventoryResponseData;
  total: number;
  page: number;
  limit: number;
}

export interface FetchSurvivorsInventoryResponseData {
  survivorsInventory: SurvivorInventory[];
  inventoriesCount: number;
}
