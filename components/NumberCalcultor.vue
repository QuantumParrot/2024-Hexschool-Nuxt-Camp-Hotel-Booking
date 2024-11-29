<script setup>

import { Icon } from '@iconify/vue';

const props = defineProps({

    num: { type: Number, required: true },
    max: { type: Number, required: true }

});

const emits = defineEmits(['update-number'])

const number = ref(props.num);

watch(number, (current) => {

    if (current <= 0) { number.value = 1; }

    if (current >= props.max) { number.value = props.max; }

    emits('update-number', current);

});

</script>

<template>

<div class="d-flex align-items-center gap-4">
    <button
        class="btn btn-neutral-100 p-4
        border border-netural-300 rounded-circle"
        :class="{ 'disabled bg-neutral-300': number <= 1 }"
        type="button"
        @click="number --"
        :disabled="number <= 1">
        <Icon
            class="fs-5 text-neutral-600"
            icon="ic:baseline-minus"
        />
    </button>
    <h6
        class="text-neutral-600 fw-bold text-center"
        style="width: 24px">
        {{ number }}
    </h6>
    <button
        class="btn btn-neutral-100 p-4
        border border-netural-300 rounded-circle"
        :class="{ 'disabled bg-neutral-300': number >= max }"
        type="button"
        @click="number ++"
        :disabled="number >= max">
        <Icon
            class="fs-5 text-neutral-600"
            icon="ic:baseline-plus"
        />
    </button>
</div>

</template>

<style scoped></style>
