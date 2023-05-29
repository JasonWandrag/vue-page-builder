<template>
  <div data-accordion>
    <button data-accordion-heading :open="isOpen" @click="isOpen = !isOpen">
      <h4>{{ props.title }}</h4>
      <span :style="accordionButtonRotation">+</span>
    </button>
    <div data-accordion-container :open="isOpen">
      <div data-accordion-inner>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  title: {type: String, required: true},
})
const isOpen = ref(false);
const accordionButtonRotation = computed(() => {
  return isOpen.value ? "transform: rotateZ(405deg)" : "transform: rotateZ(0deg)"
})
</script>
<style scoped>
[data-accordion] {
  margin-block: 10px;
}
[data-accordion-heading]{
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #333;
  outline: none;
  background: none;
  border: none;
  padding: 5px;
}
[data-accordion-heading]:hover, [data-accordion-heading][open=true] {
  background-color: #333;
  color: white;
}

[data-accordion-container]{
  height: 100%; 
  transition: all 0.3s linear;
  max-height: 0px; overflow: hidden;
}
[data-accordion-container][open=true] {
  max-height: 700px; overflow: auto;
}
[data-accordion-inner]{
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background-color: #eee;
}
</style>
