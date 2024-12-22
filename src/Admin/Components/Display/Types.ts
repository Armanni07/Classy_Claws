export type DisplayType<T> = {
  index: number;
  display: T;
  productCount?: number[];
  setDisplay: React.Dispatch<React.SetStateAction<boolean[]>>;
  setProductCount?: React.Dispatch<React.SetStateAction<number[]>>;
};
