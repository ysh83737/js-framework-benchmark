<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn } from 'element-plus'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'

import { ref } from 'vue'
import { datas } from './data'

/**
 * 单个<ElTable />实例，动态表格数据
 */
defineOptions({
  name: 'DynData'
})
const index = ref(0)

function onChangeData() {
  index.value = 1
}
</script>

<template>
  <div>
    <ElButton id="run" @click="onChangeData">换一组数据</ElButton>
    <ElTable :data="datas[index]">
      <ElTableColumn prop="id" label="ID" />
      <ElTableColumn prop="label" label="Label" />
    </ElTable>
  </div>
</template>
