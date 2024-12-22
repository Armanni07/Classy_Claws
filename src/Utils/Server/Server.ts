import { useAxios } from "../../Hooks/UseAxios";

const get = async (url: string) => {
  const response = await useAxios.get(url);

  return response.data;
};

const put = async (url: string, inputs: object) => {
  try {
    const response = await useAxios.put(url, inputs);

    const data = response.data;

    console.log(`Backend: ${data}`);

    return { data };
  } catch (error) {
    console.log(error);
    // return { error };
  }
};

const post = async (url: string, inputs: object) => {
  try {
    const response = await useAxios.post(url, inputs);

    const data = response.data;

    console.log(`Backend: ${data}`);

    return { data };
  } catch (error) {
    console.log(error);
    // return { error };
  }
};

const erase = async (url: string): Promise<void> => {
  await fetch(url);
};

const search = async (url: string): Promise<void> => {
  await fetch(url);
};

export const server = {
  get,
  put,
  post,
  delete: erase,
  search,
};
