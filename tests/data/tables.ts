import { IMockTables } from "../interface/MockTables";

export const Tables: IMockTables[] = [
  {
    tableName: "DesignoAboutTable",
    attributeName: "AboutID",
  },
  {
    tableName: "DesignoCalloutTable",
    attributeName: "calloutID",
  },
  {
    tableName: "DesignoDesignsTable",
    attributeName: "DesignID",
  },
  {
    tableName: "DesignoProductsTable",
    attributeName: "ProductType",
    attributeValue: "ProductID",
  },
  {
    tableName: "DesignoLocationsTable",
    attributeName: "LocationID",
  },
  {
    tableName: "DesignoSocialsTable",
    attributeName: "SocialID",
  },
];

export const testTables: IMockTables[] = [
  { tableName: "TestPrimaryTable", attributeName: "PrimaryID" },
  { tableName: "TestSortedTable", attributeName: "AppName", attributeValue: "APPID" },
  { tableName: "TestPrimaryTable2", attributeName: "PrimaryID" },
  { tableName: "TestSortedTable2", attributeName: "DesignName", attributeValue: "DesignID" },
];
