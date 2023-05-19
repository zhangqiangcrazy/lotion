<template>
  <Editor ref="editorRef" v-if="!props.readonly" v-model="props.block.details.value"
    class="py-1.5" />
  <div v-else v-html="markdownToHtml(props.block.details.value as string)"
    class="py-1.5"></div>
</template>

<script setup lang="ts">
import { PropType,ref,defineExpose } from 'vue'
import { Block } from '@/utils/types'
import { markdownToHtml } from '@/utils/utils'
import Editor from '../elements/Editor.vue'

const props = defineProps({
  block: {
    type: Object as PropType<Block>,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})
const editorRef = ref()
function setHighlight(){
  if(!props.readonly){
    editorRef.value.setHighlight()
  }
}
function unsetHighlight(){
  editorRef.value.unsetHighlight()
}
function unsetHighlight00(){
  editorRef.value.unsetHighlight()
}
defineExpose({
  setHighlight,
  unsetHighlight
})
</script>
