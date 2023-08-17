import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { IDesign } from "../interfaces/Design";
import { designs } from "../tempData/designData";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

export const postDesign = async (object: IDesign) => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postDesigns = async () => {
  let responses = [];

  for (let design of designs) {
    const response = await postDesign(design);
    responses.push(response);
  }

  return responses;
};
