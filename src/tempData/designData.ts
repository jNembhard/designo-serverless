import { IDesign } from "../interfaces/Design";

const designOne: IDesign = {
  TableName: "DesignoDesignsTable",
  Item: {
    DesignID: "design-1",
    DesignName: "web design",
    DesignUrl: "/web-design",
    DesignImageUrls: {
      desktop: "https://designo-image-bucket.s3.amazonaws.com/assets/home/desktop/image-web-design-small.jpg",
      desktopLarge: "https://designo-image-bucket.s3.amazonaws.com/assets/home/desktop/image-web-design-large.jpg",
      tablet: "https://designo-image-bucket.s3.amazonaws.com/assets/home/tablet/image-web-design.jpg",
      mobile: "https://designo-image-bucket.s3.amazonaws.com/assets/home/mobile/image-web-design.jpg",
    },
  },
};

const designTwo: IDesign = {
  TableName: "DesignoDesignsTable",
  Item: {
    DesignID: "design-2",
    DesignName: "app design",
    DesignUrl: "/app-design",
    DesignImageUrls: {
      desktop: "https://designo-image-bucket.s3.amazonaws.com/assets/home/desktop/image-app-design.jpg",
      tablet: "https://designo-image-bucket.s3.amazonaws.com/assets/home/tablet/image-app-design.jpg",
      mobile: "https://designo-image-bucket.s3.amazonaws.com/assets/home/mobile/image-app-design.jpg",
    },
  },
};

const designThree: IDesign = {
  TableName: "DesignoDesignsTable",
  Item: {
    DesignID: "design-3",
    DesignName: "graphic design",
    DesignUrl: "/graphic-design",
    DesignImageUrls: {
      desktop: "https://designo-image-bucket.s3.amazonaws.com/assets/home/desktop/image-graphic-design.jpg",
      tablet: "https://designo-image-bucket.s3.amazonaws.com/assets/home/tablet/image-graphic-design.jpg",
      mobile: "https://designo-image-bucket.s3.amazonaws.com/assets/home/mobile/image-graphic-design.jpg",
    },
  },
};

export const designs: IDesign[] = [designOne, designTwo, designThree];
