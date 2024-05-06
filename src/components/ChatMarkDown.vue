<template>
  <div class="markdown-box">
    <Markdown :source="source" :plugins="plugins" />
    <div class="loading-box">
      <t-loading v-if="chatLoading" size="small"></t-loading>
    </div>
  </div>
</template>

<script setup>
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
import MarkdownItTaskLists from 'markdown-it-task-lists';
import MarkdownItCodeCopy from 'markdown-it-code-copy';
import MarkdownItMark from 'markdown-it-mark';
import Markdown from 'vue3-markdown-it';
import { reactive } from 'vue';
// import 'highlight.js/styles/tomorrow-night-blue.css';
// import 'highlight.js/styles/stackoverflow-light.css';
import 'highlight.js/styles/panda-syntax-light.min.css';
// 导入 Vue 语法支持模块
import hljs from 'highlight.js';
import { hljsDefineVue } from '@/util/hljs.js';

hljs.registerLanguage('vue', hljsDefineVue);
// hljs.initHighlightingOnLoad();

defineProps(['source', 'chatLoading']);

const plugins = reactive([
  {
    plugin: MarkdownItHighlightjs,
  },
  {
    plugin: MarkdownItTaskLists,
  },
  {
    plugin: MarkdownItMark,
  },
  {
    plugin: MarkdownItCodeCopy,
    options: {
      iconClass: 'copy-icon-markdown-button',
      iconStyle: 'font-size: 12px; opacity: 0.4;',
    },
  },
]);
</script>

<style lang="less">
.copy-icon-markdown-button {
  &::before {
    content: 'Copy';
  }
}
.markdown-it-code-copy {
  display: flex;
}
.markdown-box {
}
.loading-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
