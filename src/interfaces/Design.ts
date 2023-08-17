export interface IDesign {
  TableName: string;
  Item: IDesignItem;
}

interface IDesignItem {
  DesignID: string;
  title: string;
  slug: string;
  images: IDesignImageUrls;
  header: string;
}

interface IDesignImageUrls {
  desktop: string;
  desktopLarge?: string;
  tablet: string;
  mobile: string;
  bgPattern: string;
}
