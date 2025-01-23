import { TEMPLATE_MODE } from '@/constant/common'

export enum MODULE_TYPE {
  // 竖版列表
  VERTICLE_FULL = 3,

  // 竖版一行三个
  VERTICAL_3 = 1,

  // 竖版一行多个
  VERTICAL_SCROLL = 4,

  // 横版一行两个
  HORIZONTAL_2 = 5,

  // 横版一行多个
  HORIZONTAL_SCROLL = 2,
}

// 列表默认配置
export const defaultConfig = {
  // 竖版列表
  [MODULE_TYPE.VERTICLE_FULL]: {
    mode: TEMPLATE_MODE.VERTICAL,
    coverProps: {
      height: '180px',
      width: '120px',
    },
  },
  // 竖版一行三个
  [MODULE_TYPE.VERTICAL_3]: {
    mode: TEMPLATE_MODE.GIRD,
    coverProps: {
      height: '185px',
    },
    colSpan: 8,
  },
  // 竖版一行多个
  [MODULE_TYPE.VERTICAL_SCROLL]: {
    mode: TEMPLATE_MODE.SCROLL,
    coverProps: {
      height: '185px',
    },
    basisWidth: '30%',
  },
  // 横版一行两个
  [MODULE_TYPE.HORIZONTAL_2]: {
    mode: TEMPLATE_MODE.GIRD,
    coverProps: {
      height: '100px',
    },
    colSpan: 12,
  },
  // 横版一行多个
  [MODULE_TYPE.HORIZONTAL_SCROLL]: {
    mode: TEMPLATE_MODE.SCROLL,
    coverProps: {
      height: '100px',
    },
    basisWidth: '45%',
  },
}

export const isGird = (moduleType: MODULE_TYPE) => {
  return defaultConfig[moduleType].mode === TEMPLATE_MODE.GIRD
}
export const isScroll = (moduleType: MODULE_TYPE) => {
  return defaultConfig[moduleType].mode === TEMPLATE_MODE.SCROLL
}
export const isVertical = (moduleType: MODULE_TYPE) => {
  return defaultConfig[moduleType].mode === TEMPLATE_MODE.VERTICAL
}

export const getDefaultConfig = (moduleType: MODULE_TYPE) => {
  return defaultConfig[moduleType]
}
