import { ISocial } from "../interfaces/interface";

const socialOne: ISocial = {
  TableName: "DesignoSocialsTable",
  Item: {
    SocialID: "social-1",
    SocialName: "Facebook",
    SocialUrl: "https://www.facebook.com/",
    SocialIconUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/shared/desktop/icon-facebook.svg",
  },
};

const socialTwo: ISocial = {
  TableName: "DesignoSocialsTable",
  Item: {
    SocialID: "social-2",
    SocialName: "Youtube",
    SocialUrl: "https://www.youtube.com/",
    SocialIconUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/shared/desktop/icon-youtube.svg",
  },
};

const socialThree: ISocial = {
  TableName: "DesignoSocialsTable",
  Item: {
    SocialID: "social-3",
    SocialName: "Twitter",
    SocialUrl: "https://twitter.com/",
    SocialIconUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/shared/desktop/icon-twitter.svg",
  },
};

const socialFour: ISocial = {
  TableName: "DesignoSocialsTable",
  Item: {
    SocialID: "social-4",
    SocialName: "Pinterest",
    SocialUrl: "https://www.pinterest.com/",
    SocialIconUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/shared/desktop/icon-pinterest.svg",
  },
};

const socialFive: ISocial = {
  TableName: "DesignoSocialsTable",
  Item: {
    SocialID: "social-5",
    SocialName: "Instagram",
    SocialUrl: "https://www.instagram.com/",
    SocialIconUrl: "https://designo-image-bucket.s3.amazonaws.com/assets/shared/desktop/icon-instagram.svg",
  },
};

export const socials: ISocial[] = [socialOne, socialTwo, socialThree, socialFour, socialFive];
