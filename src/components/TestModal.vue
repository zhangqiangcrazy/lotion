/* eslint-disable no-unused-vars */
<template>
   <el-popover
        v-if="show"
        ref="popoverRef"
        :virtual-ref="triggerEl"
        :visible="true"
        virtual-triggering
        :show-arrow	= "false"
        placement="bottom-start"
        :teleported = "true"
        :popper-options="popperOptions"
        popper-style="padding:0px"
        width="200"
        @show="realShow"
      >
        <div v-click-outside="onClickOutside" style="width:100%;height:200px;">
          <el-popover
            placement="right"
            title="Title"
            :width="200"
            trigger="click"
            :teleported = "false"
            content="this is content, this is content, this is content"
          >
            <template #reference>
              <el-button style="width:100%" >Click to activate</el-button>
            </template>
          </el-popover>

          <el-popover
            placement="right"
            title="Title"
            :width="200"
            trigger="click"
            :teleported = "false"
            content="this is content, this is content, this is content"
          >
            <template #reference>
              <el-button style="width:100%" >Click to 2</el-button>
            </template>
          </el-popover>
        </div>
     </el-popover>
</template>
<script setup>
  import {ref,defineEmits,defineProps,watch,computed} from "vue"
  import { ClickOutside as vClickOutside } from 'element-plus'

  const props = defineProps({
    show:{
      type:Boolean,
      default:false
    },
    popoverOffset:{
      type:Object,
      default:()=>{
        return {
          offsetX:0,
          offsetY:0
        }
      }
    },
    triggerEl:{
      type:Object,
      default:()=>{
        return {
           getBoundingClientRect() {
              return {
                top: 100,
                left: 300,
                bottom: 0,
                right: 0,
              }
            }
        }
      }
    }
  })
  const position = ref({
    top: 100,
    left: 300,
    bottom: 0,
    right: 0,
  })
  const triggerRef = ref({
  getBoundingClientRect() {
    return position.value
  },
})
  const popoverRef = ref();
  const showing = ref(false)
  const emit = defineEmits(["close"])
  watch(()=>props.show,(newVal)=>{
    if(newVal){
    }
  },{immediate:true})

  function handleClick(){
    console.log("handleClick")
    emit("close")
  }
  function onClickOutside(){
    if(showing.value){
      emit("close")
      showing.value = false;
    }
  }
  function realShow(){
    console.log("realshow",showing.value)
    showing.value = true;
  }
  function hide(){
    console.log("hide",showing.value)
    showing.value = false;
  }

  const popperOptions = computed(()=>{
    return {
    modifiers: [
      {
        name: 'computeStyles',
        options: {
          gpuAcceleration: false
        }
      },
      {
        name: 'offset',
        options: {
          offset: [props.popoverOffset.offsetX, -props.popoverOffset.offsetY],
        }
      }
    ]
  }
  }) 
</script>

<style lang="scss" scoped>
  .app-modal{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
