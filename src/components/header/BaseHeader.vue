<template>
  <div class="BaseHeader">
    <el-header class="header" height="52px">
      <div class="logo"></div>
      <div class="operator">
        <RemoatQuery @RemoatQueryChange="RemoatQueryChange" />
        <div class="userInfo">
          <el-button
            size="small"
            type="primary"
            @click="search"
            :loading="isloading"
            >搜索</el-button
          >
          <!-- <span @click="userLogin">登陆</span> -->
          <!-- <span @click="userSin">注册</span> -->
          <!-- <span @click="userLogin">退出</span> -->
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
import RemoatQuery from "@/components/query/RemoatQuery";

export default {
  name: "BaseHeader",
  props: {
    isloading: {
      props: Boolean,
      require: true,
      default: false,
    },
  },
  components: {
    RemoatQuery,
  },
  methods: {
    userLogin() {},
    RemoatQueryChange(d) {
      this.$emit("RemoatQueryChange", d);
    },
    search() {
      this.$emit("search");
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/components/header/BaseHeader.scss";
</style>
