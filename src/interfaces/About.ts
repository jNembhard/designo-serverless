export interface IAbout {
  TableName: string;
  Item: IAboutItem;
}

interface IAboutItem {
  AboutID: string;
  title: string;
  description: string;
  images: IAboutImageUrls;
}

interface IAboutImageUrls {
  desktop: string;
  tablet: string;
  mobile: string;
  heroPatternDesktop?: string;
  heroPatternMobile?: string;
  keypointBgPattern?: string;
}
