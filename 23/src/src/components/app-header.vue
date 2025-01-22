<template>
  <header>
    <div class="header-toolbar">
      {{ title }}
    </div>
  </header>
  
</template>

<script setup lang="ts">

defineProps<{
    title: string,
}>();


</script>
<style scoped lang="scss">



header {
  flex: 0 0 auto;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 0 4px rgba(0, 0, 0, 0.15);
  padding: 10px 0;
  background-color: white;
  position: fixed;
  width: 100%;
  text-indent:10px;
}
</style>
