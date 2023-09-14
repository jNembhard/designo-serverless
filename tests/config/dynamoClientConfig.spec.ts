import { clientProductionConfig } from "../../src/config/dynamoClientConfig";

describe("clientProductionConfig", () => {
  it("should return an object that contains a region only us-east-1 if environment is not set to local", () => {
    process.env.DYNAMO_ENV = "production";
    const config = clientProductionConfig();

    expect(config).toEqual({ region: "us-east-1" });
    delete process.env.DYNAMO_ENV;
  });

  it("should return an object with endpoint http://localhost:8000 if the environment is set to local", () => {
    process.env.DYNAMO_ENV = "local";
    const config = clientProductionConfig();

    expect(config).toEqual({ endpoint: process.env.DEV_ENDPOINT, region: "us-east-1" });
    delete process.env.DYNAMO_ENV;
    delete process.env.DEV_ENDPOINT;
  });
});
