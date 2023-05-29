<template>
  <!-- START OF EDIT MENU -->
  <div id="edit-menu" ref="editMenu">
    <!-- done -->
    <CreateElementButton :toggleNav="toggleNav" />
    <!-- done -->
    <UpdateElementButton :toggleNav="toggleNav" />
    <!-- done -->
    <DeleteElementButton :toggleNav="toggleNav" />
    <!-- done -->
    <CreateRowsOrColsButton :toggleNav="toggleNav" />
    <!-- done -->
    <UploadMarkdownButton :setMarkup="props.setMarkup" :toggleNav="toggleNav" />
    <!-- done -->
    <DownloadMarkdownButton :toggleNav="toggleNav" />
    <ChangeScreenSizeButton :toggleNav="toggleNav" />
    <SettingsButton :toggleNav="toggleNav" />
    <button @click="toggleNav" class="edit-menu-button" color-button aria-label="edit color">
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
import CreateElementButton from './EditorMenuButtons/CreateElementButton.vue'
import UpdateElementButton from './EditorMenuButtons/UpdateElementButton.vue'
import DeleteElementButton from './EditorMenuButtons/DeleteElementButton.vue'
import CreateRowsOrColsButton from './EditorMenuButtons/CreateRowsOrColsButton.vue'
import ChangeScreenSizeButton from './EditorMenuButtons/ChangeScreenSizeButton.vue'
import UploadMarkdownButton from './EditorMenuButtons/UploadMarkdownButton.vue'
import DownloadMarkdownButton from './EditorMenuButtons/DownloadMarkdownButton.vue'
import SettingsButton from './EditorMenuButtons/SettingsButton.vue'

import { waitForMs } from '@/lib/helpers'
import { ref } from 'vue'
import { usePageDataStore } from '@/stores/pageData.store'
import { isMobile } from '@/lib/constants'

const props = defineProps({
  setMarkup: { type: Function, required: true }
})

const PageDataStore = usePageDataStore()
const menuVisible = ref(false)
const editMenu = ref(null as any)

const toggleNav = async (e: any) => {
  menuVisible.value = !menuVisible.value
  const editMenuButtons = editMenu.value.querySelectorAll('.edit-menu-button')
  editMenu.value.classList.toggle('show')
  editMenuButtons.forEach((menuButton: HTMLElement) => menuButton.classList.toggle('show'))
  if (!menuVisible.value) await waitForMs(250)
  editMenu.value.style.left = `${menuVisible.value ? (!isMobile ? e.clientX : e.touches[0].pageX) : '-300'}px`
  editMenu.value.style.top = `${!isMobile ? e.clientY : e.touches[0].pageY}px`
}
window.oncontextmenu = (e: any) => {
  PageDataStore.setSelectedComponentID(e.target.getAttribute('componentID'))
  toggleNav(e)
  return false // cancel default menu
}
</script>
<style lang="css">
[data-menu-input] {
  display: flex;
  justify-content: space-between;
}
:root {
  --blue1: #caf0f8;
  --blue2: #ade8f4;
  --blue3: #90e0ef;
  --blue4: #48cae4;
  --blue5: #00b4d8;
  --blue6: #0096c7;
  --blue7: #0077b6;
  --blue8: #023e8a;
  --blue9: #03045e;
  --blueGray1: #353539;
  --blueGray2: #333337;
  --blueGray3: #313135;
  --blueGray4: #292933;
  --blueGray5: #272731;
  --blueGray6: #252529;
  --blueGray7: #232327;
  --blueGray8: #212125;
  --blueGray9: #191923;
}
#edit-menu {
  position: fixed;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s linear;
  opacity: 0;
  width: 0;
  height: 0;
  display: grid;
  place-items: center;
  left: -100%;
  color: white;
  border-radius: 50%;
  transition: all 300ms ease;
  transition-property: height, width, opacity;
}
#edit-menu.show {
  transition-delay: 300ms;
  opacity: 1;
  width: 120px;
  height: 120px;
  z-index: 100;
}
.edit-menu-button {
  color: var(--blue6);
  background-color: var(--blueGray1);
  /* border: 2px solid var(--blue6); */
  border: none;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: 0 3px 8px 0 rgb(15 15 20 / 20%);
  outline: none;
  height: 45px;
  width: 45px;
  transition: all 0.3s ease;
  transition-property: top, left, background-color, color, font-size;
  z-index: -1;
  cursor: pointer;
  display: grid;
  place-items: center;
  text-decoration: none;
  font-size: 1rem;
}

.show .edit-menu-button:last-child {
  transition: z-index 0.1s linear;
}
.edit-menu-button:hover {
  color: var(--blueGray1);
  background-color: var(--blue6);
}
.edit-menu-button.show {
  left: 50%;
  top: 0;
  z-index: 50;
  transition: all 0.3s cubic-bezier(0, 0, 0, 2.83);
  transition-property: top, left;
  transition-delay: 100ms;
}
.edit-menu-button.show:nth-child(2) {
  left: 85%;
  top: 15%;
  transition-delay: 200ms;
}
.edit-menu-button.show:nth-child(3) {
  left: 100%;
  top: 50%;
  transition-delay: 300ms;
}
.edit-menu-button.show:nth-child(4) {
  left: 85%;
  top: 85%;
  transition-delay: 400ms;
}
.edit-menu-button.show:nth-child(5) {
  left: 50%;
  top: 100%;
  transition-delay: 500ms;
}
.edit-menu-button.show:nth-child(6) {
  left: 15%;
  top: 85%;
  transition-delay: 600ms;
}
.edit-menu-button.show:nth-child(7) {
  left: 0;
  top: 50%;
  transition-delay: 700ms;
}
.edit-menu-button.show:nth-child(8) {
  left: 15%;
  top: 15%;
  transition-delay: 800ms;
}

.edit-menu-button.show:nth-child(9) {
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  transition: all 0.3s cubic-bezier(0, 0, 0, 2.83);
  width: 70px;
  height: 70px;
  font-size: 2rem;
  transition-delay: 700ms;
  transition-property: width, height;
}

.edit-menu-button.show:hover,
.edit-menu-button:hover {
  transition-delay: 0ms !important;
}

@media screen and (max-width: 720px) {
  #edit-menu {
    transform: scale(1.2) translate(-50%, -50%);
  }
}

#style-options {
  width: fit-content;
  display: flex;
  flex-direction: column;
}

.style-inputs {
  height: 100%;
  width: 100%;
  max-height: 0vh;
  overflow: hidden;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}

.style-inputs.open {
  max-height: 50vh;
  overflow: auto;
}
</style>
