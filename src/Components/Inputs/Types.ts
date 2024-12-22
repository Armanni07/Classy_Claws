export type InputType = {
  id?: string;
  name: string;
  type: string;
  value?: string | number;
  accept?: string;
  placeHolder: string;
};

export type InputProps<T> = {
  input: InputType[];
  options?: {
    id: number;
    Name: string;
  }[];
  setInput: React.Dispatch<React.SetStateAction<T>>;
};
