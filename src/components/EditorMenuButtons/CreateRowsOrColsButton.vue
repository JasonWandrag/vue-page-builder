<template>
  <button
    @click="handleClick"
    class="edit-menu-button"
    title="Create Rows or Columns"
    aria-label="Add Rows or Columns"
  >
  <i class="fa-solid fa-vector-square"></i>
    <ModalComponent :open="isOpen" :toggleModal="toggleModal">
      <CreateRowsOrColsForm :toggleModal="toggleModal"/>
    </ModalComponent>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ModalComponent from '../ModalComponent.vue'
import CreateRowsOrColsForm from '../EditorMenuForms/CreateRowsOrColsForm.vue'
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
