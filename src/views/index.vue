<template>
  <div>
    <aside>
      <nav>
        <Menu :items="items" :scrollTo="scrollTo" ref="menu"></Menu>
      </nav>
      <footer>
        <div class="links">
          <a :href="link">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                d="M993.735111 148.906667c0.483556-2.986667 1.820444-5.688889 1.820445-8.846223 0-33.536-27.960889-60.728889-62.378667-60.728888-14.165333 0-26.567111 5.376-37.063111 13.169777l-0.597334-1.109333-832.625777 417.28C42.951111 515.584 28.444444 533.788444 28.444444 555.548444c0 22.670222 15.616 41.102222 36.750223 47.388445l252.728889 84.508444 0.455111-1.052444c4.010667 1.336889 8.078222 2.446222 12.572444 2.446222 22.328889 0 40.448-17.664 40.448-39.338667 0-15.217778-9.159111-28.046222-22.129778-34.673777l0.312889-0.711111-192.796444-63.886223 661.048889-331.264-386.104889 422.257778c-11.776 9.728-20.309333 25.457778-20.309334 41.671111 0 4.323556 1.109333 42.609778 1.109334 42.609778v179.655111c0 21.845333 18.090667 39.509333 40.476444 39.509333 22.328889 0 40.419556-17.664 40.419556-39.452444V746.097778l287.175111 96.056889c7.281778 3.896889 15.075556 6.656 23.950222 6.656 27.562667 0 49.891556-21.731556 49.891556-48.668445 0-0.113778-0.312889-0.284444-0.312889-0.398222L995.555556 149.333333l-1.820445-0.426666z m-213.333333 609.763555l-266.780445-89.998222L889.002667 258.872889l-108.600889 499.797333z"
                fill="">
              </path>
            </svg>
          </a>
          <a href="//github.com/536/navigation/">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                d="M950.857143 512q0 143.428571-83.714286 258t-216.285714 158.571429q-15.428571 2.857143-22.571429-4t-7.142857-17.142857l0-120.571429q0-55.428571-29.714286-81.142857 32.571429-3.428571 58.571429-10.285714t53.714286-22.285714 46.285714-38 30.285714-60 11.714286-86q0-69.142857-45.142857-117.714286 21.142857-52-4.571429-116.571429-16-5.142857-46.285714 6.285714t-52.571429 25.142857l-21.714286 13.714286q-53.142857-14.857143-109.714286-14.857143t-109.714286 14.857143q-9.142857-6.285714-24.285714-15.428571t-47.714286-22-49.142857-7.714286q-25.142857 64.571429-4 116.571429-45.142857 48.571429-45.142857 117.714286 0 48.571429 11.714286 85.714286t30 60 46 38.285714 53.714286 22.285714 58.571429 10.285714q-22.857143 20.571429-28 58.857143-12 5.714286-25.714286 8.571429t-32.571429 2.857143-37.428571-12.285714-31.714286-35.714286q-10.857143-18.285714-27.714286-29.714286t-28.285714-13.714286l-11.428571-1.714286q-12 0-16.571429 2.571429t-2.857143 6.571429 5.142857 8 7.428571 6.857143l4 2.857143q12.571429 5.714286 24.857143 21.714286t18 29.142857l5.714286 13.142857q7.428571 21.714286 25.142857 35.142857t38.285714 17.142857 39.714286 4 31.714286-2l13.142857-2.285714q0 21.714286 2.857143 50.857143t2.857143 30.857143q0 10.285714-7.428571 17.142857t-22.857143 4q-132.571429-44-216.285714-158.571429t-83.714286-258q0-119.428571 58.857143-220.285714t159.714286-159.714286 220.285714-58.857143 220.285714 58.857143 159.714286 159.714286 58.857143 220.285714z"
                fill="">
              </path>
            </svg>
          </a>
        </div>
      </footer>
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
@media (max-width: 768px) {
  .content {
    margin-bottom: 0 !important;
  }
}

.links > a {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.links > a + a {
  margin-left: 20px;
}
</style>
