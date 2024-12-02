<script setup>

import { useScreens } from 'vue-screen-utils';

import { Icon } from '@iconify/vue';

//

const { mapCurrent } = useScreens({ 'md': '768px' })

const { $bootstrap } = useNuxtApp();

//

const props = defineProps({

    bookingDate: { type: Object, required: true },

    maxClientNumber: { type: Number, default: 4 }

});

const emits = defineEmits(['confirm-date']);

// rwd switch

const isConfirmDateOnMobile = ref(false);

const bookingClientNumber = ref(1);

const updateClientNumber = (num) => { bookingClientNumber.value = num; }

//

const dateModal = ref(null);
let modal;

onMounted(() => {

    modal = $bootstrap.modal(dateModal.value);

});

const showModal = () => { modal.show(); }
const hideModal = () => { modal.hide(); }

onBeforeUnmount(() => hideModal());

// date-picker configuration

const tempDate = reactive({

    range: {

        start: props.bookingDate.range.start,
        end: props.bookingDate.range.end
    
    },

    minDate: props.bookingDate.minDate,
    maxDate: props.bookingDate.maxDate,
    
    key: 0,

});

const masks = {

    title: 'YYYY 年 MM 月',
    modelValue: 'YYYY-MM-DD'

};

const styles = reactive({

    // md ( >= 768px ) 以上時顯示一列、其餘顯示兩列

    rows: mapCurrent({ md: 1 }, 2),
    columns: mapCurrent({ md: 2 }, 1),

});

//

const days = computed(() => {

    const start = tempDate.range.start;
    const end = tempDate.range.end;

    if (!start || !end) return 0;

    const differenceTime = new Date(end).getTime() - new Date(start).getTime();

    return Math.round(differenceTime / (1000 * 60 * 60 * 24));

});

const resetDate = () => {

    tempDate.range.start = null;
    tempDate.range.end = null;
    tempDate.key ++;

};

const confirmDate = () => {

    const isOnMobile = mapCurrent({ md: false }, true);

    if (!tempDate.range.start || !tempDate.range.end) return;

    if (isOnMobile.value) {

        emits('confirm-date', {

            ...tempDate,
            clients: bookingClientNumber.value,
            days: days.value

        });

    } else { emits('confirm-date', { ...tempDate, days: days.value }); }

    hideModal();

};

const formatDate = (date) => date?.replaceAll('-', '/');

//

defineExpose({ showModal });

</script>

<template>

<div class="modal fade" tabindex="-1" ref="dateModal">
    <div
        class="modal-dialog modal-dialog-centered
        m-0 mt-9 mx-md-auto">
        <div
            class="modal-content rounded-3xl
            gap-6 gap-md-10" :class="{ 'mt-auto': isConfirmDateOnMobile }">
            <div
                class="modal-header d-md-none
                bg-neutral-300 px-6 py-4">
                <div class="w-100 d-flex justify-content-between align-items-center gap-6">
                    <h3 class="text-neutral-600 fs-6 fw-bold mb-0" v-if="!tempDate.range.end">
                    選擇入住與退房日期
                    </h3>
                    <div class="d-flex align-items-center gap-4" v-else>
                        <h3 class="modal-title text-neutral-600 fs-6 fw-bold mb-0">
                        {{ days }} 晚
                        </h3>
                        <div class="d-flex gap-2 text-neutral-500 fs-8 fw-medium">
                            <span>{{ formatDate(tempDate.range.start) }}</span>
                            <span v-show="tempDate.range.start">～</span>
                            <span>{{ formatDate(tempDate.range.end) }}</span>
                        </div>
                    </div>
                    <button class="btn-close" type="button" @click="hideModal" />
                </div>
            </div>
            <div
                class="modal-header d-none d-md-flex gap-15
                p-8 pb-0 border-0">
                <div>
                    <h3 class="modal-title text-neutral-600 fs-5 fw-bold mb-2">
                    {{ days }} 晚
                    </h3>
                    <div class="d-flex gap-2 text-neutral-500 fw-medium">
                        <span>{{ formatDate(tempDate.range.start) }}</span>
                        <span v-show="tempDate.range.start">～</span>
                        <span>{{ formatDate(tempDate.range.end) }}</span>
                    </div>
                </div>
                <div class="w-50 d-flex flex-wrap gap-2 ms-auto">
                    <div class="form-floating flex-grow-1">
                        <input
                            id="checkInDate" type="date"
                            class="form-control text-neutral-600 fw-medium
                            p-4 pt-9 border-neutral-600 rounded-3"
                            style="min-height: 74px"
                            placeholder="yyyy-mm-dd"
                            :value="tempDate.range.start"
                            readonly>
                        <label
                            for="checkInDate"
                            class="text-neutral-500 fw-medium"
                            style="top: 8px; left: 8px">
                            入住
                        </label>
                    </div>
                    <div class="form-floating flex-grow-1">
                        <input
                            id="checkOutDate" type="date"
                            class="form-control text-neutral-600 fw-medium
                            p-4 pt-9 border-neutral-600 rounded-3"
                            style="min-height: 74px"
                            placeholder="yyyy-mm-dd"
                            :value="tempDate.range.end"
                            readonly>
                        <label
                            for="checkOutDate"
                            class="text-neutral-500 fw-medium"
                            style="top: 8px; left: 8px">
                            退房
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-body px-6 px-md-8 py-0">
                <div class="date-picker" v-if="!isConfirmDateOnMobile">
                    <DatePicker
                        class="border-0"
                        color="gray"
                        :masks="masks"
                        :expanded="true"
                        :rows="styles.rows"
                        :columns="styles.columns"
                        :min-date="tempDate.minDate"
                        :is-required="true"
                        :key="tempDate.key"
                        v-model.range.string="tempDate.range"
                        />
                </div>
                <div v-else>
                    <h6 class="text-neutral-600 fw-bold mb-1">
                    選擇人數
                    </h6>
                    <p class="text-neutral-500 fs-8 fw-medium mb-4">
                    此房型最多供四人居住，不接受寵物入住。
                    </p>
                    <NumberCalculator
                        :num="bookingClientNumber" :max="props.maxClientNumber"
                        @update-number="updateClientNumber" />
                </div>
            </div>
            <div class="modal-footer d-none d-md-flex p-3 p-md-8 pt-0 border-0">
                <button
                    class="btn btn-outline-neutral-500 px-8 py-4 border-0 rounded-3
                    flex-grow-1 flex-md-grow-0 fw-bold"
                    type="button"
                    @click="resetDate">
                    重設日期
                </button>
                <button
                    class="btn btn-primary-600 px-8 py-4 rounded-3
                    flex-grow-1 flex-md-grow-0 text-neutral-100 fw-bold"
                    type="button"
                    @click="confirmDate"
                    :disabled="!tempDate.range.start || !tempDate.range.end">
                    確定日期
                </button>
            </div>
            <div class="modal-footer d-md-none p-3 p-md-8 pt-0 border-0">
                <template v-if="isConfirmDateOnMobile">
                    <button
                        class="btn btn-outline-neutral-500 px-8 py-4 border-0 rounded-3
                        flex-grow-1 fw-bold"
                        type="button"
                        @click="isConfirmDateOnMobile = false">
                        重新選擇日期
                    </button>
                    <button
                        class="btn btn-primary-600 px-8 py-4 rounded-3
                        flex-grow-1 text-neutral-100 fw-bold"
                        @click="confirmDate">
                        儲存
                    </button>
                </template>
                <template v-else>
                    <button
                        class="btn btn-outline-neutral-500 px-8 py-4 border-0 rounded-3
                        flex-grow-1 flex-md-grow-0 fw-bold"
                        type="button"
                        @click="resetDate">
                        重設日期
                    </button>
                    <button
                        class="btn btn-primary-600 px-8 py-4 rounded-3
                        flex-grow-1 flex-md-grow-0 text-neutral-100 fw-bold"
                        type="button"
                        @click="isConfirmDateOnMobile = true">
                        確定日期
                    </button>
                </template>
            </div>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.modal { backdrop-filter: blur(10px); }

.modal-dialog { max-width: 740px; }

.date-picker {

  &:deep(.vc-container) { font-family: "Noto Serif TC", serif; }

  &:deep(.vc-pane-layout) { gap: 60px; }

  &:deep(.vc-header) { margin-bottom: 1.5rem; }

  &:deep(.vc-arrow) {

    width: 24px; height: 24px;
    background-color: transparent;
            
  }

  &:deep(.vc-title) {
        
    background-color: transparent;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
    
  }

  &:deep(.vc-base-icon) { stroke: #000; }

  &:deep(.vc-weeks) {

    display: flex;
    flex-direction: column;
    gap: 4px;

    padding: 0;

  }

  &:deep(.vc-weekday) {

    --vc-weekday-color: #4B4B4B;
    font-weight: 500;
    line-height: unset;

    padding: 12px 14px 8px 14px;

  }

  &:deep(.vc-day-content) { font-size: 1rem; }

}

</style>