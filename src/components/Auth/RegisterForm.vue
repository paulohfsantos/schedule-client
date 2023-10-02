<template>
  <el-form v-model="registerCredentials">
    <el-form-item>
      <label>Username</label>
      <el-input v-model="registerCredentials.username" placeholder="type a username" />
    </el-form-item>
    <el-form-item>
      <label>Email</label>
      <el-input v-model="registerCredentials.email" placeholder="Insert your email" />
    </el-form-item>
    <el-form-item>
      <label>Password</label>
      <el-input v-model="registerCredentials.password" placeholder="Insert your password" />
    </el-form-item>

    <el-row justify="end">
      <el-button type="success" @click="submitRegister">Sign Up</el-button>
    </el-row>

    <el-row justify="end">
      <small>
        Have an account?
        <router-link to="/login">Login</router-link>
      </small>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, ElRow } from 'element-plus';
import { useAuth } from '../../stores/auth'

const { registerCredentials, register } = useAuth();

const submitRegister = async () => {
  await register(registerCredentials);
};

</script>

<style scoped lang="scss">
small {
  margin-top: 1rem;
  display: block;
}
</style>