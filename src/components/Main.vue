<template>
  <div ref="content" class="flex" 
  style="flex-direction: column;align-items:center;position: relative;width:100vw;border:1px solid red" >
    <div class="shrink-0 px-24 min-w-[50%] mx-auto box-border">
      <Lotion  :page="page" :readonly="false"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted,onUnmounted,computed, nextTick } from 'vue'
import { BlockType } from '@/utils/types'
//import Markdown from './Markdown.vue'
import Lotion from './Lotion.vue'
import { v4 as uuidv4 } from 'uuid'
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
      value: 'Welcome! This is a private page for you to play around with.'
    },
  },{
    id: uuidv4(),
    type: BlockType.Text,
    details: {
      value: ''
    },
  }]
}) 
</script>
