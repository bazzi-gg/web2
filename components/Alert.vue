<template>
  <div class="has-text-centered">
    <client-only>
      <Icon
        :icon="'ri-alert-line'"
        :width="96"
        :height="96"
        :color="'#747474'"
      />
      <div class="title">
        {{ title }}
      </div>
      <div class="subtitle">
        {{ subtitle }}
      </div>
      <p v-if="help === true">
        그래도 문제가 발생한다면,
        <a href="https://discord.gg/Gdeu2EA">디스코드</a>나
        <a href="mailto:ploseok@gmail.com">메일</a>로 문의해 주세요.
      </p>
    </client-only>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Alert',
  props: {
    title: {
      default: null,
      type: [String, Number],
      required: true,
    },
    subtitle: {
      default: null,
      type: String,
      required: true,
    },
    help: {
      default: true,
      type: Boolean,
      required: false,
    },
  },
}
</script>
