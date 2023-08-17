import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getCallout, postCallout, postCallouts } from "../../src/dynamoProd/callouts";
import { createPrimaryTable, deleteTable } from "../helpers/mockDynamoTables";
import { callouts } from "../../src/tempData/calloutData";
import { Tables } from "../data/tables";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

const calloutTable = Tables[1];

describe("DesignoCalloutTable", () => {
  beforeAll(async () => {
    await createPrimaryTable({ table: calloutTable });
  });

  afterAll(async () => {
    await deleteTable({ table: calloutTable });
  });

  describe("postCallout function", () => {
    it("should add new data to the DesignoCalloutTable", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: callouts[0],
      });
      const result = await postCallout(callouts[0]);
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });

  describe("postCallouts function", () => {
    it("should add a list of new data to the DesignoCalloutTable", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Items: callouts,
      });
      const results = await postCallouts();
      expect(results.length).toEqual(3);
    });
  });

  describe("getCallout function", () => {
    it("should retrieve data by an existing calloutID", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: callouts[0],
      });
      const result = await getCallout("callout-1");
      expect(result).toEqual(callouts[0].Item);
    });
  });
});
