<template>
  <div class="AllNews">
    <div v-if="articles.length > 0">
      <div v-for="(article, index) in getArticle()" :key="`TableItem_${index}`">
        <TableItem
          v-if="index < showDisplayNum"
          :article="article"
          :articleLike="checkArticleLike(article)"
          :openLinkTimesObj="openLinkTimesObj"
          @likeChange="likeChange"
          @openLink="openLink"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { MENU_PAGE } from "@/constant/index";
import TableItem from "@/components/table/TableItem";

export default {
  name: "NewsTab",
  props: {
    articles: {
      type: Array,
      require: false,
      default: function () {
        return [];
      },
    },
    articlesLike: {
      type: Array,
      require: false,
      default: function () {
        return [];
      },
    },
    page: {
      props: String,
      require: true,
      validator(value) {
        return value === MENU_PAGE.all || value === MENU_PAGE.like;
      },
    },
    displayNum: {
      props: Number,
      require: false,
      default: 10,
    },
  },
  watch: {
    displayNum(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.showDisplayNum = newVal;
      }
    },
  },
  data() {
    return {
      showDisplayNum: this.displayNum,
      openLinkTimesObj: {},
    };
  },
  components: {
    TableItem,
  },
  mounted() {
    this.getArticle();
    document.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getArticle() {
      let articles = this.articles;
      // debugger;
      if (this.page === MENU_PAGE.like) {
        articles = this.articlesLike;
      }
      return articles;
    },
    // 回传下层的 article
    likeChange(d) {
      this.$emit("likeChange", d);
    },
    // 检测是不是有命中
    checkArticleLike(article) {
      let has = false;
      this.articlesLike.map((v) => {
        if (v?.source?.id && v?.source?.id === article?.source?.id) {
          has = true;
        }
      });
      return has;
    },
    // 是否看过
    openLink(article) {
      let id = article?.source?.id || undefined;
      if (id) {
        this.openLinkTimesObj[id]
          ? (this.openLinkTimesObj[id] = this.openLinkTimesObj[id] + 1)
          : (this.openLinkTimesObj[id] = 1);
      }
      window.open(article?.url);
      this.openLinkTimesObj = { ...this.openLinkTimesObj };
    },
    handleScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; // 滚动条距离顶部的距离
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight; // 可视区的高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //dom元素的高度，包含溢出不可见的内容
      if (scrollHeight >= scrollTop + windowHeight) {
        this.showDisplayNum = this.showDisplayNum + 10;
      }
    },
  },
};
</script>

<style scope lang="scss">
@import "~@/components/table/Table.scss";
</style>
