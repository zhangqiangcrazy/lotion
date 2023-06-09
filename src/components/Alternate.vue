/* eslint-disable no-unused-vars */
<template>
  <div style="position:absolute;background-color:white;z-index: 10" :style="alternatePos" @click.stop="onCloseTest">
    <div ref="topRef" style="border-radius: 6px; background: white; box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px; overflow: hidden; isolation: isolate;">
      <div style="width: 100%; min-height: 36px; padding: 2px 12px 2px 8px; display: flex; flex-direction: column; justify-content: center; gap: 2px; font-size: 14px;">
        <div v-if="actionShow && alternateContents.length  > 0" style="max-height: min(40vh, 320px); width: 100%; z-index: 1; overflow: hidden auto; margin-right: 0px; margin-bottom: 0px;">
          <div v-for="(content,index) in newContents" :key="index" spellcheck="true" data-content-editable-leaf="true" contenteditable="false" style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px;">
            模拟生成 {{content}}
          </div>
        </div>
        <div style="display: flex; gap: 8px; width: 100%;">
          <div style="height: 36px; align-items: center; display: flex; ">
            <svg viewBox="0 0 14 17" class="sparkles" style="width: 18px; height: 18px; display: block; fill: rgb(188, 161, 207); flex-shrink: 0; backface-visibility: hidden; padding-left: 4px;"><path d="M6.417 4.074c.096 0 .157-.061.178-.157.191-1.114.184-1.128 1.36-1.36.096-.02.157-.076.157-.178 0-.096-.061-.157-.157-.171-1.176-.219-1.155-.24-1.36-1.36-.02-.096-.082-.164-.178-.164-.096 0-.157.068-.178.164-.205 1.107-.177 1.12-1.36 1.36-.096.014-.157.075-.157.17 0 .103.061.158.164.179 1.169.225 1.162.232 1.353 1.36.02.096.082.157.178.157zM3.095 8.921c.15 0 .266-.11.287-.253.232-1.798.28-1.812 2.167-2.16a.276.276 0 00.246-.28c0-.15-.11-.267-.253-.28-1.873-.26-1.928-.315-2.16-2.154-.02-.15-.13-.26-.287-.26-.15 0-.26.11-.28.267-.22 1.798-.294 1.798-2.168 2.146-.15.02-.252.13-.252.28 0 .158.102.26.28.28 1.846.288 1.92.35 2.14 2.147.02.158.13.267.28.267zm4.82 7.54c.211 0 .375-.15.41-.376.498-3.67 1.01-4.252 4.655-4.662a.416.416 0 00.39-.41c0-.22-.165-.383-.39-.417-3.61-.431-4.123-.957-4.656-4.662-.04-.22-.198-.37-.41-.37-.212 0-.376.15-.41.37-.5 3.677-1.012 4.258-4.655 4.662-.226.027-.39.198-.39.417 0 .212.164.383.39.41 3.602.492 4.101.964 4.655 4.662.04.226.198.376.41.376z"></path></svg>
          </div>
          <div style="display: flex; align-items: center; border: none; padding: 4px 0px; width: 100%; background: transparent; font-size: inherit; line-height: inherit; min-height: 28px;">
            <el-input ref="inputControl" :readonly="inputReadOnly" @keydown="sendToAi" v-model="textarea1" input-style="box-shadow:none;" :autofocus="true" autosize resize="none" type="textarea" :placeholder="placeholder"/>
          </div>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="使用模板输入"
            placement="top"
            >
            <div style="height: 36px; display: flex; align-self: flex-end; align-items: center;"><div role="button" tabindex="0" style="user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; border-radius: 3px; height: 20px; width: 20px; padding: 0px; pointer-events: auto;"><svg viewBox="0 0 20 20" class="sendArrow" style="width: 20px; height: 20px; display: block; fill: rgb(167, 130, 195); flex-shrink: 0; backface-visibility: hidden;"><path d="M9.79883 18.5894C14.6216 18.5894 18.5894 14.6216 18.5894 9.79883C18.5894 4.96777 14.6216 1 9.79053 1C4.95947 1 1 4.96777 1 9.79883C1 14.6216 4.96777 18.5894 9.79883 18.5894ZM9.79883 14.3062C9.20947 14.3062 8.76953 13.9077 8.76953 13.3433V9.69922L8.86914 8.00586L8.25488 8.84424L7.3916 9.81543C7.23389 10.0063 6.98486 10.1143 6.72754 10.1143C6.21289 10.1143 5.84766 9.75732 5.84766 9.25928C5.84766 8.99365 5.92236 8.79443 6.12158 8.58691L8.96045 5.61523C9.19287 5.35791 9.4585 5.2417 9.79883 5.2417C10.1309 5.2417 10.4048 5.36621 10.6372 5.61523L13.4761 8.58691C13.667 8.79443 13.75 8.99365 13.75 9.25928C13.75 9.75732 13.3848 10.1143 12.8618 10.1143C12.6128 10.1143 12.3638 10.0063 12.2061 9.81543L11.3428 8.86914L10.7202 7.99756L10.8281 9.69922V13.3433C10.8281 13.9077 10.3799 14.3062 9.79883 14.3062Z"></path></svg></div></div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div ref="actionRef" v-if="actionShow" style="height:200px;margin-top: 4px; margin-bottom: 4px; border-radius: 6px; background: white; box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px; width: 320px; overflow: hidden; isolation: isolate;">
      <el-button type="primary" @click="replace">替换选中</el-button>
      <el-button type="primary" @click="putDown" >插入选中文字下方</el-button>
      <el-button type="primary" @click="next">继续生成</el-button>
      <el-button type="primary" @click="retry">重新生成</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script setup>
  import {ref,defineEmits,onMounted, nextTick,defineProps,computed,watch} from "vue"
  import { ClickOutside as vClickOutside } from 'element-plus'
  import {containsClientPoint} from '@/utils/utils'

  const props = defineProps({
    block:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    actionShow:{
      type:Boolean,
      default:false
    },
    alternateContents:{
      type:Array,
      default:()=>{
        return ["sadfsadfsdfsadfsdfsfsfsadfsdfsadfasfdsadfsadfadfasdfasfsdfsadfasfdsfdsadfsadf","aaaaaaaaaaaa"]
      }
    }    
  })
  const topRef = ref()
  const actionRef = ref()
  const textarea1 = ref("")
  const newContents = ref([])
  const placeholder = ref("输入你想让ThinkinAI帮写的指令")
  const inputControl = ref()
  const inputReadOnly = ref(false)
  const emits = defineEmits(["close","onNewContent","replace"])

  watch(()=>props.alternateContents,(newVal,oldVal)=>{
    if(newVal){
      newContents.value = newVal
    }
  },{immediate:true})

  const alternatePos = computed(()=>{
    let rect = props.block.contentContainer.getBoundingClientRect()
    let scrollBarTop = document.body.scrollTop || document.documentElement.scrollTop;
    let scrollBarLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    let left0 = rect.left + scrollBarLeft;
    let top0 = rect.top + scrollBarTop
    if(props.actionShow){
      top0 = top0 + rect.height
    }
    return {
      left: left0 +"px",
      top: top0 + "px",
      //height: rect.height + "px",
      width: rect.width + "px"
    }
})


  function onClickOutside(){
    if(!inputReadOnly.value){
      emits("close")
    }  
  
  }
  function sendToAi(event){
    if (event.keyCode === 13){
        event.preventDefault();
        let aValue = [textarea1.value];
        if(aValue ==""){
          emits("close")
          return
        }
        inputReadOnly.value = true
        textarea1.value = ""
        placeholder.value = "AI创作中..."
        setTimeout(() => {
          inputReadOnly.value = false
          emits("onNewContent",aValue,props.actionShow)
          emits("close")      
        }, (2000));
        return
      } else if (event.keyCode === 27){
        emits("close")      
      }
  }
  function cancel(){
    emits("close")      
  }
  function next(){
    let s = "模拟继续生成 - 拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉拉"
    newContents.value.push(s)
  
  }
  function retry(){
    let s = "模拟重新生成生成 - biubiubiubiubiubiubiubiubiubiubiubiubiubiubiubiubiu"
    newContents.value = []
    nextTick(()=>{
      newContents.value.push(s)
    })
  }
  function putDown(){
    inputReadOnly.value = false
    emits("onNewContent",newContents.value,props.actionShow)
    emits("close") 
  }
  function replace(){
    emits("replace",newContents.value.join(""))
  }
  onMounted(()=>{
    nextTick(()=>{
      inputControl.value.focus()
      if(props.actionShow){
        console.log("scrollIntoView")
        actionRef.value.scrollIntoView(false)
      }
    })
  })
  function onCloseTest(event){
    console.log(actionRef.value)
    if(containsClientPoint(actionRef.value,{x:event.clientX,y:event.clientY})){
      return
    }
    if(containsClientPoint(topRef.value,{x:event.clientX,y:event.clientY})){
      return
    }
    emits("close") 
  }
</script>

<style lang="scss" scoped>
</style>
