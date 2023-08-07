import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { IAbout } from "../interfaces/About";
import { aboutData } from "../tempData/aboutData";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoAboutTable";

export const getAbout = async (id: string) => {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      calloutID: id,
    },
  });
  const response = await docClient.send(command);

  return response;
};

export const postAbout = async (object: IAbout) => {
  const command = new PutCommand(object);

  const response = await docClient.send(command);
  console.log(response);

  return response;
};

export const postAboutList = async () => {
  for (let about of aboutData) {
    await postAbout(about);
  }
};
