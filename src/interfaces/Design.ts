export interface IDesign {
  TableName: string;
  Item: IDesignItem;
}

interface IDesignItem {
  DesignID: string;
  DesignName: string;
  DesignUrl: string;
  DesignImageUrls: IDesignImageUrls;
}

interface IDesignImageUrls {
  desktop: string;
  desktopLarge?: string;
  tablet: string;
  mobile: string;
}
