<template>
  <div class="category">
    <h3 :id="menu.name">{{ menu.name }}</h3>
    <a
      v-for="(item, idx) in menu.links"
      :key="idx"
      :href="item.url"
      class="item"
    >
      <img
        :src="adapted_logo(item)"
        alt=""
        width="40"
        height="40"
        onerror="onerror=null;src='favicon.ico'"
      />
      <div>
        <h4>{{ item.title }}</h4>
        <p class="desc">{{ item.desc ? item.desc : item.url }}</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: {
    menu: Object,
  },
  methods: {
    adapted_logo(item) {
      // 如果没有配置logo则尝试获取‘//+域名+favicon.ico’
      const domain = RegExp(/^http(s)?:/).test(item.url)
        ? item.url.split("/")[2]
        : item.url.split("/")[0];
      return item.logo ? item.logo : "//" + domain + "/favicon.ico";
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 根据最后一个category的高度设置content的marginBottom，实现导航到最后一个category的时候也能有跳转过程
      let content = document.querySelector(".category").parentElement;
      let height = content.lastElementChild.clientHeight;
      content.style.marginBottom =
        content.parentElement.clientHeight - height - 40 + "px";
    });
  },
};
</script>

<style scoped>
h3 {
  color: var(--main-h-text-color);
}

.item {
  background: var(--item-background-color);
  border: 1px solid var(--item-border-color);
  box-shadow: 0 0 10px 0 var(--item-box-shadow-color);
  width: calc(20% - 20px);
  min-width: 150px;
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  padding: 10px;
  margin: 10px;
  transition: all 0.4s ease;
  color: var(--item-text-color);
  text-decoration: none;
  border-radius: 4px;
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 30px -20px var(--item-box-shadow-hover-color);
}

.item > img {
  margin-right: 10px;
}

.item > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item > div > * {
  margin: 0;
  font-size: 12px;
}

.desc {
  line-height: 20px;
  max-height: 40px;
  overflow: hidden;
  color: var(--desc-text-color);
}

.category {
  transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
}

a > div {
  overflow: hidden;
}
</style>
