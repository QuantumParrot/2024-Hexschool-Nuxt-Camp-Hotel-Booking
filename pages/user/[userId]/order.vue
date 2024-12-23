<script setup>

useSeoMeta({ title: '訂單列表' });

//

import { Icon } from '@iconify/vue';

//

import useBookingStore from '@/stores/booking';

const bookingStore = useBookingStore();

const { getOrders, cancelOrder } = bookingStore;
const { orderRecords, discountPrice } = storeToRefs(bookingStore);

//

const { $dateformat, $toThousands } = useNuxtApp();

const { getDays } = useCalculator();

//

const orders = computed(() => {

    return orderRecords.value.map((order) => ({

        ...order,
        total: order.roomId.price * getDays(order.checkInDate, order.checkOutDate) - discountPrice.value,
        days: getDays(order.checkInDate, order.checkOutDate),

    }));

});

const latestOrder = ref({ roomId: {}, userInfo: {} });

const otherOrders = ref([]);

onMounted(async() => {

    const result = await getOrders();
    bookingStore.$patch({ orderRecords: result });

    latestOrder.value = orders.value[0];
    otherOrders.value = orders.value.filter((o, i) => i !== 0);

});

//

const { showConfirmAlert } = useAlert();

const handleCancelProcess = () => {

    showConfirmAlert({

        icon: 'question',
        showCancelButton: true,

        title: '確定取消本次預定？',
        text: `
        ${$dateformat(latestOrder.value.checkInDate, 'MM/DD')}
        ～${$dateformat(latestOrder.value.checkOutDate, 'MM/DD')}｜
        ${latestOrder.value.roomId.name}，
        ${latestOrder.value.days} 晚 ｜ ${latestOrder.value.peopleNum} 人`,
        confirmButtonText: '是', cancelButtonText: '否',

    }).then(async (result) => {

        if (result.isConfirmed) {
            
            const { status } = await cancelOrder(latestOrder.value._id);

            if (status) {

                window.location.reload();

            }
        
        }

    })

};

</script>

<template>

<div class="row gap-6 gap-md-0" v-if="orderRecords.length">
    <div class="col-md-7">
        <ClientOnly>
        <div
            class="bg-neutral-100 d-flex flex-column gap-6 gap-md-10
            p-4 p-md-10 rounded-3xl">
            <div>
                <h2 class="text-neutral-600 fs-7 fs-md-5 fw-bold mb-0">您的行程</h2>
            </div>
            <img
                class="img-fluid rounded-3"
                :src="latestOrder.roomId.imageUrl"
                :alt="latestOrder.roomId.name">
            <section class="d-flex flex-column gap-6">
                <h3 class="d-flex align-items-center mb-0 text-neutral-500 fs-8 fs-md-6 fw-bold">
                    <p class="mb-0">
                        <span>{{ latestOrder.roomId.name }}，</span>
                        <span>{{ latestOrder.days }} 晚</span>
                    </p>
                    <span
                        class="d-inline-block mx-4 bg-neutral-500"
                        style="width: 1px; height: 18px" />
                    <p class="mb-0">住宿人數：{{ latestOrder.peopleNum }} 位</p>
                </h3>
                <div class="text-neutral-500 fs-8 fs-md-7 fw-bold">
                    <p class="title-deco primary mb-2">
                    入住：
                    {{ $dateformat(latestOrder.checkInDate, 'YYYY 年 MM 月 DD 日 dddd') }} 15:00
                    可入住
                    </p>
                    <p class="title-deco neutral mb-2">
                    退房：
                    {{ $dateformat(latestOrder.checkOutDate, 'YYYY 年 MM 月 DD 日 dddd') }} 12:00
                    前退房
                    </p>
                </div>
                <p class="text-neutral-500 fs-8 fs-md-7 fw-bold mb-0">
                NT$ {{ $toThousands(latestOrder.total) }}
                </p>
            </section>
            <hr class="opacity-100 text-neutral-300 my-0">
            <section>
                <h3 class="title-deco primary text-neutral-600 fs-8 fs-md-7 fw-bold mb-6">
                房內設備
                </h3>
                <ul
                    class="bg-neutral-100 d-flex flex-wrap row-gap-2 column-gap-10
                    p-6 mb-0 border border-neutral-300 rounded-3
                    fs-8 fs-md-7 list-unstyled">
                    <template v-for="item in latestOrder.roomId.facilityInfo" :key="item.title">
                        <li class="flex-item d-flex gap-2">
                            <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                            <p class="text-neutral-500 fw-bold mb-0">{{ item.title }}</p>
                        </li>
                    </template>
                </ul>
            </section>
            <section>
                <h3 class="title-deco primary text-neutral-600 fs-8 fs-md-7 fw-bold mb-6"> 
                備品提供
                </h3>
                <ul
                    class="bg-neutral-100 d-flex flex-wrap row-gap-2 column-gap-10
                    p-6 mb-0 border border-neutral-300 rounded-3
                    fs-8 fs-md-7 list-unstyled">
                    <template v-for="item in latestOrder.roomId.amenityInfo" :key="item.title">
                        <li class="flex-item d-flex gap-2">
                            <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                            <p class="text-neutral-500 fw-bold mb-0">{{ item.title }}</p>
                        </li>
                    </template>
                </ul>
            </section>
            <div class="d-flex gap-4">
                <button
                    class="btn btn-outline-primary-600 w-50 py-4
                    fw-bold"
                    type="button" @click="handleCancelProcess(latestOrder._id)">
                    取消預訂
                </button>
                <NuxtLink
                    :to="`/rooms/${latestOrder.roomId._id}`"
                    class="btn btn-primary-600 w-50 py-4
                    fw-bold text-neutral-100"
                    target="_blank">
                    查看詳情
                </NuxtLink>
            </div>
        </div>
        </ClientOnly>
    </div>
    <div class="col-md-5">
        <ClientOnly>
        <div
            class="bg-neutral-100 d-flex flex-column gap-6 gap-md-10
            p-4 p-md-10 rounded-3xl"
            :class="{ 'h-100 overflow-y-scroll': orderRecords.length > 1 }">
            <h2 class="text-neutral-600 fs-7 fs-md-5 fw-bold mb-0">
            歷史訂單
            </h2>
            <template v-if="otherOrders.length">
                <template v-for="order in otherOrders" :key="order._id">
                    <div class="d-flex flex-column flex-lg-row gap-6">
                        <img
                            class="img-fluid object-fit-cover rounded-3"
                            style="max-width: 120px; height: 80px"
                            :src="order.roomId.imageUrl"
                            :alt="order.roomId.name">
                        <section class="d-flex flex-column gap-4">
                            <h3
                                class="d-flex align-items-center
                                text-neutral-500 fs-8 fs-md-6 fw-bold
                                mb-0">
                                {{ order.roomId.name }}
                            </h3>
                            <div class="text-neutral-500 fw-medium">
                                <p class="mb-2">住宿天數：{{ order.days }} 晚</p>
                                <p class="mb-0">住宿天數：{{ order.peopleNum }} 位</p>
                            </div>
                            <div class="text-neutral-500 fs-8 fs-md-7 fw-medium">
                                <p class="title-deco primary mb-2">
                                {{ $dateformat(order.checkInDate, 'YYYY 年 MM 月 DD 日') }}
                                15:00 可入住
                                </p>
                                <p class="title-deco neutral mb-0">
                                {{ $dateformat(order.checkOutDate, 'YYYY 年 MM 月 DD 日') }}
                                12:00 前退房
                                </p>
                            </div>
                            <p class="mb-0 text-neutral-500 fs-8 fs-md-7 fw-bold">
                            NT$ {{ $toThousands(order.total) }}
                            </p>
                        </section>
                    </div>
                    <template v-if="order < 3">
                        <hr class="opacity-100 text-neutral-300 my-0">
                    </template>
                </template>
            </template>
            <template v-else>
                <p class="mb-0">目前尚無歷史訂單</p>
            </template>
        </div>
        </ClientOnly>
    </div>
</div>
<template v-else>
    <div class="bg-neutral-100 p-10 rounded-3xl">
        <p class="fs-5 fw-bold mb-5">目前尚無訂單記錄</p>
        <NuxtLink to="/rooms" class="text-primary-600 fw-bold">去逛逛</NuxtLink>
    </div>
</template>

</template>

<style lans="scss" scoped>

.btn-outline-primary-600 { --bs-btn-hover-color: #fff }

.flex-item {

  max-width: 97px;
  width: 100%;
  white-space: nowrap;

}

.title-deco {

  display: flex;
  align-items: center;

  &.primary { --color: #BF9D7D; }

  &.neutral { --color: #909090; }

  &::before {

    content: '';
    display: inline-block;
    width: 4px; height: 24px;
    border-radius: 10px;
    margin-right: 0.75rem;
    background-color: var(--color);

  }

}

</style>
