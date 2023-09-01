import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { deleteAboutItem, getAbout, postAbout, postAboutList } from "../../src/dynamoProd/about";
import { createPrimaryTable, deleteTable } from "../helpers/mockDynamoTables";
import { aboutData } from "../../src/tempData/aboutData";
import { Tables } from "../data/tables";
import { updateItem } from "../../src/dynamoProd/update";
import { updateAbout, updateError } from "../data/updateItems";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

const aboutTableData = Tables[0];
const aboutError = updateError("DesignoAboutTable");

describe("DesignoAboutTable", () => {
  beforeAll(async () => {
    await createPrimaryTable({ table: aboutTableData });
  });

  afterAll(async () => {
    await deleteTable({ table: aboutTableData });
  });

  describe("postAbout function", () => {
    it("should add a new AboutID", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: aboutData[0],
      });
      const result = await postAbout(aboutData[0]);
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });

  describe("postAboutList function", () => {
    it("should add a list of items to the DesignoAboutTable", async () => {
      const consoleLogMock = jest.spyOn(console, "log");
      consoleLogMock.mockImplementation(() => {});

      docClient.send = jest.fn().mockResolvedValue({
        Items: aboutData,
      });

      await postAboutList(aboutData);
      expect(consoleLogMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAbout function", () => {
    it("should retrieve data for an existing AboutID containing a heroPatternDesktop and heroPatternMobile image", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: aboutData[0],
      });
      const result = await getAbout("about-1");
      expect(result.Item).toEqual(aboutData[0].Item);
    });

    it("should retrieve data for an existing AboutID containing a keyPointBgPattern image", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: aboutData[1],
      });
      const result = await getAbout("about-2");
      expect(result.Item).toEqual(aboutData[1].Item);
    });
  });

  describe("UpdateItem function in about", () => {
    it("should find an AboutID and update an existing item", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: updateAbout,
      });

      const result = await updateItem(updateAbout);

      expect(result?.$metadata.httpStatusCode).toEqual(200);
      expect(result?.Attributes).toEqual({ title: "test about" });
    });

    it("should not find an AboutID or update an existing item", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: aboutError,
      });

      const result = await updateItem(aboutError);
      expect(result).toBeUndefined();
    });
  });

  describe("deleteAbout function", () => {
    it("should delete an existing item based on the AboutID", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: aboutData[0],
      });

      const result = await deleteAboutItem("about-1");
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });
});
