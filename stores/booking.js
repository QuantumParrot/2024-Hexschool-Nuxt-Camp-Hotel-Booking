export default defineStore('booking', () => {

    const config = useRuntimeConfig();
    const { showToastAlert } = useAlert();

    const discountPrice = ref(1000);

    const orderTemplate = ref({ 

        userInfo: {
            address: {}
        }
    
    });

    const orderRecords = ref([]);

    const cretateOrder = async (body) => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        try {

            return await $fetch(`/api/v1/orders`, {

                baseURL: config.public.apiUrl,
                method: 'POST',
                headers: { Authorization: token.value },
                body

            });
            
        } catch (error) {

            const { message } = error.data;

            if (message) {

                showToastAlert({ icon: 'warning', text: message });

            } else {

                showToastAlert({ icon: 'error', text: '出現錯誤，請稍後再試' });

            }
            
        }

    };

    const getOrder = async (id) => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        try {

            return await $fetch(`/api/v1/orders/${id}`, {

                baseURL: config.public.apiUrl,
                method: 'GET',
                headers: { Authorization: token.value }

            });

        } catch (error) {

            const { message } = error.data;

            if (message) {

                showToastAlert({ icon: 'warning', text: message });

            } else {

                showToastAlert({ icon: 'error', text: '出現錯誤，請稍後再試' });

            }

        }

    };

    const getOrders = async () => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        try {

            const res = await $fetch('/api/v1/orders', {

                baseURL: config.public.apiUrl,
                method: 'GET',
                headers: { Authorization: token.value }

            });

            return res.result.filter(order => order.status !== -1).reverse();
            
        } catch (error) {

            // console.log(error);

            const { message } = error.data;

            if (message) {

                showToastAlert({ icon: 'warning', text: message });

            } else {

                showToastAlert({ icon: 'error', text: '出現錯誤，請稍後再試' });

            }
            
        }

    };

    const cancelOrder = async (id) => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        try {

            const res = await $fetch(`/api/v1/orders/${id}`, {

                baseURL: config.public.apiUrl,
                method: 'DELETE',
                headers: { Authorization: token.value }

            });

            showToastAlert({ 'icon': 'success', text: '預訂已取消' });

            return res;
            
        } catch (error) {

            const { message } = error.data;

            if (message) {

                showToastAlert({ icon: 'warning', text: message });

            } else {

                showToastAlert({ icon: 'error', text: '出現錯誤，請稍後再試' });

            }

            return error.data;
           
        }

    };

    return {
        
        discountPrice, orderTemplate, orderRecords,
        cretateOrder, getOrder, getOrders, cancelOrder
    
    }

});