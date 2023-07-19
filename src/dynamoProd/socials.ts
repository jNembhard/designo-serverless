import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { ISocial } from "../interfaces/interface";
import { socials } from "../tempData/socialData";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const postSocial = async (object: ISocial) => {
  const command = new PutCommand(object);

  const response = await docClient.send(command);
  console.log(response);

  return response;
};

export const postSocials = async () => {
  for (let i = 0; i < socials.length; i++) {
    await postSocial(socials[i]);
  }
};
