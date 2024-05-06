<template>
  <div class="chat-message-wrap">
    <div v-if="message?.role !== 'user'" class="chat-message-model-wrap">
      <div class="chat-message-model">
        <ChatMarkDown
          :source="message?.content"
          :chatLoading="chatLoading"
        ></ChatMarkDown>
      </div>
    </div>
    <div v-else class="chat-message-user-wrap">
      <div class="chat-message-user">
        <div class="avatar"><el-avatar :size="40" :src="circleUrl" /></div>
        <div class="user-content">{{ message?.content }}</div>
      </div>
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
  margin-bottom: 20px;
  font-size: 13px;
  .chat-message-user-wrap {
    background-color: #efefef;
    border-radius: 6px;
    overflow: hidden;
    .chat-message-user {
      padding: 20px;
      background-image: linear-gradient(
        332deg,
        #0051d443,
        #4364f749,
        #6fb1fc49
      );

      justify-content: space-between;
      font-size: 13px;
      align-items: center;
      display: flex;
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
  }
  .chat-message-model-wrap {
    background-image: linear-gradient(332deg, #d0dbf56d, #dbe8f06d, #e7d7f76d);
    border-radius: 4px;
    overflow: hidden;
    background-clip: border-box;
    .chat-message-model {
      padding: 20px;
      // border: 5px solid;
      // border-image: linear-gradient(332deg, #0051d443, #4364f749, #6fb1fc49);
      // border-image-slice: 3;
    }
  }
}
</style>
