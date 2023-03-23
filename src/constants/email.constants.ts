import { EEmailActions } from "../enums";

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailActions.WELCOME]: {
    subject: "Great to see you in our app",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject: "Dont worry I will help you!",
    templateName: "forgot.password",
  },
  [EEmailActions.ACTIVATE]: {
    subject: "Activate!",
    templateName: "activate",
  },
  [EEmailActions.REMINDER]: {
    subject: "Reminder about us!",
    templateName: "reminder",
  },
};
