import "dotenv/config";

type config = {
  endpoint?: string;
  region: string | undefined;
};

const clientProductionConfig = (): config => {
  const region_aws = process.env.AWS_REGION;

  let dynamoConfig: config = { region: region_aws };

  if (process.env.DYNAMO_ENV === "local") {
    dynamoConfig = { endpoint: process.env.DEV_ENDPOINT, region: region_aws };
  }

  return dynamoConfig;
};

export { clientProductionConfig };
