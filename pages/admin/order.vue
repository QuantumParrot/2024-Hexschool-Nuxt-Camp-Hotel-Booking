<script setup>

import { Icon } from '@iconify/vue';

import useAdminStore from '@/stores/admin';
import useBookingStore from '@/stores/booking';

const adminStore = useAdminStore();
const bookingStore = useBookingStore();

const { orderDataRaw } = storeToRefs(adminStore);
const { apiConfig } = adminStore;

const { discountPrice } = bookingStore;

//

const { $toThousands, $dateformat } = useNuxtApp();

const { getDays } = useCalculator();
const { showToastAlert, showConfirmAlert } = useAlert();

//

const { data:orders, execute } = await useAsyncData('get-orders', () => {

    return $fetch('/api/v1/admin/orders', {
        
        ...apiConfig,

        onResponse: ({ response }) => {

            // console.log(response);

            if (response.ok) {

                adminStore.$patch({ orderDataRaw: response._data.result })

            } else {

                if (import.meta.env.DEV && message) {
                    
                    console.error(response._data.message);
                    console.error(response);
                
                }

            }

        },
    
    });

}, {

    immediate: false,
    transform: (res) => {
        
        return res.result.reverse().map(order => {

            const days = getDays(order.checkInDate, order.checkOutDate);

            return {
                
                ...order, days,
                total: order.roomId.price * days - discountPrice, 
                
            }

        })
    
    }

});

onMounted(() => {

    if (!orderDataRaw.value.length) { execute(); }

});

//

const filters = reactive({

    all: (orders) => orders,
    isConfirmed: (orders) => orders.filter(o => o.status !== -1),
    isCancelled: (orders) => orders.filter(o => o.status === -1),

});

const filter = ref('isConfirmed');

const filteredOrders = computed(() => {

    if (!orders.value) return;

    return filters[filter.value](orders.value);

});

//

const orderTemp = ref({});

const modal = ref(null);

const openModal = (id) => {

    orderTemp.value = orders.value.find(order => order._id === id);

    // console.log(orderTemp.value);

    modal.value.showModal();

};

//

const isPending = ref(false);

const cancelOrder = async (id) => {

    if (isPending.value) return;

    isPending.value = true;

    try {

        return await $fetch(`/api/v1/admin/orders/${id}`, {

            ...apiConfig, method: 'DELETE',

        });
        
    } catch (error) {

        if (import.meta.env.DEV) { console.error(error); }

        return error.data;
        
    } finally {

        isPending.value = false;

    }

};

const handleDeleteProcess = () => {

    if (orderTemp.value.status === -1) return;

    showConfirmAlert({

        icon: 'warning',
        iconColor: '#DA3E51',
        title: '確定刪除這筆訂單？',
        showCancelButton: true,
        cancelButtonColor: '#DA3E51',
        confirmButtonText: '是', cancelButtonText: '否',

    }).then(async (result) => {

        if (result.isConfirmed) {

            const res = await cancelOrder(orderTemp.value._id);

            if (res.status) {

                showToastAlert({ icon: 'success', text: '刪除成功' });
                
                refreshNuxtData('get-orders');

            } else {

                showToastAlert({ icon: 'warning', text: res.message });

            }

            modal.value.hideModal();
            orderTemp.value = {};

        }

    });

};

</script>

<template>

<div>
    <h2 class="fs-3 fw-bold text-primary-600 mb-10">訂單管理</h2>
    <ul class="list-unstyled d-flex gap-3">
        <li>
            <button
                type="button"
                class="btn btn-outline-neutral-600"
                :class="{ 'active pe-none': filter === 'isConfirmed' }"
                @click="filter = 'isConfirmed'">
                已預訂
            </button>
        </li>
        <li>
            <button
                type="button"
                class="btn btn-outline-neutral-600"
                :class="{ 'active pe-none': filter === 'isCancelled' }"
                @click="filter = 'isCancelled'">
                已取消
            </button>
        </li>
        <li>
            <button
                type="button"
                class="btn btn-outline-neutral-600"
                :class="{ 'active pe-none': filter === 'all' }"
                @click="filter = 'all'">
                全部
            </button>
        </li>
    </ul>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr class="text-nowrap">
                    <th scope="col" width="15%">預訂日期</th>
                    <th scope="col" width="15%">預訂客戶</th>
                    <th scope="col" width="15%"
                        class="d-none d-md-table-cell">
                        預訂房型
                    </th>
                    <th scope="col" width="10%"
                        class="text-center">
                        預訂細節
                    </th>
                    <th scope="col" width="25%"
                        class="d-none d-md-table-cell text-center">
                        住宿期間
                    </th>
                    <th scope="col" width="10%"
                        class="text-end">
                        預訂金額
                    </th>
                    <th scope="col" width="10%"
                        class="text-center">
                        預訂狀態
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="order in filteredOrders" :key="order._id">
                    <tr class="align-middle">
                        <td>{{ $dateformat(order.createdAt) }}</td>
                        <td>{{ order.userInfo?.name }}</td>
                        <td class="d-none d-md-table-cell">
                            {{ order.roomId?.name }}
                        </td>
                        <td class="text-center">
                            <button
                                class="btn btn-sm btn-outline-primary-600
                                align-middle"
                                @click="openModal(order._id)">
                                <Icon class="fs-6" icon="mdi:drive-document" />
                            </button>
                        </td>
                        <td class="d-none d-md-table-cell text-center">
                            {{ $dateformat(order.checkInDate) }} ～ {{ $dateformat(order.checkOutDate) }}
                        </td>
                        <td class="text-end fw-bold">{{ $toThousands(order.total) }}</td>
                        <td class="text-center" :class="order.status !== -1 ? 'text-success' : 'text-danger'">
                            {{ order.status !== -1 ? '已預訂' : '已取消' }}
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    <ClientOnly>
    <AdminDetailModal ref="modal">
        <ul>
            <li class="mb-5">
                <h5 class="fs-6 fw-bold mb-5">預訂日期</h5>
                {{ $dateformat(orderTemp.createdAt, 'YYYY 年 MM 月 DD 日 （ dddd ） HH:mm:ss') }}
            </li>
            <li class="mb-5">
                <h5 class="fs-6 fw-bold mb-5">預訂資訊</h5>
                <div class="alert bg-neutral-300 mb-0">
                    <p><b>房型：</b>{{ orderTemp.roomId?.name }}</p>
                    <p><b>人數：</b>{{ orderTemp.peopleNum }}</p>
                    <p class="mb-0">
                    <b>預定住宿期間：</b>
                    {{ $dateformat(orderTemp.checkInDate) }} ～ {{ $dateformat(orderTemp.checkOutDate) }}（ {{ orderTemp.days }} 晚 ）
                    </p>
                </div>
            </li>
            <li class="mb-5">
                <h5 class="fs-6 fw-bold mb-5">客戶資訊</h5>
                <ul class="d-flex flex-column gap-3 list-unstyled">
                    <li><b>姓名：</b>{{ orderTemp.userInfo?.name }}</li>
                    <li><b>聯絡電話：</b>{{ orderTemp.userInfo?.phone }}</li>
                    <li><b>電子信箱：</b>{{ orderTemp.userInfo?.email }}</li>
                    <li><b>聯絡地址：</b>{{ orderTemp.userInfo?.address?.zipcode }} {{ orderTemp.userInfo?.address?.detail }}</li>
                </ul>
            </li>
        </ul>
        <template #footer>
            <div class="modal-footer" v-show="orderTemp.status !== -1">
                <button
                    type="button" class="btn px-6 btn-outline-neutral-600"
                    @click="handleDeleteProcess"
                    :disabled="isPending || orderTemp.status === -1">
                    取消這筆訂單
                </button>
            </div>
        </template>
    </AdminDetailModal>
    </ClientOnly>
</div>

</template>

<style scoped></style>
