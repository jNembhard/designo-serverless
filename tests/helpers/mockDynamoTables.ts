import "dotenv/config";
import { CreateTableCommand, DeleteTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { IMockTables } from "../interface/MockTables";
import { Tables } from "../data/tables";

const client = new DynamoDBClient({ endpoint: process.env.DEV_ENDPOINT });
const docClient = DynamoDBDocumentClient.from(client);

export const createPrimaryTable = async ({ table }: { table: IMockTables }) => {
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
  await docClient.send(createTableCommand);
};

export const createSortedTable = async ({ table }: { table: IMockTables }) => {
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
  await docClient.send(createTableCommand);
};

export const createAllTables = async () => {
  for (const table of Tables) {
    if (table.attributeValue) {
      await createSortedTable({ table });
    } else {
      await createPrimaryTable({ table });
    }
  }
};

export const deleteTable = async ({ table }: { table: IMockTables }) => {
  const deleteTableCommand = new DeleteTableCommand({ TableName: table.tableName });
  await docClient.send(deleteTableCommand);
};

export const deleteAllTables = async () => {
  for (const table of Tables) {
    deleteTable({ table });
  }
};
