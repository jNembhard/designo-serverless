import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../interfaces/interface";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const postProductObj: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "WebDesign",
    ProductID: "web-1",
    title: "Express",
    description: "A multi-carrier shipping website for ecommerce businesses",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/web-design/desktop/image-express.jpg",
  },
};

const postProductObj2: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "WebDesign",
    ProductID: "web-2",
    title: "Transfer",
    description: "Site for low-cost money transfers and sending money within seconds",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/web-design/desktop/image-transfer.jpg",
  },
};

const postProductObj3: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "WebDesign",
    ProductID: "web-3",
    title: "Photon",
    description: "A state-of-the-art music player with high-resolution audio and DSP effects",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/web-design/desktop/image-photon.jpg",
  },
};

const postProductObj4: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "WebDesign",
    ProductID: "web-4",
    title: "Builder",
    description: "Connects users with local contractors based on their location",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/web-design/desktop/image-builder.jpg",
  },
};

const postProductObj5: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "WebDesign",
    ProductID: "web-5",
    title: "Blogr",
    description: "Blogr is a platform for creating an online blog or publication",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/web-design/desktop/image-blogr.jpg",
  },
};

const postProductObj6: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "WebDesign",
    ProductID: "web-6",
    title: "Camp",
    description: "Get expert training in coding, data, design, and digital marketing",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/web-design/desktop/image-camp.jpg",
  },
};

const postProductObj7: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "AppDesign",
    ProductID: "app-1",
    title: "Airfilter",
    description: "Solving the problem of poor indoor air quality by filtering the air",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/app-design/desktop/image-airfilter.jpg",
  },
};

const postProductObj8: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "AppDesign",
    ProductID: "app-2",
    title: "Eyecam",
    description: "Product that lets you edit your favorite photos and videos at any time",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/app-design/desktop/image-eyecam.jpg",
  },
};

const postProductObj9: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "AppDesign",
    ProductID: "app-3",
    title: "Faceit",
    description: "Get to meet your favorite internet superstar with the faceit app",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/app-design/desktop/image-faceit.jpg",
  },
};

const postProductObj10: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "AppDesign",
    ProductID: "app-4",
    title: "Todo",
    description: "A todo app that features cloud sync with light and dark mode",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/app-design/desktop/image-todo.jpg",
  },
};

const postProductObj11: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "AppDesign",
    ProductID: "app-5",
    title: "Loopstudios",
    description: "A VR experience app made for Loopstudios",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/app-design/desktop/image-loopstudios.jpg",
  },
};

const postProductObj12: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "GraphicDesign",
    ProductID: "graphic-1",
    title: "Tim Brown",
    description: "A book cover designed for Tim Brown’s new release, ‘Change’",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/graphic-design/desktop/image-change.jpg",
  },
};

const postProductObj13: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "GraphicDesign",
    ProductID: "graphic-2",
    title: "Boxed water",
    description: "A simple packaging concept made for Boxed Water",
    productImageUrl:
      "https://designo-image-bucket.s3.amazonaws.com/assets/graphic-design/desktop/image-boxed-water.jpg",
  },
};

const postProductObj14: IProduct = {
  TableName: "DesignoProductsTable",
  Item: {
    ProductType: "GraphicDesign",
    ProductID: "graphic-3",
    title: "Science!",
    description: "A poster made in collaboration with the Federal Art Project",
    productImageUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/graphic-design/desktop/image-science.jpg",
  },
};

export const postProduct = async (object: IProduct) => {
  const command = new PutCommand(object);

  const response = await docClient.send(command);
  console.log(response);

  return response;
};

export const postProducts = async () => {
  let allProducts = [
    postProductObj,
    postProductObj2,
    postProductObj3,
    postProductObj4,
    postProductObj5,
    postProductObj6,
    postProductObj7,
    postProductObj8,
    postProductObj9,
    postProductObj10,
    postProductObj11,
    postProductObj12,
    postProductObj13,
    postProductObj14,
  ];

  for (let i = 0; i < 14; i++) {
    // console.log(allProducts[i]);

    await postProduct(allProducts[i]);
  }
};
