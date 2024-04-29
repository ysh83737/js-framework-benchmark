<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn } from 'element-plus'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'

import { ref } from 'vue'
import { datas, MOCK_COUNT } from './data'

/**
 * 多个<ElTable />实例，但通过v-if控制每次仅存在1个
 */
defineOptions({
  name: 'IfTable'
})

const index = ref(0)

function onChangeData() {
  index.value = 1
}
</script>
<template>
  <div>
    <ElButton id="run" @click="onChangeData">换一组数据</ElButton>
    <template v-for="(item) in MOCK_COUNT" :key="item">
      <ElTable v-show="item - 1 === index" :data="datas[item - 1]">
        <ElTableColumn prop="id" label="ID" />
        <ElTableColumn prop="label" label="Label" />
      </ElTable>
    </template>
  </div>
</template>
