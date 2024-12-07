<script setup>

import { Icon } from '@iconify/vue';

const route = useRoute();

const bookingId = ref(route.params.bookingId);

useSeoMeta({ title: '預約成功' });

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
                        恭喜，Jessica！
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
                    <NuxtLink
                        :to="{ name: 'user-userId-order', params: { userId: 'jessica' } }"
                        class="btn btn-primary-600 px-md-15 py-4 border-0 rounded-3
                        text-neutral-100 fw-bold">
                        前往我的訂單
                    </NuxtLink>
                </div>

                <hr class="my-10 my-md-20 opacity-100 text-neutral-300">

                <h2 class="text-neutral-100 fs-5 fw-bold mb-6 mb-md-10">
                訂房人資訊
                </h2>
                <div class="d-flex flex-column gap-6">
                    <div>
                        <p class="text-neutral-300 fw-medium mb-2">姓名</p>
                        <span class="text-neutral-100 fw-bold">Jessica Wang</span>
                    </div>
                    <div>
                        <p class="text-neutral-300 fw-medium mb-2">手機號碼</p>
                        <span class="text-neutral-100 fw-bold">+886 912 345 678</span>
                    </div>
                    <div>
                        <p class="text-neutral-300 fw-medium mb-2">電子信箱</p>
                        <span class="text-neutral-100 fw-bold">jessica@sample.com</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-5">
                <div
                    class="booking-card bg-neutral-100 p-4 p-md-10 mx-auto ms-md-auto
                    d-flex flex-column gap-6 gap-md-10">
                    <div>
                        <p class="text-neutral-500 fs-8 fs-md-7 fw-medium mb-2">
                        預定參考編號：{{ bookingId }}
                        </p>
                        <h2 class="text-neutral-600 fs-7 fs-md-5 fw-bold mb-0">即將來的行程</h2>
                    </div>
                    <img
                        class="img-fluid rounded-2"
                        src="/images/room-a-1.png" alt="room-a">
                    <section class="d-flex flex-column gap-6">
                        <h3 
                            class="d-flex align-items-center
                            text-neutral-500 fs-8 fs-md-6 fw-bold mb-6">
                            <p class="mb-0">尊爵雙人房，1 晚</p>
                            <span
                                class="bg-neutral-500 d-inline-block mx-4"
                                style="width: 1px; height: 18px;">
                            </span>
                            <p class="mb-0">住宿人數：2 位</p>
                        </h3>
                        <div class="text-neutral-500 fs-8 fs-md-7 fw-bold">
                            <p class="title-deco primary mb-2">
                            入住：11 月 24 日星期日，18:00 可入住
                            </p>
                            <p class="title-deco neutral mb-0">
                            退房：11 月 25 日星期一，12:00 前退房
                            </p>
                        </div>
                        <p class="text-neutral-500 fs-8 fs-md-7 fw-bold">NT$ 10,000</p>
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
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">電視</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">吹風機</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">冰箱</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">熱水壺</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">檯燈</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">衣櫃</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">除濕機</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">浴缸</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">書桌</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">音響</p>
                            </li>
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
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">衛生紙</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">沐浴用品</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">拖鞋</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">刮鬍刀</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">清潔用品</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">吊衣架</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">浴巾</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">刷牙用品</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">罐裝水</p>
                            </li>
                            <li class="flex-item d-flex gap-2">
                                <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                                <p class="text-neutral-500 fw-bold mb-0">梳子</p>
                            </li>
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

  flex: 1 1 25%;
  white-space: nowrap;

  @include media-breakpoint-down(md) { flex-basis: 40%; }

}

</style>

