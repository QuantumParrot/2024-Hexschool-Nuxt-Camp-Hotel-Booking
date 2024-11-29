<script setup>

import { Icon } from '@iconify/vue';

const confirmBooking = () => {

    navigateTo({

        name: 'booking-confirmation-bookingId',
        params: { bookingId: `${new Date().getTime() }` }

    })

};

</script>

<template>

<section class="py-10 py-md-30 bg-primary-100">
    <div class="container">
        <button
            class="d-flex align-items-baseline gap-2
            bg-transparent border-0 mb-10">
            <Icon class="fs-5 text-neutral-600" icon="mdi:keyboard-arrow-left" />
            <h1 class="fs-3 fw-bold text-neutral-600 mb-0">
            確認訂房資訊
            </h1>
        </button>
        <div class="row gap-10 gap-md-0">
            <div class="col-12 col-md-7">
                <section>
                    <h2 class="fs-6 fs-md-4 text-neutral-600 fw-bold
                    mb-8 mb-md-10">
                    訂房資訊
                    </h2>
                    <div class="d-flex flex-column gap-6">
                        <div class="d-flex justify-content-between align-items-center text-neutral-600">
                            <div>
                                <h3 class="title-deco fs-7 fw-bold mb-2">
                                選擇房型
                                </h3>
                                <p class="fw-medium mb-0">尊爵雙人房</p>
                            </div>
                            <button
                                class="bg-transparent border-0
                                fw-bold text-decoration-underline">
                                編輯
                            </button>
                        </div>
                        <div class="d-flex justify-content-between align-items-center text-neutral-600">
                            <div>
                                <h3 class="title-deco fs-7 fw-bold mb-2">
                                訂房日期
                                </h3>
                                <p class="fw-medium mb-2">
                                入住：12 月 4 日星期二
                                </p>
                                <p class="fw-medium mb-0">
                                退房：12 月 6 日星期三
                                </p>
                            </div>
                            <button
                                class="bg-transparent border-0
                                fw-bold text-decoration-underline">
                                編輯
                            </button>
                        </div>
                        <div class="d-flex justify-content-between align-items-center text-neutral-600">
                            <div>
                                <h3 class="title-deco fs-7 fw-bold mb-2">
                                房客人數
                                </h3>
                                <p class="fw-medium mb-0">2 人</p>
                            </div>
                            <button
                                class="bg-transparent border-0
                                fw-bold text-decoration-underline">
                                編輯
                            </button>
                        </div>
                    </div>
                </section>
                <hr class="my-10 my-md-12 opacity-100 text-neutral-400">
                <section>
                    <div class="d-flex justify-content-between align-items-center mb-10">
                        <h2 class="fs-6 fs-md-4 fw-bold text-neutral-600 mb-0">
                        訂房人資訊
                        </h2>
                        <button
                            class="bg-transparent border-0
                            text-primary-600 fw-bold text-decoration-underline"
                            type="button">
                            套用會員資料
                        </button>
                    </div>
                    <form class="d-flex flex-column gap-6">
                        <div class="text-neutral-600">
                            <label
                                for="name"
                                class="form-label fs-8 fs-md-7 fw-bold"
                            >姓名</label>
                            <input
                                id="name" type="text"
                                class="form-control p-4 fs-8 fs-md-7 rounded-3"
                                placeholder="請輸入姓名">
                        </div>
                        <div class="text-neutral-600">
                            <label
                                for="phone"
                                class="form-label fs-8 fs-md-7 fw-bold"
                            >手機號碼</label>
                            <input
                                id="phone" type="tel"
                                class="form-control p-4 fs-8 fs-md-7 rounded-3"
                                placeholder="請輸入手機號碼">
                        </div>
                        <div class="text-neutral-600">
                            <label
                                for="email"
                                class="form-label fs-8 fs-md-7 fw-bold"
                            >電子信箱</label>      
                            <input
                                id="email" type="email"
                                class="form-control p-4 fs-8 fs-md-7 rounded-3"
                                placeholder="請輸入電子信箱">                   
                        </div>
                        <div class="text-neutral-600">
                            <label
                                for="address"
                                class="form-label fs-8 fs-md-7 fw-bold"
                            >地址</label>  
                            <div class="d-flex gap-2 mb-4">
                                <select
                                    class="w-50 form-select p-4 rounded-3
                                    text-neutral-500 fs-8 fs-md-7 fw-medium">
                                    <option value="臺北市">臺北市</option>
                                    <option value="臺中市">臺中市</option>
                                    <option value="高雄市" selected>高雄市</option>
                                </select>
                                <select
                                    class="w-50 form-select p-4 rounded-3
                                    text-neutral-500 fs-8 fs-md-7 fw-medium">
                                    <option value="前金區">前金區</option>
                                    <option value="鹽埕區">鹽埕區</option>
                                    <option value="新興區" selected>新興區</option>
                                </select>
                            </div>
                            <input
                                id="address" type="text"
                                class="form-control p-4 fs-8 fs-md-7 rounded-3"
                                placeholder="請輸入詳細地址">
                        </div>
                    </form>
                </section>
                <hr class="my-10 my-md-12 opacity-100 text-neutral-400">
                <section>
                    <h2 class="text-neutral-600 fs-6 fs-md-4 fw-bold mb-8 mb-md-10">
                    房間資訊
                    </h2>
                    <div class="d-flex flex-column gap-6">
                        <section>
                            <h3 class="title-deco text-neutral-600 fs-7 fs-md-5 fw-bold mb-4 mb-md-6">
                            房型基本資訊
                            </h3>
                            <ul class="d-flex gap-4 list-unstyled">
                                <li
                                    class="card-info bg-neutral-100 px-4 py-5
                                    border border-primary-300 rounded-3">
                                    <Icon
                                        class="fs-5 text-primary-600 mb-2"
                                        icon="fluent:slide-size-24-filled"
                                    />
                                    <p class="text-neutral-500 fw-bold text-nowrap mb-0">24 坪</p>
                                </li>
                                <li
                                    class="card-info bg-neutral-100 px-4 py-5
                                    border border-primary-300 rounded-3">
                                    <Icon
                                        class="fs-5 text-primary-600 mb-2"
                                        icon="material-symbols:king-bed"
                                    />
                                    <p class="text-neutral-500 fw-bold text-nowrap mb-0">1 張大床</p>
                                </li>
                                <li
                                    class="card-info bg-neutral-100 px-4 py-5
                                    border border-primary-300 rounded-3">
                                    <Icon
                                        class="fs-5 text-primary-600 mb-2"
                                        icon="ic:baseline-person"
                                    />
                                    <p class="text-neutral-500 fw-bold text-nowrap mb-0">2 - 4 人</p>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <h3 class="title-deco text-neutral-600 fs-7 fs-md-5 fw-bold mb-4 mb-md-6">
                            房間格局
                            </h3>
                            <ul
                                class="bg-neutral-100 p-6 rounded-3 list-unstyled mb-0
                                d-flex flex-wrap row-gap-2 column-gap-10
                                fs-8 fs-md-7">
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">市景</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">獨立衛浴</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">客廳</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">書房</p>
                                </li>
                                <li class="d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">樓層電梯</p>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <h3 class="title-deco text-neutral-600 fs-7 fs-md-5 fw-bold mb-4 mb-md-6">
                            房內設備
                            </h3>
                            <ul
                                class="bg-neutral-100 rounded-3 list-unstyled
                                d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0
                                fs-8 fs-md-7">
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    平面電視</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    吹風機</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    冰箱</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    熱水壺</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    檯燈</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    衣櫃</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    除濕機</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    浴缸</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    書桌</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    音響</p>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <h3 class="title-deco text-neutral-600 fs-7 fs-md-5 fw-bold mb-4 mb-md-6">
                            備品提供
                            </h3>
                            <ul
                                class="bg-neutral-100 rounded-3 list-unstyled
                                d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0
                                fs-8 fs-md-7">
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    衛生紙</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    拖鞋</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    沐浴用品</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    清潔用品</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    刮鬍刀</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    吊衣架</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    浴巾</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    刷牙用品</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    罐裝水</p>
                                </li>
                                <li class="flex-item d-flex gap-2">
                                    <Icon
                                        class="text-primary-600 fs-5"
                                        icon="material-symbols:check"
                                    />
                                    <p class="text-neutral-500 fw-bold mb-0">
                                    梳子</p>
                                </li>
                            </ul>
                        </section>
                    </div>
                </section>
            </div>
            <div class="col-12 col-md-5">
                <div
                    class="confirm-form bg-neutral-100 p-6 p-md-10 mx-auto ms-md-auto me-md-0
                    d-flex flex-column gap-10">
                    <img class="img-fluid rounded-3" src="/images/room-a-1.png" alt="room-a">
                    <div>
                        <h2 class="text-neutral-600 fs-6 fs-md-4 fw-bold mb-6">
                        價格詳情
                        </h2>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div
                                class="d-flex align-items-center
                                text-neutral-600 fw-medium">
                                <span>NT$ 10,000</span>
                                <Icon
                                    class="text-neutral-500 ms-2 me-1"
                                    icon="material-symbols:close"
                                />
                                <span class="text-neutral-500">2 晚</span>
                            </div>
                            <span class="fw-medium">NT$ 20,000</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center fw-medium">
                            <p class="d-flex align-items-center text-neutral-600 mb-0">
                            住宿折扣
                            </p>
                            <span class="text-primary-600">- NT$ 1,000</span>
                        </div>
                        <hr class="my-6 opacity-100 neutral-300">
                        <div class="d-flex justify-content-between align-items-center text-neutral-600 fw-bold">
                            <p class="mb-0">
                            總價
                            </p>
                            <span>NT$ 19,000</span>
                        </div>
                    </div>
                    <button
                        class="btn btn-primary-600 py-4 rounded-3
                        text-neutral-100 fw-bold"
                        type="button"
                        @click="confirmBooking">
                        確認訂房
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

</template>

<style lang="scss" scoped>

.title-deco {
    
  display: flex;
  align-items: center;

  &::before {

    content: '';
    display: inline-block;
    width: 4px; height: 24px;
    background-color: #BF9D7D;
    border-radius: 10px;
    margin-right: 0.75rem;

  }

}

.card-info { width: 97px; height: 97px; }

.flex-item {

  flex: 0 1 15%;

  @include media-breakpoint-down(xl) { flex-basis: 35% }

  @include media-breakpoint-down(lg) { flex-basis: 40% }

}

.confirm-form {

  position: sticky;
  top: 160px;
  max-width: 478px;
  border-radius: 1.25rem;

  @include media-breakpoint-down(md) {

    position: static;
    top: 0;
    max-width: auto;

  }

}

</style>
