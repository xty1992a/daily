import dayjs from "dayjs";

const ranger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function chunk(length) {
  return (list) => {
    list = [...list];
    const result = [];
    while (list.length) {
      result.push(list.splice(0, length));
    }
    return result;
  };
}

const chunk7 = chunk(7);

function makeBills(range) {
  const today = dayjs().subtract(1, "day");
  const result = [];
  while (range--) {
    const date = today.subtract(range, "day");
    result.push({
      time: date.format("YYYY-MM-DD"),
      bill: ranger(10, 100),
      date,
    });
  }

  return result;
}

const bills = makeBills(500);
export const getBill = ({ type, start, end }) => {
  if (!start || !end || !type) return [];
  const raw = bills.filter(
    (it) =>
      it.date.isAfter(dayjs(start)) &&
      it.date.isBefore(dayjs(end).add(1, "day"))
  );

  switch (type) {
    case "day":
      return raw;
    case "week":
      return chunk7(raw).map((arr) => ({
        start: arr[0].time,
        end: arr.reverse()[0].time,
        bill: arr.reduce((p, i) => p + i.bill, 0),
      }));
    case "month":
      const result = [];
      while (raw.length) {
        const date = raw.shift();
        const item = result.find((it) => it.month === date.date.month()) || {
          month: date.date.month(),
          title: date.date.format("YYYY-MM"),
        };
        if (!item.hasOwnProperty("bill")) {
          result.push({ ...item, bill: 0 });
        }
        item.bill += date.bill;
      }
      return result;
  }
};
