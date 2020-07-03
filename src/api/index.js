const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
import { getBill } from "./mock";

const dftOption = {
  success: true,
  time: 500,
};
const mock = async (opt = {}, data) => {
  console.log(data);
  const option = { ...dftOption, ...opt };
  await sleep(option.time);
  return { data, success: option.success };
};

export const getBillList = (query) => mock({}, getBill(query));
