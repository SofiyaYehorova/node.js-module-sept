import { EEmailActions } from "../enums";

export const allTemplates = {
  [EEmailActions.WELCOME]: {
    subject: "Great to see you in our app",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject: "Dont worry I will help you!",
    templateName: "forgot.password",
  },
};
