<template>
  <aside class="flex-column-center">
    <nav>
      <ul class="no-scrollbar">
        <li v-for="(menu, idx) in items" :key="idx">
          <div @click="scrollTo($event)" class="menu flex-column-center">{{ menu.name }}</div>
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
    scrollTo: Function,
  }
}
</script>

<style scoped>
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
</style>
