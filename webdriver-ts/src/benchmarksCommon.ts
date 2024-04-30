import { FrameworkData } from "./common.js";

export enum BenchmarkType {
  CPU,
  MEM,
  STARTUP_MAIN,
  STARTUP,
  SIZE_MAIN,
  SIZE,
}

export interface BenchmarkInfoBase {
  id: string;
  label: string;
  description: string;
  type: BenchmarkType;
}

export interface CPUBenchmarkInfo extends BenchmarkInfoBase {
  allowBatching: boolean;
  type: BenchmarkType.CPU;
  layoutEventRequired: boolean;
  additionalNumberOfRuns: number;
  warmupCount: number
}

export interface MemBenchmarkInfo extends BenchmarkInfoBase {
  type: BenchmarkType.MEM;
}

export interface SizeInfoJSON {
  size_uncompressed: number,
  size_compressed: number,
  fp: number,
}

export interface SizeBenchmarkInfo extends BenchmarkInfoBase {
  type: BenchmarkType.SIZE;
  fn(sizeInfo: SizeInfoJSON): number;
}

export interface SizeMainBenchmarkInfo extends BenchmarkInfoBase {
  type: BenchmarkType.SIZE_MAIN;
}
export interface StartupMainBenchmarkInfo extends BenchmarkInfoBase {
  type: BenchmarkType.STARTUP_MAIN;
}

export interface StartupBenchmarkInfo extends BenchmarkInfoBase {
  type: BenchmarkType.STARTUP;
  property: string;
  fn: (x: number) => number;
}

export type BenchmarkInfo = CPUBenchmarkInfo | MemBenchmarkInfo | StartupMainBenchmarkInfo | StartupBenchmarkInfo | SizeBenchmarkInfo | SizeMainBenchmarkInfo;

export interface BenchmarkImpl {
  benchmarkInfo: BenchmarkInfo;
  type: BenchmarkType;
}

export interface CPUBenchmarkResult {
  total: number;
  script: number;
  paint: number;
}

export function fileName(framework: FrameworkData, benchmark: BenchmarkInfo) {
  return `${framework.fullNameWithKeyedAndVersion}_${benchmark.id}.json`;
}

export enum Benchmark {
  _01 = "01_2tab_10size", // YSH
  _02 = "02_2tab_50size", // YSH
  _03 = "03_2tab_1000size", // YSH
  _04 = "04_5tab_10size", // YSH
  _05 = "05_5tab_50size", // YSH
  _06 = "06_5tab_1000size", // YSH
  _07 = "07_create10k",
  _08 = "08_create1k-after1k_x2",
  _09 = "09_clear1k_x8",
  _21 = "21_ready_memory", // YSH
  _22 = "22_run-memory", // YSH
  _23 = "23_update5-memory",
  // _24 = "24_run5-memory",
  _25 = "25_run-clear-memory",
  _26 = "26_run-10k-memory",
  _221 = "221_2tab_10size_tab1_memory", // YSH
  _222 = "222_2tab_10size_tab2_memory", // YSH
  _231 = "231_2tab_50size_tab1_memory", // YSH
  _232 = "232_2tab_50size_tab2_memory", // YSH
  _241 = "241_2tab_1000size_tab1_memory", // YSH
  _242 = "242_2tab_1000size_tab2_memory", // YSH
  _251 = "251_5tab_10size_tab1_memory", // YSH
  _252 = "252_5tab_10size_tab5_memory", // YSH
  _261 = "261_5tab_50size_tab1_memory", // YSH
  _262 = "262_5tab_50size_tab5_memory", // YSH
  _271 = "271_5tab_1000size_tab1_memory", // YSH
  _272 = "272_5tab_1000size_tab5_memory", // YSH
  _30 = "30_startup",
  _40 = "40_sizes",
}

export type BenchmarkId =
  | typeof Benchmark._01
  | typeof Benchmark._02
  | typeof Benchmark._03
  | typeof Benchmark._04
  | typeof Benchmark._05
  | typeof Benchmark._06
  | typeof Benchmark._07
  | typeof Benchmark._08
  | typeof Benchmark._09
  | typeof Benchmark._30
  | typeof Benchmark._40;

const throttlingFactors: { [idx: string]: number } = {
  // [Benchmark._03]: 4,
  // [Benchmark._04]: 4,
  // [Benchmark._05]: 4,
  // [Benchmark._06]: 2,
  // [Benchmark._09]: 4,
};

export function slowDownNote(throttleCPU: number | undefined): string {
  return throttleCPU ? ` ${throttleCPU} x CPU slowdown.` : "";
}

export function warmupNote(b: BenchmarkInfo): string {
  return 'warmupCount' in b ? ` (${b.warmupCount} warmup runs).` : "";
}

export function slowDownFactor(benchmarkId: string, allowThrottling: boolean): number | undefined {
  if (!allowThrottling) return undefined;
  return throttlingFactors[benchmarkId];
}

export const cpuBenchmarkInfosArray: Array<CPUBenchmarkInfo> = [
  {
    id: Benchmark._01,
    label: "2 Tab + 10 Size",
    warmupCount: 0,
    description: "2个Tab、10条分页，从Tab1切换到Tab2",
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
  {
    id: Benchmark._02,
    label: "2 Tab + 50 Size",
    warmupCount: 0,
    description: "2个Tab、50条分页，从Tab1切换到Tab2",
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
  {
    id: Benchmark._03,
    label: "2 Tab + 1000 Size",
    warmupCount: 0,
    description: "2个Tab、1000条分页，从Tab1切换到Tab2",
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
  // {
  //   id: Benchmark._04,
  //   label: "5 Tab + 10 Size",
  //   warmupCount: 0,
  //   description: "5个Tab、10条分页，从Tab1切换到Tab5",
  //   type: BenchmarkType.CPU,
  //   allowBatching: true,
  //   layoutEventRequired: true,
  //   additionalNumberOfRuns: 0,
  // },
  // {
  //   id: Benchmark._05,
  //   label: "5 Tab + 50 Size",
  //   warmupCount: 0,
  //   description: "5个Tab、50条分页，从Tab1切换到Tab5",
  //   type: BenchmarkType.CPU,
  //   allowBatching: true,
  //   layoutEventRequired: true,
  //   additionalNumberOfRuns: 0,
  // },
  // {
  //   id: Benchmark._06,
  //   label: "5 Tab + 1000 Size",
  //   warmupCount: 0,
  //   description: "5个Tab、1000条分页，从Tab1切换到Tab5",
  //   type: BenchmarkType.CPU,
  //   allowBatching: true,
  //   layoutEventRequired: true,
  //   additionalNumberOfRuns: 0,
  // },
];

export const memBenchmarkInfosArray: Array<MemBenchmarkInfo> = [
  {
    id: Benchmark._21,
    label: "初始内存",
    description: "页面加载完成后的内存占用",
    type: BenchmarkType.MEM,
  },
  {
    id: Benchmark._221,
    label: "2 Tab + 10 Size，Tab1",
    description: "2个Tab、10条分页，展示Tab1的内存占用",
    type: BenchmarkType.MEM,
  },
  {
    id: Benchmark._222,
    label: "2 Tab + 10 Size，Tab2",
    description: "2个Tab、10条分页，展示Tab2的内存占用",
    type: BenchmarkType.MEM,
  },
  {
    id: Benchmark._231,
    label: "2 Tab + 50 Size，Tab1",
    description: "2个Tab、50条分页，展示Tab1的内存占用",
    type: BenchmarkType.MEM,
  },
  {
    id: Benchmark._232,
    label: "2 Tab + 50 Size，Tab2",
    description: "2个Tab、50条分页，展示Tab2的内存占用",
    type: BenchmarkType.MEM,
  },
  {
    id: Benchmark._241,
    label: "2 Tab + 1000 Size，Tab1",
    description: "2个Tab、1000条分页，展示Tab1的内存占用",
    type: BenchmarkType.MEM,
  },
  {
    id: Benchmark._242,
    label: "2 Tab + 1000 Size，Tab2",
    description: "2个Tab、1000条分页，展示Tab2的内存占用",
    type: BenchmarkType.MEM,
  },
  // {
  //   id: Benchmark._251,
  //   label: "5 Tab + 10 Size，Tab1",
  //   description: "5个Tab、10条分页，展示Tab1的内存占用",
  //   type: BenchmarkType.MEM,
  // },
  // {
  //   id: Benchmark._252,
  //   label: "5 Tab + 10 Size，Tab5",
  //   description: "5个Tab、10条分页，展示Tab5的内存占用",
  //   type: BenchmarkType.MEM,
  // },
  // {
  //   id: Benchmark._261,
  //   label: "5 Tab + 50 Size，Tab1",
  //   description: "5个Tab、50条分页，展示Tab1的内存占用",
  //   type: BenchmarkType.MEM,
  // },
  // {
  //   id: Benchmark._262,
  //   label: "5 Tab + 50 Size，Tab5",
  //   description: "5个Tab、50条分页，展示Tab5的内存占用",
  //   type: BenchmarkType.MEM,
  // },
  // {
  //   id: Benchmark._271,
  //   label: "5 Tab + 1000 Size，Tab1",
  //   description: "5个Tab、1000条分页，展示Tab1的内存占用",
  //   type: BenchmarkType.MEM,
  // },
  // {
  //   id: Benchmark._272,
  //   label: "5 Tab + 1000 Size，Tab5",
  //   description: "5个Tab、1000条分页，展示Tab5的内存占用",
  //   type: BenchmarkType.MEM,
  // },
];

export const startupBenchmarkInfosArray: Array<StartupMainBenchmarkInfo> = [
  {
    id: Benchmark._30,
    type: BenchmarkType.STARTUP_MAIN,
    label: "",
    description: "",
  }
];

export const sizesBenchmarkInfosArray: Array<SizeMainBenchmarkInfo> = [
  {
    id: Benchmark._40,
    type: BenchmarkType.SIZE_MAIN,
    label: "",
    description: "",
  },
];

export const cpuBenchmarkInfos: { [idx: string]: CPUBenchmarkInfo } = {};
for (let bi of cpuBenchmarkInfosArray) {
  cpuBenchmarkInfos[bi.id] = bi;
}

export const memBenchmarkInfos: { [idx: string]: MemBenchmarkInfo } = {};
for (let bi of memBenchmarkInfosArray) {
  memBenchmarkInfos[bi.id] = bi;
}

export const startupBenchmarkInfos: { [idx: string]: StartupMainBenchmarkInfo } = {};
for (let bi of startupBenchmarkInfosArray) {
  startupBenchmarkInfos[bi.id] = bi;
}

export const sizeBenchmarkInfos: { [idx: string]: SizeMainBenchmarkInfo } = {};
for (let bi of sizesBenchmarkInfosArray) {
  sizeBenchmarkInfos[bi.id] = bi;
}

export const benchmarkInfos = [...cpuBenchmarkInfosArray, ...memBenchmarkInfosArray, ...sizesBenchmarkInfosArray];
