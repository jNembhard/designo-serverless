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
import { callouts } from "../tempData/calloutData";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoCalloutTable";

export const getCallout = async (calloutID: string): Promise<GetCommandOutput["Item"]> => {
  const params = {
    TableName: tableName,
    Key: {
      calloutID: calloutID,
    },
  };

  const command = new GetCommand(params);
  const response = await docClient.send(command);

  return response.Item;
};

export const postCallout = async (object: ICallout): Promise<PutCommandOutput> => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postCallouts = async (): Promise<PutCommandOutput[]> => {
  let responses = [];

  for (let callout of callouts) {
    let response = await postCallout(callout);
    responses.push(response);
  }

  return responses;
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
