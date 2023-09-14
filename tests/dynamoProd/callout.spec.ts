import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { deleteCallout, getCallout, postCallout, postCallouts } from "../../src/dynamoProd/callouts";
import { createPrimaryTable, deleteTable } from "../helpers/mockDynamoTables";
import { callouts } from "../../src/tempData/calloutData";
import { Tables } from "../data/tables";
import { updateItem } from "../../src/dynamoProd/update";
import { updateCallout, updateError } from "../data/updateItems";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT, region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const calloutTable = Tables[1];
const calloutError = updateError("DesignoCalloutTable");

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
      const consoleLogMock = jest.spyOn(console, "log");
      consoleLogMock.mockImplementation(() => {});

      docClient.send = jest.fn().mockResolvedValue({
        Items: callouts,
      });

      await postCallouts(callouts);
      expect(consoleLogMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("getCallout function", () => {
    it("should retrieve data by an existing calloutID", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: callouts[0],
      });
      const result = await getCallout("callout-1");
      expect(result.Item).toEqual(callouts[0].Item);
    });
  });

  describe("updateItem function in callouts", () => {
    it("should find an calloutID and update an existing item", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: updateCallout,
      });

      const result = await updateItem(updateCallout);

      expect(result?.$metadata.httpStatusCode).toEqual(200);
      expect(result?.Attributes).toEqual({ title: "test callout" });
    });

    it("should not find a calloutID or update an existing item", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: calloutError,
      });
      const result = await updateItem(calloutError);
      expect(result).toBeUndefined();
    });
  });

  describe("deleteCallout function", () => {
    it("should delete an existing item based on the calloutID", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: callouts[0],
      });

      const result = await deleteCallout("callout-1");
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });
});
