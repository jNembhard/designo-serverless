export interface IProduct {
  TableName: string;
  Item: IProductItem;
}

interface IProductItem {
  ProductType: string;
  ProductID: string;
  title: string;
  description: string;
  productImageUrl: string;
}

export interface ICallout {
  TableName: string;
  Item: ICalloutItem;
}

interface ICalloutItem {
  calloutID: string;
  title: string;
  description: string;
  calloutImageUrl: string;
}
