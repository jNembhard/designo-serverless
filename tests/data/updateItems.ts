import { IUpdateItem, IUpdateSortedItem } from "../../src/interfaces/Update";

const updateAbout: IUpdateItem = {
  tableName: "DesignoAboutTable",
  hashKey: "AboutID",
  hashID: "about-1",
  updateKey: "title",
  updateValue: "test about",
};

const updateCallout: IUpdateItem = {
  tableName: "DesignoCalloutTable",
  hashKey: "calloutID",
  hashID: "callout-1",
  updateKey: "title",
  updateValue: "test callout",
};

const updateDesign: IUpdateItem = {
  tableName: "DesignoDesignsTable",
  hashKey: "DesignID",
  hashID: "design-1",
  updateKey: "title",
  updateValue: "test design",
};

const updateLocation: IUpdateItem = {
  tableName: "DesignoLocationsTable",
  hashKey: "LocationID",
  hashID: "location-1",
  updateKey: "title",
  updateValue: "test location",
};

const updateProduct: IUpdateSortedItem = {
  tableName: "DesignoProductsTable",
  hashKey: "ProductType",
  hashID: "app-1",
  sortKey: "ProductID",
  sortValue: "app-1",
  updateKey: "title",
  updateValue: "test product",
};

const updateSocial: IUpdateItem = {
  tableName: "DesignoSocialsTable",
  hashKey: "SocialID",
  hashID: "social-1",
  updateKey: "title",
  updateValue: "test social",
};

const updateError = (tableName: string): IUpdateItem => {
  const errorObj: IUpdateItem = {
    tableName: tableName,
    hashKey: "ErrorID",
    hashID: "social-1",
    updateKey: "title",
    updateValue: "test",
  };

  return errorObj;
};

const updateSortedError = (tableName: string): IUpdateSortedItem => {
  const errorObj: IUpdateSortedItem = {
    tableName: tableName,
    hashKey: "ProductType",
    hashID: "AppReal",
    sortKey: "ProductID",
    sortValue: "ai-2",
    updateKey: "title",
    updateValue: "test",
  };

  return errorObj;
};

export {
  updateAbout,
  updateCallout,
  updateDesign,
  updateError,
  updateLocation,
  updateSortedError,
  updateProduct,
  updateSocial,
};
