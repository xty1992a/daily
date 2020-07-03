<template>
  <div class="home">
    <button @click="type = 'date'">日报</button>
    <button @click="type = 'week'">周报</button>
    <button @click="type = 'month'">月报</button>
    <Calendar :type="type" v-show="!!type" @pick="pickType" />
  </div>
</template>

<script>
import Calendar from "@/components/Calendar";
export default {
  name: "home",
  props: {},
  data() {
    return {
      type: "",
    };
  },
  components: { Calendar },
  computed: {},
  methods: {
    pickType(e) {
      console.log(e);
      this.type = "";
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less" rel="stylesheet/less">
.home {
  width: 100vw;
}
</style>
