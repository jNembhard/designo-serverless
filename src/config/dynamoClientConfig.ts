import "dotenv/config";

const environment = process.env.DYNAMO_ENV;

const clientProductionConfig = () => {
  let dynamoConfig = {};

  if (environment === "local") {
    dynamoConfig = { endpoint: process.env.DEV_ENDPOINT };
  }

  return dynamoConfig;
};

export { clientProductionConfig };
