<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn } from 'element-plus'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'

import { ref } from 'vue'
import type { Item } from './data'
import { buildData } from './data'

/**
 * 单个<ElTable />实例，动态表格数据
 */
defineOptions({
  name: 'DynData'
})

const tabCount = ref(2)
function setTabCount(value: number) {
  tabCount.value = value
  datas.value = Array(value).fill(1).map(() => [])
}

let pageSize = 10
function setPageSize(value: number) {
  pageSize = value
}

const index = ref(0)
const datas = ref<Item[][]>([[], []])

function onLoad() {
  datas.value[index.value] = Object.freeze(buildData(pageSize)) as Item[]
}

function onChangeData() {
  index.value++
  onLoad()
}
</script>

<template>
  <div>
    <div>
      <ElButton id="set-tab-count-2" @click="setTabCount(2)">设置tab数量2</ElButton>
      <ElButton id="set-tab-count-5" @click="setTabCount(5)">设置tab数量5</ElButton>
    </div>
    <div>
      <ElButton id="set-page-size-10" @click="setPageSize(10)">设置分页大小10</ElButton>
      <ElButton id="set-page-size-50" @click="setPageSize(50)">设置分页大小50</ElButton>
      <ElButton id="set-page-size-1000" @click="setPageSize(1000)">设置分页大小1000</ElButton>
      <ElButton id="set-page-size-10000" @click="setPageSize(10000)">设置分页大小10000</ElButton>
    </div>
    <div>
      <ElButton id="init" @click="onLoad">初始化</ElButton>
      <ElButton id="run" @click="onChangeData">换一组数据</ElButton>
    </div>
    <div class="table-container">
      <ElTable :data="datas[index]">
        <ElTableColumn prop="id" label="ID" />
        <ElTableColumn prop="label" label="Label" />
      </ElTable>
    </div>
  </div>
</template>
