<template>
  <t-drawer
    v-model:visible="historyDrawer.visible"
    header="历史对话"
    :footer="null"
    size="medium"
  >
    <div class="drawer-body">
      <div
        v-for="{
          chatId,
          chatSummary,
          createdAt,
          lastModel,
        } in historyDrawer.chatList"
        :key="chatId"
        class="drawer-body-item"
      >
        <t-card
          bordered
          :hoverShadow="true"
          :title="chatSummary || '- - -'"
          @click="goToChatDetail(chatId)"
        >
          <template #subtitle>
            <t-tag theme="primary"> {{ lastModel }}</t-tag>

            {{ createdAt }}
          </template>
        </t-card>
      </div>
    </div>
  </t-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(['historyDrawer']);
const historyDrawer = computed(() => props.historyDrawer);

const goToChatDetail = (chatId) => {
  router.replace(`/text-chat?chatId=${chatId}`);
};
</script>

<style lang="less" scoped>
.drawer-body-item {
  margin-bottom: 4px;
  cursor: pointer;
}
</style>
