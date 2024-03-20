<template>
  <div class="login-form-box">
    <div class="login-tootip">
      <h1>登录到</h1>
      <h1>Wicky Chat</h1>
      <div class="login-tootip-remind">
        没有账号吗?
        <span>注册新账号</span>
      </div>
    </div>
    <t-form
      ref="form"
      class="login-form"
      :data="formData"
      :colon="true"
      :label-width="0"
      :rules="rules"
      @submit="onSubmit"
    >
      <t-form-item name="account">
        <t-input
          v-model="formData.account"
          clearable
          placeholder="请输入账户名"
          size="large"
        >
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          type="password"
          clearable
          size="large"
          placeholder="请输入密码"
        >
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button theme="primary" size="large" type="submit" block
          >登录</t-button
        >
      </t-form-item>
    </t-form>
  </div>
  <div class="copyright">
    Copyright @2024 Wicky Chat Team. All Rights Reserved
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
const formData = reactive({
  account: '',
  password: '',
});

const rules = {
  account: [{ required: true }, { min: 2 }, { max: 10, type: 'warning' }],
  password: [{ required: true }, { len: 8, message: '请输入 8 位密码' }],
};

const onSubmit = ({ validateResult }) => {
  if (validateResult === false) return;
  MessagePlugin.success('提交成功');
  router.push('/text-chat');
};
</script>

<style lang="less" scoped>
.login-form-box {
  position: absolute;
  top: 22%;
  left: 5%;
  min-height: 500px;
  width: 400px;
  box-sizing: border-box;
  .login-form {
    margin-top: 40px;
  }
  .login-tootip {
    h1 {
      font-size: 36px;
      color: rgba(0, 0, 0, 0.9);
    }
    .login-tootip-remind {
      font-size: 14px;
      margin-top: 24px;
      color: rgba(0, 0, 0, 0.6);
      span {
        color: rgba(0, 0, 0, 0.9);
        cursor: pointer;
      }
    }
  }
}

.copyright {
  font: var(--td-font-body-medium);
  color: var(--td-text-color-secondary);
  left: 5%;
  bottom: 60px;
  position: absolute;
}
</style>
