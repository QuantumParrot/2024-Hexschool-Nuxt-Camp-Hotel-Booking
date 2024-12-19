<script setup>

import { Icon } from '@iconify/vue';

import useBookingStore from '@/stores/booking';
import useCacheStore from '@/stores/cache';
import useAuthStore from '@/stores/auth';

const bookingStore = useBookingStore();
const cacheStore = useCacheStore();
const authStore = useAuthStore();

const { orderTemplate } = storeToRefs(bookingStore);
const { isLoggedIn } = storeToRefs(authStore);

//

const { $dateformat, $toThousands } = useNuxtApp();

const { showToastAlert } = useAlert();

const config = useRuntimeConfig();

const router = useRouter();

const route = useRoute();

//

const id = ref(route.params.id);

//

const { data:room } = await useAsyncData(async() => {

    const res = await $fetch(`api/v1/rooms/${id.value}`, {

        baseURL: config.public.apiUrl,

    });

    cacheStore.$patch({ roomCache: res.result });

    return res;

}, {

    transform: res => {
        
        return {
            
            ...res.result,
            layoutInfo: res.result.layoutInfo.reverse()

        }

    }

});

//

const maxBookingNumber = ref(room.value.maxPeople);
const bookingClientNumber = ref(orderTemplate.value.peopleNum || 1);

const updateClientNumber = (num) => { bookingClientNumber.value = num }

//

const today = $dateformat(new Date().getTime());

const days = ref(0);

const bookingDate = reactive({

    range: {

        start: today,
        end: null

    },

    minDate: today, maxDate: null

});

onMounted(() => {

    if (orderTemplate.value.roomId) {

        bookingDate.range.start = orderTemplate.value.checkInDate;
        bookingDate.range.end = orderTemplate.value.checkOutDate;

    }

});

// emit

const confirmDate = (date) => {

    bookingDate.range.start = date.range.start;
    bookingDate.range.end = date.range.end;
    days.value = date.days;

    if (date.clients) { bookingClientNumber.value = date.clients }

};

//

const handleBookingProcess = async () => {

    if (!bookingDate.range.start || !bookingDate.range.end) {

        showToastAlert({ icon: 'warning', text: '請填寫預訂日期' });
        return;

    }

    bookingStore.$patch({

        orderTemplate: {

            ...orderTemplate.value,

            roomId: id.value,
            checkInDate: bookingDate.range.start,
            checkOutDate: bookingDate.range.end,
            peopleNum: bookingClientNumber.value,
            days: days.value,
            
        }

    });

    router.push(`/rooms/${id.value}/booking`);

};

//

const modal = ref(null);

const showModal = () => { modal.value.showModal(); }

//

const title = ref(room.value.name);

useSeoMeta({ title });

</script>

<template>

<div>

<section class="bg-primary-100 p-md-20">
    <div class="d-none d-md-block position-relative">
        <div class="d-flex gap-2 rounded-3xl overflow-hidden">
            <div style="width: 52.5vw;">
                <img class="w-100" :src="room.imageUrl" :alt="room.name">
            </div>
            <div style="width: 42.5vw;" class="row g-md-2">
                <template v-for="img in room.imageUrlList" :key="img">
                    <div class="col-md-6">
                        <img class="w-100 h-100" :src="img" :alt="room.name">
                    </div>
                </template>
            </div>
        </div>
        <button
            class="position-absolute
            btn btn-primary-100 px-8 py-4 me-3 border-primary-600 rounded-3
            text-primary-600 fw-bold"
            style="bottom: 20px; right: 10px;"
            type="button">
            看更多
        </button>
    </div>
    <div class="d-md-none position-relative">
        <img class="img-fluid" :src="room.imageUrl" :alt="room.name">
        <button
            class="position-absolute
            btn btn-primary-100 px-8 py-4 border-primary-600 rounded-3
            text-primary-600 fw-bold"
            style="bottom: 23px; right: 12px;"
            type="button">
            看更多
        </button>
    </div>
</section>

<section class="bg-primary-100 py-10 py-md-30">
    <div class="container">
        <div class="row">
            <div class="col-md-7 d-flex flex-column gap-6 gap-md-20">
                <div>
                    <h1 class="text-neutral-600 fw-bold mb-4">
                    {{ room.name }}
                    </h1>
                    <p class="text-neutral-500 fs-8 fs-md-7 fw-medium mb-0">{{ room.description }}</p>
                </div>
                <section>
                    <h3 class="title-deco text-neutral-600 fs-7 fs-md-5 fw-bold
                    mb-4 mb-md-6">房型基本資訊</h3>
                    <ul class="d-flex gap-4 list-unstyled">
                        <li class="card-info bg-neutral-100 px-4 py-5 border border-primary-300 rounded-3">
                            <Icon
                                class="text-primary-600 fs-5 mb-2"
                                icon="fluent:slide-size-24-filled"
                                />
                            <p class="text-neutral-500 fw-bold text-nowrap mb-0">
                            {{ room.areaInfo }} 坪
                            </p>
                        </li>
                        <li class="card-info bg-neutral-100 px-4 py-5 border border-primary-300 rounded-3">
                            <Icon
                                class="text-primary-600 fs-5 mb-2"
                                icon="material-symbols:king-bed"
                                />
                            <p class="text-neutral-500 fw-bold text-nowrap mb-0">
                            {{ room.bedInfo }}
                            </p>
                        </li>
                        <li class="card-info bg-neutral-100 px-4 py-5 border border-primary-300 rounded-3">
                            <Icon
                                class="text-primary-600 fs-5 mb-2"
                                icon="ic:baseline-person"
                                />
                            <p class="text-neutral-500 fw-bold text-nowrap mb-0">
                            1 - {{ room.maxPeople }} 人
                            </p>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3 class="title-deco text-neutral-600 fs-7 fs-md-5 fw-bold
                    mb-4 mb-md-6">房間格局</h3>
                    <ul
                        class="bg-neutral-100 list-unstyled p-6 rounded-3
                        d-flex flex-wrap row-gap-2 column-gap-10
                        fs-8 fs-md-7">
                        <template v-for="layout in room.layoutInfo" :key="layout.title">
                            <li class="flex-item d-flex gap-2">
                                <Icon
                                    class="text-primary-600 fs-5"
                                    icon="material-symbols:check"
                                    />
                                <p class="text-neutral-500 fw-bold mb-0">
                                {{ layout.title }}
                                </p>
                            </li>
                        </template>
                    </ul>
                </section>
                <section>
                    <h3 class="title-deco text-neutral-600 fs-7 fs-md-5 fw-bold
                    mb-4 mb-md-6">房內設備</h3>
                    <ul
                        class="bg-neutral-100 list-unstyled p-6 rounded-3 mb-0
                        d-flex flex-wrap row-gap-2 column-gap-10
                        fs-8 fs-md-7">
                        <template v-for="facility in room.facilityInfo" :key="facility.title">
                            <li class="flex-item d-flex gap-2">
                                <Icon
                                    class="text-primary-600 fs-5"
                                    icon="material-symbols:check"
                                    />
                                <p class="text-neutral-500 fw-bold mb-0">
                                {{ facility.title }}
                                </p>
                            </li>                            
                        </template>
                    </ul>
                </section>
                <section>
                    <h3 class="title-deco text-neutral-600 fs-7 fs-md-5 fw-bold
                    mb-4 mb-md-6">備品提供</h3>
                    <ul
                        class="bg-neutral-100 list-unstyled p-6 rounded-3 mb-0
                        d-flex flex-wrap row-gap-2 column-gap-10
                        fs-8 fs-md-7">
                        <template v-for="item in room.amenityInfo" :key="item.title">
                            <li class="flex-item d-flex gap-2">
                                <Icon
                                    class="text-primary-600 fs-5"
                                    icon="material-symbols:check"
                                    />
                                <p class="text-neutral-500 fw-bold mb-0">
                                {{ item.title }}
                                </p>
                            </li>
                        </template>
                    </ul>
                </section>
                <section>
                    <h3 class="title-deco text-neutral-600 fs-7 fs-md-5 fw-bold
                    mb-4 mb-md-6">訂房須知</h3>
                    <ol class="text-neutral-500 fs-8 fs-md-7 fw-medium">
                        <li>入住時間為下午 3 點，退房時間為上午 12 點。</li>
                        <li>如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。</li>
                        <li>請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。</li>
                        <li>若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。</li>
                        <li>請愛惜我們的房間與公共空間，並保持整潔。</li>
                        <li>如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。</li>
                        <li>我們提供免費使用的 Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。</li>
                        <li>請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。</li>
                        <li>我們提供二十四小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。</li>
                        <li>為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。</li>
                    </ol>
                </section>
            </div>
            <div class="col-md-5 d-none d-md-block">
                <div
                    class="bg-neutral-100 position-sticky p-10 rounded-3xl ms-auto
                    d-flex flex-column gap-10"
                    style="top: 160px; max-width: 478px;">
                    <h5 class="text-neutral-600 fw-bold pb-4 mb-0 border-bottom border-neutral-300">
                    預訂房型
                    </h5>
                    <div class="text-neutral-500">
                        <h2 class="fs-3 fw-bold mb-5">
                        {{ room.name }}
                        </h2>
                        <p class="fw-medium mb-0">{{ room.description }}</p>
                    </div>
                    <div>
                        <div class="d-flex flex-wrap gap-2 mb-4">
                            <div class="form-floating flex-grow-1 flex-shrink-1">
                                <input
                                    id="checkInDate" type="date"
                                    class="form-control text-neutral-600 fw-medium
                                    p-4 pt-9 border-neutral-600 rounded-3"
                                    style="min-height: 74px"
                                    placeholder="yyyy-mm-dd"
                                    :value="bookingDate.range.start"
                                    @click="showModal"
                                    readonly>
                                <label
                                    for="checkInDate"
                                    class="text-neutral-500 fw-medium"
                                    style="top: 8px; left: 8px;">
                                    入住
                                </label>
                            </div>
                            <div class="form-floating flex-grow-1 flex-shrink-1">
                                <input
                                    id="checkOutDate" type="date"
                                    class="form-control text-neutral-600 fw-medium
                                    p-4 pt-9 border-neutral-600 rounded-3"
                                    style="min-height: 74px"
                                    placeholder="yyyy-mm-dd"
                                    :value="bookingDate.range.end"
                                    @click="showModal"
                                    readonly>
                                <label
                                    for="checkOutDate"
                                    class="text-neutral-500 fw-medium"
                                    style="top: 8px; left: 8px;">
                                    退房
                                </label>                                
                            </div>
                        </div>
                        <div
                            class="text-neutral-600
                            d-flex justify-content-between align-items-center">
                            <p class="mb-0">人數</p>
                            <NumberCalculator
                                :num="bookingClientNumber" :max="maxBookingNumber"
                                @update-number="updateClientNumber" />
                        </div>
                    </div>
                    <h5 class="text-primary-600 fw-bold mb-0">
                    NT$ {{ $toThousands(room.price) }}
                    </h5>
                    <template v-if="isLoggedIn">
                        <button
                            class="btn btn-primary-600 py-4 rounded-3
                            text-neutral-100 fw-bold"
                            type="button" @click="handleBookingProcess">
                            立即預訂
                        </button>
                    </template>
                    <template v-else>
                        <NuxtLink
                            class="btn btn-primary-600 py-4 rounded-3
                            text-neutral-100 fw-bold"
                            to="/account/login">
                            請先登入
                        </NuxtLink>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <div
        class="d-md-none w-100 p-3 bg-neutral-100
        d-flex justify-content-between align-items-center
        position-fixed bottom-0">
        <template v-if="isLoggedIn">
            <template v-if="!bookingDate.range.end">
                <small class="text-neutral-500 fw-medium">NT$ {{ $toThousands(room.price) }} / 晚</small>
                <button
                    class="btn btn-primary-600 px-12 py-4 rounded-3
                    text-neutral-100 fw-bold"
                    type="button" @click="showModal">
                    查看可訂日期
                </button>
            </template>
            <template v-else>
                <div class="d-flex flex-column gap-1">
                    <small
                        class="text-neutral-500 fw-medium">
                        NT$ {{ $toThousands(room.price) }} × {{ days }} 晚 / {{ bookingClientNumber }} 人
                    </small>
                    <span class="text-neutral fs-9 fw-medium text-decoration-underline">
                    {{ bookingDate.range.start }} ～ {{ bookingDate.range.end }}
                    </span>
                </div>
                <button
                    class="btn btn-primary-600 px-12 py-4 rounded-3
                    text-neutral-100 fw-bold"
                    type="button" @click="handleBookingProcess">
                    立即預訂
                </button>
            </template>
        </template>
        <template v-else>
            <div class="w-100 d-flex justify-content-end">
                <NuxtLink
                    class="btn btn-primary-600 px-10 py-4 rounded-3
                    text-neutral-100 fw-bold"
                    to="/account/login">
                    請先登入
                </NuxtLink>
            </div>
        </template>
    </div>
</section>

<ClientOnly>
    <DatePickerModal
        ref="modal"
        :max-client-number="room.maxPeople"
        :booking-date="bookingDate"
        @confirm-date="confirmDate" />
</ClientOnly>

</div>

</template>

<style lang="scss" scoped>

.card-info { width: 97px; height: 97px; }

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

.flex-item {

  flex: 0 1 20%;

  @include media-breakpoint-down(xxl) { flex-basis: 40%; }

}

.input[type="date"] { cursor: pointer; }

</style>
