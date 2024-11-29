<script setup>

const { month, days } = useDate();

//

const isEditPassword = ref(false);
const isEditUserProfile = ref(false);

</script>

<template>

<div class="row gap-6 gap-md-0">
    <div class="col-md-5">
        <section
            class="bg-neutral-100 p-6 p-md-10 rounded-3xl
            d-flex flex-column gap-6 gap-md-10">
            <h2 class="fs-6 fs-md-5 fw-bold">
            修改密碼
            </h2>
            <div class="d-flex flex-column gap-4 gap-md-6">
                <div class="fs-8 fs-md-7">
                    <p class="text-neutral-500 fw-medium mb-2">
                    電子信箱
                    </p>
                    <span
                        class="form-control pe-none text-neutral-600 fw-bold
                        p-0 border-0">
                    Jessica@exsample.com
                    </span>
                </div>
                <div
                    class="d-flex justify-content-between align-items-center"
                    v-if="!isEditPassword">
                    <div>
                        <label
                            class="text-neutral-500 fs-8 fs-md-7 fw-medium
                            mb-0">
                        密碼
                        </label>
                        <input
                            class="form-control pe-none p-0 border-0
                            text-neutral-600 fs-5 fs-md-3 fw-bold"
                            type="password" value="*********">
                    </div>
                    <button
                        class="flex-shrink-0 bg-transparent border-0
                        text-primary-600 fs-8 fs-md-7 fw-bold text-decoration-underline"
                        type="button"
                        @click="isEditPassword = true">
                        重設密碼
                    </button>
                </div>
                <div class="d-flex flex-column gap-4 gap-md-6" v-else>
                    <div>
                        <label
                            for="old-password"
                            class="form-label fs-8 fs-md-7 fw-bold">
                            舊密碼
                        </label>
                        <input
                            id="old-password" type="password"
                            class="form-control fs-7 p-4 rounded-3"
                            placeholder="請輸入舊密碼">
                    </div>
                    <div>
                        <label
                            for="new-password"
                            class="form-label fs-8 fs-md-7 fw-bold">
                            新密碼
                        </label>
                        <input
                            id="new-password" type="password"
                            class="form-control fs-7 p-4 rounded-3"
                            placeholder="請輸入新密碼">
                    </div>
                    <div>
                        <label
                            for="confirm-password"
                            class="form-label fs-8 fs-md-7 fw-bold">
                            確認新密碼
                        </label>
                        <input
                            id="confirm-password" type="password"
                            class="form-control fs-7 p-4 rounded-3"
                            placeholder="請再輸入一次新密碼">
                    </div>
                    <button
                        class="btn btn-neutral-300 px-8 py-4 rounded-3
                        align-self-md-start text-neutral-400"
                        type="button" @click="isEditPassword = false">
                        儲存設定
                    </button>
                </div>
            </div>
        </section>
    </div>
    <div class="col-md-7">
        <section
            class="bg-neutral-100 p-6 p-md-10 rounded-3xl
            d-flex flex-column gap-6 gap-md-10">
            <h2 class="fs-6 fs-md-5 fw-bold">
            基本資料
            </h2>
            <div class="d-flex flex-column gap-4 gap-md-6">
                <div class="fs-8 fs-md-7">
                    <label for="name" class="form-label">
                    姓名
                    </label>
                    <input
                        id="name" name="name" type="text"
                        class="form-control text-neutral-600 fw-bold"
                        value="Jessica Wang" :class="isEditUserProfile ? 'p-4' : 'pe-none p-0 border-0'">
                </div>
                <div class="fs-8 fs-md-7">
                    <label for="phone" class="form-label">
                    手機號碼
                    </label>
                    <input
                        id="phone" name="phone" type="tel"
                        class="form-control text-neutral-600 fw-bold"
                        value="+886 912 345 678" :class="isEditUserProfile ? 'p-4' : 'pe-none p-0 border-0'">
                </div>
                <div class="fs-8 fs-md-7">
                    <label for="birth" class="form-label">
                    生日
                    </label>
                    <span
                        class="form-control pe-none p-0 border-0
                        text-neutral-600 fw-bold"
                        v-if="!isEditUserProfile">
                        1990 年 8 月 15 日
                    </span>
                    <div class="d-flex gap-2" v-else>
                        <select
                            id="birth"
                            class="form-select p-4 rounded-3
                            text-neutral-500 fw-medium">
                            <template v-for="year in 65" :key="year">
                                <option :value="`${year + 1958}`">
                                {{ year + 1958 }}
                                </option>
                            </template>
                        </select>
                        <select
                            class="form-select p-4 rounded-3 text-neutral-500 fw-medium"
                            v-model.number="month">
                            <template v-for="mon in 12" :key="mon">
                                <option :value="mon">
                                {{ mon }}
                                </option>
                            </template>
                        </select>
                        <select class="form-select p-4 rounded-3 text-neutral-500 fw-medium">
                            <template v-for="day in days" :key="day">
                                <option :value="day">
                                {{ day }}
                                </option>
                            </template>
                        </select>
                    </div>
                </div>
                <div class="fs-8 fs-md-7">
                    <label
                        for="address"
                        class="form-label">
                        地址
                    </label>
                    <span
                        class="form-control pe-none p-0 border-0
                        text-neutral-600 fw-bold"
                        v-if="!isEditUserProfile">
                        高雄市新興區六角路 123 號
                    </span>
                    <div class="d-flex gap-2 mb-2" v-else>
                        <select
                            class="form-select p-4 rounded-3
                            text-neutral-500 fw-medium">
                            <option value="臺北市">臺北市</option>
                            <option value="臺中市">臺中市</option>
                            <option value="高雄市" selected>高雄市</option>     
                        </select>
                        <select
                            class="form-select p-4 rounded-3
                            text-neutral-500 fw-medium">
                            <option value="前金區">前金區</option>
                            <option value="鹽埕區">鹽埕區</option>
                            <option value="新興區" selected>新興區</option>
                        </select>
                        <input
                            id="address" type="text"
                            class="form-control p-4 rounded-3"
                            placeholder="請輸入詳細地址"
                            value="六角路 123 號">
                    </div>
                </div>
            </div>
            <button
                class="btn btn-outline-primary-600 px-8 py-4 rounded-3
                align-self-start"
                type="button" @click="isEditUserProfile = !isEditUserProfile"
                v-if="!isEditUserProfile">
                編輯
            </button>
            <button
                class="btn btn-neutral-300 px-8 py-4 rounded-3
                align-self-start text-neutral-400"
                type="button" @click="isEditUserProfile = !isEditUserProfile"
                v-else>
                儲存設定
            </button>
        </section>
    </div>
</div>

</template>

<style lang="scss" scoped>

input[type="password"] { font: small-caption; }
 
</style>
