import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  DeleteCommandOutput,
  PutCommandOutput,
  GetCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { IAbout } from "../interfaces/About";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoAboutTable";

export const getAbout = async (aboutID: string): Promise<GetCommandOutput> => {
  const params = {
    TableName: tableName,
    Key: {
      AboutID: aboutID,
    },
  };

  const command = new GetCommand(params);
  const response = await docClient.send(command);

  return response;
};

export const postAbout = async (object: IAbout): Promise<PutCommandOutput> => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postAboutList = async (aboutData: IAbout[]): Promise<void> => {
  for (let about of aboutData) {
    await postAbout(about);
  }
  console.log("about items posted");
};

export const deleteAboutItem = async (aboutID: string): Promise<DeleteCommandOutput> => {
  const params = {
    TableName: tableName,
    Key: {
      AboutID: aboutID,
    },
  };

  const command = new DeleteCommand(params);
  const response = await docClient.send(command);

  return response;
};
