<template>
  <div ref="content" class="flex">
    <div class="shrink-0 px-24 min-w-[50%] mx-auto box-border">
      <Lotion :page="page" :readonly="readonly" :onSpaceMenuBlock="spaceMenuBlock" :onTextSelectBlock="textSelectBlock"/>
    </div>
  </div>
  <TestModal :show="modalShow"  @close="close" :triggerEl="triggerEl" :popoverOffset="popoverOffset" /> 
</template>

<script setup lang="ts">
import { ref,onMounted,onUnmounted } from 'vue'
import { BlockType } from '@/utils/types'
//import Markdown from './Markdown.vue'
import Lotion from './Lotion.vue'
import { v4 as uuidv4 } from 'uuid'
import TestModal from './TestModal.vue'
const readonly = ref(false)
const modalShow = ref(false)
const content = ref()
const popoverOffset = ref()
const triggerEl = ref(
        {
           getBoundingClientRect() {
              return {
                top: 300,
                left: 500,
                bottom: 0,
                right: 0,
              }
            }
        })
const page = ref({
  name: '🧴 Lotion',
  blocks:[{
    id: uuidv4(),
    type: BlockType.H1,
    details: {
      value: 'Get Started'
    },
  }, {
    id: uuidv4(),
    type: BlockType.Divider,
    details: {},
  }, {
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: '👋 Welcome! This is a private page for you to play around with.'
    },
  }, {
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: 'Give these things a try:'
    },
  }, {
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: '1. Hover on the left of each line for quick actions'
    },
  }, {
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: '2. Click on the + button to add a new line'
    },
  }, {
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: '3. Drag the ⋮⋮ button to reorder'
    },
  }, {
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: '4. Click the trash icon to delete this block4. Click the trash icon to delete this block4. Click the trash icon to delete this block4. Click the trash icon to delete this block4. Click the trash icon to delete this block4. Click the trash icon to delete this block4. Click the trash icon to delete this block4. Click the trash icon to delete this block4. Click the trash icon to delete this block'
    },
  }, {
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: '5. **Bold** and *italicize* using markdown e.g. \\*\\*bold\\*\\* and \\*italics\\*'
    },
  }, {
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: '6. Add headers and dividers with \'#\', \'##\' or \'---\' followed by a space'
    },
  }, {
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: '7. Type \'/\' for a menu to quickly switch blocks and search by typing'
    },
  },]
}) 

function spaceMenuBlock(block:Object){
  /*
  console.log(block)
  if(!modalShow.value){
    triggerEl.value =  block.contentContainer
    popoverOffset.value = block.popoverOffset
    modalShow.value = true
  }*/
  //triggerEl.value =  block.contentContainer
  /*
  triggerEl.value = {
           getBoundingClientRect() {
              return block.boundingClientRect
            }
        }
  */
  //modalShow.value = true
}
function textSelectBlock(block:Object){
  console.log("textSelectBlock",block)
  triggerEl.value =  block.contentContainer
  popoverOffset.value = block.popoverOffset
  modalShow.value = true
  
}
function close(){
  modalShow.value = false
}
</script>
