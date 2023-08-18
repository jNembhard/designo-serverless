import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { IDesign } from "../interfaces/Design";
import { designs } from "../tempData/designData";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoDesignsTable";

export const postDesign = async (object: IDesign) => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postDesigns = async () => {
  let responses = [];

  for (let design of designs) {
    let response = await postDesign(design);
    responses.push(response);
  }

  return responses;
};

export const deleteDesign = async ({ designID }: { designID: string }) => {
  const params = {
    TableName: tableName,
    Key: {
      DesignID: designID,
    },
  };

  const command = new DeleteCommand(params);
  const response = await docClient.send(command);

  return response;
};
