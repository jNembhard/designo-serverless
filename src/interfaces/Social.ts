export interface ISocial {
  TableName: string;
  Item: ISocialItem;
}

interface ISocialItem {
  SocialID: string;
  SocialName: string;
  SocialUrl: string;
  SocialIconUrl: string;
}
