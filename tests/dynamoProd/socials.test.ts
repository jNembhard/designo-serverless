import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { postSocial, postSocials } from "../../src/dynamoProd/socials";
import { createPrimaryTable, deleteTable } from "../helpers/mockDynamoTables";
import { socials } from "../../src/tempData/socialData";
import { Tables } from "../data/tables";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

const socialsTable = Tables[5];

describe("DesignoSocialsTable", () => {
  beforeAll(async () => {
    await createPrimaryTable({ table: socialsTable });
  });

  afterAll(async () => {
    await deleteTable({ table: socialsTable });
  });

  describe("postSocial function", () => {
    it("should add new data to the DesignoSocialsTable", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: socials[0],
      });
      const result = await postSocial(socials[0]);
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });

  describe("postSocials function", () => {
    it("should add a list of new data to the DesignoSocialsTable", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Items: socials,
      });
      const result = await postSocials();
      expect(result.length).toEqual(5);
    });
  });
});
