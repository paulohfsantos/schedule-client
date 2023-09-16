<template>
  <el-row>
    <el-button text size="small" @click="setView('month')">Month</el-button>
    <el-button text size="small" @click="setView('week')">Week</el-button>
    <el-button text size="small" @click="setView('day')">Day</el-button>
  </el-row>
</template>

<script setup lang="ts">
import { ElRow, ElButton } from 'element-plus'
import type { DayJsViewType } from '@/types'

const emit = defineEmits(['viewChanged'])

const setView = (view: DayJsViewType) => {
  emit('viewChanged', view)
}
</script>