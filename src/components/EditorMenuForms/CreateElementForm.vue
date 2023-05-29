<template>
  <form data-create-element-form @submit="createElement">
    <h4>Create an element</h4>
    <select v-model="newElementType" placeholder="Select Element Type">
      <option value="" disabled selected>Select your option</option>
      <option v-for="(element, i) in elementTypes" :key="'create-element-' + i" :value="i">
        {{ i }}
      </option>
    </select>
    <template v-if="newElementType">
      <select v-model="newElementVariant" placeholder="Select Element Type">
        <option value="" disabled selected>Select your option</option>
        <option
          v-for="(element, i) in elementTypes[newElementType]"
          :key="'create-variant-' + i"
          :value="i"
        >
          {{ i }}
        </option>
      </select>
    </template>
    <template v-if="newElementVariant">
      <label
      data-menu-input
        v-for="(element, i) in elementTypes[newElementType][newElementVariant]"
        :key="'create-variant-values-' + i"
      >
        {{ i }}:
        <input  v-model="newElementValues[i]" />
      </label>
      <button type="submit">Create</button>
    </template>
</form>
</template>
<script setup lang="ts">
import { elementTypes } from '@/lib/constants'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { buildUI, generateUI } from '@/lib/helpers';
import { usePageDataStore } from '@/stores/pageData.store'
const PageDataStore = usePageDataStore()
const { selectedComponentID } = storeToRefs(PageDataStore)
const newElementType = ref(null)
const newElementVariant = ref(null)
const newElementValues = ref({} as any)
const props = defineProps({
  toggleModal: { type: Function, required: true }
})
const createElement = (e: Event) => {
    e.preventDefault();
  const newElementDetails = {
    elementType: newElementType.value,
    variantType: newElementVariant.value,
    ...newElementValues.value
  }
  buildUI(generateUI(newElementDetails), document.querySelector(`[componentID='${selectedComponentID.value}']`))
  props.toggleModal()
}
</script>
<style>
[data-create-element-form]{
  display: flex;
  flex-direction: column;
}
</style>
