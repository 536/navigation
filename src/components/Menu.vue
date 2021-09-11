<template>
  <ol class="no-scrollbar">
    <li v-for="(menu, idx) in items" :key="idx" @click="scrollTo($event)" class="list" ref="list">
      {{ menu.name }}
    </li>
  </ol>
</template>

<script>
export default {
  name: "Menu",
  props: {
    items: Array,
    scrollTo: Function,
  }
}
</script>

<style scoped>
.list {
  color: var(--menu-text-color);
  height: 50px;
  width: 100%;
  cursor: pointer;
  transition: all .3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
