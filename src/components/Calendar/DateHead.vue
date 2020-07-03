<template>
  <div class="date-head">
    <div class="head-item" v-for="it in list" :key="it">{{ it }}</div>
  </div>
</template>

<script>
export default {
  name: "date-head",
  props: {},
  data() {
    return {
      list: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
  computed: {
    dateList() {},
  },
  methods: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less" rel="stylesheet/less">
.date-head {
  display: flex;
  .head-item {
    text-align: center;
    background-color: #f7f7f7;
    color: #333;
    line-height: 30px;
    width: (1 / 7) * 100%;
  }
}
</style>
