import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { IAbout } from "../interfaces/About";
import { aboutData } from "../tempData/aboutData";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoAboutTable";

export const getAbout = async (aboutID: string) => {
  const params = {
    TableName: tableName,
    Key: {
      AboutID: aboutID,
    },
  };

  const command = new GetCommand(params);
  const response = await docClient.send(command);

  return response.Item;
};

export const postAbout = async (object: IAbout) => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postAboutList = async () => {
  let responses = [];

  for (let about of aboutData) {
    let response = await postAbout(about);
    responses.push(response);
  }

  return responses;
};

export const deleteAboutItem = async ({ aboutID }: { aboutID: string }) => {
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
