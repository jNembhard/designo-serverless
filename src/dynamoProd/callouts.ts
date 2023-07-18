import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { ICallout } from "../interfaces/interface";
import { callouts } from "../tempData/calloutData";

// serverless invoke local --function postCallout

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getCalloutObj = {
  TableName: "DesignoCalloutTable",
  Key: {
    calloutID: "1",
  },
};

const updateCalloutObj = {
  TableName: "DesignoCalloutTable",
  Key: {
    calloutID: 1,
  },
  UpdateExpression: "set calloutText = :t",
  ExpressionAttributeValues: {
    ":t": "This is a test",
  },
  ReturnValues: "UPDATED_NEW",
};

// write a function that will return a callout object
export const getCallout = async () => {
  const command = new GetCommand(getCalloutObj);
  const response = await docClient.send(command);

  return response;
};

// write a function that will put a callout object into the database
export const postCallout = async (object: ICallout) => {
  const command = new PutCommand(object);

  const response = await docClient.send(command);
  console.log(response);

  return response;
};

export const postCallouts = async () => {
  for (let i = 0; i < callouts.length; i++) {
    // console.log(callouts[i]);
    await postCallout(callouts[i]);
  }
};

// write a function that will update a callout object in the dynamodb table
export const updateCallout = async () => {
  const command = new UpdateCommand(getCalloutObj);
  const response = await docClient.send(command);

  console.log(response);
  return response;
};
