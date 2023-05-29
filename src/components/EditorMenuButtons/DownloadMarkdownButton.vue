<template>
    <button
      class="edit-menu-button"
      @click="handleClick"
      aria-label="Download Website"
      title="Download Markdown"
    >
      <i class="fa-solid fa-download"></i>
    </button>
</template>
<script setup lang="ts">
import { createMarkdownForElement } from '@/lib/helpers';
const props = defineProps({
  toggleNav: { type: Function, required: true }
})
const handleClick = (e: any) => {
  props.toggleNav(e)
  const applicationHTML = document.querySelector("main") as any
  const exportObj = createMarkdownForElement(applicationHTML.tagName.toLowerCase(), applicationHTML)
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "markdown.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  window.open("https://dynamic-site-loader.netlify.app/", "_blank");
}
</script>
<style>

</style>