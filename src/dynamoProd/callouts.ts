import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ICallout } from "../interfaces/Callout";
import { callouts } from "../tempData/calloutData";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoCalloutTable";

const getCalloutObj = {
  TableName: tableName,
  Key: {
    calloutID: "callout-1",
  },
};

const updateCalloutObj = {
  TableName: tableName,
  Key: {
    calloutID: "callout-4",
  },
  UpdateExpression: "set title = :title",
  ExpressionAttributeValues: {
    ":title": "engaging",
  },
  ReturnValues: "UPDATED_NEW",
};

export const getCallout = async () => {
  const command = new GetCommand(getCalloutObj);
  const response = await docClient.send(command);

  return response;
};

export const postCallout = async (object: ICallout) => {
  const command = new PutCommand(object);

  const response = await docClient.send(command);
  console.log(response);

  return response;
};

export const postCallouts = async () => {
  for (let callout of callouts) {
    await postCallout(callout);
  }
};

export const updateCallout = async () => {
  try {
    const command = new UpdateCommand(updateCalloutObj);
    const response = await docClient.send(command);

    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
