<template>
  <div class="date-block">
    <h3 class="block-title" :data-query="query" :data-key="data.key">
      <span>{{ data.title }}</span>
    </h3>
    <div class="date-list">
      <div
        class="date-cell"
        @click="pickItem(it)"
        :class="{ visible: it.show, disabled: it.disabled }"
        v-for="it in list"
        :key="it.key"
      >
        <p class="cell-text">{{ it.text }}</p>
        <p class="cell-price">{{ it.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
const yestoday = dayjs().subtract(1, "day");
export default {
  name: "date-block",
  props: {
    data: Object,
  },
  data() {
    return {};
  },
  computed: {
    list() {
      const data = this.data.data;
      return this.data.list.map((it) => {
        const price = data.find((i) => i.time === it.format("YYYY-MM-DD"));

        return {
          date: it,
          key: it.format("MM-DD"),
          text: it.format("DD"),
          show: it.format("YYYY-MM") === this.data.title,
          disabled: it.isAfter(yestoday),
          price: price ? price.bill : "-",
        };
      });
    },
    query() {
      const list = this.list.filter((it) => !it.disabled && it.show);
      return JSON.stringify({
        type: "day",
        start: list[0].date.format("YYYY-MM-DD"),
        end: list.reverse()[0].date.format("YYYY-MM-DD"),
      });
    },
  },
  methods: {
    pickItem(item) {
      if (!item.show || item.disabled) return;
      this.$emit("pick", { type: "date", item });
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less" rel="stylesheet/less">
.date-block {
  padding: 10px 0;
  .block-title {
    margin-bottom: 10px;
  }
  .date-list {
    display: flex;
    flex-wrap: wrap;
    .date-cell {
      width: (1 / 7) * 100%;
      height: 48px;
      padding-top: 5px;
      text-align: center;
      overflow: hidden;

      visibility: hidden;
      &.visible {
        visibility: visible;
      }
    }
  }
}
</style>
