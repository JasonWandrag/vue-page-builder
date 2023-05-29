<template>
  <button
    class="edit-menu-button"
    @click="handleClick"
    aria-label="Not implemented yet"
    title="Not implemented yet"
  >
    <!-- <i class="fa-solid fa-ruler-combined"></i> -->
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
