import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { postLocation, postLocations } from "../../src/dynamoProd/locations";
import { createPrimaryTable, deleteTable } from "../helpers/mockDynamoTables";
import { locations } from "../../src/tempData/locationData";
import { Tables } from "../data/tables";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

const locationsTable = Tables[4];

describe("DesignoLocationsTable", () => {
  beforeAll(async () => {
    await createPrimaryTable({ table: locationsTable });
  });

  afterAll(async () => {
    await deleteTable({ table: locationsTable });
  });

  describe("postLocation function", () => {
    it("should add one new item to the DesignoLocationsTable", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: locations[0],
      });
      const result = await postLocation(locations[0]);
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });

  describe("postLocations function", () => {
    it("should add a list of new data to the DesignLocationsTable", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Items: locations,
      });
      const results = await postLocations();
      expect(results.length).toEqual(3);
    });
  });
});
