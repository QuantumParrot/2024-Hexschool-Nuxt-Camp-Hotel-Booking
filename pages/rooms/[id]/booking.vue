<script setup>

useSeoMeta({ title: '預約房型' });

//

import { Icon } from '@iconify/vue';

import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";

import { setLocale, localize } from '@vee-validate/i18n';

import { required, email, min } from '@vee-validate/rules';

import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

configure({
    
    validateOnInput: true,
    generateMessage: localize({ zhTW })

});

setLocale('zhTW');

//

import useBookingStore from '@/stores/booking';
import useCacheStore from '@/stores/cache';
import useUserStore from '@/stores/user';

const bookingStore = useBookingStore();
const cacheStore = useCacheStore();
const userStore = useUserStore();

const { orderTemplate, discountPrice } = storeToRefs(bookingStore);
const { roomCache } = storeToRefs(cacheStore);
const { userData } = storeToRefs(userStore);

//

definePageMeta({

    middleware: (to) => {

        const bookingStore = useBookingStore();

        const id = to.params.id;

        if (!bookingStore.orderTemplate.roomId) {

            return navigateTo(`/rooms/${id}`);

        }

    }

});

//

const { $toThousands } = useNuxtApp();

const router = useRouter();
const route = useRoute();

const returnRoomView = () => { router.push(`/rooms/${route.params.id}`); }

//

const {
    
    address, cityList, countyList,
    addressToZipCode, zipCodeToAddress, setAddress

} = useAddress();

const { translateMessage, phoneFormat } = useValidation();

const userInfo = ref({ address: {} });

const useMemberInfo = async () => {

    if (!userData.value._id) {
        
        await userStore.getUserData();
    
    }

    userInfo.value = {

        name: userData.value.name, phone: userData.value.phone, email: userData.value.email,
        address: { ...userData.value.address }

    };

    setAddress(zipCodeToAddress(userInfo.value.address.zipcode));

};

const isPending = ref(false);

const confirmBooking = () => {

    if (isPending.value) return;

    isPending.value = true;

    const data = { ...orderTemplate.value, userInfo: userInfo.value };

    data.userInfo.address.zipcode = addressToZipCode(address.value);

    bookingStore.cretateOrder(data)
        .then((res) => {

            const { result, status } = res;

            if (status) {

                bookingStore.$patch({ 

                    orderTemplate: { 
                        
                        userInfo: {

                            address: {} 

                        } 
                    } 

                });

                cacheStore.$patch({ roomCache: {}, bookingCache: result });

                router.replace(`/booking/confirmation/${result._id}`);

            };

        })
        .finally(() => {
            
            isPending.value = true;
        
        });

};

</script>

<template>

<section class="py-10 py-md-30 bg-primary-100">
    <div class="container">
        <button
            class="d-flex align-items-baseline gap-2
            bg-transparent border-0 mb-10"
            @click="returnRoomView">
            <Icon class="fs-5 text-neutral-600" icon="mdi:keyboard-arrow-left" />
            <h1 class="fs-3 fw-bold text-neutral-600 mb-0">
            確認訂房資訊
            </h1>
        </button>
        <Form v-slot="{ errors, meta }" @submit="confirmBooking">
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
                                    <p class="fw-medium mb-0">{{ roomCache.name }}</p>
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
                                    入住：{{ orderTemplate.checkInDate }}
                                    </p>
                                    <p class="fw-medium mb-0">
                                    退房：{{ orderTemplate.checkOutDate }}
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
                                    <p class="fw-medium mb-0">{{ orderTemplate.peopleNum }} 人</p>
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
                                type="button" @click="useMemberInfo">
                                套用會員資料
                            </button>
                        </div>
                        <div class="d-flex flex-column gap-6">
                            <div class="text-neutral-600">
                                <label
                                    for="name"
                                    class="form-label fs-8 fs-md-7 fw-bold"
                                >姓名</label>
                                <Field
                                    id="name" name="name" type="text"
                                    class="form-control p-4 fs-8 fs-md-7 rounded-3"
                                    :class="{ 'is-invalid': errors['name'] }"
                                    placeholder="請輸入您的姓名"
                                    v-model.trim="userInfo.name"
                                    rules="required|min:2"
                                />
                                <ErrorMessage name="name" v-slot="{ message }">
                                    <p class="invalid-feedback mt-3 mb-0">{{ translateMessage(message, 'name') }}</p>
                                </ErrorMessage>
                            </div>
                            <div class="text-neutral-600">
                                <label
                                    for="phone"
                                    class="form-label fs-8 fs-md-7 fw-bold"
                                >手機號碼</label>
                                <Field
                                    id="phone" name="phone" type="tel"
                                    class="form-control p-4 fs-8 fs-md-7 rounded-3"
                                    :class="{ 'is-invalid': errors['phone'] }"
                                    placeholder="請輸入您的手機"
                                    v-model.trim="userInfo.phone"
                                    :rules="phoneFormat"
                                />
                                <ErrorMessage name="phone" v-slot="{ message }">
                                    <p class="invalid-feedback mt-3 mb-0">{{ translateMessage(message, 'phone') }}</p>
                                </ErrorMessage>
                            </div>
                            <div class="text-neutral-600">
                                <label
                                    for="email"
                                    class="form-label fs-8 fs-md-7 fw-bold"
                                >電子信箱</label>      
                                <Field
                                    id="email" name="email" type="email"
                                    class="form-control p-4 fs-8 fs-md-7 rounded-3"
                                    :class="{ 'is-invalid': errors['email'] }"
                                    placeholder="請輸入您的信箱"
                                    v-model.trim="userInfo.email"
                                    rules="required|email"
                                />   
                                <ErrorMessage name="email" v-slot="{ message }">
                                    <p class="invalid-feedback mt-3 mb-0">{{ translateMessage(message, 'email') }}</p>
                                </ErrorMessage>                
                            </div>
                            <div class="text-neutral-600">
                                <label
                                    for="address"
                                    class="form-label fs-8 fs-md-7 fw-bold"
                                >地址</label>  
                                <div class="d-flex gap-2 mb-4">
                                    <select
                                        class="w-50 form-select p-4 rounded-3
                                        text-neutral-500 fs-8 fs-md-7 fw-medium"
                                        v-model="address.city">
                                        <option v-for="city in cityList" :key="city" :value="city">
                                        {{ city }}
                                        </option>
                                    </select>
                                    <select
                                        class="w-50 form-select p-4 rounded-3
                                        text-neutral-500 fs-8 fs-md-7 fw-medium"
                                        v-model="address.county">
                                        <option value="" selected disabled>選擇鄉鎮市區</option>
                                        <option v-for="county in countyList" :key="county" :value="county">
                                        {{ county }}
                                        </option>
                                    </select>
                                </div>
                                <Field
                                    id="address" name="address" type="text"
                                    class="form-control p-4 fs-8 fs-md-7 rounded-3"
                                    :class="{ 'is-invalid': errors['address'] }"
                                    placeholder="請輸入詳細地址"
                                    v-model.trim="userInfo.address.detail"
                                    rules="required"
                                />
                            </div>
                        </div>
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
                                        <p class="text-neutral-500 fw-bold text-nowrap mb-0">
                                        {{ roomCache.areaInfo }} 坪
                                        </p>
                                    </li>
                                    <li
                                        class="card-info bg-neutral-100 px-4 py-5
                                        border border-primary-300 rounded-3">
                                        <Icon
                                            class="fs-5 text-primary-600 mb-2"
                                            icon="material-symbols:king-bed"
                                        />
                                        <p class="text-neutral-500 fw-bold text-nowrap mb-0">
                                        {{ roomCache.bedInfo }}
                                        </p>
                                    </li>
                                    <li
                                        class="card-info bg-neutral-100 px-4 py-5
                                        border border-primary-300 rounded-3">
                                        <Icon
                                            class="fs-5 text-primary-600 mb-2"
                                            icon="ic:baseline-person"
                                        />
                                        <p class="text-neutral-500 fw-bold text-nowrap mb-0">
                                        1 - {{ roomCache.maxPeople }} 人
                                        </p>
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
                                    <template v-for="layout in roomCache.layoutInfo" :key="layout.title">
                                        <li class="flex-item d-flex gap-2">
                                            <Icon
                                                class="text-primary-600 fs-5"
                                                icon="material-symbols:check"
                                            />
                                            <p class="text-neutral-500 fw-bold mb-0">{{ layout.title }}</p>
                                        </li>
                                    </template>
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
                                    <template v-for="item in roomCache.facilityInfo" :key="item.title">
                                        <li class="flex-item d-flex gap-2">
                                            <Icon
                                                class="text-primary-600 fs-5"
                                                icon="material-symbols:check"
                                            />
                                            <p class="text-neutral-500 fw-bold mb-0">{{ item.title }}</p>
                                        </li>
                                    </template>
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
                                    <template v-for="item in roomCache.amenityInfo" :key="item.title">
                                        <li class="flex-item d-flex gap-2">
                                            <Icon
                                                class="text-primary-600 fs-5"
                                                icon="material-symbols:check"
                                            />
                                            <p class="text-neutral-500 fw-bold mb-0">{{ item.title }}</p>
                                        </li>
                                    </template>
                                </ul>
                            </section>
                        </div>
                    </section>
                </div>
                <div class="col-12 col-md-5">
                    <div
                        class="confirm-form bg-neutral-100 p-6 p-md-10 mx-auto ms-md-auto me-md-0
                        d-flex flex-column gap-10">
                        <img
                            class="img-fluid rounded-3"
                            :src="roomCache.imageUrl" :alt="roomCache.name">
                        <div>
                            <h2 class="text-neutral-600 fs-6 fs-md-4 fw-bold mb-6">
                            價格詳情
                            </h2>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div
                                    class="d-flex align-items-center
                                    text-neutral-600 fw-medium">
                                    <span>NT$ {{ $toThousands(roomCache.price) }}</span>
                                    <Icon
                                        class="text-neutral-500 ms-2 me-1"
                                        icon="material-symbols:close"
                                    />
                                    <span class="text-neutral-500">{{ orderTemplate.days }} 晚</span>
                                </div>
                                <span class="fw-medium">NT$ {{ $toThousands(roomCache.price * orderTemplate.days) }}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center fw-medium">
                                <p class="d-flex align-items-center text-neutral-600 mb-0">
                                住宿折扣
                                </p>
                                <span class="text-primary-600">- NT$ {{ $toThousands(discountPrice) }}</span>
                            </div>
                            <hr class="my-6 opacity-100 neutral-300">
                            <div class="d-flex justify-content-between align-items-center text-neutral-600 fw-bold">
                                <p class="mb-0">總價</p>
                                <span>NT$ {{ $toThousands(roomCache.price * orderTemplate.days - discountPrice) }}</span>
                            </div>
                        </div>
                        <button
                            class="btn btn-primary-600 py-4 rounded-3
                            text-neutral-100 fw-bold"
                            type="submit" :disabled="!meta.valid || isPending">
                            確認訂房
                        </button>
                    </div>
                </div>
            </div>
        </Form>
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
