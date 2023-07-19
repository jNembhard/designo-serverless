import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { IAbout } from "../interfaces/About";
import { aboutData } from "../tempData/aboutData";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

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
