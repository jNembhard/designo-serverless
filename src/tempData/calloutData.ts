import { ICallout } from "../interfaces/Callout";

const calloutOne: ICallout = {
  TableName: "DesignoCalloutTable",
  Item: {
    calloutID: "callout-1",
    title: "passionate",
    description:
      "Each project starts with an in-depth brand research to ensure we only create products that serve a purpose. We merge art, design, and technology into exciting new solutions.",
    image: "https://d39flyyba0jiph.cloudfront.net/assets/home/desktop/illustration-passionate.svg",
  },
};

const calloutTwo: ICallout = {
  TableName: "DesignoCalloutTable",
  Item: {
    calloutID: "callout-2",
    title: "resourceful",
    description:
      "Everything that we do has a strategic purpose. We use an agile approach in all of our projects and value customer collaboration. It guarantees superior results that fulfill our clients’ needs.",
    image: "https://d39flyyba0jiph.cloudfront.net/assets/home/desktop/illustration-resourceful.svg",
  },
};

const calloutThree: ICallout = {
  TableName: "DesignoCalloutTable",
  Item: {
    calloutID: "callout-3",
    title: "friendly",
    description:
      "We are a group of enthusiastic folks who know how to put people first. Our success depends on our customers, and we strive to give them the best experience a company can provide.",
    image: "https://d39flyyba0jiph.cloudfront.net/assets/home/desktop/illustration-friendly.svg",
  },
};

export const callouts: ICallout[] = [calloutOne, calloutTwo, calloutThree];
