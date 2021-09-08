<template>
  <aside class="flex-column-center">
    <header class="flex-column-center">
      <img :src="qrcode" alt="" width="80" height="80">
    </header>
    <nav>
      <ul class="no-scrollbar">
        <li v-for="(menu, idx) in items" :key="idx">
          <div :data-scrollTo="'#'+menu.name" @click="scrollTo($event)" class="menu flex-column-center">{{ menu.name }}</div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    items: Array,
    qrcode: String,
    scrollTo: Function,
  }
}
</script>

<style scoped>
.flex-column-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

aside {
  min-width: 250px;
  flex-basis: 250px;
  height: 100%;
  background: var(--aside-background-color);
}

header {
  margin: 20px;
}

nav {
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
}

nav > ul {
  height: 100%;
  overflow-y: auto;
  padding: 0;
  margin: 0;
}

.menu {
  text-decoration: none;
  color: var(--menu-text-color);
  height: 50px;
  width: 100%;
  cursor: pointer;
  transition: all .3s ease;
}

.menu:hover {
  background: var(--menu-background-hover-color);
}
</style>
