<template>
  <div>
    <aside>
      <nav>
        <Menu :items="items" :scrollTo="scrollTo" ref="menu"></Menu>
      </nav>
    </aside>
    <main class="no-scrollbar" ref="main">
      <header>
      </header>
      <div class="content">
        <Category v-for="(category, idx) in items" :key="idx" :category="category" ref="category"></Category>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Category from "@/components/Category";
import Menu from "@/components/Menu";

export default {
  name: "Index",
  components: {
    Menu,
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
        top: this.getCategoryByText(e.target.innerText).offsetTop,
        behavior: 'smooth',
      })
    },
    onscroll() {
      this.$refs.menu.$refs.list.forEach(e => {
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
        for (const e of this.$refs.menu.$refs.list) {
          if (e.innerText === this.currentCategory().firstElementChild.id) {
            return e
          }
        }
      }
      return document.querySelector('.list')
    },
    getCategoryByText(text) {
      for (const e of this.$refs.category) {
        if (e.$el.firstElementChild.id === text) {
          return e.$el
        }
      }
      return document.querySelector('.category')
    }
  }
}
</script>

<style scoped>
</style>
