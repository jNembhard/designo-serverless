import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DeleteCommandOutput,
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { IDesign } from "../interfaces/Design";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoDesignsTable";

export const postDesign = async (object: IDesign): Promise<PutCommandOutput> => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postDesigns = async (designs: IDesign[]): Promise<void> => {
  for (let design of designs) {
    await postDesign(design);
  }
  console.log("design items posted");
};

export const deleteDesign = async (designID: string): Promise<DeleteCommandOutput> => {
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
