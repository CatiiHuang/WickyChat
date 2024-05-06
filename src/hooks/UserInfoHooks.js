import { getUserInfoAPI } from '@/api/index';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export const useUserInfo = () => {
  const store = useStore();

  onMounted(() => {
    getUserInfoAPI().then((res) => {
      console.log('getUserInfoAPI:', res);
      store.commit('chanUserInfo', { user: '233' });
    });
  });
};
