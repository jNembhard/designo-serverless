import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getAbout, postAbout, postAboutList } from "../../src/dynamoProd/about";
import { createPrimaryTable, deleteTable } from "../helpers/mockDynamoTables";
import { aboutData } from "../../src/tempData/aboutData";
import { Tables } from "../data/tables";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

const aboutTableData = Tables[0];

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
      docClient.send = jest.fn().mockResolvedValue({
        Items: aboutData,
      });
      const results = await postAboutList();
      expect(results.length).toEqual(3);
    });
  });

  describe("getAbout function", () => {
    it("should retrieve data for an existing AboutID containing a heroPatternDesktop and heroPatternMobile image", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: aboutData[0],
      });
      const result = await getAbout("about-1");
      expect(result).toEqual(aboutData[0].Item);
    });

    it("should retrieve data for an existing AboutID containing a keyPointBgPattern image", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: aboutData[1],
      });
      const result = await getAbout("about-2");
      expect(result).toEqual(aboutData[1].Item);
    });
  });
});
