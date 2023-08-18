import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";
import { clientProductionConfig } from "../config/dynamoClientConfig";
import { IUpdateItem, IUpdateSortedItem } from "../interfaces/Update";

const prodConfig = clientProductionConfig();

const client = new DynamoDBClient(prodConfig);
const docClient = DynamoDBDocumentClient.from(client);

export const updateItem = async (object: IUpdateItem): Promise<UpdateCommandOutput | void> => {
  const updateObj = {
    TableName: object.tableName,
    Key: {
      [object.hashKey]: object.hashID,
    },
    UpdateExpression: `set ${object.updateKey} = :${object.updateKey}`,
    ExpressionAttributeValues: {
      [`:${object.updateKey}`]: `${object.updateValue}`,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const command = new UpdateCommand(updateObj);
    const response = await docClient.send(command);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const updateSortedItem = async (object: IUpdateSortedItem): Promise<UpdateCommandOutput | void> => {
  const updateObj = {
    TableName: object.tableName,
    Key: {
      [object.hashKey]: object.hashID,
      [object.sortKey]: object.sortValue,
    },
    UpdateExpression: `set ${object.updateKey} = :${object.updateKey}`,
    ExpressionAttributeValues: {
      [`:${object.updateKey}`]: `${object.updateValue}`,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const command = new UpdateCommand(updateObj);
    const response = await docClient.send(command);

    return response;
  } catch (err) {
    console.log(err);
  }
};
