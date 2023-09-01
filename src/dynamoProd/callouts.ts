import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DeleteCommandOutput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { ICallout } from "../interfaces/Callout";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoCalloutTable";

export const getCallout = async (calloutID: string): Promise<GetCommandOutput> => {
  const params = {
    TableName: tableName,
    Key: {
      calloutID: calloutID,
    },
  };

  const command = new GetCommand(params);
  const response = await docClient.send(command);

  return response;
};

export const postCallout = async (object: ICallout): Promise<PutCommandOutput> => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postCallouts = async (callouts: ICallout[]): Promise<void> => {
  for (let callout of callouts) {
    await postCallout(callout);
  }
  console.log("callout items posted");
};

export const deleteCallout = async (calloutID: string): Promise<DeleteCommandOutput> => {
  const params = {
    TableName: tableName,
    Key: {
      calloutID: calloutID,
    },
  };

  const command = new DeleteCommand(params);
  const response = await docClient.send(command);

  return response;
};
