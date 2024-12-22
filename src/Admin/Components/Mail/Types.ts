export type MailType = {
  Date: Date;
  User_ID: number;
  Messages: string;
  Firstname: string;
  Lastname: string;
  Photo?: string;
  status: string;
};

export type MailProps = {
    close: boolean;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
};