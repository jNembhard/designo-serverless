export interface IProduct {
  TableName: string;
  Item: IProductItem;
}

interface IProductItem {
  ProductType: string;
  ProductID: string;
  title: string;
  description: string;
  image: string;
}
