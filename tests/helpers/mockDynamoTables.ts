import "dotenv/config";
import {
  CreateTableCommand,
  CreateTableCommandOutput,
  DeleteTableCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { DeleteCommandOutput, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { IMockTables } from "../interface/MockTables";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

export const createPrimaryTable = async ({ table }: { table: IMockTables }): Promise<CreateTableCommandOutput> => {
  const createTableCommand = new CreateTableCommand({
    AttributeDefinitions: [
      {
        AttributeName: table.attributeName,
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: table.attributeName,
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: table.tableName,
  });
  let response = await docClient.send(createTableCommand);

  return response;
};

export const createSortedTable = async ({ table }: { table: IMockTables }): Promise<CreateTableCommandOutput> => {
  const createTableCommand = new CreateTableCommand({
    AttributeDefinitions: [
      {
        AttributeName: table.attributeName,
        AttributeType: "S",
      },
      {
        AttributeName: table.attributeValue,
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: table.attributeName,
        KeyType: "HASH",
      },
      {
        AttributeName: table.attributeValue,
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: table.tableName,
  });
  let response = await docClient.send(createTableCommand);

  return response;
};

export const createAllTables = async (tables: IMockTables[]): Promise<Array<string | undefined>> => {
  let responses = [];
  let response;

  for (const table of tables) {
    if (table.attributeValue) {
      response = await createSortedTable({ table });
      responses.push(response.TableDescription?.TableName);
    } else {
      response = await createPrimaryTable({ table });
      responses.push(response.TableDescription?.TableName);
    }
  }

  return responses;
};

export const deleteTable = async ({ table }: { table: IMockTables }): Promise<DeleteCommandOutput> => {
  const deleteTableCommand = new DeleteTableCommand({ TableName: table.tableName });
  const response = await docClient.send(deleteTableCommand);

  return response;
};

export const deleteAllTables = async (tables: IMockTables[]): Promise<void> => {
  for (const table of tables) {
    deleteTable({ table });
  }
};
