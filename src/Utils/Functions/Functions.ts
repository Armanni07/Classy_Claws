import {
  AddClickType,
  ArrayClickType,
  CartType,
  ClickType,
  InputFunctionType,
  LogoutTimerType,
  SelectFunctionType,
} from "../Types/FunctionTypes";
import { www } from "../URLS/Urls";
import { server } from "../Server/Server";
import { CurrentUser } from "../Types/AuthContextTypes";

const sum = (array: number[] | undefined) => {
  if (array) {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
      result += array[i];
    }
    return result;
  }
};

const multiply = (SalePrice: number, Quantity: number) => {
  return SalePrice * Quantity;
};

const click = ({ click, setClick }: ClickType) => {
  setClick(!click);
};

const dates = (date?: string | Date) => {
  const formatDate = date && new Date(date);
  return formatDate?.toLocaleString();
};

const input = <T>({ e, setInputs }: InputFunctionType<T>) => {
  const { name, value } = e.target;
  const file = e.target.files?.[0];

  if (file) {
    const ImageUrl = URL.createObjectURL(file as Blob);

    console.log(name, "image", file, ImageUrl);
    setInputs((inputs) => ({ ...inputs, [name]: { file, ImageUrl } }));

    return;
  } else {
    console.log(name);
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }
};

const percent = (cost: number, sale: number) => {
  const percent = (sale - cost) / 100;
  return percent;
};

const select = <T>({ e, setInputs }: SelectFunctionType<T>) => {
  const { name, value } = e.target;

  console.log(name, value);
  setInputs((inputs) => ({ ...inputs, [name]: value }));
};

const LogoutTimer = ({UserLogout }: LogoutTimerType) => {
  const time = 60 * 60 * 1000 * 48;
  const timer: NodeJS.Timeout = setTimeout(UserLogout, time);

  window.location.reload()

  return () => clearTimeout(timer);
};

const AddClick = ({ i, setCount }: AddClickType) => {
  setCount((count: number[]) => {
    const newCount = [...count];
    newCount[i] = (newCount[i] || 0) + 1;
    return newCount;
  });
};

const SubClick = ({ i, setCount }: AddClickType) => {
  setCount((count: number[]) => {
    const newCount = [...count];
    newCount[i] = newCount[i] > 0 ? newCount[i] - 1 : newCount[i];
    return newCount;
  });
};

const ArrayClick = ({ index, setClick }: ArrayClickType) => {
  setClick((click) => {
    const updatedClick = [...click];
    updatedClick[index] = !click[index];

    return updatedClick;
  });
};

const ParseStorage = (storage: string | null): CurrentUser => {
  if (storage) {
    try {
      return JSON.parse(storage);
    } catch (error) {
      console.log(error);
      console.error("Invalid Storage");
      return {} as CurrentUser;
    }
  }
  return {} as CurrentUser;
};

const AddCartData = async ({
  e,
  i,
  id,
  setDone,
  count,
  setCount,
}: CartType) => {
  e.preventDefault();
  method.AddClick({ i, setCount: setCount });

  const data = {
    Product_ID: id,
    Quantity: count[i] + 1,
  };

  localStorage.setItem(`ProductCount${id}`, JSON.stringify(data.Quantity));
  server.post(www.cart.post, data);
  setDone(false);
};

const SubCartData = async ({
  e,
  i,
  id,
  setDone,
  count,
  setCount,
}: CartType) => {
  e.preventDefault();
  method.SubClick({ i, setCount: setCount });

  const data = {
    Product_ID: id,
    Quantity: count[i] - 1,
  };

  localStorage.setItem(`ProductCount${id}`, JSON.stringify(data.Quantity));
  server.post(www.cart.post, data);
  setDone(false);
};

const SectionObserver: IntersectionObserverCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
};

export const method = {
  sum,
  click,
  dates,
  input,
  select,
  percent,
  multiply,
  AddClick,
  SubClick,
  ArrayClick,
  LogoutTimer,
  AddCartData,
  SubCartData,
  ParseStorage,
  SectionObserver,
};
