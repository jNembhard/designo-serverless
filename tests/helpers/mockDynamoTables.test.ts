import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  createAllTables,
  createPrimaryTable,
  createSortedTable,
  deleteAllTables,
  deleteTable,
} from "./mockDynamoTables";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { testTables } from "../data/tables";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

describe("mockDynamoTables", () => {
  afterAll(async () => {
    await deleteAllTables(testTables);
  });

  describe("createPrimaryTable function", () => {
    it("should create a DynamoDB table with a primary key", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        table: testTables[0],
      });

      const result = await createPrimaryTable({ table: testTables[0] });
      expect(result.TableDescription?.TableName).toEqual("TestPrimaryTable");
    });
  });

  describe("createSortedTable function", () => {
    it("should create a DynamoDB table with a primary hash key and a sort range key", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        table: testTables[1],
      });

      const result = await createSortedTable({ table: testTables[1] });
      expect(result.TableDescription?.TableName).toEqual("TestSortedTable");
    });
  });

  describe("deleteTable function", () => {
    it("should delete single DynamoDB table with a primary hash key", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        tables: testTables[0],
      });

      const result = await deleteTable({ table: testTables[0] });
      expect(result.$metadata.httpStatusCode).toEqual(200);
    });

    it("should delete single DynamoDB table with a primary hash key and a sort range key", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        tables: testTables[1],
      });

      const result = await deleteTable({ table: testTables[1] });
      expect(result.$metadata.httpStatusCode).toEqual(200);
    });
  });

  describe("createAllTables function", () => {
    it("should create a DynamoDB table with a primary hash key and a sort range key", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        table: testTables,
      });

      const result = await createAllTables(testTables);

      expect(result).toEqual(["TestPrimaryTable", "TestSortedTable", "TestPrimaryTable2", "TestSortedTable2"]);
    });
  });
});
