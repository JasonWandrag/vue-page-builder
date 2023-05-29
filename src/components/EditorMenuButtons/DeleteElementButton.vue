<template>
    <button
      class="edit-menu-button"
      @click="handleClick"
      title="Delete element"
      aria-label="Delete Element"
    >
      <i class="fa-solid fa-square-xmark"></i>
    </button>
    <ModalComponent :open="isOpen" :toggleModal="toggleModal">
      <h4>Are you sure you want to delete this element?</h4>
      <button @click="confirmDelete">Yes</button>
      <button @click="toggleModal">No</button>
    </ModalComponent>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ModalComponent from '../ModalComponent.vue';
import { usePageDataStore } from '@/stores/pageData.store'
import { storeToRefs } from 'pinia';
const PageDataStore = usePageDataStore()
const { selectedComponentID } = storeToRefs(PageDataStore)
const props = defineProps({
  toggleNav: { type: Function, required: true }
})
const isOpen = ref(false)
const toggleModal = () => isOpen.value = !isOpen.value;
const handleClick = (e: any) => {
  toggleModal()
  props.toggleNav(e)
}
const confirmDelete = () => {
  document.querySelector(`[componentID='${selectedComponentID.value}']`)?.remove();
  toggleModal();
}

</script>
<style>

</style>