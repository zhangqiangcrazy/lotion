<template>
  <div ref="content" class="flex" 
  @keydown.capture="onKeyDown"
  style="flex-direction: column;align-items:center;position: relative;width:100vw;border:1px solid red" >
    <div v-if="alternateShow" style="position:fixed;width:100%;height: 100%;z-index: 9;" @click.stop="onAlternateClose"></div>
    <Alternate v-if="alternateShow" :actionShow="alternateActionShow" 
    :alternateContents="alternateContents"
    :block="spaceMenuBlock" @onNewContent="onSpaceMenuContent" @replace="replace"
    @close="onAlternateClose"/>
    <div class="shrink-0 px-24 min-w-[50%] mx-auto box-border">
      <Lotion v-if="lotionShow" ref="lotionRef" :page="page" :titleShow="false" :readonly="readonly" :mouseUpLastBlockEnable="mouseUpLastBlockEnable" :onSpaceMenuBlock="onSpaceMenuBlock" :onTextSelectBlock="onTextSelectBlock"/>
    </div>
  </div>
  <TestModal  :show="modalShow" :block="textSelectBlock" @close="modalClose" @onNewContent="onTextSelectContent" 
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
const lotionShow = ref(false)
const mouseUpLastBlockEnable = ref(true)
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
      value: '文档标题'
    },
  },{
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: ''
    }
  }]
}) 

function onSpaceMenuBlock(block:Object){
  readonly.value = false
  alternateShow.value = true;
  spaceMenuBlock.value = {...block}
  alternateActionShow.value = false
  console.log("spaceMenuBlock",spaceMenuBlock.value)
  mouseUpLastBlockEnable.value  = false;
  console.log(lotionRef.value.getBlockComponents())
  lotionRef.value.getBlockComponents().forEach(blockComponent => {
    console.log(blockComponent.getBlockData())
    console.log(blockComponent.getContentContainer())

  }); 
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
  mouseUpLastBlockEnable.value = true;
  if(textSelectBlock.value){
    textSelectBlock.value.blockComponent?.unsetHighlight()
    let block = page.value.blocks.find(block=>block.id === spaceMenuBlock.value.id);
    if(block?.details.value?.trim()){//非空不需要清空了
      return
    }
    block.details.value = ""
  }
}
function onSpaceMenuContent(contents:Array<String>,actionShow: Boolean){//actionshow true 是文本选中显示,false是空格提示显示
  let uid = "";
  contents.forEach(content=>{
    let id = uuidv4()
    let newBlock =  {
      id,
      type: BlockType.Text,
      details: {
        value: content
      },
    }
    let index = page.value.blocks.findIndex(block=>block.id === spaceMenuBlock.value.id)
    if(actionShow){
      index = index + 1
    }
    if(uid === ""){
      uid = newBlock.id
    }
    page.value.blocks.splice(index, 0, newBlock)
  })
  nextTick(()=>{
    console.log("uid",uid)
    let index = page.value.blocks.findIndex(block=>block.id === spaceMenuBlock.value.id)
    if(actionShow){
      index = page.value.blocks.findIndex(block=>block.id === uid) + 1
    }
    if(index >= page.value.blocks.length){
      index = page.value.blocks.length - 1
    }
    console.log(actionShow,index)
    lotionRef.value.spaceMenu(index)
  })
}
function onTextSelectContent(contents:Array<String>){
  alternateContents.value = contents;
  console.log(alternateContents.value)
  let index = page.value.blocks.findIndex(block=>block.id === textSelectBlock.value.id)
  lotionRef.value.spaceMenu(index)
  alternateActionShow.value = true
}
function replace(content:String){
  console.log(textSelectBlock,content)
  textSelectBlock.value.blockComponent.replaceHighlightContent(content)
  alternateActionShow.value = false
  alternateShow.value = false
}

function onKeyDown(event){
  
  if (event.keyCode === 27){ //esc
    if(modalShow.value){
      event.preventDefault()
  event.stopPropagation()
  
      modalShow.value = false
      textSelectBlock.value.blockComponent.unsetHighlight()
    }
  }else if(event.keyCode === 8){//backspace
    if(modalShow.value){
  event.preventDefault()
  event.stopPropagation()
  
      modalShow.value = false
        textSelectBlock.value.blockComponent.unsetHighlight()
    }
  }
}
onMounted(()=>{
  setTimeout(() => {
    lotionShow.value = true    
  }, 10 * 1000);
})
</script>
