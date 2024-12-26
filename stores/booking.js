export default defineStore('booking', () => {

    const config = useRuntimeConfig();

    const { handleAsyncError } = useErrorHandler();

    //

    const discountPrice = ref(1000);

    const orderTemplate = ref({ 

        userInfo: {
            address: {}
        }
    
    });

    const orderRecords = ref([]);

    const cretateOrder = async (body) => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        return await $fetch(`/api/v1/orders`, {

            baseURL: config.public.apiUrl,
            method: 'POST',
            headers: { Authorization: token.value },
            body,

            onResponseError: handleAsyncError,

        });

    };

    const getOrder = async (id) => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        return await $fetch(`/api/v1/orders/${id}`, {

            baseURL: config.public.apiUrl,
            method: 'GET',
            headers: { Authorization: token.value },

            onResponseError: handleAsyncError,

        });

    };

    const getOrders = async () => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        const res = await $fetch('/api/v1/orders', {

            baseURL: config.public.apiUrl,
            method: 'GET',
            headers: { Authorization: token.value },

            onResponseError: handleAsyncError,

        });

        return res.result.filter(order => order.status !== -1).reverse();

    };

    const cancelOrder = async (id) => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        return await $fetch(`/api/v1/orders/${id}`, {

            baseURL: config.public.apiUrl,
            method: 'DELETE',
            headers: { Authorization: token.value },

            onResponseError: handleAsyncError,

        });

    };

    return {
        
        discountPrice, orderTemplate, orderRecords,
        cretateOrder, getOrder, getOrders, cancelOrder
    
    }

});