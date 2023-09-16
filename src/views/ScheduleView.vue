<template>
  <section>
    <el-card shadow="never">
      <el-row>
        <el-col :span="24">
          <h2>Schedule View</h2>
        </el-col>

        <el-col :span="24">
          <schedule />
        </el-col>
      </el-row>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { ElRow, ElCol, ElCard } from 'element-plus'
import Schedule from '@/components/Schedule/ScheduleMain.vue';
</script>