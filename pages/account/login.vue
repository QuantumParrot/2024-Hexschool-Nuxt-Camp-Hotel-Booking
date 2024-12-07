<script setup>

useSeoMeta({ title: '會員登入' });

</script>

<template>

<div class="px-5 px-md-0">
    <div class="mb-10">
        <p class="text-primary-600 fs-8 fs-md-7 fw-bold mb-2">
        享樂酒店，誠摯歡迎
        </p>
        <h1 class="text-neutral-100 fw-bold">立即開始旅程</h1>
    </div>
    <form class="fs-8 fs-md-7 mb-10">
        <div class="mb-4">
            <label
                for="email"
                class="text-neutral-100 fw-bold mb-2">
                電子信箱
            </label>
            <input
                id="email" type="email"
                class="form-control p-4 border-neutral-300
                text-neutral-600 fw-medium"
                placeholder="請輸入信箱" value="jessica@sample.com">
        </div>
        <div class="mb-4">
            <label
                for="password"
                class="text-neutral-100 fw-bold mb-2">
                密碼
            </label>
            <input
                id="password" type="password"
                class="form-control p-4 border-neutral-300
                text-neutral-600 fw-medium"
                placeholder="請輸入密碼" value="congrats1to1team2taiwan4">
        </div>
        <div class="d-flex justify-content-between align-items-center mb-10">
            <div class="form-check d-flex align-items-end gap-2 text-neutral-100">
                <input
                    id="remember" type="checkbox"
                    class="form-check-input">
                <label for="remember" class="form-check-label fw-bold">
                記住帳號
                </label>
            </div>
            <button
                class="text-primary-600 fw-bold text-decoration-underline
                bg-transparent border-0"
                type="button">
                忘記密碼？
            </button>
        </div>
        <button
            class="btn btn-primary-600 w-100 py-4
            text-neutral-100 fw-bold"
            type="button">
            會員登入
        </button>
    </form>
    <p class="fs-8 fs-md-7 mb-0">
        <span class="me-2 text-neutral-100 fw-medium">沒有會員嗎？</span>
        <NuxtLink
            to="/account/signup"
            class="text-primary-600 fw-bold texr-decoration-underline">
            <span>前往註冊</span>
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

</style>
