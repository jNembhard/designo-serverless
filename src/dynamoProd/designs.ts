import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { IDesign } from "../interfaces/Design";
import { designs } from "../tempData/designData";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const postDesign = async (object: IDesign) => {
  const command = new PutCommand(object);

  const response = await docClient.send(command);
  console.log(response);

  return response;
};

export const postDesigns = async () => {
  for (let design of designs) {
    await postDesign(design);
  }
};
