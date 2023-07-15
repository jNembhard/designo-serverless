import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

// serverless invoke local --function postCallout

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getCalloutObj = {
  TableName: "DesignoCalloutTable",
  Key: {
    calloutID: "1",
  },
};

const putItemObj = {
  TableName: "DesignoCalloutTable",
  Item: {
    calloutID: "3",
    title: "Friendly",
    description:
      "We are a group of enthusiastic folks who know how to put people first. Our success depends on our customers, and we strive to give them the best experience a company can provide.",
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
export const postCallout = async () => {
  const command = new PutCommand(putItemObj);

  const response = await docClient.send(command);
  console.log(response);

  return response;
};

// write a function that will update a callout object in the dynamodb table
export const updateCallout = async () => {
  const command = new UpdateCommand(getCalloutObj);
  const response = await docClient.send(command);

  console.log(response);
  return response;
};
