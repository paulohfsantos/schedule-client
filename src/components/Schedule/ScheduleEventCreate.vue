<template>
  <el-dialog
    title="Create event"
    :model-value="isVisible"
  >
    <el-card shadow="never">
      <el-form v-model="form">
        <el-form-item label="Title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="Initial date">
          <el-date-picker
            v-model="form.start_date"
            type="datetime"
            placeholder="Select a date"
            format="YYYY-MM-DDTHH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="Final date">
          <el-date-picker
            v-model="form.end_date"
            type="datetime"
            placeholder="Select a date"
            format="YYYY-MM-DDTHH:mm:ss"
          />
        </el-form-item>

        <el-row justify="end">
          <el-form-item class="btn_group">
            <el-button @click="handleSubmit" type="success">Criar</el-button>
            <el-button type="danger">Cancelar</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ElCard,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElButton,
  ElRow,
} from 'element-plus'
import type { EventForm } from '@/types';
import { dayjs } from 'element-plus'

const isVisible = ref(false)
const form = ref<EventForm>({
  title: '',
  description: '',
  start_date: new Date(),
  end_date: new Date(),
})

const handleSubmit = () => {
  console.log(form.value)
  // format this YYYY-MM-DDTHH:mm:ss using dayjs
  
  // const startDate = dayjs(form.value.start_date).format('YYYY-MM-DDTHH:mm:ss')
  // const endDate = dayjs(form.value.end_date).format('YYYY-MM-DDTHH:mm:ss')
  // isVisible.value = false
}
</script>

<style scoped lang="scss">
.btn_group {
  margin-bottom: 0;
}
</style>