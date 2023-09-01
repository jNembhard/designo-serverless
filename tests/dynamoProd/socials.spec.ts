import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { deleteSocialItem, postSocial, postSocials } from "../../src/dynamoProd/socials";
import { createPrimaryTable, deleteTable } from "../helpers/mockDynamoTables";
import { socials } from "../../src/tempData/socialData";
import { Tables } from "../data/tables";
import { updateError, updateSocial } from "../data/updateItems";
import { updateItem } from "../../src/dynamoProd/update";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

const socialsTable = Tables[5];
const socialsError = updateError("DesignoSocialsTable");

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
      const consoleLogMock = jest.spyOn(console, "log");
      consoleLogMock.mockImplementation(() => {});

      docClient.send = jest.fn().mockResolvedValue({
        Items: socials,
      });

      await postSocials(socials);
      expect(consoleLogMock).toHaveBeenCalledTimes(1);
    }, 8000);
  });

  describe("updateItem function in socials", () => {
    it("should find a SocialID and update an existing item", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: updateSocial,
      });

      const result = await updateItem(updateSocial);

      expect(result?.$metadata.httpStatusCode).toEqual(200);
      expect(result?.Attributes).toEqual({ title: "test social" });
    });

    it("should not find a SocialID or update an existing item", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: socialsError,
      });

      const result = await updateItem(socialsError);
      expect(result).toBeUndefined();
    });
  });

  describe("deleteSocialItem function", () => {
    it("should delete an existing item based on the SocialID", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: socials[0],
      });

      const result = await deleteSocialItem("social-1");
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });
});
