<template>
  <label class="edit-menu-button" aria-label="Upload Markdown" title="Upload Markup">
    <i class="fa-solid fa-upload"></i>
    <input @change="handleClick" data-file-upload id="file" type="file" />
  </label>
</template>
<script setup lang="ts">

const props = defineProps({
  toggleNav: { type: Function, required: true },
  setMarkup: { type: Function, required: true }
})
const onReaderLoad = (e: any) => {
  props.setMarkup(JSON.parse(e.target.result))
}
const handleClick = (e: any) => {
  var reader = new FileReader()
  reader.onload = onReaderLoad
  reader.readAsText(e.target.files[0])
  props.toggleNav(e)
}
</script>
<style scoped>
[data-file-upload] {
  display: none;
}
</style>
