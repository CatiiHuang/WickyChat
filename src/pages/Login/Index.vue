<template>
  <div class="login-page-wrap">
    <Header></Header>
    <Login></Login>
  </div>
</template>

<script setup>
import Header from './Header.vue';
import Login from './Login.vue';
</script>

<style lang="less" scoped>
.login-page-wrap {
  background-color: #fff;
  background-image: url(https://static.tdesign.tencent.com/starter/vue-next/assets/assets-login-bg-white-439b0654.png);
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: 100%;
  position: relative;
  box-sizing: border-box;
}
</style>
