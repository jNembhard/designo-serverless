export interface ISocial {
  TableName: string;
  Item: ISocialItem;
}

interface ISocialItem {
  SocialID: string;
  title: string;
  socialUrl: string;
  icon: string;
}
