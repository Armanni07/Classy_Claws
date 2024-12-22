import React from "react";

export type AlertType = {
  message: string;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
};
