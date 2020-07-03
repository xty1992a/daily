<template>
  <div class="month-block">
    <h3 class="block-title" :data-query="query" :data-key="data.key">
      <span>{{ data.title }}年</span>
    </h3>
    <div class="month-list">
      <div
        class="month-cell"
        v-for="it in list"
        :key="it.key"
        @click="pickItem(it)"
      >
        <p class="cell-title">{{ it.text }}</p>
        <p class="cell-price">{{ it.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
const yestoday = dayjs().subtract(1, "day");
export default {
  name: "month-block",
  props: {
    data: Object,
  },
  data() {
    return {};
  },
  computed: {
    list() {
      return this.data.list.map((it, index) => ({
        date: it.day0,
        key: it.day0.format("MM"),
        text: it.day0.format("M月"),
        disabled: false,
        price: this.data.data.length ? this.data.data[index].bill : "-",
      }));
    },
    query() {
      const list = this.list.filter((it) => !it.disabled);
      const start = list.length ? list[0].date.format("YYYY-MM-DD") : "";
      let end = list.length ? list.reverse()[0].date : "";
      if (end) {
        end = end.add(end.daysInMonth() - 1, "day");
        if (end.isAfter(yestoday)) {
          end = yestoday;
        }
        end = end.format("YYYY-MM-DD");
      }

      return JSON.stringify({
        type: "month",
        start,
        end,
      });
    },
  },
  methods: {
    pickItem(item) {
      if (item.disabled) return;
      this.$emit("pick", { type: "month", item });
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less" rel="stylesheet/less">
.month-block {
  .month-list {
    display: flex;
    flex-wrap: wrap;
    .month-cell {
      width: (1 / 4) * 100%;
      padding-top: 5px;
      text-align: center;
      overflow: hidden;
      font-size: 12px;
      color: #999;
      .cell-title {
        line-height: 28px;
        color: #333;
        font-size: 14px;
      }
      .cell-text {
      }
      .cell-price {
      }
    }
  }
}
</style>
