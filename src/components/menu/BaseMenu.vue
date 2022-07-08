<template>
  <nav class="BaseMenu">
    <ul class="MenuWrap">
      <li>
        {{ selectItem.name }}
      </li>
      <li
        v-for="(item, index) in menuItemCfg"
        :key="`${item.page}`"
        @click="handleMenuClick(item, index)"
        :class="{ selectItem: checkIsSelectItem(item) }"
      >
        <i :class="item.iconClass" class="icon-menu" /><span>{{
          item.name
        }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { MENU_PAGE } from "@/constant";

export default {
  name: "BaseMenu",
  props: {
    menuItemCfg: {
      type: Array,
      require: true,
    },
    page: {
      type: String,
      require: true,
      validator(value) {
        return value === MENU_PAGE.all || value === MENU_PAGE.like;
      },
    },
  },
  data() {
    return {
      selectItem: this.menuItemCfg[0],
    };
  },
  methods: {
    checkIsSelectItem(item) {
      return this.selectItem.page === item.page;
    },
    handleMenuClick(item, index) {
      const { page } = item;
      this.selectItem = this.menuItemCfg[index];
      this.$emit("pageChange", page);
      // switch (opt) {
      //   case MENU_OPT.all:
      //     break;
      //   case MENU_OPT.like:
      //     break;
      //   default:
      //     break;
      // }
    },
  },
};
</script>

<style scope lang="scss">
@import "~@/components/menu/BaseMenu.scss";
</style>
