import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { IProduct } from "../interfaces/Product";
import { products } from "../tempData/productData";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const postProduct = async (object: IProduct) => {
  const command = new PutCommand(object);

  const response = await docClient.send(command);
  console.log(response);

  return response;
};

export const postProducts = async () => {
  for (let product of products) {
    await postProduct(product);
  }
};
