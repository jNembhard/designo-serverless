import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { deleteDesign, postDesign, postDesigns } from "../../src/dynamoProd/designs";
import { createPrimaryTable, deleteTable } from "../helpers/mockDynamoTables";
import { designs } from "../../src/tempData/designData";
import { Tables } from "../data/tables";
import { updateItem } from "../../src/dynamoProd/update";
import { updateDesign, updateError } from "../data/updateItems";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT, region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const designsTable = Tables[2];
const designsError = updateError("DesignoDesignsTable");

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
      const consoleLogMock = jest.spyOn(console, "log");
      consoleLogMock.mockImplementation(() => {});

      docClient.send = jest.fn().mockResolvedValue({
        Items: designs,
      });

      await postDesigns(designs);
      expect(consoleLogMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateItem function in designs", () => {
    it("should find an DesignID and update an existing item", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: updateDesign,
      });

      const result = await updateItem(updateDesign);

      expect(result?.$metadata.httpStatusCode).toEqual(200);
      expect(result?.Attributes).toEqual({ title: "test design" });
    });

    it("should not find a DesignID or update an existing item", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: designsError,
      });

      const result = await updateItem(designsError);
      expect(result).toBeUndefined();
    });
  });

  describe("deleteDesign function", () => {
    it("should delete an existing item based on the DesignID", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: designs[0],
      });

      const result = await deleteDesign("design-1");
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });
});
