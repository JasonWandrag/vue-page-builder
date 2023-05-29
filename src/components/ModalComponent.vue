<template>
  <Teleport to="body">
    <div data-modal v-show="props.open">
      <button data-modal-close-btn @click="props.toggleModal()">x</button>
      <slot></slot>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
const props = defineProps({
  open: {type: Boolean, required: true},
  toggleModal: {type: Function, required: true}
})
</script>
<style scoped>
[data-modal] {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px 40px;
  color: #222;
  max-height: 60vh;
  max-width: 60vw;
  overflow: auto;
  width: 100%;
}
[data-modal-close-btn]{
    position: fixed;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    font-size: 20px;
}
</style>
