<template>
  <button
    @click="handleClick"
    class="edit-menu-button"
    title="Update element"
    aria-label="Add Element"
  >
    <i class="fa-solid fa-pen-to-square"></i>
    <ModalComponent :open="isOpen" :toggleModal="toggleModal">
      <UpdateElementForm />
    </ModalComponent>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ModalComponent from '../ModalComponent.vue'
import UpdateElementForm from '../EditorMenuForms/UpdateElementForm.vue'
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
