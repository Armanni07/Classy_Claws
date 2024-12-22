import React from "react";

export type ConfirmType = {
  message: string;
  functions: () => void;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
};
