<template>
  <div>
    <SideBar :items="items" :qrcode="qrcode" :scrollTo="scrollTo"></SideBar>
    <main class="no-scrollbar">
      <nav>
      </nav>
      <div class="content">
        <Category v-for="(menu, idx) in items" :key="idx" :menu="menu"></Category>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import Category from "@/components/Category";
import axios from "axios";
import QRCode from "qrcode";

export default {
  name: "Index",
  components: {
    SideBar,
    Category,
  },
  data() {
    return {
      items: undefined,
      qrcode: undefined,
    }
  },
  created() {
    this.getData()
    this.getQRCode()
  },
  computed: {
    link: function () {
      return this.$route.query.json || './assets/default.json'
    }
  },
  methods: {
    getData() {
      // 获取链接数据
      axios.get(this.link).then(rep => {
        this.items = rep.data
      }).catch(e => {
        console.error(e)
      })
    },
    getQRCode() {
      // 生成当前页面二维码
      QRCode.toDataURL(location.href)
          .then(url => {
            this.qrcode = url
          })
          .catch(err => {
            console.error(err)
          })
    },
    scrollTo(e) {
      document.querySelector('main').scrollTo({
        top: document.querySelector(e.target.getAttribute('data-scrollTo')).offsetTop - 20,
        behavior: 'smooth',
      })
    }
  }
}
</script>

<style scoped>
main {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background: var(--main-background-color);
}
</style>
