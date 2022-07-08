<template>
  <BaseLayout>
    <template v-slot:header>
      <BaseHeader
        slot="header"
        :isloading="isloading"
        @RemoatQueryChange="handleRemoatQueryChange"
        @search="search"
      />
    </template>
    <template v-slot:aside>
      <BaseMenu
        slot="aside"
        :menuItemCfg="menuItemCfg"
        @pageChange="pageChange"
      />
    </template>
    <template v-slot:main>
      <NewsTab
        v-if="isQueryAll"
        :articles="articles"
        :articlesLike="articlesLike"
        :page="page"
        @likeChange="likeChange"
      />
      <NewsTab
        v-if="isQueryLike"
        :articles="articles"
        :articlesLike="articlesLike"
        :page="page"
        @likeChange="likeChange"
      />
    </template>
  </BaseLayout>
</template>

<script>
// 枚举类型
import { MENU_PAGE } from "@/constant";
// 外壳
import BaseLayout from "@/components/layout/BaseLayout";
// 顶部栏 - 包含搜索 & 登陆
import BaseHeader from "@/components/header/BaseHeader";
// 菜单栏
import BaseMenu from "@/components/menu/BaseMenu";
// 所有的消息列表
import NewsTab from "@/components/table/NewsTab";

// 查询接口
import { queryEverything } from "@/services/api/news";
import moment from "moment";
// 所有信息

export default {
  name: "App",
  components: {
    BaseLayout,
    BaseHeader,
    BaseMenu,
    NewsTab,
  },
  async mounted() {
    await this.search();
  },
  data() {
    return {
      isloading: false,
      // 渲染所有的数据
      articles: [],
      // like 收藏的
      articlesLike: [],
      // 查询参数
      q: "",
      sortBy: "publishedAt",
      // page 当前是收藏还是query页面,默认所有页面
      page: MENU_PAGE.all,
      // 配置
      menuItemCfg: [
        {
          iconClass: "el-icon-chat-round",
          name: "全部主题",
          page: MENU_PAGE.all,
        },
        {
          iconClass: "el-icon-folder",
          name: "我的收藏",
          page: MENU_PAGE.like,
        },
      ],
    };
  },
  computed: {
    isQueryAll() {
      return this.page === MENU_PAGE.all;
    },
    isQueryLike() {
      return this.page === MENU_PAGE.like;
    },
  },
  methods: {
    // 搜索变更的时候记录变化
    handleRemoatQueryChange(q) {
      this.q = q;
    },
    // 点击搜索的时候查询
    async search() {
      let params = {
        sortBy: this.sortBy,
        from: moment().format("YYYY-MM-DD"),
      };
      if (this.q !== "") {
        params.q = this.q;
      }
      // 没有q 的话这个api 是无效的，但是proxy 没办法在vpn下运作，需要nginx配合
      // else {
      //   this.$message("请在搜索后使用");
      //   return;
      // }
      this.isloading = true;
      queryEverything(params)
        .then((res) => {
          // console.log(res);
          this.articles = res.articles || [];
        })
        .finally(() => {
          this.isloading = false;
        });
    },
    // 切换喜欢和全部
    pageChange(d) {
      this.page = d;
    },
    // 切换其他搜索方式
    // optChange(d) {},
    // 收藏有变化
    likeChange(d) {
      let idx = undefined;
      let isArticlesLikeInclude = false;
      // let isArticlesLikeInclude = this.articlesLike.includes((v, index) => {
      //   idx = index;
      //   return v?.source?.id != null && v?.source?.id === d?.source?.id;
      // });
      this.articlesLike.map((v, index) => {
        if (v?.source?.id && v?.source?.id === d?.source?.id) {
          idx = index;
          isArticlesLikeInclude = true;
        }
      });
      // debugger;
      if (!isArticlesLikeInclude) {
        this.articlesLike = [...this.articlesLike, d];
      } else if (idx >= 0) {
        this.$confirm("此操作将删除你的收藏，是否确认?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.articlesLike.splice(idx, 1);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
