import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { deleteProduct, postProduct, postProducts } from "../../src/dynamoProd/products";
import { createSortedTable, deleteTable } from "../helpers/mockDynamoTables";
import { products } from "../../src/tempData/productData";
import { Tables } from "../data/tables";
import { updateSortedError, updateProduct } from "../data/updateItems";
import { updateItem, updateSortedItem } from "../../src/dynamoProd/update";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

const productsTable = Tables[3];
const productError = updateSortedError("DesignoProductsTable");

describe("DesignoProductsTable", () => {
  beforeAll(async () => {
    await createSortedTable({ table: productsTable });
  });

  afterAll(async () => {
    await deleteTable({ table: productsTable });
  });

  describe("postProduct function", () => {
    it("should add new data to the DesignoDesignsTable", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: products[0],
      });
      const result = await postProduct(products[0]);
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });

  describe("postProducts function", () => {
    it("should add a list of items to the DesignoProductsTable", async () => {
      const consoleLogMock = jest.spyOn(console, "log");
      consoleLogMock.mockImplementation(() => {});

      docClient.send = jest.fn().mockResolvedValue({
        Items: products,
      });

      await postProducts(products);
      expect(consoleLogMock).toHaveBeenCalledTimes(1);
    }, 10000);
  });

  describe("updateItem function in products", () => {
    it("should find a ProductID and update an existing item", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: updateProduct,
      });

      const result = await updateSortedItem(updateProduct);

      expect(result?.$metadata.httpStatusCode).toEqual(200);
      expect(result?.Attributes).toEqual({ title: "test product" });
    });

    it("should not find a ProductID or update an existing item", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: productError,
      });

      const result = await updateItem(productError);
      expect(result).toBeUndefined();
    });
  });

  describe("deleteProduct function", () => {
    it("should delete an existing item based on the ProductType and ProductID", async () => {
      docClient.send = jest.fn().mockResolvedValue({
        Item: products[0],
      });

      const result = await deleteProduct({ productType: "WebDesign", productID: "web-1" });
      expect(result.$metadata.httpStatusCode).toBe(200);
    });
  });
});
