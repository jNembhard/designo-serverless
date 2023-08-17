import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ICallout } from "../interfaces/Callout";
import { callouts } from "../tempData/calloutData";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoCalloutTable";

export const getCallout = async (calloutID: string) => {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      calloutID: calloutID,
    },
  });
  const response = await docClient.send(command);

  return response.Item;
};

export const postCallout = async (object: ICallout) => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postCallouts = async () => {
  let responses = [];

  for (let callout of callouts) {
    let response = await postCallout(callout);
    responses.push(response);
  }

  return responses;
};
