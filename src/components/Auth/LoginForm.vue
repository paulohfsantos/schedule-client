<template>
  <el-form v-model="credentials">
    <el-form-item>
      <label>Email</label>
      <el-input v-model="credentials.email" placeholder="Insert your email" />
    </el-form-item>
    <el-form-item>
      <label>Password</label>
      <el-input v-model="credentials.password" placeholder="Insert your password" />
    </el-form-item>

    <el-row justify="end">
      <el-button type="success" @click="submitLogin">Login</el-button>
    </el-row>

    <el-row justify="end">
      <small>
        Not member yet?
        <router-link to="/register">Register</router-link>
      </small>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, ElRow } from 'element-plus';
import { useAuth } from '../../stores/auth'

const { credentials, login } = useAuth();

const submitLogin = async () => {
  await login(credentials);
};

</script>

<style scoped lang="scss">
small {
  margin-top: 1rem;
  display: block;
}
</style>