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
