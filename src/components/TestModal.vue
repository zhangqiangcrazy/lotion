/* eslint-disable no-unused-vars */
<template>
  <Teleport to="body"  >
    <div class="app-modal" v-if="show"  @click.stop="handleClick">
      <el-popover
        ref="popoverRef"
        :virtual-ref="triggerEl"
        :visible="true"
        virtual-triggering
        :show-arrow	= "false"
        placement="top-start"
        :teleported = "false"
        :popper-options="popperOptions"

      >
        <span> 设置icon开发中 </span>
     </el-popover>
    </div>
  </Teleport>
</template>
<script setup>
  import {ref,defineEmits,defineProps,watch,computed} from "vue"
  //import { ClickOutside as vClickOutside } from 'element-plus'
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
  const emit = defineEmits(["close"])
  watch(()=>props.show,(newVal)=>{
    if(newVal){
    }
  },{immediate:true})

  function handleClick(){
    emit("close")
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
          offset: [props.popoverOffset.offsetX, 0],
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
