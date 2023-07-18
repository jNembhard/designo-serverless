export interface IProduct {
  TableName: string;
  Item: IProductItem;
}

export interface IProductItem {
  ProductType: string;
  ProductID: string;
  title: string;
  description: string;
  productImageUrl: string;
}
