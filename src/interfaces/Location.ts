export interface ILocation {
  TableName: string;
  Item: ILocationItem;
}

interface ILocationItem {
  LocationID: string;
  name: string;
  images: ILocationImages;
  address: ILocationAddress;
  contact: IContact;
  office: string;
  slug: string;
}

interface ILocationAddress {
  street: string;
  country: string;
}

interface ILocationImages {
  desktop: string;
  tablet: string;
  icon: string;
}

interface IContact {
  phone: string;
  email: string;
}
