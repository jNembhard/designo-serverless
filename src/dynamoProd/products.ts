import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DeleteCommandOutput,
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { IProduct } from "../interfaces/Product";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();
const tableName = "DesignoProductsTable";

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

export const postProduct = async (object: IProduct): Promise<PutCommandOutput> => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postProducts = async (products: IProduct[]): Promise<void> => {
  for (let product of products) {
    await postProduct(product);
  }
  console.log("product items posted");
};

export const deleteProduct = async ({
  productType,
  productID,
}: {
  productType: string;
  productID: string;
}): Promise<DeleteCommandOutput> => {
  const params = {
    TableName: tableName,
    Key: {
      ProductType: productType,
      ProductID: productID,
    },
  };

  const command = new DeleteCommand(params);
  const response = await docClient.send(command);

  return response;
};
