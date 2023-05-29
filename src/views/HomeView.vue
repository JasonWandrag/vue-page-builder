<template>
  <main ref="mainElementRef">
    <template v-if="markup">
      <MarkupComponent :element="markup" />
    </template>
  </main>
  <EditorMenu :setMarkup="setMarkup" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EditorMenu from '@/components/EditorMenu.vue'
import MarkupComponent from '@/components/MarkupComponent.vue'
const markup = ref({})
const setMarkup = (newMarkup: any) => markup.value = newMarkup;
const mainElementRef = ref(null as any)
onMounted(() => {
  fetchData()
  mainElementRef.value.addEventListener('mouseover', (event: any) =>
    event.target.setAttribute('hovering', true)
  )
  mainElementRef.value.addEventListener('mouseout', (event: any) =>
    event.target.removeAttribute('hovering')
  )
})
async function fetchData() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/JasonWandrag/website-builder/main/templates/default_template.json'
    ) // Replace with your API endpoint
    if (response.ok) {
      const data = await response.json()
      markup.value = data // Assuming the API response contains an array of items
    } else {
      console.error('Error:', response.statusText)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
