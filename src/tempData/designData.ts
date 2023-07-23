import { IDesign } from "../interfaces/Design";

const designOne: IDesign = {
  TableName: "DesignoDesignsTable",
  Item: {
    DesignID: "design-1",
    name: "web design",
    slug: "/web-design",
    images: {
      desktop: "https://designo-image-bucket.s3.amazonaws.com/assets/home/desktop/image-web-design-small.jpg",
      desktopLarge: "https://designo-image-bucket.s3.amazonaws.com/assets/home/desktop/image-web-design-large.jpg",
      tablet: "https://designo-image-bucket.s3.amazonaws.com/assets/home/tablet/image-web-design.jpg",
      mobile: "https://designo-image-bucket.s3.amazonaws.com/assets/home/mobile/image-web-design.jpg",
    },
    header: "We build websites that serve as powerful marketing tools and bring memorable brand experiences.",
  },
};

const designTwo: IDesign = {
  TableName: "DesignoDesignsTable",
  Item: {
    DesignID: "design-2",
    name: "app design",
    slug: "/app-design",
    images: {
      desktop: "https://designo-image-bucket.s3.amazonaws.com/assets/home/desktop/image-app-design.jpg",
      tablet: "https://designo-image-bucket.s3.amazonaws.com/assets/home/tablet/image-app-design.jpg",
      mobile: "https://designo-image-bucket.s3.amazonaws.com/assets/home/mobile/image-app-design.jpg",
    },
    header: "Our mobile designs bring intuitive digital solutions to your customers right at their fingertips.",
  },
};

const designThree: IDesign = {
  TableName: "DesignoDesignsTable",
  Item: {
    DesignID: "design-3",
    name: "graphic design",
    slug: "/graphic-design",
    images: {
      desktop: "https://designo-image-bucket.s3.amazonaws.com/assets/home/desktop/image-graphic-design.jpg",
      tablet: "https://designo-image-bucket.s3.amazonaws.com/assets/home/tablet/image-graphic-design.jpg",
      mobile: "https://designo-image-bucket.s3.amazonaws.com/assets/home/mobile/image-graphic-design.jpg",
    },
    header: "We deliver eye-catching branding materials that are tailored to meet your business objectives.",
  },
};

export const designs: IDesign[] = [designOne, designTwo, designThree];
