import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../interfaces/interface";
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
  for (let i = 0; i < products.length; i++) {
    console.log(products[i]);
    // await postProduct(products[i]);
  }
};
