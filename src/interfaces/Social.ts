export interface ISocial {
  TableName: string;
  Item: ISocialItem;
}

interface ISocialItem {
  SocialID: string;
  name: string;
  socialUrl: string;
  icon: string;
}
