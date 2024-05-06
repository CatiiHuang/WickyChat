<template>
  <ChatWrap>
    <div class="page-wrap">
      <!-- 历史记录 -->
      <div class="history-btn-box">
        <div
          class="history-btn"
          @click="
            () => {
              historyDrawer.visible = true;
            }
          "
        >
          <div>历</div>
          <div>史</div>
          <div>对</div>
          <div>话</div>
        </div>
      </div>
      <!-- 操作 -->
      <div class="operate-wrap">
        <el-select
          v-model="chatForm.model"
          placeholder="请选择使用的模型"
          style="width: 240px"
        >
          <el-option
            v-for="item in modelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- <t-button type="primary">保存会话</t-button> -->
        <t-button type="primary" @click="createNewChat">
          <template #icon><MapAddIcon /></template>

          新建会话</t-button
        >
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
        <div class="input-box">
          <el-input
            v-model="chatForm.inputValue"
            :rows="4"
            class="text-input"
            type="textarea"
            placeholder="SHOT"
          />
          <t-button
            class="send-btn"
            type="primary"
            :loading="chatLoading"
            @click="sendChatMessages"
          >
            <template #icon> <SendIcon /></template>
            Send
          </t-button>
        </div>
      </div>
    </div>
    <ChatList :historyDrawer="historyDrawer" />
  </ChatWrap>
</template>

<script setup>
import ChatWrap from '@/components/ChatWrap.vue';
import { SendIcon, MapAddIcon } from 'tdesign-icons-vue-next';
import { onMounted, reactive, ref, watch } from 'vue';
import { sendChatMessagesAPI } from '@/api/stream';
import { getChatDetailAPI } from '@/api/index.js';
import ChatMeesgeItem from '@/components/ChatMeesgeItem.vue';
import { useModelList, useTextChatList } from '@/hooks/CommonData';
import ChatList from './ChatList.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const chatLoading = ref(false);
const [modelList] = useModelList();
const [chatList, , getChatList] = useTextChatList();

const chatForm = reactive({
  chatId: route.query.chatId,
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

const historyDrawer = reactive({
  visible: false,
  chatList,
});

/**
 * 获取对话详情
 */
const getChatDetail = (chatId) => {
  chatLoading.value = true;
  getChatDetailAPI({ chatId })
    .then(({ data }) => {
      const { chat, messageList } = data || {};
      chatForm.chatId = chat.chatId;
      chatForm.model = chat.lastModel;
      chatForm.messages = messageList.map(({ role, message }) => ({
        role,
        content: message,
      }));
    })
    .finally(() => (chatLoading.value = false));
};

/**
 * 新建对话
 */
const createNewChat = () => {
  router.push('/text-chat');
};

/**
 * 流式对话请求
 */
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
    {
      onmessage: ({ data }) => {
        if (data === `[DONE]` || !data) return;
        const {
          choices: [
            {
              delta: { content },
            },
          ],
        } = JSON.parse(data);
        assistantMsg.value += content || '';
      },
      onopen: () => {
        chatForm.messages.push(...chatMsg);
        chatForm.inputValue = '';
      },
    }
  )
    .then(() => {})
    .catch(() => {})
    .finally(() => {
      chatLoading.value = false;
    });
};

/**
 * 监听chatId变化
 */
watch(
  () => route.query.chatId,
  (v) => {
    console.log(233, v);
    getChatDetail(v);
    getChatList();
    historyDrawer.visible = false;
  }
);
/**
 * 页面首次加载
 */
onMounted(() => {
  getChatDetail(chatForm.chatId);
});
</script>

<style lang="less" scoped>
.page-wrap {
  .history-btn-box {
    position: absolute;
    right: 0;
    top: 45%;
    transition: all 0.2s linear;
    &:hover {
      right: 2px;
    }
    .history-btn {
      width: 36px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      background-color: #003cab;
      color: #fff;
      padding: 10px 5px;
      font-size: 14px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      white-space: nowrap;
      border-radius: 3px;
      touch-action: manipulation;
      text-decoration: none;
      z-index: 99;
      transition: all 0.2s linear;
      &:hover {
        background-color: #366ef4;
      }
    }
  }
  .operate-wrap {
    display: flex;
    justify-content: space-between;
  }
  .messages-wrap {
    margin-top: 40px;
    .message-scroll {
      max-height: calc(100vh - 380px);
      overflow-y: scroll;
    }
  }
  .input-wrap {
    .send-btn {
      background-image: linear-gradient(
        332deg,
        #c684ffaa,
        #77a1ffaa,
        #79cbffaa
      );
      border-image: linear-gradient(332deg, #c684ffaa, #77a1ffaa, #79cbffaa);
    }

    .input-box {
      border: 5px solid;
      border-image: linear-gradient(332deg, #c684ffaa, #77a1ffaa, #79cbffaa);
      border-image-slice: 3;
      padding: 10px;
    }

    margin-top: 50px;
    // border: 1px solid #cfcfcf;
    box-shadow: 1px 4px 5px #cfcfcf;
    border-top: 1px solid rgba(200, 200, 200, 0.6);
    border-radius: 6px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    .text-input {
      margin-bottom: 5px;
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
