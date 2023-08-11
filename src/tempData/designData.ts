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
      bgPattern: "assets/web-design/desktop/bg-pattern-intro-web.svg",
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
      desktop: "assets/home/desktop/image-app-design.jpg",
      tablet: "assets/home/tablet/image-app-design.jpg",
      mobile: "assets/home/mobile/image-app-design.jpg",
      bgPattern: "assets/app-design/desktop/bg-pattern-intro-app.svg",
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
      desktop: "assets/home/desktop/image-graphic-design.jpg",
      tablet: "assets/home/tablet/image-graphic-design.jpg",
      mobile: "assets/home/mobile/image-graphic-design.jpg",
      bgPattern: "assets/graphic-design/desktop/bg-pattern-intro-graphic.svg",
    },
    header: "We deliver eye-catching branding materials that are tailored to meet your business objectives.",
  },
};

export const designs: IDesign[] = [designOne, designTwo, designThree];
