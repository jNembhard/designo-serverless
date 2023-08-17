import { ISocial } from "../interfaces/Social";

const socialOne: ISocial = {
  TableName: "DesignoSocialsTable",
  Item: {
    SocialID: "social-1",
    title: "Facebook",
    socialUrl: "https://www.facebook.com/",
    icon: "assets/shared/desktop/icon-facebook.svg",
  },
};

const socialTwo: ISocial = {
  TableName: "DesignoSocialsTable",
  Item: {
    SocialID: "social-2",
    title: "Youtube",
    socialUrl: "https://www.youtube.com/",
    icon: "assets/shared/desktop/icon-youtube.svg",
  },
};

const socialThree: ISocial = {
  TableName: "DesignoSocialsTable",
  Item: {
    SocialID: "social-3",
    title: "Twitter",
    socialUrl: "https://twitter.com/",
    icon: "assets/shared/desktop/icon-twitter.svg",
  },
};

const socialFour: ISocial = {
  TableName: "DesignoSocialsTable",
  Item: {
    SocialID: "social-4",
    title: "Pinterest",
    socialUrl: "https://www.pinterest.com/",
    icon: "assets/shared/desktop/icon-pinterest.svg",
  },
};

const socialFive: ISocial = {
  TableName: "DesignoSocialsTable",
  Item: {
    SocialID: "social-5",
    title: "Instagram",
    socialUrl: "https://www.instagram.com/",
    icon: "assets/shared/desktop/icon-instagram.svg",
  },
};

export const socials: ISocial[] = [socialOne, socialTwo, socialThree, socialFour, socialFive];
