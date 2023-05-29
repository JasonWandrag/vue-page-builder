<template>
  <div>
    <h4>Update an element</h4>
    <AccordionComponent title="Styles">
      <AccordionComponent v-for="(styleGroup, name) in selectedMarkdownStyles" :key="name + '-' + selectedComponentID" :title="name.toString()">
        <UpdateStyleInput
          v-for="(attributeValue, attributeName) in styleGroup"
          :key="attributeName"
          :style-name="attributeName"
          :style-value="attributeValue"
        />
      </AccordionComponent>
    </AccordionComponent>
    <AccordionComponent title="Attributes">
      <UpdateAttributeInput v-for="(attributeValue, attributeName) in selectedDomAttributes" :key="attributeName + '-' + selectedComponentID" :attribute-name="attributeName.toString()" :attribute-value="attributeValue"/>
    </AccordionComponent>
  </div>
</template>
<script setup lang="ts">
import { usePageDataStore } from '@/stores/pageData.store'
import { storeToRefs } from 'pinia'
import AccordionComponent from '../AccordionComponent.vue'
import UpdateStyleInput from './UpdateStyleInput.vue'
import UpdateAttributeInput from './UpdateAttributeInput.vue';
const PageDataStore = usePageDataStore()
const { selectedMarkdownStyles, selectedDomAttributes, selectedComponentID } = storeToRefs(PageDataStore)
</script>
