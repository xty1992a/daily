<template>
  <div class="calendar">
    <DateHead v-if="type === 'date'" />
    <div
      class="scroll-wrap"
      ref="scroll"
      :style="'padding-top:' + (type === 'date' ? '40px' : '10px')"
    >
      <ul class="list">
        <component
          v-if="type"
          v-for="item in currentBlock"
          :is="componentName"
          :key="item.title"
          :data="item"
          @pick="(v) => $emit('pick', v)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import calendar from "./Calendar.js";
import DateHead from "./DateHead";
import DateBlock from "./DateBlock";
import WeekBlock from "./WeekBlock";
import MonthBlock from "./MonthBlock";
export default {
  name: "Calendar",
  props: {
    type: {
      type: String,
      required: true,
      validator: (v) => ["", "date", "week", "month"].includes(v),
    },
  },
  data() {
    return {
      calendar,
      dataMap: {},
    };
  },
  components: { DateHead, DateBlock, WeekBlock, MonthBlock },
  computed: {
    dateBlock() {
      return this.calendar.dateBlock;
    },
    weekBlock() {
      return this.calendar.weekBlock;
    },
    monthBlock() {
      return this.calendar.monthBlock;
    },
    currentBlock() {
      return (this.calendar[`${this.type}Block`] || []).map((it) => ({
        ...it,
        data: this.dataMap[it.key] || [],
      }));
    },
    componentName() {
      return `${this.type}-block`;
    },
  },
  methods: {
    setScrollState() {
      const scroll = this.$refs["scroll"];
      if (!scroll) return;
      const slider = scroll.children[0];
      scroll.scrollTop = slider.clientHeight;
      this.deboucedScroll = this.$utils.throttle(this.onScroll, 100);
      scroll.addEventListener("scroll", this.deboucedScroll);
      this.deboucedScroll();
    },

    onScroll() {
      const scroll = this.$refs["scroll"];
      const titles = [...scroll.querySelectorAll(".block-title")];
      const tops = titles.map((it) => ({
        el: it,
        top: it.getBoundingClientRect().top,
      }));

      const inView = tops.filter((it) => it.top > -500);
      this.requestAll(
        inView.map((it) => ({
          query: it.el.dataset.query,
          key: it.el.dataset.key,
        }))
      );
    },

    unListen() {
      const scroll = this.$refs["scroll"];
      if (!scroll) return;
      scroll.removeEventListener("scroll", this.deboucedScroll);
    },

    requestAll(list) {
      list.forEach(this.request);
      if (list.length === this.currentBlock.length) {
        this.unListen();
      }
    },

    async request({ query, key }) {
      if (this.requestMap[query]) return;
      this.requestMap[query] = true;
      const result = await this.$api.getBillList(JSON.parse(query));
      if (!result.success) return;
      this.$set(this.dataMap, key, result.data);
    },
  },
  watch: {
    type(now) {
      if (now) {
        setTimeout(() => {
          this.setScrollState();
        }, 30);
      } else {
        this.unListen();
      }
    },
  },
  created() {
    this.requestMap = {};
  },
  mounted() {
    this.setScrollState();
  },
  beforeDestroy() {
    this.unListen();
  },
};
</script>

<style lang="less" rel="stylesheet/less">
.calendar {
  position: fixed;
  width: 100vw;
  height: 100vh;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  background-color: #fff;

  .date-head {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .scroll-wrap {
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 10px;
  }

  .block-title {
    text-align: center;
    line-height: 40px;
    position: relative;
    span {
      background-color: #fff;
      padding: 0 10px;
      position: relative;
    }
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      height: 1px;
      background-color: #e5e5e5;
      width: 100%;
      transform: translate(-50%) scale(0.5);
    }
  }

  .cell-price {
    color: #999;
    font-size: 12px;
    &:before {
      content: "￥";
      font-size: 10px;
    }
  }
}
</style>
