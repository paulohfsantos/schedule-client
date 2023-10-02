<template>
  <section :style="{ minHeight: '100vh'}">
    <el-card shadow="never">
      <el-col :span="24">
        <el-row justify="center">
          <el-col :span="24">
            <h2>Login</h2>
          </el-col>
          <el-col :span="12">
            <login-form />
          </el-col>
        </el-row>
      </el-col>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { ElCol, ElCard, ElRow } from 'element-plus'
import LoginForm from '../components/Auth/LoginForm.vue'
</script>