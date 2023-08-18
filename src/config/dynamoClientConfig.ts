import "dotenv/config";

const clientProductionConfig = (): object => {
  let dynamoConfig = {};

  if (process.env.DYNAMO_ENV === "local") {
    dynamoConfig = { endpoint: process.env.DEV_ENDPOINT };
  }

  return dynamoConfig;
};

export { clientProductionConfig };
