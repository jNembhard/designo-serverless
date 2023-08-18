import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ILocation } from "../interfaces/Location";
import { locations } from "../tempData/locationData";
import { clientProductionConfig } from "../config/dynamoClientConfig";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "DesignoLocationsTable";

export const postLocation = async (object: ILocation) => {
  const command = new PutCommand(object);
  const response = await docClient.send(command);

  return response;
};

export const postLocations = async () => {
  let responses = [];

  for (let location of locations) {
    let response = await postLocation(location);
    responses.push(response);
  }

  return responses;
};

export const deleteLocation = async ({ locationID }: { locationID: string }) => {
  const params = {
    TableName: tableName,
    Key: {
      LocationID: locationID,
    },
  };

  const command = new DeleteCommand(params);
  const response = await docClient.send(command);

  return response;
};
