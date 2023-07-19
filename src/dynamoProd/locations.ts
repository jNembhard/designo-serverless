import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { ILocation } from "../interfaces/interface";
import { locations } from "../tempData/locationData";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const postLocation = async (object: ILocation) => {
  const command = new PutCommand(object);

  const response = await docClient.send(command);
  console.log(response);

  return response;
};

export const postLocations = async () => {
  for (let i = 0; i < locations.length; i++) {
    // console.log(locations[i]);
    await postLocation(locations[i]);
  }
};
