<template>
  <div class="RemoatQuery">
    <el-input
      size="small"
      v-if="isQueryNews"
      v-model="q"
      prefix-icon="el-icon-search"
      :style="{
        width: isFocus ? '400px' : '250px',
        transition: 'width .3s ease-in-out',
      }"
      placeholder="搜索"
      @select="handleSelect"
      @focus="handleFocusStatus(true)"
      @blur="handleFocusStatus(false)"
      @change="RemoatQueryChange"
    ></el-input>
  </div>
</template>

<script>
import { REMOTE_QUERY_TYPE as QUERY_TYPE } from "@/constant/index";
// import { queryNews } from "@/services/api/news";

export default {
  name: "RemoatQuery",
  props: {
    // 查询类型扩展使用
    type: {
      type: String,
      require: false,
      default: QUERY_TYPE.news,
    },
    baseQueryObj: {
      type: Object,
      require: false,
      default: function () {
        return {};
      },
    },
  },
  mounted() {
    // this.restaurants = this.loadAll();
  },
  computed: {
    isQueryNews() {
      return this.type === QUERY_TYPE.news;
    },
  },
  data() {
    return {
      isFocus: false,
      q: "",
    };
  },
  methods: {
    // 加载
    handleSelect(item) {
      console.log(item);
    },
    handleFocusStatus(foucsStatus = false) {
      this.isFocus = foucsStatus;
    },
    RemoatQueryChange() {
      this.$emit("RemoatQueryChange", this.q);
    },
  },
};
</script>

<style scope lang="scss">
@import "~@/components/query/RemoatQuery.scss";
</style>
