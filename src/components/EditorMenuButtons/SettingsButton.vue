<template>
  <button
    aria-label="Not implemented yet"
    title="Not implemented yet"
    class="edit-menu-button"
    @click="handleClick"
  >
    <!-- <i class="fa-solid fa-gear"></i> -->
    <i class="fa-solid fa-triangle-exclamation"></i>
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  toggleNav: { type: Function, required: true }
})
const handleClick = (e: any) => {
  props.toggleNav(e)
}
</script>
<style></style>
