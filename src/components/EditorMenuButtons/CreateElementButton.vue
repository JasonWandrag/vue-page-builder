<template>
  <button @click="handleClick" class="edit-menu-button" title="Create element" aria-label="Add Element">
    <i class="fa-solid fa-square-plus"></i>
    <ModalComponent :open="isOpen" :toggleModal="toggleModal">
      <CreateElementForm :toggleModal="toggleModal" />
    </ModalComponent>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ModalComponent from '../ModalComponent.vue'
import CreateElementForm from '../EditorMenuForms/CreateElementForm.vue';

const props = defineProps({
  toggleNav: { type: Function, required: true }
})
const isOpen = ref(false)
const toggleModal = () => isOpen.value = !isOpen.value;
const handleClick = (e: any) => {
  toggleModal()
  props.toggleNav(e)
}
</script>
<style></style>
