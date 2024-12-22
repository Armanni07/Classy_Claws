import React from "react";

export type ClickType = {
  click: boolean;
  message?: string;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AddClickType = {
  i: number;
  setCount: React.Dispatch<React.SetStateAction<number[]>>;
};

export type ArrayClickType = {
  index: number;
  setClick: React.Dispatch<React.SetStateAction<boolean[]>>;
};

export type CartType = {
  e: React.FormEvent;
  i: number;
  id: number;
  count: number[];
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
  setCount: React.Dispatch<React.SetStateAction<number[]>>;
};

export type InputFunctionType<T> = {
  e: React.ChangeEvent<HTMLInputElement>;
  setInputs: React.Dispatch<React.SetStateAction<T>>;
};

export type SelectFunctionType<T> = {
  e: React.ChangeEvent<HTMLSelectElement>;
  setInputs: React.Dispatch<React.SetStateAction<T>>;
};

export type LogoutTimerType = {
  UserLogout: () => void;
  setLoggedOut?: React.Dispatch<React.SetStateAction<() => void>>;
};
