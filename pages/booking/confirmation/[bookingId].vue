<script setup>

useSeoMeta({ title: '預約成功' });

//

import { Icon } from '@iconify/vue';

import useUserStore from '@/stores/user';
import useCacheStore from '@/stores/cache';
import useBookingStore from '@/stores/booking';

definePageMeta({

    middleware: (to, from) => {

        if (from.name !== 'rooms-id-booking') { return false; }

    }

})

const userStore = useUserStore();
const cacheStore = useCacheStore();
const bookingStore = useBookingStore();

const { userId } = storeToRefs(userStore);
const { bookingCache } = storeToRefs(cacheStore);
const { discountPrice } = storeToRefs(bookingStore);

//

const route = useRoute();

const { $dateformat, $toThousands } = useNuxtApp();
const { getDays } = useCalculator();

const bookingId = ref(route.params.bookingId);

const days = computed(() => {

    if (bookingCache.value._id) {

        const { checkInDate, checkOutDate } = bookingCache.value;

        return getDays(checkInDate, checkOutDate);

    }

    return 0;

});

</script>

<template>

<main class="bg-neutral-700 pt-18 pt-md-30">
    <div
        class="container py-10 py-md-30">
        <div class="row gap-15 gap-md-0">
            <div class="col-12 col-md-7">
                <div
                    class="d-flex flex-column flex-md-row
                    align-items-md-center gap-4 gap-md-10
                    mb-8 mb-md-10">
                    <Icon
                        class="bg-success-300 p-2 rounded-circle
                        display-4 text-neutral-100"
                        icon="material-symbols:check"
                    />
                    <div class="text-neutral-100 fs-1">
                        <h1 class="fw-bold">
                        恭喜，{{ bookingCache.userInfo?.name }}！
                        </h1>
                        <p class="fw-bold mb-0">您已預訂成功</p>
                    </div>
                </div>
                <p class="text-neutral-300 fw-medium">
                我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。
                </p>

                <hr class="my-10 my-md-20 opacity-100 text-neutral-300">

                <div class="d-flex flex-column align-items-md-start">
                    <h2 class="text-neutral-100 fs-7 fs-md-5 fw-bold mb-6 mb-md-10">
                    立即查看您的訂單記錄
                    </h2>
                    <ClientOnly>
                    <NuxtLink
                        :to="{ name: 'user-userId-order', params: { userId } }"
                        class="btn btn-primary-600 px-md-15 py-4 border-0 rounded-3
                        text-neutral-100 fw-bold">
                        前往我的訂單
                    </NuxtLink>
                    </ClientOnly>
                </div>

                <hr class="my-10 my-md-20 opacity-100 text-neutral-300">

                <h2 class="text-neutral-100 fs-5 fw-bold mb-6 mb-md-10">
                訂房人資訊
                </h2>
                <div class="d-flex flex-column gap-6">
                    <div>
                        <p class="text-neutral-300 fw-medium mb-2">姓名</p>
                        <span class="text-neutral-100 fw-bold">
                        {{ bookingCache.userInfo?.name }}
                        </span>
                    </div>
                    <div>
                        <p class="text-neutral-300 fw-medium mb-2">手機號碼</p>
                        <span class="text-neutral-100 fw-bold">
                        {{ bookingCache.userInfo?.phone }}
                        </span>
                    </div>
                    <div>
                        <p class="text-neutral-300 fw-medium mb-2">電子信箱</p>
                        <span class="text-neutral-100 fw-bold">
                        {{ bookingCache.userInfo?.email }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-5">
                <div
                    class="booking-card bg-neutral-100 p-4 p-md-10 mx-auto ms-md-auto
                    d-flex flex-column gap-6 gap-md-10">
                    <div>
                        <h2 class="text-neutral-600 fs-7 fs-md-5 fw-bold mb-0">您的行程</h2>
                    </div>
                    <img
                        class="img-fluid rounded-2"
                        :src="bookingCache.roomId?.imageUrl" :alt="bookingCache.roomId?.name">
                    <section class="d-flex flex-column gap-6">
                        <h3 
                            class="d-flex align-items-center
                            text-neutral-500 fs-8 fs-md-6 fw-bold mb-6">
                            <p class="mb-0">
                                {{ bookingCache.roomId?.name }}，{{ days }} 晚
                            </p>
                            <span
                                class="bg-neutral-500 d-inline-block mx-4"
                                style="width: 1px; height: 18px;">
                            </span>
                            <p class="mb-0">住宿人數：{{ bookingCache.peopleNum }} 位</p>
                        </h3>
                        <div class="text-neutral-500 fs-8 fs-md-7 fw-bold">
                            <p class="title-deco primary mb-2">
                            入住：
                            {{ $dateformat(bookingCache.checkInDate, 'YYYY 年 MM 月 DD 日') }}
                            15:00 可入住
                            </p>
                            <p class="title-deco neutral mb-0">
                            退房：
                            {{ $dateformat(bookingCache.checkOutDate, 'YYYY 年 MM 月 DD 日') }}
                            12:00 前退房
                            </p>
                        </div>
                        <p class="text-neutral-500 fs-8 fs-md-7 fw-bold">
                            NT$ {{ $toThousands(bookingCache.roomId?.price * days - discountPrice) }}
                        </p>
                    </section>
                    <hr class="my-0 opacity-100 text-neutral-300">
                    <section>
                        <h3
                            class="title-deco primary
                            text-neutral-600 fs-8 fs-md-7 fw-bold
                            mb-4 mb-md-6">
                            房內設備
                        </h3>
                        <ul
                            class="bg-neutral-100 p-6 mb-0 border border-neutral-300
                            rounded-3 list-unstyled
                            d-flex flex-wrap row-gap-2 column-gap-10
                            fs-8 fs-md-7">
                            <template
                                v-for="item in bookingCache.roomId?.facilityInfo"
                                :key="item.title">
                                <li class="flex-item d-flex gap-2">
                                    <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                    <p class="text-neutral-500 fw-bold mb-0">{{ item.title }}</p>
                                </li>
                            </template>
                        </ul>
                    </section>
                    <section>
                        <h3
                            class="title-deco primary
                            text-neutral-600 fs-8 fs-md-7 fw-bold
                            mb-4 mb-md-6">
                            備品提供
                        </h3>
                        <ul
                            class="bg-neutral-100 p-6 mb-0 border border-neutral-300
                            rounded-3 list-unstyled
                            d-flex flex-wrap row-gap-2 column-gap-10
                            fs-8 fs-md-7">
                            <template
                                v-for="item in bookingCache.roomId?.amenityInfo"
                                :key="item.title">
                                <li class="flex-item d-flex gap-2">
                                    <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                    <p class="text-neutral-500 fw-bold mb-0">{{ item.title }}</p>
                                </li>
                            </template>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <picture>
        <source
            srcset="/images/deco-line-group-horizontal-full.svg"
            media="(min-width: 576px)">
        <img
            class="w-100"
            src="/images/deco-line-group-horizontal-sm.svg"
            alt="deco-line-group">
    </picture>
</main>

</template>

<style lang="scss" scoped>

.booking-card {

  max-width: 478px;
  border-radius: 1.25rem;

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

.flex-item {

  flex: 1 1 30%;
  white-space: nowrap;

  @include media-breakpoint-down(md) { flex-basis: 40%; }

}

</style>

