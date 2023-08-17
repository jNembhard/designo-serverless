import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { postDesign, postDesigns } from "../../src/dynamoProd/designs";
import { createPrimaryTable, deleteTable } from "../helpers/mockDynamoTables";
import { designs } from "../../src/tempData/designData";
import { Tables } from "../data/tables";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

const designsTable = Tables[2];

describe("DesignoDesignsTable", () => {
  beforeAll(async () => {
    await createPrimaryTable({ table: designsTable });
  });

  afterAll(async () => {
    await deleteTable({ table: designsTable });
  });

  describe("postDesign function", () => {
    it("should add new data to the DesignoDesignsTable", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: designs[0],
      });
      const result = await postDesign(designs[0]);
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });

  describe("postDesigns function", () => {
    it("should add a list of new data to the DesignoDesignsTable", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Items: designs,
      });
      const result = await postDesigns();
      expect(result.length).toEqual(3);
    });
  });
});
