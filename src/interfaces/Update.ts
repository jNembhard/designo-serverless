export interface IUpdateItem {
  tableName: string;
  hashKey: string;
  hashID: string;
  updateKey: string;
  updateValue: string;
}

export interface IUpdateSortedItem {
  tableName: string;
  hashKey: string;
  hashID: string;
  sortKey: string;
  sortValue: string;
  updateKey: string;
  updateValue: string;
}
