export interface IDesign {
  TableName: string;
  Item: IDesignItem;
}

interface IDesignItem {
  DesignID: string;
  designName: string;
  designUrl: string;
  designImageUrls: IDesignImageUrls;
  header: string;
}

interface IDesignImageUrls {
  desktop: string;
  desktopLarge?: string;
  tablet: string;
  mobile: string;
}
