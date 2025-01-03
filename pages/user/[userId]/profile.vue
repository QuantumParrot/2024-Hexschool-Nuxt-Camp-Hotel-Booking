<script setup>

useSeoMeta({ title: '個人資料' });

//

import useUserStore from '@/stores/user';

const userStore = useUserStore();

const { getUserData, updateUserData } = userStore;

const { userData } = storeToRefs(userStore);

// composables

const { showToastAlert } = useAlert();

const { $dateformat } = useNuxtApp();

const {
    
    address, cityList, countyList,
    addressToZipCode, zipCodeToAddress, setAddress

} = useAddress();

const { minYear, date, days, setDate } = useDate();

const { translateMessage } = useValidation();

//

const userDataTemp = ref({ name: '資料讀取中', phone: '資料讀取中', address: {} });

const birthday = computed(() => `${date.value.year}/${date.value.mon}/${date.value.day}`);

//


const initUserData = () => {

    const { name, phone } = userData.value

    userDataTemp.value = {

        name, phone,
        address: { detail: userData.value.address.detail }

    };

    setAddress(zipCodeToAddress(userData.value.address.zipcode));

    const birth = new Date(userData.value.birthday);

    setDate({ year: birth.getFullYear(), mon: birth.getMonth() + 1, day: birth.getDate() });
    
    // console.log(userDataTemp.value);

}

const resetUserData = () => {

    isEditUserProfile.value = false;
    initUserData();

}

onMounted(async () => {

    // 如果已經取得資料，不需要再取得一次

    if (!userData.value.name) { await getUserData(); }

    initUserData();

});

//

const isEditUserProfile = ref(false);

const isPending = ref(false);

const isDataFinished = computed(() => {

    return userDataTemp.value.name
    && userDataTemp.value.phone
    && date.value.year && date.value.mon && date.value.day
    && address.value.city && address.value.county
    && userDataTemp.value.address.detail
    
});

const handleUpdateDataProcess = (formData) => {

    if (isPending.value) return;

    isPending.value = true;

    //

    const newData = {

        userId: userData.value._id,
        name: formData.name, phone: formData.phone,
        address: { zipcode: '', detail: formData.address }

    };

    newData.address.zipcode = addressToZipCode(address.value);
    newData.birthday = birthday.value;

    updateUserData(newData)
        .then((res) => {

            if (res.status) {

                showToastAlert({ icon: 'success', text: '更新成功！' });

                setTimeout(() => {

                    window.location.reload();

                }, 1500);

            }
        
        })
        .finally(() => { isPending.value = false; })

};

//

const isEditPassword = ref(false);

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const clearPasswordForm = () => {

    isEditPassword.value = false;

    currentPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';

};

const handleUpdatePassword = (formData) => {

    if (isPending.value) return;

    isPending.value = true;

    const data = {

        userId: userData.value._id,
        oldPassword: formData['old-password'],
        newPassword: formData['new-password']

    };

    updateUserData(data)
        .then((res) => {
            
            if (res.status) {

                showToastAlert({ icon: 'success', text: '更新成功！' });

                setTimeout(() => {

                    window.location.reload();

                }, 1500);

            }
        
        })
        .finally(() => { isPending.value = false; })

};

</script>

<template>

<div>
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
                            {{ userData.email || '資料讀取中' }}
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
                    <VForm v-slot="{ errors, meta }" @submit="handleUpdatePassword" v-else>
                        <div class="d-flex flex-column gap-4 gap-md-6">
                            <div>
                                <label
                                    for="oldPassword"
                                    class="form-label fs-8 fs-md-7 fw-bold">
                                    舊密碼
                                </label>
                                <VField
                                    type="password" id="old-password" name="old-password"
                                    class="form-control fs-7 p-4 rounded-3"
                                    :class="{ 'is-invalid': errors['old-password'] }"
                                    placeholder="請輸入舊密碼"
                                    v-model.trim="currentPassword"
                                    rules="passwordFormat" />
                                <ErrorMessage name="old-password" class="invalid-feedback mt-3 mb-0" />
                            </div>
                            <div>
                                <label
                                    for="new-password"
                                    class="form-label fs-8 fs-md-7 fw-bold">
                                    新密碼
                                </label>
                                <VField
                                    type="password" id="new-password" name="new-password"
                                    class="form-control fs-7 p-4 rounded-3"
                                    :class="{ 'is-invalid': errors['new-password'] }"
                                    placeholder="請輸入新密碼"
                                    v-model.trim="newPassword"
                                    rules="passwordFormat" />
                                <ErrorMessage name="new-password" class="invalid-feedback mt-3 mb-0" />
                            </div>
                            <div>
                                <label
                                    for="confirm-password"
                                    class="form-label fs-8 fs-md-7 fw-bold">
                                    確認新密碼
                                </label>
                                <VField
                                    type="password" id="confirm-password" name="confirm-password" 
                                    class="form-control fs-7 p-4 rounded-3"
                                    :class="{ 'is-invalid': errors['confirm-password'] }"
                                    placeholder="請再輸入一次新密碼"
                                    v-model.trim="confirmNewPassword"
                                    rules="confirmed:@new-password" />
                                <ErrorMessage name="confirm-password" v-slot="{ message }">
                                    <p class="invalid-feedback mt-3 mb-0">
                                    {{ message.replace('confirm-password ', '密碼') }}
                                    </p>
                                </ErrorMessage>
                            </div>
                            <div class="d-flex gap-2">
                                <button
                                    class="btn btn-primary-600 px-8 py-4 rounded-3
                                    align-self-start"
                                    type="submit"
                                    :disabled="!meta.valid || isPending">
                                    儲存設定
                                </button>
                                <button
                                    class="btn btn-neutral-300 px-8 py-4 rounded-3
                                    align-self-start text-neutral-600"
                                    type="button"
                                    @click="clearPasswordForm">
                                    取消修改
                                </button>
                            </div>
                        </div>
                    </VForm>
                </div>
            </section>
        </div>
        <div class="col-md-7">
            <ClientOnly>
            <VForm v-slot="{ errors, meta }" @submit="handleUpdateDataProcess">
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
                            <VField
                                id="name" name="name" type="text"
                                class="form-control text-neutral-600 fw-bold"
                                :class="{
                                    'is-invalid': errors['name'],
                                    'p-4': isEditUserProfile,
                                    'pe-none p-0 border-0': !isEditUserProfile
                                }"
                                v-model.trim="userDataTemp.name"
                                rules="required"
                                :readonly="!isEditUserProfile" />
                            <ErrorMessage name="name" v-slot="{ message }">
                                <p class="invalid-feedback mt-3 mb-0">{{ translateMessage(message, 'name') }}</p>
                            </ErrorMessage>
                        </div>
                        <div class="fs-8 fs-md-7">
                            <label for="phone" class="form-label">
                            手機號碼
                            </label>
                            <VField
                                id="phone" name="phone" type="tel"
                                class="form-control text-neutral-600 fw-bold"
                                :class="{
                                    'is-invalid': errors['phone'],
                                    'p-4': isEditUserProfile,
                                    'pe-none p-0 border-0': !isEditUserProfile
                                }"
                                v-model.trim="userDataTemp.phone"
                                rules="phoneFormat"
                                :readonly="!isEditUserProfile" />
                            <ErrorMessage name="phone" v-slot="{ message }">
                                <p class="invalid-feedback mt-3 mb-0">{{ translateMessage(message, 'phone') }}</p>
                            </ErrorMessage>
                        </div>
                        <div class="fs-8 fs-md-7">
                            <label for="birth" class="form-label">
                            生日
                            </label>
                            <span
                                class="form-control pe-none p-0 border-0
                                text-neutral-600 fw-bold"
                                v-if="!isEditUserProfile">
                                {{
                                    userData.birthday ?
                                    $dateformat(userData.birthday, 'YYYY 年 MM 月 DD 日') : '資料讀取中'
                                }}
                            </span>
                            <div class="d-flex gap-2" v-else>
                                <select
                                    id="birth"
                                    class="form-select p-4 rounded-3
                                    text-neutral-500 fw-medium"
                                    v-model="date.year">
                                    <template v-for="year in 83" :key="year">
                                        <option :value="`${minYear + year - 1}`">
                                        {{ minYear + year - 1 }}
                                        </option>
                                    </template>
                                </select>
                                <select
                                    class="form-select p-4 rounded-3 text-neutral-500 fw-medium"
                                    v-model="date.mon">
                                    <template v-for="month in 12" :key="month">
                                        <option :value="month">{{ month }}</option>
                                    </template>
                                </select>
                                <select
                                    class="form-select p-4 rounded-3 text-neutral-500 fw-medium"
                                    v-model="date.day">
                                    <template v-for="day in days" :key="day">
                                        <option :value="day">{{ day }}</option>
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
                                {{
                                    userData.address.detail ? 
                                    address.city + address.county + userData.address.detail : '資料讀取中'
                                }}
                            </span>
                            <div class="d-flex gap-2 mb-2" v-else>
                                <select
                                    class="form-select p-4 rounded-3
                                    text-neutral-500 fw-medium"
                                    v-model="address.city">
                                    <template v-for="city in cityList" :key="city">
                                        <option :value="city">{{ city }}</option>
                                    </template>
                                </select>
                                <select
                                    class="form-select p-4 rounded-3
                                    text-neutral-500 fw-medium"
                                    v-model="address.county">
                                    <option value="" disabled>選擇鄉鎮市區</option>
                                    <template v-for="county in countyList" :key="county">
                                        <option :value="county">{{ county }}</option>
                                    </template>
                                </select>
                                <VField
                                    id="address" name="address" type="text"
                                    class="form-control p-4 rounded-3" :class="{ 'is-invalid': errors['address'] }"
                                    placeholder="請輸入詳細地址"
                                    v-model="userDataTemp.address.detail"
                                    rules="required" />
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
                    <div class="d-flex gap-2" v-else>
                        <button
                            class="btn btn-primary-600 px-8 py-4 rounded-3
                            align-self-start"
                            type="submit"
                            :disabled="!isDataFinished || !meta.valid || isPending">
                            儲存設定
                        </button>
                        <button
                            class="btn btn-neutral-300 px-8 py-4 rounded-3
                            align-self-start text-neutral-600"
                            type="button"
                            @click="resetUserData">
                            取消編輯
                        </button>
                    </div>
                </section>
            </VForm>
            </ClientOnly>
        </div>
    </div>
    <LoadingModal v-if="isPending">
        <p class="text-neutral-500 fs-5 fw-bold mb-0">更新中，請稍候</p>
    </LoadingModal>
</div>

</template>

<style lang="scss" scoped>

input[type="password"] { font: small-caption; }
 
</style>
