<template>
  <div>
    <SideBar :items="items" :qrcode="qrcode" :scrollTo="scrollTo"></SideBar>
    <main class="no-scrollbar">
      <nav>
      </nav>
      <div class="content">
        <div v-for="(menu, idx) in items" :key="idx">
          <Category :menu="menu"></Category>
        </div>
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
      link: undefined,
      qrcode: undefined,
    }
  },
  created() {
    this.link = this.$route.query.json || '/assets/default.json'
    // 获取链接数据
    axios.get(this.link).then(rep => {
      this.items = rep.data
    }).catch(e => {
      console.error(e)
    })

    // 生成当前页面二维码
    QRCode.toDataURL(location.href)
        .then(url => {
          this.qrcode = url
        })
        .catch(err => {
          console.error(err)
        })
  },
  methods: {
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
