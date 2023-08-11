import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ISocial } from "../interfaces/Social";
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
  for (let social of socials) {
    await postSocial(social);
  }
};
