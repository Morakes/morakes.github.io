<template>
  <div class="flex items-center px-[20px] h-[104px]">
    <var-avatar class="flex-shrink-0" src="@/assets/images/avatar.jpg" size="22vmin" bordered />
    <div class="ml-[14px]">
      <var-space class="pt-[10px] text-[#ccc]" :size="[0, '1.6vmin']">
        <div>
          <div class="text-2xl">{{ $t('Your Name') }}</div>
          <div class="flex items-center gap-[4px]">
            <div>ID: 812121</div>
            <var-icon name="content-copy" :size="13" />
          </div>
        </div>
      </var-space>
    </div>
  </div>
</template>
