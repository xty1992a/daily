import dayjs from "dayjs";
window.dayjs = dayjs;

const dftOptions = {
  range: 365,
};

export class Calendar {
  constructor(options = {}) {
    this.$options = { ...dftOptions, ...options };
  }
  today = dayjs();

  get dateBlock() {
    let range = 12;
    const result = [];
    // 本月第一天
    const end = this.today.startOf("month");
    while (range--) {
      const day0 = end.subtract(range, "month");

      result.push({
        key: "date-month-" + day0.format("MM"),
        title: day0.format("YYYY-MM"),
        list: getDateList(day0),
      });
    }

    return result;
  }

  get weekBlock() {
    let range = 12;
    const result = [];
    // 本月第一天
    const end = this.today.startOf("month");
    while (range--) {
      const day0 = end.subtract(range, "month");
      result.push({
        key: "month-week-" + day0.format("MM"),
        title: day0.format("M月"),
        list: getWeekList(day0),
      });
    }

    return result;
  }

  get monthBlock() {
    let range = 12;
    const month = [];
    const result = [];
    // 本月第一天
    const end = this.today.startOf("month");
    while (range--) {
      const day0 = end.subtract(range, "month");
      month.push({
        month: day0.format("YYYY-MM"),
        day0,
      });
    }

    while (month.length) {
      const mon = month.shift();
      const item = result.find((it) => it.title === mon.day0.year()) || {
        key: "year-" + mon.day0.year(),
        title: mon.day0.year(),
        list: [],
      };
      if (!item.list.length) {
        result.push(item);
      }
      item.list.push(mon);
    }

    return result;
  }
}

export default new Calendar();

// 传入一个日期,返回上月遗留日期+本月所有日期
function getDateList(date) {
  const day0 = dayjs(date).startOf("month");
  const firstDay = day0.subtract(day0.get("day"), "day");
  const length = day0.get("day") + day0.daysInMonth();
  return [...Array(length)].map((n, i) => firstDay.add(i, "day"));
}

// 获取一个月的所有周,(本月第一个周一算起)
function getWeekList(date) {
  let monday = findFirstMonday(date);
  const result = [];
  while (1) {
    if (monday.month() !== date.month()) break;
    const item = {
      start: monday,
      end: monday.add(6, "day"),
    };
    result.push(item);
    monday = monday.add(1, "week");
  }

  return result;
}

// 传入一个日期,返回当月第一个周一
function findFirstMonday(date) {
  // 获得当月第一天
  const day0 = dayjs(date).startOf("month");
  // 获得该天所在周周一(一周从周日开始)
  const monday = day0.startOf("week").add(1, "day");
  // 周一是否与第一天同一个月
  const sameMonth = monday.month() === day0.month();
  // 同一个月即这个周一,否则下一个周一
  return sameMonth ? monday : monday.add(1, "week");
}
