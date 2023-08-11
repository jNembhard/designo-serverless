import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ILocation } from "../interfaces/Location";
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
  for (let location of locations) {
    await postLocation(location);
  }
};
