<script setup lang="ts">
import { throttledWatch } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { nextTick, ref } from 'vue';


const props = withDefaults(defineProps<{
  handle_confirm: (value: string) => void;
  start_btn_label?: string;
  cancel_btn_label?: string;
  confirm_btn_label?: string;
  init_input_value?: string;
  validation_throttle_time?: number;
  validations?: {
    tip?: string;
    predicate: (value: string) => boolean;
  }[],
}>(), {
  start_btn_label: 'Start',
  cancel_btn_label: 'Cancel',
  confirm_btn_label: 'Confirm',
  init_input_value: '',
  validation_throttle_time: 1_000,
  validations: () => [],
});
const focus_target = ref();
const {
  activate,
  deactivate,
} = useFocusTrap(focus_target);


const is_started = ref(false);
const handle_start = async () => {
  is_started.value = true;
  await nextTick();
  await activate();
};
const handle_cancel = () => {
  deactivate();
  is_started.value = false;
};
const is_ready = ref(false);
const is_processing = ref(false);
const input_value = ref(props.init_input_value);

const tips = ref<string[]>([]);

throttledWatch(input_value, () => {
  const len = input_value.value.length;
  tips.value = [];
  if (len === 0) {
    return;
  }
  is_ready.value = false;
  let all_oks = true;
  props.validations.forEach(({
    predicate,
    tip,
  }) => {
    if (!predicate(input_value.value)) {
      tip && tips.value.push(tip);
      all_oks = false;
    }
  });


  if (all_oks) {
    is_ready.value = true;
    tips.value = [];
  }
}, { throttle: props.validation_throttle_time });
</script>

<template>
  <div>
    <button @click="handle_start" v-show="!is_started">{{ start_btn_label }}</button>
    <div v-show="is_started">
      <div ref="focus_target" class="trap">
        <input :disabled="is_processing" v-model="input_value" />
        <button v-show="!is_processing" @click="handle_cancel()">{{ cancel_btn_label }}</button>
        <button class="last-in-flex" v-show="is_ready && !is_processing" @click="() => {
          is_processing = true;
          handle_confirm(input_value)
        }">{{ confirm_btn_label
          }}</button>
      </div>
      <ul>
        <li v-for="tip of tips" :key="tip">
          <i>
            {{ tip }}
          </i>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.last-in-flex {
  order: -1;
}

.trap {
  display: flex;
  flex-flow: row-reverse;
  justify-content: left;
}
</style>