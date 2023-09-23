# Designo - Serverless

## Table of Contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [Project Insights and Tech Stack](#process-and-tech-stack)
  - [Tech Stack](#tech-stack)
  - [Project Insights](#project-insights)
    - [CloudFront](#cloudfront)
    - [Webpack](#webpack)
- [Author](#author)

## Overview

### The challenge

The reason for creating this serverless architecture on AWS was to find a suitable way to combine multiple data sources into a single source of truth.

The architecture should:

- Allow frontend users to access information from multiple DynamoDB instances
- Pull only necessary data from sources on each frontend's request to the backend
- Allow secure requests to access the API endpoint on the frontend.

### Links

- Live Site URL: [https://designowebagency.vercel.app](https://designowebagency.vercel.app/)
- Checkout the code for the Designo Agency Frontend built with React [https://github.com/jNembhard/designo-agency-frontend](https://github.com/jNembhard/designo-agency-frontend)

## Project Insights and Tech Stack

### Tech Stack

- [Amazon Web Services](https://aws.amazon.com)
  - [AppSync](https://docs.aws.amazon.com/)
  - [CloudFront](https://docs.aws.amazon.com/cloudfront/index.html)
  - [CloudFormation](https://docs.aws.amazon.com/cloudformation/index.html)
  - [DynamoDB](https://docs.aws.amazon.com/dynamodb/)
  - [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
  - [S3](https://docs.aws.amazon.com/s3/index.html)
- [Docker](https://www.docker.com/) - For DynamoDB local testing environment
- [GraphQL](https://graphql.org/)
- [Jest](https://jestjs.io/) - Test Cases
- [Serverless](https://www.serverless.com/framework/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [Velocity Template Language](https://velocity.apache.org/engine/1.7/vtl-reference.html)
- [Webpack](https://webpack.js.org/) - Bundler

### Project Insights

The backend of this application was meant for a web agency frontend that would be built with React utilizing TypeScript. The data structures are not uniform across separate data sources, and I decided that GraphQL would be the best approach to handle this issue. This allows for simplified API development using AppSync by pulling necessary data into a single source of truth. Resolvers can be setup to avoid over-fetching and under-fetching the necessary data into the frontend of the application on each call.

Looking at this example, you can define the types for your data structure:

```graphql
type Design {
  DesignID: String!
  name: String!
  slug: String!
  images: designImages!
  header: String!
}

type designImages {
  desktop: String!
  desktopLarge: String
  tablet: String!
  mobile: String!
}

type PaginatedDesigns {
  design: [Design!]!
  nextToken: String
}

extend type Query {
  design(DesignID: String!): Design
  designs(count: Int, nextToken: String): PaginatedDesigns!
}
```

The schema is then attached to resolvers that are used in AWS AppSync. Here is an example of a request and response to call a single design item:

Request:

```vtl
{
  "version": "2018-05-29",
  "operation": "GetItem",
  "key": {
    "DesignID":  $util.dynamodb.toDynamoDBJson($context.arguments.DesignID),
  },
  "consistentRead": true
}
```

Response:

```vtl
#if($context.result.DesignID)
  $util.toJson($context.result)
#else
  $util.error("Item not found with the given DesignID")
#end
```

The queries to a DynamoDB Table can be tested in AppSync which may look similar to this for one item:

```graphql
query getDesign {
  design(DesignID: "design-1") {
    header
    images {
      desktop
      desktopLarge
      mobile
      tablet
    }
    name
    slug
  }
}
```

or multiple items:

```graphql
query getDesigns {
  designs(count: 3) {
    design {
      DesignID
      header
      images {
        desktop
        desktopLarge
        mobile
        tablet
      }
      name
      slug
    }
  }
}
```

Here's an example of the data that is stored in a DynamoDB Table:

```typescript
import { IDesign } from "../interfaces/Design";

const designOne: IDesign = {
  TableName: "DesignoDesignsTable",
  Item: {
    DesignID: "design-1",
    name: "web design",
    slug: "/web-design",
    images: {
      desktop: "assets/home/desktop/image-web-design-small.jpg",
      desktopLarge: "assets/home/desktop/image-web-design-large.jpg",
      tablet: "assets/home/tablet/image-web-design.jpg",
      mobile: "assets/home/mobile/image-web-design.jpg",
    },
    header: "We build websites that serve as powerful marketing tools and bring memorable brand experiences.",
  },
};
```

It's important to note in this example, a sort key was not necessary due to the simple design pattern. If you want to see an example of a data structure using a SortKey, checkout the productData.ts file in the tempData folder. The URLs contain information about the location of the images which point to a folder in an S3 bucket.

#### CloudFront

I decided to use CloudFront as a (CDN) service to accelerate distribution of data to the frontend of the applicatoion when a call is made through a GraphQL endpoint. I felt this would help to ensure that all data is distributed to edge locations closest to end users who may visit the site. This can help to reduce latency, and scale to handle higher traffic loads and is great for improving global reach of your applications. The faster your content is delivered to your user, the less likely they are to leave your site.

#### Webpack

Recently I ran into an issue creating lambda functions. The package sizes were immense, close to 300MB. AWS only supports package sizes of up to 50MB zipped and 250MB uncompressed. I needed to find an effective way to reduce the package size. This is where Webpack comes to the rescue.

Webpack allows you to bundle all your required dependencies into a single package, reducing deployment size and improving function startup performance. This is crucial for not only improving overall performance, but smaller packages can lead to faster execution times and lower costs since you are often billed on AWS based on the resources and time your code consumes.

The biggest improvement was the use of the externals to exclude `aws-sdk` as well as node's native modules. These are available in our aws environment where the code will run and are not necessary to include in output bundle.

The result? A reduction of file size down from 300MB to 5.06KB!

### Closing

Check out the serverless.yml file for more information on the setup of the serverless architecture. The architecture is deployed through CloudFormation on AWS. This allows you to setup and update the entire stack from one place instead of building each part of the infrastructure individually within the cloud.

## Author

- Website - [Jason Nembhard](https://www.jasonnembhard.com)
