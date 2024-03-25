<template>
  <ChatWrap>
    <div class="page-wrap">
      <!-- 操作 -->
      <div class="operate-wrap">
        <el-select
          v-model="chatForm.model"
          placeholder="请选择使用的模型"
          style="width: 240px"
        >
          <el-option
            v-for="item in chatModelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-button type="primary">保存会话</el-button>
      </div>
      <!-- 消息列表 -->
      <div class="messages-wrap">
        <div class="message-scroll">
          <ChatMeesgeItem
            v-for="(message, i) in chatForm.messages"
            :key="i"
            :message="message"
            :chatLoading="
              i + 1 === chatForm.messages.length ? chatLoading : false
            "
          ></ChatMeesgeItem>
        </div>
      </div>
      <!-- 输入模块 -->
      <div class="input-wrap">
        <el-input
          v-model="chatForm.inputValue"
          :rows="4"
          class="text-input"
          type="textarea"
          placeholder="SHOT"
        />
        <el-button
          type="primary"
          :icon="Edit"
          :loading="chatLoading"
          @click="sendChatMessages"
        >
          Send</el-button
        >
      </div>
    </div>
  </ChatWrap>
</template>

<script setup>
import ChatWrap from '@/components/ChatWrap.vue';
import { Edit } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { sendChatMessagesAPI } from '@/api/stream';
import ChatMeesgeItem from '@/components/ChatMeesgeItem.vue';

const chatModelOptions = [
  {
    label: 'moonshot-v1-8k',
    value: 'moonshot-v1-8k',
  },
];
const chatForm = reactive({
  inputValue: '',
  model: 'moonshot-v1-8k',
  messages: [
    {
      role: 'system',
      content:
        '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。',
    },
  ],
});
const chatLoading = ref(false);

const sendChatMessages = async () => {
  const assistantMsg = ref('');
  const userMsg = { role: 'user', content: chatForm.inputValue };
  const chatMsg = [
    userMsg,
    {
      role: 'assistant',
      content: assistantMsg,
    },
  ];
  chatLoading.value = true;
  sendChatMessagesAPI(
    {
      model: chatForm.model,
      messages: [...chatForm.messages, userMsg],
      temperature: 0.3,
      stream: true,
    },
    ({ data }) => {
      if (data === `[DONE]` || !data) return;
      const {
        choices: [
          {
            delta: { content },
          },
        ],
      } = JSON.parse(data);
      assistantMsg.value += content || '';
    }
  )
    .then(() => {})
    .catch(() => {})
    .finally(() => {
      chatLoading.value = false;
    });
  chatForm.messages.push(...chatMsg);
  chatForm.inputValue = '';
};
</script>

<style lang="less" scoped>
.page-wrap {
  .operate-wrap {
    display: flex;
    justify-content: space-between;
  }
  .messages-wrap {
    margin-top: 40px;
  }
  .input-wrap {
    margin-top: 40px;
    // border: 1px solid #cfcfcf;
    box-shadow: 1px 4px 5px #cfcfcf;
    border-top: 1px solid rgba(200, 200, 200, 0.6);
    padding: 10px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.5);
    .text-input {
      margin-bottom: 5px;
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
