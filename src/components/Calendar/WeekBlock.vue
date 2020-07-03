<template>
  <div class="week-block">
    <h3 class="block-title" :data-query="query" :data-key="data.key">
      <span>{{ data.title }}</span>
    </h3>
    <div class="week-list">
      <div
        class="week-cell"
        :class="{ disabled: it.disabled }"
        @click="pickItem(it)"
        v-for="it in list"
        :key="it.key"
      >
        <p class="cell-title">{{ it.title }}</p>
        <p class="cell-text">{{ it.text }}</p>
        <p class="cell-price">{{ it.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

const cnNums = ["零", "一", "二", "三", "四", "五", "六"];
const today = dayjs();

export default {
  name: "week-block",
  props: {
    data: Object,
  },
  data() {
    return {};
  },
  computed: {
    list() {
      return this.data.list.map((it, index) => ({
        start: it.start.format("YYYY-MM-DD"),
        end: it.end.format("YYYY-MM-DD"),
        key: it.start.format("MM-DD"),
        title: `第${cnNums[index + 1]}周`,
        text: it.start.format("M.D") + "-" + it.end.format("M.D"),
        disabled: it.start.isAfter(today),
        price: this.data.data.length ? this.data.data[index].bill : "-",
      }));
    },
    query() {
      const list = this.list.filter((it) => !it.disabled);
      const start = list.length ? list[0].start : "";
      const end = list.length ? list.reverse()[0].end : "";
      return JSON.stringify({
        type: "week",
        start,
        end,
      });
    },
  },
  methods: {
    pickItem(item) {
      if (item.disabled) return;
      this.$emit("pick", { type: "week", item });
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less" rel="stylesheet/less">
.week-block {
  .week-list {
    display: flex;
    flex-wrap: wrap;
    .week-cell {
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
