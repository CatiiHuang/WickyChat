<template>
  <t-menu
    v-model:expanded="expanded"
    v-model="defaultRoute"
    class="page-aside-menu"
    theme="light"
    :collapsed="collapsed"
    @change="onChange"
  >
    <template #logo>
      <img class="logo-img" :src="Logo" alt="" />
      <div class="logo-wrap">
        <span v-if="!collapsed" class="logo-label">Wicky Chat</span>
      </div>
    </template>

    <t-menu-item value="/text-chat">
      <template #icon>
        <ChatBubbleSmileIcon />
      </template>
      <span>文字对话</span>
    </t-menu-item>

    <t-menu-item value="/vision-chat">
      <template #icon>
        <ImageSearchIcon />
      </template>
      <span>图文对话</span>
    </t-menu-item>

    <t-menu-item value="/text-to-img">
      <template #icon>
        <ImageSearchIcon />
      </template>
      <span>图生文</span>
    </t-menu-item>

    <t-submenu value="/user">
      <template #icon>
        <t-icon name="user-circle" />
      </template>
      <template #title>
        <span>个人中心</span>
      </template>
      <t-menu-item value="/user-center"> 个人中心 </t-menu-item>
    </t-submenu>

    <template #operations>
      <t-button variant="text" shape="square" @click="changeCollapsed">
        <template #icon><t-icon name="view-list" /></template>
      </t-button>
    </template>
  </t-menu>
</template>

<script setup>
import Logo from '../assets/logo.svg';
import { ChatBubbleSmileIcon, ImageSearchIcon } from 'tdesign-icons-vue-next';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const expanded = ref(['/chat-record', '/service']);
const collapsed = ref(false);
const defaultRoute = ref(window.location.pathname);

const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
};

const onChange = (v) => {
  router.push(v);
};

watch(
  () => route.path,
  (v) => {
    defaultRoute.value = v;
  }
);
</script>

<style lang="less" scoped>
.logo-img {
  height: 38px;
  width: 38px;
  border: 1px solid #bbb;
  border-radius: 50%;
}
.page-aside-menu {
  min-height: 100vh;
  .logo-wrap {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    .logo-label {
      // margin-left: 20px;
    }
  }
}
</style>
