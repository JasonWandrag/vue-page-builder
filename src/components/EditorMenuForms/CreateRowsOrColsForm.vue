<template>
  <div>
    <h4>Create rows or columns</h4>
    <label data-menu-input>
      Direction:
      <select v-model="direction">
        <option value="row">Row</option>
        <option value="column">Column</option>
      </select>
    </label>
    <label data-menu-input="">
      Segments({{ qtySegments }}):
      <input type="range" v-model="qtySegments" min="1" max="12" step="1" />
    </label>
    <button @click="createContainer">Create container</button>
    <p>Preview:</p>
    <div data-flex-container :data-flex-direction="direction">
      <div v-for="segment of segments" data-segment :key="'segment-' + segment">
        {{ segment }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { buildUI, generateSection } from '@/lib/helpers'
import { computed, ref } from 'vue'
import { usePageDataStore } from '@/stores/pageData.store'
import { storeToRefs } from 'pinia'
const props = defineProps({
  toggleModal: { type: Function, required: true }
})
const PageDataStore = usePageDataStore()
const { selectedComponentID } = storeToRefs(PageDataStore)
const direction = ref('row')
const qtySegments = ref(1 as number)
const segments = computed(() => {
  const segmentArr = [] as any[]
  for (let i = 0; i < qtySegments.value; i++) {segmentArr.push(i+1)}
  return segmentArr
})
const createContainer = () => {
  const newContainerDetails = {
    direction: direction.value,
    cols: qtySegments.value
  }
  buildUI(
    generateSection(newContainerDetails),
    document.querySelector(`[componentID='${selectedComponentID.value}']`)
  )
  props.toggleModal()
}
</script>
<style scoped>
[data-flex-container] {
  display: flex;
  gap: 5px;
}
[data-flex-container][data-flex-direction="row"]{
  flex-direction: row;
}
[data-flex-container][data-flex-direction="column"]{
  flex-direction: column;
}
[data-segment] {
  padding: 10px;
  background-color: cornflowerblue;
  flex-grow: 1;
  color: azure;
  display: grid;
  place-content: center;
}
</style>
