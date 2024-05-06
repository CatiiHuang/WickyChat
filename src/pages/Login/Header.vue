<template>
  <header class="login-header">
    <div class="logo-box">
      <img class="logo-img" :src="Logo" alt="" />
      <span class="logo-label">Wicky Chat</span>
    </div>
    <div class="operations-container">
      <t-button theme="default" shape="square" variant="text">
        <t-icon name="logo-github" class="icon" />
      </t-button>
      <t-button theme="default" shape="square" variant="text">
        <t-icon name="help-circle" class="icon" />
      </t-button>
      <t-button theme="default" shape="square" variant="text">
        <t-icon name="setting" class="icon" />
      </t-button>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.png';
</script>

<style lang="less" scoped>
.login-header {
  padding: 0 var(--td-comp-paddingLR-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(20px);
  color: var(--td-text-color-primary);
  height: var(--td-comp-size-xxxl);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .logo-box {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    width: 178px;
    height: var(--td-comp-size-s);
    .logo-img {
      height: 38px;
      width: 38px;
      border: 1px solid #bbb;
      border-radius: 50%;
    }
    .logo-label {
      margin-left: 20px;
    }
  }

  .operations-container {
    display: flex;
    align-items: center;

    .t-button {
      margin-left: var(--td-comp-margin-l);
    }
  }
}
</style>
