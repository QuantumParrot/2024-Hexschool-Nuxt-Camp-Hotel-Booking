export default defineStore('admin', () => {

    const config = useRuntimeConfig();
    
    const token = useCookie('nuxt-camp-hotel-booking-auth');

    const apiConfig = {
    
        baseURL: config.public.apiUrl,
        headers: { Authorization: token.value }

    };

    const roomDataRaw = ref([]);

    const newsDataRaw = ref([]);

    const culinaryDataRaw = ref([]);

    const orderDataRaw = ref([]);

    return { apiConfig, roomDataRaw, newsDataRaw, culinaryDataRaw, orderDataRaw }

});