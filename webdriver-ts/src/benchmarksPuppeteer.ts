// import { testTextContains, testTextContainsJS, testTextNotContained, testClassContains, testElementLocatedByXpath, testElementNotLocatedByXPath, testElementLocatedById, clickElementById, clickElementByXPath, getTextByXPath } from './webdriverAccess'

import { Page } from "puppeteer-core";
import {
  BenchmarkType,
  Benchmark,
  memBenchmarkInfos,
  cpuBenchmarkInfos,
  CPUBenchmarkInfo,
  BenchmarkImpl,
  MemBenchmarkInfo,
} from "./benchmarksCommon.js";
import { config, FrameworkData } from "./common.js";
import {
  checkCountForSelector,
  checkElementContainsText,
  checkElementExists,
  checkElementHasClass,
  checkElementNotExists,
  clickElement,
} from "./puppeteerAccess.js";

export abstract class CPUBenchmarkPuppeteer implements BenchmarkImpl {
  type = BenchmarkType.CPU;
  constructor(public benchmarkInfo: CPUBenchmarkInfo) {}
  abstract init(page: Page, framework: FrameworkData): Promise<any>;
  abstract run(page: Page, framework: FrameworkData): Promise<any>;
}

export abstract class MemBenchmarkPuppeteer implements BenchmarkImpl {
  type = BenchmarkType.MEM;
  constructor(public benchmarkInfo: MemBenchmarkInfo) {}
  abstract init(page: Page, framework: FrameworkData): Promise<any>;
  abstract run(page: Page, framework: FrameworkData): Promise<any>;
}

export type BenchmarkPuppeteer = CPUBenchmarkPuppeteer | MemBenchmarkPuppeteer;

const bench01 = new (class extends CPUBenchmarkPuppeteer {
  constructor() {
    super(cpuBenchmarkInfos[Benchmark._01]);
  }
  async init(page: Page) { 
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-2");
    await clickElement(page, "pierce/#set-page-size-10");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(10) .cell", '10');
  }
  async run(page: Page) {
      await clickElement(page, "pierce/#run");
      await checkCountForSelector(page, "pierce/.table-container .el-table", 2).then(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table:nth-child(2) .el-table__body tbody .el-table__row:nth-child(10) .cell", String(2 * 10));
      }).catch(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(10) .cell", String(2 * 10));
      })
  }
})();

const bench02 = new (class extends CPUBenchmarkPuppeteer {
  constructor() {
    super(cpuBenchmarkInfos[Benchmark._02]);
  }
  async init(page: Page) { 
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-2");
    await clickElement(page, "pierce/#set-page-size-50");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(50) .cell", '50');
  }
  async run(page: Page) {
      await clickElement(page, "pierce/#run");
      await checkCountForSelector(page, "pierce/.table-container .el-table", 2).then(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table:nth-child(2) .el-table__body tbody .el-table__row:nth-child(50) .cell", String(2 * 50));
      }).catch(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(50) .cell", String(2 * 50));
      })
  }
})();

export const bench03 = new (class extends CPUBenchmarkPuppeteer {
  constructor() {
    super(cpuBenchmarkInfos[Benchmark._03]);
  }
  async init(page: Page) { 
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-2");
    await clickElement(page, "pierce/#set-page-size-1000");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(1000) .cell", '1000');
  }
  async run(page: Page) {
      await clickElement(page, "pierce/#run");
      await checkCountForSelector(page, "pierce/.table-container .el-table", 2).then(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table:nth-child(2) .el-table__body tbody .el-table__row:nth-child(1000) .cell", String(2 * 1000));
      }).catch(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(1000) .cell", String(2 * 1000));
      })
  }
})();

export const bench04 = new (class extends CPUBenchmarkPuppeteer {
  constructor() {
    super(cpuBenchmarkInfos[Benchmark._04]);
  }
  async init(page: Page) { 
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-5");
    await clickElement(page, "pierce/#set-page-size-10");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(10) .cell", '10');
  }
  async run(page: Page) {
    for (let i = 2; i <= 5; i++) {
      await clickElement(page, "pierce/#run");
      await checkCountForSelector(page, "pierce/.table-container .el-table", 5).then(() => {
        return checkElementContainsText(page, `pierce/.table-container .el-table:nth-child(${i}) .el-table__body tbody .el-table__row:nth-child(10) .cell`, String(i * 10));
      }).catch(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(10) .cell", String(i * 10));
      })
    }
  }
})();

export const bench05 = new (class extends CPUBenchmarkPuppeteer {
  constructor() {
    super(cpuBenchmarkInfos[Benchmark._05]);
  }
  async init(page: Page) { 
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-5");
    await clickElement(page, "pierce/#set-page-size-50");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(50) .cell", '50');
  }
  async run(page: Page) {
    for (let i = 2; i <= 5; i++) {
      await clickElement(page, "pierce/#run");
      await checkCountForSelector(page, "pierce/.table-container .el-table", 5).then(() => {
        return checkElementContainsText(page, `pierce/.table-container .el-table:nth-child(${i}) .el-table__body tbody .el-table__row:nth-child(50) .cell`, String(i * 50));
      }).catch(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(50) .cell", String(i * 50));
      })
    }
  }
})();

export const bench06 = new (class extends CPUBenchmarkPuppeteer {
  constructor() {
    super(cpuBenchmarkInfos[Benchmark._06]);
  }
  async init(page: Page) { 
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-5");
    await clickElement(page, "pierce/#set-page-size-1000");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(1000) .cell", '1000');
  }
  async run(page: Page) {
    for (let i = 2; i <= 5; i++) {
      await clickElement(page, "pierce/#run");
      await checkCountForSelector(page, "pierce/.table-container .el-table", 5).then(() => {
        return checkElementContainsText(page, `pierce/.table-container .el-table:nth-child(${i}) .el-table__body tbody .el-table__row:nth-child(1000) .cell`, String(i * 1000));
      }).catch(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(1000) .cell", String(i * 1000));
      })
    }
  }
})();

const bench21 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._21]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
  }
  async run() {
    return await Promise.resolve(null);
  }
})();

const bench221 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._221]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-2");
    await clickElement(page, "pierce/#set-page-size-10");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(10) .cell", '10');
  }
  async run() {
    return await Promise.resolve(null);
  }
})();
const bench222 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._222]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-2");
    await clickElement(page, "pierce/#set-page-size-10");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(10) .cell", '10');
    await clickElement(page, "pierce/#run");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(10) .cell", String(2 * 10));
  }
  async run() {
    return await Promise.resolve(null);
  }
})();

const bench231 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._231]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-2");
    await clickElement(page, "pierce/#set-page-size-50");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(50) .cell", '50');
  }
  async run() {
    return await Promise.resolve(null);
  }
})();
const bench232 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._232]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-2");
    await clickElement(page, "pierce/#set-page-size-50");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(50) .cell", '50');
    await clickElement(page, "pierce/#run");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(50) .cell", String(2 * 50));
  }
  async run() {
    return await Promise.resolve(null);
  }
})();

const bench241 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._241]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-2");
    await clickElement(page, "pierce/#set-page-size-1000");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(1000) .cell", '1000');
  }
  async run() {
    return await Promise.resolve(null);
  }
})();
const bench242 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._242]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-2");
    await clickElement(page, "pierce/#set-page-size-1000");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(1000) .cell", '1000');
    await clickElement(page, "pierce/#run");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(1000) .cell", String(2 * 1000));
  }
  async run() {
    return await Promise.resolve(null);
  }
})();

const bench251 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._251]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-5");
    await clickElement(page, "pierce/#set-page-size-10");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(10) .cell", '10');
  }
  async run() {
    return await Promise.resolve(null);
  }
})();
const bench252 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._252]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-5");
    await clickElement(page, "pierce/#set-page-size-10");
    await clickElement(page, "pierce/#init");
    for (let i = 2; i <= 5; i++) {
      await clickElement(page, "pierce/#run");
      await checkCountForSelector(page, "pierce/.table-container .el-table", 5).then(() => {
        return checkElementContainsText(page, `pierce/.table-container .el-table:nth-child(${i}) .el-table__body tbody .el-table__row:nth-child(10) .cell`, String(i * 10));
      }).catch(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(10) .cell", String(i * 10));
      })
    }
  }
  async run() {
    return await Promise.resolve(null);
  }
})();

const bench261 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._261]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-5");
    await clickElement(page, "pierce/#set-page-size-50");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(50) .cell", '50');
  }
  async run() {
    return await Promise.resolve(null);
  }
})();
const bench262 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._262]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-5");
    await clickElement(page, "pierce/#set-page-size-50");
    await clickElement(page, "pierce/#init");
    for (let i = 2; i <= 5; i++) {
      await clickElement(page, "pierce/#run");
      await checkCountForSelector(page, "pierce/.table-container .el-table", 5).then(() => {
        return checkElementContainsText(page, `pierce/.table-container .el-table:nth-child(${i}) .el-table__body tbody .el-table__row:nth-child(50) .cell`, String(i * 50));
      }).catch(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(50) .cell", String(i * 50));
      })
    }
  }
  async run() {
    return await Promise.resolve(null);
  }
})();

const bench271 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._271]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-5");
    await clickElement(page, "pierce/#set-page-size-1000");
    await clickElement(page, "pierce/#init");
    await checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(1000) .cell", '1000');
  }
  async run() {
    return await Promise.resolve(null);
  }
})();
const bench272 = new (class extends MemBenchmarkPuppeteer {
  constructor() {
    super(memBenchmarkInfos[Benchmark._272]);
  }
  async init(page: Page) {
    await checkElementExists(page, "pierce/#run");
    await clickElement(page, "pierce/#set-tab-count-5");
    await clickElement(page, "pierce/#set-page-size-1000");
    await clickElement(page, "pierce/#init");
    for (let i = 2; i <= 5; i++) {
      await clickElement(page, "pierce/#run");
      await checkCountForSelector(page, "pierce/.table-container .el-table", 5).then(() => {
        return checkElementContainsText(page, `pierce/.table-container .el-table:nth-child(${i}) .el-table__body tbody .el-table__row:nth-child(1000) .cell`, String(i * 1000));
      }).catch(() => {
        return checkElementContainsText(page, "pierce/.table-container .el-table .el-table__body tbody .el-table__row:nth-child(1000) .cell", String(i * 1000));
      })
    }
  }
  async run() {
    return await Promise.resolve(null);
  }
})();

export const benchmarks = [
  bench01, 
  bench02,
  bench03, 
  // bench04, 
  // bench05, 
  // bench06, 
  bench21,
  bench221,
  bench222,
  bench231,
  bench232,
  bench241,
  bench242,
  // bench251,
  // bench252,
  // bench261,
  // bench262,
  // bench271,
  // bench272,
];
