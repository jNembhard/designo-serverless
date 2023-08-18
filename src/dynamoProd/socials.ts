import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ISocial } from "../interfaces/Social";
import { socials } from "../tempData/socialData";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoSocialsTable";

export const postSocial = async (object: ISocial) => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postSocials = async () => {
  let responses = [];
  for (let social of socials) {
    let response = await postSocial(social);
    responses.push(response);
  }

  return responses;
};

export const deleteSocialItem = async ({ socialID }: { socialID: string }) => {
  const params = {
    TableName: tableName,
    Key: {
      SocialID: socialID,
    },
  };

  const command = new DeleteCommand(params);
  const response = await docClient.send(command);

  return response;
};
