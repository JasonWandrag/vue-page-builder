<template>
  <template v-if="element.contentType === 'element'">
    <component
      :is="element.tagName"
      v-bind="attributes"
      :componentID="element.componentID"
      contenteditable
    >
      <template v-if="element.children">
        <MarkupComponent v-for="(child, i) of element.children" :key="i" :element="child" />
      </template>
    </component>
  </template>
  <template v-else>
    {{ element.tagText }}
  </template>
</template>
<script setup lang="ts">
const props = defineProps({
  element: { type: Object as any, required: true }
})
const attributes = props.element.attributes?.reduce((acc: any, cur: any) => {
  return {...acc, [cur.attributeName]: cur.attributeValue}
}, {})
</script>
