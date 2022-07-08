<template>
  <div class="BaseLayout">
    <el-container class="wrapper">
      <!--顶部-->
      <slot name="header"></slot>
      <el-divider />
      <el-container class="container">
        <!--左侧栏-->
        <el-aside class="aside" style="width: 190px">
          <slot name="aside"></slot>
        </el-aside>
        <!--主展示区域-->
        <el-main>
          <slot name="main"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "BaseLayout",
  props: {},
};
</script>

<style scoped lang="scss">
@import "~@/components/layout/BaseLayout.scss";

.el-divider {
  margin: 10px 0;
  background: 0 0;
  border-top: 1px solid #e6ebf5;
}
</style>
