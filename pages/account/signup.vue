<script setup>

useSeoMeta({ title: '註冊會員' });

//

import { Icon } from '@iconify/vue';

import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";

import { required, confirmed, email, min } from '@vee-validate/rules';

import { setLocale, localize } from '@vee-validate/i18n';

import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

//

import useAuthStore from '@/stores/auth';

//

defineRule('confirmed', confirmed);
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

configure({
    
    validateOnInput: true,
    generateMessage: localize({ zhTW })

});

setLocale('zhTW');

// composables

const {
    
    address, cityList, countyList,
    addressToZipCode

} = useAddress();

const {
    
    translateMessage,
    phoneFormat, passwordFormat

} = useValidation();

// pinia store

const { sendSignUpAuth } = useAuthStore();

//

const signUpStep = ref(1);

const signUpFormData = ref({

    name: '',
    password: '',
    email: '',
    phone: '',
    address: { zipcode: '', detail: '前端路 777 號' }

});

const confirmPassword = ref('');

const isAgreePrivacyPolicy = ref(false);

// 生日

const { minYear, date, days } = useDate();

const birthday = computed(() => `${date.value.year}/${date.value.mon}/${date.value.day}`);

//

const isEmailAndPasswordValid = computed(() => {

    return signUpFormData.value.email && 
    signUpFormData.value.password && 
    signUpFormData.value.password === confirmPassword.value

})

const isFormFinished = computed(() => {

    return signUpFormData.value.name
    && signUpFormData.value.email
    && signUpFormData.value.password
    && signUpFormData.value.password === confirmPassword.value
    && signUpFormData.value.phone
    && date.value.year && date.value.mon && date.value.day
    && address.value.city && address.value.county
    && signUpFormData.value.address.detail
    && isAgreePrivacyPolicy.value

});

//

const isPending = ref(false);

const handleSignUpProcess = (signupData, { resetForm }) => {

    if (isPending.value) return;

    isPending.value = true;

    //

    const data = { ...signUpFormData.value, birthday: birthday.value };
    
    data.address.zipcode = addressToZipCode(address.value);

    sendSignUpAuth(data)
        .then((res) => {

            resetForm();
            
            setTimeout(() => {
                
                navigateTo({ name: 'account-login' })
            
            }, 1500);

        })
        .finally(() => { isPending.value = false });

};

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
                :class="signUpStep === 2 ? 'text-neutral-100' : 'text-neutral-400'"
                class="d-flex flex-column align-items-center gap-2 px-2 px-md-0 pt-8">
                <span
                    :class="{
                    'bg-primary-600': signUpStep === 2,
                    'bg-transparent border border-neutral-400': signUpStep === 1 }"
                    class="step p-2 rounded-circle">
                    2
                </span>
                <p class="fs-8 fs-md-7 fw-bold mb-0">填寫基本資料</p>
            </div>
        </div>
    </div>

    <div class="fs-8 fs-md-7 mb-4">
        <Form v-slot="{ errors }" @submit="handleSignUpProcess">
            <div v-show="signUpStep === 1">
                <div class="mb-4">
                    <label
                        for="email"
                        class="text-neutral-100 fw-bold mb-2">
                        電子信箱
                    </label>
                    <Field
                        id="email" name="email" type="text"
                        class="form-control p-4 border-neutral-300
                        text-neutral-600 fw-medium"
                        placeholder="請輸入信箱"
                        v-model.trim="signUpFormData.email"
                        :class="{ 'is-invalid': errors['email'] }"
                        :rules="{ required: true, email: true }" />
                    <ErrorMessage
                        name="email"
                        v-slot="{ message }">
                        <p class="invalid-feedback my-3">
                        {{ translateMessage(message, 'email') }}
                        </p>
                    </ErrorMessage>
                </div>
                <div class="mb-4">
                    <label
                        for="password"
                        class="text-neutral-100 fw-bold mb-2">
                        密碼
                    </label>
                    <Field
                        id="password" name="password" type="password"
                        class="form-control p-4 border-neutral-300 text-neutral-600 fw-medium"
                        placeholder="請輸入密碼"
                        v-model.trim="signUpFormData.password"
                        :class="{ 'is-invalid': errors['password'] }"
                        :rules="passwordFormat" />
                    <ErrorMessage
                        name="password"
                        v-slot="{ message }">
                        <p class="invalid-feedback my-3">
                        {{ translateMessage(message, 'password') }}
                        </p>
                    </ErrorMessage>
                </div>
                <div class="mb-10">
                    <label
                        for="confirmPassword"
                        class="text-neutral-100 fw-bold mb-2">
                        確認密碼
                    </label>
                    <Field
                        id="confirmPassword" name="confirmPassword" type="password"
                        class="form-control p-4 border-neutral-300 text-neutral-600 fw-medium"
                        placeholder="請再輸入一次密碼"
                        v-model.trim="confirmPassword"
                        :class="{ 'is-invalid': errors['confirmPassword'] }"
                        rules="confirmed:@password" />
                    <ErrorMessage
                        name="confirmPassword"
                        v-slot="{ message }">
                        <p class="invalid-feedback my-3">
                        {{ translateMessage(message, 'confirmPassword') }}
                        </p>
                    </ErrorMessage>
                </div>
                <button
                    class="btn btn-neutral-200 w-100 py-4
                    text-neutral-700 fw-bold"
                    type="button"
                    :disabled="!isEmailAndPasswordValid || isPending
                    || errors['email'] || errors['password'] || errors['confirmPassword']"
                    @click="signUpStep = 2">
                    下一步
                </button>
            </div>
            <div v-show="signUpStep === 2">
                <div class="mb-4">
                    <label
                        for="name"
                        class="text-neutral-100 fw-bold mb-2">
                        姓名
                    </label>
                    <Field
                        id="name" name="name" type="text"
                        class="form-control border-neutral-300 rounded-3
                        p-4 text-neutral-600 fw-medium"
                        placeholder="請輸入姓名"
                        v-model.trim="signUpFormData.name"
                        :class="{ 'is-invalid': errors['name'] }"
                        :rules="{ required: true, min: 2 }" />
                    <ErrorMessage
                        name="name"
                        v-slot="{ message }">
                        <p class="invalid-feedback my-3">
                        {{ translateMessage(message, 'name') }}
                        </p>
                    </ErrorMessage>
                </div>
                <div class="mb-4">
                    <label
                        for="phone"
                        class="text-neutral-100 fw-bold mb-2">
                        手機號碼
                    </label>
                    <Field
                        id="phone" name="phone" type="tel"
                        class="form-control border-neutral-300
                        p-4 rounded-3 text-neutral-600 fw-medium"
                        placeholder="請輸入手機號碼"
                        v-model="signUpFormData.phone"
                        :class="{ 'is-invalid': errors['phone'] }"
                        :rules="phoneFormat" />
                    <ErrorMessage class="invalid-feedback my-3" name="phone" />
                </div>
                <div class="mb-4">
                    <label
                        for="birth"
                        class="text-neutral-100 fw-bold mb-2">
                        生日（ 西元年 / 月 / 日 ）
                    </label>
                    <div class="d-flex gap-2 text-neutral-500 fw-medium">
                        <select
                            id="birth"
                            class="form-select p-4 rounded-3"
                            v-model="date.year">
                            <option value="" disabled>年</option>
                            <option v-for="year in 83" :key="year" :value="`${year + minYear - 1}`">
                                {{ year + minYear - 1 }}
                            </option>
                        </select>
                        <select
                            v-model="date.mon"
                            class="form-select p-4 rounded-3">
                            <option v-for="month in 12" :key="month" :value="month">
                                {{ month }}
                            </option>
                        </select>
                        <select
                            v-model="date.day"
                            class="form-select p-4 rounded-3">
                            <option v-for="day in days" :key="day" :value="day">
                                {{ day }}
                            </option>
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
                            <select
                                v-model="address.city"
                                class="form-select p-4 rounded-3
                                text-neutral-80 fw-medium">
                                <option v-for="city in cityList" :key="city" :value="city">
                                {{ city }}
                                </option>
                            </select>
                            <select
                                v-model="address.county"
                                class="form-select p-4 rounded-3
                                text-neutral-80 fw-medium">
                                <option value="" selected disabled>鄉鎮市區</option>
                                <option v-for="county in countyList" :key="county" :value="county">
                                {{ county }}
                                </option>
                            </select>
                        </div>
                        <input
                            id="address" type="text"
                            class="form-control p-4 rounded-3"
                            placeholder="請輸入詳細地址"
                            v-model.trim="signUpFormData.address.detail">
                    </div>
                </div>
                <div class="form-check d-flex align-items-end gap-2 text-neutral-100 mb-10">
                    <input
                        id="agreement-check" type="checkbox"
                        class="form-check-input"
                        v-model="isAgreePrivacyPolicy">
                    <label
                        for="agreement-check"
                        class="form-check-label fw-bold">
                        我已閱讀並同意本網站個資使用規範
                    </label>
                </div>
                <button
                    class="btn btn-neutral-200 w-100 py-4 mb-4
                    text-neutral-700 fw-bold"
                    type="button" @click="signUpStep = 1"
                    :disabled="isPending">
                    上一步
                </button>
                <button
                    class="btn btn-primary-600 w-100 py-4 text-neutral-100 fw-bold"
                    type="submit"
                    :disabled="!isFormFinished || isPending">
                    完成註冊
                </button>
            </div>
        </Form>
    </div>

    <p class="fs-8 fs-md-7 mb-0">
        <span class="me-2 text-neutral-100 fw-medium">已經有會員了嗎？</span>
        <NuxtLink
            to="/account/login"
            class="text-primary-600 fw-bold texr-decoration-underline">
            <span>立即登入</span>
        </NuxtLink>
    </p>

    <LoadingModal v-if="isPending">
        <p class="text-neutral-500 fs-5 fw-bold mb-0">註冊中，請稍候</p>
    </LoadingModal>
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
