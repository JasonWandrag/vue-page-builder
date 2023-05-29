<template>
  <label data-menu-input v-if="!props.attributeName.includes('hovering') && !props.attributeName.includes('contenteditable')">
    {{ props.attributeName }}:
    <input type="text" v-model="val" />
  </label>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePageDataStore } from '@/stores/pageData.store'
import { storeToRefs } from 'pinia'
const PageDataStore = usePageDataStore()
const { selectedDomObject } = storeToRefs(PageDataStore)
const props = defineProps({
  attributeName: { type: String, required: true },
  attributeValue: { type: String, required: true }
})
const val = ref(props.attributeValue)
// Automatically update attribute when value changes
watch(val, (newVal) => (selectedDomObject.value.setAttribute(props.attributeName, newVal)))
</script>
