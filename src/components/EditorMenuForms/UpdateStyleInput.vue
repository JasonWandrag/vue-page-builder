<template>
  <label data-menu-input>
    {{ props.styleName }}:
    <input
      :type="props.styleName.includes('color') ? 'color' : 'text'"
      v-model="val"
    />
  </label>
</template>
<script setup lang="ts">
import { rgbToHex } from '@/lib/helpers';
import { ref, watch } from 'vue'
import { usePageDataStore } from '@/stores/pageData.store'
import { storeToRefs } from 'pinia'
const PageDataStore = usePageDataStore()
const { selectedDomObject } = storeToRefs(PageDataStore)
const props = defineProps({
  styleName: { type: String, required: true },
  styleValue: { type: String, required: true }
})
const val = ref(props.styleName.includes("color") ? rgbToHex(props.styleValue) : props.styleValue)
watch(val, (newVal) => selectedDomObject.value.style[props.styleName] = newVal);
</script>
