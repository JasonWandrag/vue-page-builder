import { createStyleGrouping, isFoundObj } from '@/lib/helpers'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePageDataStore = defineStore('PageDataStore', () => {
  const app = ref({})
  const selectedComponentID = ref('')
  const setSelectedComponentID = (cid: string) => (selectedComponentID.value = cid)
  const selectedMarkdownObject = computed(() => isFoundObj(app, selectedComponentID.value))
  const selectedDomObject = computed(() =>
    document.querySelector(`[componentID='${selectedComponentID.value}']`) as HTMLElement
  )
  const selectedMarkdownStyles = computed(() => {
    if (!selectedDomObject.value) return {}
    const computedStyles = window.getComputedStyle(selectedDomObject.value)
    const styleAttributes = Array.from(computedStyles)
    const groupedStyles = Object.fromEntries(
      Object.entries(createStyleGrouping(styleAttributes, selectedComponentID.value)).sort()
    )
    return groupedStyles
  })
  const selectedDomAttributes = computed(() => {
    if (!selectedDomObject.value) return {}
    const attributes = selectedDomObject.value.attributes;
    const attributeMap = {
      class: "",
      id: "",
    } as any

    for (let i = 0; i < attributes.length; i++) {
      const attributeName = attributes[i].name
      const attributeValue = attributes[i].value
      attributeMap[attributeName] = attributeValue
    }
    return attributeMap
  })
  return {
    app,
    selectedComponentID,
    selectedMarkdownObject,
    selectedDomObject,
    selectedMarkdownStyles,
    selectedDomAttributes,
    setSelectedComponentID,
  }
})
