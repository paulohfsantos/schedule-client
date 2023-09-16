<template>
  <header>
    <div class="wrapper">
      <el-menu mode="horizontal" default-active="/" :ellipsis="false">
        <el-menu-item index="0">LOGO</el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="1">
          <el-link>
            <router-link to="/">Home</router-link>
          </el-link>
        </el-menu-item>
        <el-menu-item index="2">
          <el-link>
            <router-link to="/schedule">Schedule</router-link>
          </el-link>
        </el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ElMenu, ElMenuItem, ElLink } from 'element-plus';
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
