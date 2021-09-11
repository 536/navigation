<template>
  <div>
    <SideBar :items="items" :scrollTo="scrollTo"></SideBar>
    <main class="no-scrollbar" ref="main">
      <nav>
      </nav>
      <div class="content">
        <Category v-for="(menu, idx) in items" :key="idx" :menu="menu" ref="category"></Category>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import Category from "@/components/Category";
import axios from "axios";

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
  },
  computed: {
    link: function () {
      return this.$route.query.json || './assets/default.json'
    },
    menus: function () {
      return document.querySelectorAll('.menu')
    }
  },
  mounted() {
    this.$refs.main.addEventListener('scroll', this.onscroll)
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
    scrollTo(e) {
      document.querySelector('main').scrollTo({
        top: this.getMenuByText(e.target.innerText).offsetTop - 20,
        behavior: 'smooth',
      })
    },
    onscroll() {
      this.menus.forEach(e => {
        e.classList.remove('active')
      })
      this.currentMenu().classList.add('active')
    },
    currentCategory() {
      for (const e of this.$refs.category) {
        if (e.$el.getBoundingClientRect().top >= -20) {
          return e.$el
        }
      }
    },
    currentMenu() {
      if (this.currentCategory()) {
        for (const e of this.menus) {
          if (e.innerText === this.currentCategory().firstElementChild.id) {
            return e
          }
        }
      }
      return document.querySelector('.menu')
    },
    getMenuByText(text) {
      for (const e of this.menus) {
        if (e.innerText === text) {
          return e
        }
      }
      return document.querySelector('.menu')
    }
  }
}
</script>

<style scoped>
</style>
