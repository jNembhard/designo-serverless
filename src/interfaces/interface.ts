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

export interface ILocation {
  TableName: string;
  Item: ILocationItem;
}

interface ILocationItem {
  LocationID: string;
  locationName: string;
  locationImageUrls: ILocationBreakpoints;
  address: ILocationAddress;
  contact: IContact;
  office: string;
  link: string;
}

interface ILocationAddress {
  street: string;
  country: string;
}

interface ILocationBreakpoints {
  desktop: string;
  tablet: string;
  icon: string;
}

interface IContact {
  phone: string;
  email: string;
}
