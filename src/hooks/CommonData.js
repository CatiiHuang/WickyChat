import { getModelListAPI, getTextChatListAPI } from '@/api/index.js';
import { onMounted, ref } from 'vue';
import { useRequestLoading } from './CommUtilsHooks.js';

export const useModelList = () => {
  const modelList = ref([]);

  const [loadingState, initiateRequest] = useRequestLoading(getModelListAPI);

  onMounted(() => {
    initiateRequest().then(({ data }) => {
      modelList.value = data?.list?.map?.(({ id }) => ({
        label: id,
        value: id,
      }));
    });
  });

  return [modelList, loadingState, initiateRequest];
};

export const useTextChatList = () => {
  const chatList = ref([]);
  const [loadingState, initiateRequest] = useRequestLoading(getTextChatListAPI);

  onMounted(() => {
    initiateRequest().then(({ data }) => {
      chatList.value = data?.chatList || [];
    });
  });

  return [chatList, loadingState, initiateRequest];
};
