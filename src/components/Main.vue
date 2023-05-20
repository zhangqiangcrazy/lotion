<template>
  <div ref="content" class="flex" 
  @keydown="onKeyDown"
  style="flex-direction: column;align-items:center;position: relative;width:50%;border:1px solid red" >
    <div v-if="alternateShow" style="position:fixed;width: 100vw;height: 100vh;z-index: 9;"></div>
    <Alternate v-if="alternateShow" :actionShow="alternateActionShow" 
    :alternateContents="alternateContents"
    :block="spaceMenuBlock" @onNewContent="onSpaceMenuContent" @replace="replace"
    @close="onAlternateClose"/>
    <div class="shrink-0 px-24 min-w-[50%] mx-auto box-border">
      <Lotion ref="lotionRef" :page="page" :readonly="readonly" :onSpaceMenuBlock="onSpaceMenuBlock" :onTextSelectBlock="onTextSelectBlock"/>
    </div>
  </div>
  <TestModal :show="modalShow" :block="textSelectBlock" @close="modalClose" @onNewContent="onTextSelectContent" 
  :triggerEl="triggerEl" :popoverOffset="popoverOffset"  /> 
</template>

<script setup lang="ts">
import { ref,onMounted,onUnmounted,computed, nextTick } from 'vue'
import { BlockType } from '@/utils/types'
//import Markdown from './Markdown.vue'
import Lotion from './Lotion.vue'
import { v4 as uuidv4 } from 'uuid'
import TestModal from './TestModal.vue'
import Alternate from './Alternate.vue'
const textarea1 = ref("")
const readonly = ref(false)
const modalShow = ref(false)
const content = ref()
const popoverOffset = ref()
const alternateShow = ref(false);
const alternateActionShow = ref(false);
const alternateContents = ref([])
const spaceMenuBlock = ref({})
const textSelectBlock = ref(null)
const lotionRef = ref()
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

function onSpaceMenuBlock(block:Object){
  readonly.value = false
  alternateShow.value = true;
  spaceMenuBlock.value = {...block}
  alternateActionShow.value = false
  console.log("spaceMenuBlock",spaceMenuBlock.value)
}
function onTextSelectBlock(block:Object){
  console.log("textSelectBlock",block)
  textSelectBlock.value = {...block}
  triggerEl.value =  block.contentContainer
  popoverOffset.value = block.popoverOffset
  modalShow.value = true
  textSelectBlock.value.blockComponent.setHighlight()
}
function modalClose({unsetHighlight}){
  console.log("modalClose")
  modalShow.value = false
  if(textSelectBlock.value && unsetHighlight){
    textSelectBlock.value.blockComponent.unsetHighlight()
  }else{
    textSelectBlock.value.blockComponent.setHighlight()
  }
}
function onAlternateClose(){
  alternateShow.value = false
  readonly.value =false
  alternateActionShow.value = false
  if(textSelectBlock.value){
    textSelectBlock.value.blockComponent.unsetHighlight()
  }
}
function onSpaceMenuContent(contents:Array<String>){
  contents.forEach(content=>{
    let newBlock =  {
      id: uuidv4(),
      type: BlockType.Text,
      details: {
        value: content
      },
    }
    let index = page.value.blocks.findIndex(block=>block.id === spaceMenuBlock.value.id)
    //console.log(index)
    page.value.blocks.splice(index, 0, newBlock)
  })
  nextTick(()=>{
    let index = page.value.blocks.findIndex(block=>block.id === spaceMenuBlock.value.id)
    lotionRef.value.spaceMenu(index)
  })
}
function onTextSelectContent(contents:Array<String>){
  alternateContents.value = contents;
  console.log(alternateContents.value)
  let index = page.value.blocks.findIndex(block=>block.id === textSelectBlock.value.id)
  lotionRef.value.spaceMenu(index + 1)
  alternateActionShow.value = true
}
function replace(content:String){
  console.log(textSelectBlock,content)
  textSelectBlock.value.blockComponent.replaceHighlightContent(content)
  alternateActionShow.value = false
  alternateShow.value = false
}

function onKeyDown(event){
  if (event.keyCode === 27){
    if(modalShow.value){
      modalShow.value = false
    }
  }
}
</script>
