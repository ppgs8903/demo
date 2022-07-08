<template>
  <div class="TableItem">
    <div class="profilephoto" @click="openLink">
      <img :src="urlToImage" @error="loadDeaultImg" />
    </div>
    <div class="articleInfo" @click="openLink">
      <div class="line1">
        <span class="name">{{ name }}</span>
        (<span class="label">{{ author }}</span
        >)
      </div>
      <div class="line2">
        <span>
          <i
            class="el-icon-view"
            style="margin-right: 5px"
            :class="{ hasOpen: this.getOpenCount() > 0 }"
            >{{ this.getOpenCount() > 0 ? `~${this.getOpenCount()}` : "" }}</i
          >
          <span>发表时间：{{ publishedAt }}</span>
        </span>
      </div>
    </div>
    <div class="content" @click="openLink">{{ content }}</div>
    <div class="articleLike">
      <el-button
        icon="el-icon-collection-tag"
        circle
        size="small"
        :type="articleLike ? 'danger' : ''"
        :disabled="getLikeDisable()"
        @click="likeChange"
      ></el-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
const dne = require("@/assets/img/DNE.jpeg");

export default {
  name: "TableItem",
  props: {
    article: {
      type: Object,
      require: true,
    },
    articleLike: {
      type: Boolean,
      require: false,
      default: false,
    },
    openLinkTimesObj: {
      type: Object,
      require: false,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    urlToImage() {
      return this.article?.urlToImage || dne;
    },
    author() {
      let author = this.article?.author || "-";
      if (author.length > 10) {
        return author.substring(0, 10) + "...";
      } else {
        return author;
      }
    },
    // id() {
    //   return this.article?.source?.id || "-";
    // },
    name() {
      return this.article?.source?.name || "-";
    },
    publishedAt() {
      return this.article?.publishedAt
        ? moment(this.article?.publishedAt).format("YYYY-MM-DD HH:mm:ss")
        : "-";
    },
    content() {
      let str = this.article?.content || "";
      let strArr = str.split(" ");
      if (str < 20) {
        return strArr.join(" ");
      } else {
        return strArr.splice(0, 10).join(" ") + "...";
      }
    },
  },
  methods: {
    likeChange() {
      this.$emit("likeChange", this.article);
    },
    openLink() {
      this.$emit("openLink", this.article);
    },
    getOpenCount() {
      return this.openLinkTimesObj[this.article?.source?.id || ""];
    },
    getLikeDisable() {
      let dis =
        this.article?.source?.id === null ||
        typeof this.article?.source?.id !== "string";
      // debugger;
      return dis;
    },
    loadDeaultImg(e) {
      e.target.src = dne;
    },
  },
};
</script>

<style scope lang="scss">
@import "~@/components/table/Table.scss";
</style>
