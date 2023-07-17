export interface IProduct {
  TableName: string;
  Item: IProductItem;
}

export interface IProductItem {
  productID: string;
  productNumber: string;
  title: string;
  description: string;
  productImageUrl: string;
  type: string;
}
