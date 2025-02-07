<template>
  <div class="recharge-card" :style="getCardStyle(data.style)">
    <div class="recharge-card__body" :class="isActive ? 'recharge-card__body--selected' : ''">
      <!-- 价格 -->
      <span class="recharge-card__body__price text-xl" :style="getPriceStyle(data.style)">
        {{ `$${data.price}` }}
      </span>

      <!-- 金币 -->
      <var-space size="6" align="center" class="recharge-card__body__coin">
        <var-image
          src="@/assets/images/gold-coin.png"
          width="20"
          height="20"
          v-show="!isNaN(Number(data.style.recharge.text))"
        />

        <span :style="getTextStyle(data.style)">{{ data.style.recharge.text }}</span>
      </var-space>

      <!-- 角标 -->
      <div
        v-show="hasBadge(data.style.badge)"
        class="recharge-card__body__badge"
        :style="getBadgeStyle(data.style.badge)"
      >
        <slot name="badge">
          {{ data.style.badge?.[0].text }}
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ChargeTemplateType, Style } from '@/apis/charge'

interface Props {
  // 充值卡数据
  data: ChargeTemplateType
  // 是否选中
  isActive: boolean
}

const props = defineProps<Props>()
const { data } = toRefs(props)

/**
 * 获取充值卡样式
 * @param style
 */
const getCardStyle = (style: Style) => {
  return {
    backgroundColor: style.backgroundColor ? `#${style.backgroundColor}` : '',
    backgroundImage: style.backgroundImage,
  }
}

/**
 * 获取价格样式
 * @param style
 */
const getPriceStyle = (style: Style) => {
  return {
    color: style.recharge.priceColor ? `#${style.recharge.priceColor}` : '',
  }
}

/**
 * 获取文字样式
 * @param style
 */
const getTextStyle = (style: Style) => {
  return {
    color: style.recharge.color ? `#${style.recharge.color}` : '',
  }
}

/**
 * 获取角标样式
 * @param badge
 */
const getBadgeStyle = (badge: Style['badge']) => {
  // 目前仅支持一个左边角标
  if (!badge.length || badge.length !== 1) return {}
  const style = badge[0] || {}

  const posiMap: Record<number, Record<string, string>> = {
    // 右上
    1: {
      top: '-12px',
      right: '0px',
    },
    // 右下
    2: {
      bottom: '-12px',
      right: '0px',
    },
    // 左下
    3: {
      bottom: '-12px',
      left: '0px',
    },
    // 左上
    4: {
      left: '0px',
      top: '-12px',
    },
  }

  return {
    background: `#${style.backgroundColor}`,
    color: `#${style.color}`,
    borderBottomLeftRadius: `${style.bottomLeftRadius}px`,
    borderBottomRightRadius: `${style.bottomRightRadius}px`,
    borderTopLeftRadius: `${style.topLeftRadius}px`,
    borderTopRightRadius: `${style.topRightRadius}px`,
    ...posiMap[style.position],
  }
}

/**
 * 是否存在角标
 * @param badge
 */
const hasBadge = (badge: Style['badge']) => {
  return badge.length > 0 && badge[0].text !== ''
}
</script>

<style lang="less" scoped>
.recharge-card {
  --bg-card-color: rgb(246, 247, 249);

  position: relative;
  display: block;
  width: 100%;
  height: 90px;
  background: var(--bg-card-color);
  border-radius: 8px;

  &__body {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: inherit;
    transition: background 0.25s linear;

    &__price {
      position: relative;
      font-weight: 600;
    }
    &__coin {
      position: relative;
      text-align: center;
    }
    &__badge {
      position: absolute;
      padding: 4px 4px;
      color: var(--dark-font-color);
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
    }
    &__cover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
  }
  &__body--selected {
    position: relative;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--color-primary-orange);
    background-color: rgba(#ffa327, 0.1);
    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 25px;
      width: 28px;
      content: '';
      border: transparent;
      background: url(@/assets/images/badge-selected.png) no-repeat;
      background-size: cover;
    }
  }
}
</style>
