<template>
  <section>
    <el-card shadow="never">
      <el-col :span="24">
        <el-row justify="center">
          <el-col :span="24">
            <h2>Register</h2>
          </el-col>
          <el-col :span="12">
            <register-form />
          </el-col>
        </el-row>
      </el-col>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { ElCol, ElCard } from 'element-plus'
import RegisterForm from '../components/Auth/RegisterForm.vue'
</script>