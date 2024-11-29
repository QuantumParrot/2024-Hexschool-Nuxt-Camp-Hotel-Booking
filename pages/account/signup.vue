<script setup>

import { Icon } from '@iconify/vue';

const isEmailAndPasswordValid = ref(false);

const { month, days } = useDate();

</script>

<template>

<div class="px-5 px-md-0 py-md-30">
    <div class="mb-10">
        <p class="text-primary-600 fs-8 fs-md-7 fw-bold mb-2">
        享樂酒店，誠摯歡迎
        </p>
        <h1 class="text-neutral-100 fw-bold mb-4">
        立即註冊
        </h1>
        <div class="d-flex align-items-center gap-2 py-4">
            <div
                class="d-flex flex-column align-items-center gap-2
                text-neutral-100 px-2 px-md-0 pt-8">
                <span
                    class="step p-2 bg-primary-600 rounded-circle"
                    v-show="!isEmailAndPasswordValid">
                    1
                </span>
                <Icon
                    icon="material-symbols:check"
                    class="fs-1 fs-md-3 bg-primary-600 rounded-circle p-2" 
                    v-show="isEmailAndPasswordValid"
                    />
                <p class="fs-8 fs-md-7 fw-bold mb-0">輸入信箱及密碼</p>
            </div>
            <hr class="opacity-100 flex-grow-1 border border-neutral-400 my-0">
            <div
                :class="isEmailAndPasswordValid ? 'text-neutral-100' : 'text-neutral-400'"
                class="d-flex flex-column align-items-center gap-2 px-2 px-md-0 pt-8">
                <span
                    :class="{
                        'bg-primary-600': isEmailAndPasswordValid,
                        'bg-transparent border border-neutral-400': !isEmailAndPasswordValid
                    }"
                    class="step p-2 rounded-circle"
                >2</span>
                <p class="fs-8 fs-md-7 fw-bold mb-0">填寫基本資料</p>
            </div>
        </div>
    </div>

    <div class="fs-8 fs-md-7 mb-4">
        <form v-show="!isEmailAndPasswordValid">
            <div class="mb-4">
                <label
                    for="email"
                    class="text-neutral-100 fw-bold mb-2">
                    電子信箱
                </label>
                <input
                    id="email" type="email"
                    class="form-control p-4 border-neutral-300 text-neutral-600 fw-medium"
                    placeholder="請輸入信箱">
            </div>
            <div class="mb-4">
                <label
                    for="password"
                    class="text-neutral-100 fw-bold mb-2">
                    密碼
                </label>
                <input
                    id="password" type="password"
                    class="form-control p-4 border-neutral-300 text-neutral-600 fw-medium"
                    placeholder="請輸入密碼">
            </div>
            <div class="mb-10">
                <label
                    for="confirmPassword"
                    class="text-neutral-100 fw-bold mb-2">
                    確認密碼
                </label>
                <input
                    id="confirmPassword" type="password"
                    class="form-control p-4 border-neutral-300 text-neutral-600 fw-medium"
                    placeholder="請再輸入一次密碼">
            </div>
            <button
                class="btn btn-neutral-300 w-100 py-4
                text-neutral-400 fw-bold"
                type="button" @click="isEmailAndPasswordValid = true">
                下一步
            </button>
        </form>
        <form v-show="isEmailAndPasswordValid">
            <div class="mb-4">
                <label
                    for="name"
                    class="text-neutral-100 fw-bold mb-2">
                    姓名
                </label>
                <input
                    id="name" type="text"
                    class="form-control border-neutral-300 rounded-3
                    p-4 text-neutral-600 fw-medium"
                    placeholder="請輸入姓名">
            </div>
            <div class="mb-4">
                <label
                    for="phone"
                    class="text-neutral-100 fw-bold mb-2">
                    手機號碼
                </label>
                <input
                    id="phone" type="tel"
                    class="form-control border-neutral-300 rounded-3
                    p-4 text-neutral-600 fw-medium"
                    placeholder="請輸入手機號碼">
            </div>
            <div class="mb-4">
                <label
                    for="birth"
                    class="text-neutral-100 fw-bold mb-2">
                    生日
                </label>
                <div class="d-flex gap-2 text-neutral-500 fw-medium">
                    <select
                        id="birth"
                        class="form-select p-4 rounded-3">
                        <template v-for="year in 65" :key="year">
                            <option :value="`${year + 1958}`">{{ year + 1958 }}</option>
                        </template>
                    </select>
                    <select class="form-select p-4 rounded-3" v-model.number="month">
                        <template v-for="mon in 12" :key="mon">
                            <option :value="mon">{{ mon }}</option>
                        </template>
                    </select>
                    <select class="form-select p-4 rounded-3">
                        <template v-for="day in days" :key="day">
                            <option :value="day">{{ day }}</option>
                        </template>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <label
                    for="address"
                    class="text-neutral-100 fw-bold mb-2">
                    地址
                </label>
                <div>
                    <div class="d-flex gap-2 mb-2">
                        <select class="form-select p-4 rounded-3 text-neutral-80 fw-medium">
                            <option value="臺北市">臺北市</option>
                            <option value="臺中市">臺中市</option>
                            <option value="高雄市" selected>高雄市</option>
                        </select>
                        <select class="form-select p-4 rounded-3 text-neutral-80 fw-medium">
                            <option value="前金區">前金區</option>
                            <option value="鹽埕區">鹽埕區</option>
                            <option value="新興區" selected>新興區</option>
                        </select>
                    </div>
                    <input
                        id="address" type="text"
                        class="form-control p-4 rounded-3"
                        placeholder="請輸入詳細地址">
                </div>
            </div>
            <div class="form-check d-flex align-items-end gap-2 text-neutral-100 mb-10">
                <input
                    id="agreement-check" type="checkbox"
                    class="form-check-input">
                <label
                    for="agreement-check"
                    class="form-check-label fw-bold">
                    我已閱讀並同意本網站個資使用規範
                </label>
            </div>
            <button
                class="btn btn-neutral-300 w-100 py-4 mb-4
                text-neutral-400 fw-bold"
                type="button" @click="isEmailAndPasswordValid = false">
                上一步
            </button>
            <button
                class="btn btn-primary-600 w-100 py-4 text-neutral-100 fw-bold"
                type="button">
                完成註冊
            </button>
        </form>
    </div>

    <p class="fs-8 fs-md-7 mb-0">
        <span class="me-2 text-neutral-100 fw-medium">已經有會員了嗎？</span>
        <NuxtLink
            to="/account/login"
            class="text-primary-600 fw-bold texr-decoration-underline">
            <span>立即登入</span>
        </NuxtLink>
    </p>
</div>

</template>

<style scoped>

input[type="password"] {

  font: small-caption;
  font-size: 1.5rem;

}

input::placeholder { font-size: 1rem; color: #909090; }

.form-check-input { width: 1.5rem; height: 1.5rem; }

.form-check-input:checked {

  background-color: #BF9D7D;
  border-color: #BF9D7D;

}

.step {

  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px; height: 32px;

}

</style>
