import { ILocation } from "../interfaces/Location";

const locationOne: ILocation = {
  TableName: "DesignoLocationsTable",
  Item: {
    LocationID: "location-1",
    name: "canada",
    images: {
      desktop: "https://d39flyyba0jiph.cloudfront.net/assets/locations/desktop/image-map-canada.png",
      tablet: "https://d39flyyba0jiph.cloudfront.net/assets/locations/tablet/image-map-canada.png",
      icon: "https://d39flyyba0jiph.cloudfront.net/assets/shared/desktop/illustration-canada.svg",
    },
    address: {
      street: "3886 Wellington St",
      country: "Toronto, Ontario M9C 3J5",
    },
    contact: {
      phone: "P : +1 253-863-8967",
      email: "M : contact@designo.co",
    },
    office: "Designo Central Office",
    slug: "#canada",
  },
};

const locationTwo: ILocation = {
  TableName: "DesignoLocationsTable",
  Item: {
    LocationID: "location-2",
    name: "australia",
    images: {
      desktop: "https://d39flyyba0jiph.cloudfront.net/assets/locations/desktop/image-map-australia.png",
      tablet: "https://d39flyyba0jiph.cloudfront.net/assets/locations/tablet/image-map-australia.png",
      icon: "https://d39flyyba0jiph.cloudfront.net/assets/shared/desktop/illustration-australia.svg",
    },
    address: {
      street: "19 Balonne St",
      country: "New South Wales 2443",
    },
    contact: {
      phone: "P : (02) 6720 9092",
      email: "M : contact@designo.au",
    },
    office: "Designo AU Office",
    slug: "#australia",
  },
};

const locationThree = {
  TableName: "DesignoLocationsTable",
  Item: {
    LocationID: "location-3",
    name: "united kingdom",
    images: {
      desktop: "https://d39flyyba0jiph.cloudfront.net/assets/locations/desktop/image-map-united-kingdom.png",
      tablet: "https://d39flyyba0jiph.cloudfront.net/assets/locations/tablet/image-map-uk.png",
      icon: "https://d39flyyba0jiph.cloudfront.net/assets/shared/desktop/illustration-united-kingdom.svg",
    },
    address: {
      street: "13 Colorado Way",
      country: "Rhyd-y-fro SA8 9GA",
    },
    contact: {
      phone: "P : 078 3115 1400",
      email: "M : contact@designo.uk",
    },
    office: "Designo UK Office",
    slug: "#united-kingdom",
  },
};

export const locations: ILocation[] = [locationOne, locationTwo, locationThree];
