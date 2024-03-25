<template>
  <div class="chat-message-wrap">
    <div v-if="message?.role !== 'user'" class="chat-message-model">
      <ChatMarkDown
        :source="message?.content"
        :chatLoading="chatLoading"
      ></ChatMarkDown>
    </div>
    <div v-else class="chat-message-user">
      <div class="avatar"><el-avatar :size="40" :src="circleUrl" /></div>
      <div class="user-content">{{ message?.content }}</div>
    </div>
  </div>
</template>

<script setup>
import ChatMarkDown from '@/components/ChatMarkDown.vue';
const circleUrl =
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
defineProps(['message', 'chatLoading']);
</script>

<style lang="less" scoped>
.chat-message-wrap {
  margin-bottom: 10px;
  font-size: 13px;
  .chat-message-user {
    background-color: #efefef;
    border-radius: 6px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    align-items: center;
    .avatar {
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user-content {
      flex-grow: 1;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
  .chat-message-model {
    padding: 15px;
    background-color: #fff;
    border-radius: 4px;
  }
}
</style>
