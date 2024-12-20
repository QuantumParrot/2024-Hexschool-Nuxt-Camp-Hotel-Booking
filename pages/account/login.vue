<script setup>

useSeoMeta({ title: '會員登入' });

//

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';

import { required, email, min } from '@vee-validate/rules';

import { setLocale, localize } from '@vee-validate/i18n';

import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

//

import useAuthStore from '@/stores/auth';

//

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

configure({

    validateOnInput: true,
    generateMessage: localize({ zhTW })

});

setLocale('zhTW');

// composables

const router = useRouter();

const { translateMessage } = useValidation();

// pinia store

const { sendLoginAuth } = useAuthStore();

//

const loginFormData = ref({ email: '', password: '' });

const isFormFinished = computed(() => {

    return loginFormData.value.email && loginFormData.value.password;

});

const rememberUser = ref(false);

const isPending = ref(false);

const handleLoginProcess = (loginData, { resetForm }) => {

    isPending.value = true;

    sendLoginAuth(loginData)
        .then((id) => {

            setTimeout(() => {
                
                router.replace(`/user/${id}/profile`);
            
            }, 1500);

        })
        .catch((error) => {

            if (import.meta.env.DEV) { console.log(error); }

        })
        .finally(() => {
            
            resetForm();
            isPending.value = false;
        
        })

};

</script>

<template>

<div class="px-5 px-md-0">
    <div class="mb-10">
        <p class="text-primary-600 fs-8 fs-md-7 fw-bold mb-2">
        享樂酒店，誠摯歡迎
        </p>
        <h1 class="text-neutral-100 fw-bold">立即開始旅程</h1>
    </div>
    <div class="fs-8 fs-md-7 mb-4">
        <Form v-slot="{ errors }" @submit="handleLoginProcess">
            <div class="mb-4">
                <label
                    for="email"
                    class="text-neutral-100 fw-bold mb-2">
                    電子信箱
                </label>
                <Field
                    id="email" name="email" type="email"
                    class="form-control p-4 border-neutral-300
                    text-neutral-600 fw-medium"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入信箱"
                    v-model="loginFormData.email"
                    rules="required|email" />
                <ErrorMessage name="email" v-slot="{ message }">
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
                    class="form-control p-4 border-neutral-300
                    text-neutral-600 fw-medium"
                    :class="{ 'is-invalid': errors['password'] }"
                    placeholder="請輸入密碼"
                    v-model="loginFormData.password"
                    rules="required|min:8" />
                <ErrorMessage name="password" v-slot="{ message }">
                    <p class="invalid-feedback my-3">
                    {{ translateMessage(message, 'password') }}
                    </p>
                </ErrorMessage>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-10">
                <div class="form-check d-flex align-items-end gap-2 text-neutral-100">
                    <input
                        id="remember" type="checkbox" class="form-check-input"
                        v-model="rememberUser">
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
                type="submit" :disabled="!isFormFinished || isPending">
                會員登入
            </button>
        </Form>
    </div>
    <p class="fs-8 fs-md-7 mb-0">
        <span class="me-2 text-neutral-100 fw-medium">沒有會員嗎？</span>
        <NuxtLink
            to="/account/signup"
            class="text-primary-600 fw-bold texr-decoration-underline">
            <span>前往註冊</span>
        </NuxtLink>
    </p>
    <LoadingModal v-if="isPending">
        <p class="text-neutral-500 fs-5 fw-bold mb-0">登入中，請稍候</p>
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

</style>
