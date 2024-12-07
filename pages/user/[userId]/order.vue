<script setup>

import { Icon } from '@iconify/vue';

//

const facilites = ref(['電視', '吹風機', '冰箱', '熱水壺', '檯燈', '衣櫃', '除濕機', '浴缸', '書桌', '音響']);

const items = ref(['衛生紙', '拖鞋', '沐浴用品', '清潔用品', '刮鬍刀', '吊衣架', '浴巾', '刷牙用品', '罐裝水', '梳子']);

//

useSeoMeta({ title: '訂單列表' });

</script>

<template>

<div class="row gap-6 gap-md-0">
    <div class="col-md-7">
        <div
            class="bg-neutral-100 d-flex flex-column gap-6 gap-md-10
            p-4 p-md-10 rounded-3xl">
            <div>
                <p class="text-neutral-500
                fs-8 fs-md-7 fw-medium
                mb-2">
                預訂參考編號：HH2302183151222
                </p>
                <h2 class="text-neutral-600
                fs-7 fs-md-5 fw-bold
                mb-0">
                即將到來的行程
                </h2>
            </div>
            <img class="img-fluid rounded-3" src="/images/room-a-1.png" alt="room-a">
            <section class="d-flex flex-column gap-6">
                <h3 class="d-flex align-items-center mb-0 text-neutral-500 fs-8 fs-md-6 fw-bold">
                    <p class="mb-0">尊爵雙人房，1 晚</p>
                    <span
                        class="d-inline-block mx-4 bg-neutral-500"
                        style="width: 1px; height: 18px" />
                    <p class="mb-0">住宿人數：2 位</p>
                </h3>
                <div class="text-neutral-500 fs-8 fs-md-7 fw-bold">
                    <p class="title-deco primary mb-2">
                    入住：11 月 24 日星期日，18:00 可入住
                    </p>
                    <p class="title-deco neutral mb-2">
                    退房：11 月 25 日星期一，12:00 前退房
                    </p>
                </div>
                <p class="text-neutral-500 fs-8 fs-md-7 fw-bold mb-0">NT$ 10,000</p>
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
                    <template v-for="item in facilites" :key="item">
                        <li class="flex-item d-flex gap-2">
                            <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                            <p class="text-neutral-500 fw-bold mb-0">{{ item }}</p>
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
                    <template v-for="item in items" :key="item">
                        <li class="flex-item d-flex gap-2">
                            <Icon class="fs-5 text-primary-600" icon="material-symbols:check" />
                            <p class="text-neutral-500 fw-bold mb-0">{{ item }}</p>
                        </li>
                    </template>
                </ul>
            </section>
            <div class="d-flex gap-4">
                <button
                    class="btn btn-outline-primary-600 w-50 py-4
                    fw-bold"
                    type="button">
                    取消預定
                </button>
                <NuxtLink
                    to="/"
                    class="btn btn-primary-600 w-50 py-4
                    fw-bold text-neutral-100"
                    type="button">
                    查看詳情
                </NuxtLink>
            </div>
        </div>
    </div>
    <div class="col-md-5">
        <div
            class="bg-neutral-100 d-flex flex-column gap-6 gap-md-10
            p-4 p-md-10 rounded-3xl">
            <h2 class="text-neutral-600 fs-7 fs-md-5 fw-bold mb-0">
            歷史訂單
            </h2>
            <template v-for="order in 3" :key="order">
                <div class="d-flex flex-column flex-lg-row gap-6">
                    <img
                        class="img-fluid object-fit-cover rounded-3"
                        style="max-width: 120px; height: 80px"
                        src="/images/room-b-sm-1.png"
                        alt="room-b">
                    <section class="d-flex flex-column gap-4">
                        <p class="text-neutral-500 fs-8 fs-md-7 fw-medium mb-0">
                        預訂參考編號：HH2302183151222
                        </p>
                        <h3
                            class="d-flex align-items-center
                            text-neutral-500 fs-8 fs-md-6 fw-bold
                            mb-0">
                            尊爵雙人房
                        </h3>
                        <div class="text-neutral-500 fw-medium">
                            <p class="mb-2">住宿天數：1 晚</p>
                            <p class="mb-0">住宿天數：2 位</p>
                        </div>
                        <div class="text-neutral-500 fs-8 fs-md-7 fw-medium">
                            <p class="title-deco primary mb-2">
                            入住：6 月 10 日星期二，15:00 可入住
                            </p>
                            <p class="title-deco neutral mb-0">
                            退房：6 月 11 日星期三，12:00 前退房
                            </p>
                        </div>
                        <p class="mb-0 text-neutral-500 fs-8 fs-md-7 fw-bold">NT$ 10,000</p>
                    </section>
                </div>
                <template v-if="order < 3">
                    <hr class="opacity-100 text-neutral-300 my-0">
                </template>
            </template>
            <button type="button" class="btn btn-outline-primary-600 py-4 fw-bold">查看更多</button>
        </div>
    </div>
</div>

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
