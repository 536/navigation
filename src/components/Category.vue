<template>
  <div class="category">
    <h3 :id="category.name">{{ category.name }}</h3>
    <div v-for="(item, idx) in category.links" :key="idx" class="item">
      <a v-if="item.url" :href="item.url" class="item-link">
        <img
          class="item-img"
          :src="adapted_logo(item)"
          alt=""
          width="40"
          height="40"
          onerror="onerror=null;src='favicon.ico'"
        />
        <div class="item-content">
          <h4>{{ item.title }}</h4>
          <p class="desc">{{ item.desc ? item.desc : item.url }}</p>
        </div>
      </a>
      <a v-else class="item-link transparent"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: {
    category: Object,
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
      content.style.marginBottom =
        content.parentElement.clientHeight - content.lastElementChild.clientHeight - 20 + "px";
    });
  },
};
</script>

<style scoped>
.category {
  transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
  padding: 20px 0;
}

h3 {
  margin: 0;
  color: var(--main-h-text-color);
}

.item {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  width: calc(20% - 20px);
  min-width: 150px;
  box-sizing: border-box;
}

.item-link {
  border: 1px solid var(--item-border-color);
  box-shadow: 0 0 10px 0 var(--item-box-shadow-color);
  border-radius: 5px;
  padding: 10px;
  background: var(--item-background-color);
  color: var(--item-text-color);
  text-decoration: none;
  width: 100%;
  height: 80px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.4s ease;
}

.item-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px -10px var(--item-box-shadow-hover-color);
}

.item-img {
  margin-right: 10px;
}

.item-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.desc {
  line-height: 20px;
  max-height: 40px;
  overflow: hidden;
  color: var(--desc-text-color);
  word-break: break-word;
}

h4, p {
  margin: 0;
  font-size: 12px;
}

@media (max-width: 1400px) {
  .item {
    width: calc(25% - 20px);
    margin: 10px;
  }
}

@media (max-width: 1080px) {
  .item {
    width: calc(33% - 20px);
    margin: 10px;
  }
}

@media (max-width: 768px) {
  .item {
    width: calc(50% - 10px);
    margin: 5px;
  }
  .item-link {
    height: 40px;
  }
  .desc {
    display: none;
  }
}
</style>
