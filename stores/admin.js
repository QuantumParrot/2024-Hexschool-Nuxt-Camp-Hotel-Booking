export default defineStore('admin', () => {

    const config = useRuntimeConfig();
    
    const token = useCookie('nuxt-camp-hotel-booking-auth');

    const apiConfig = {
    
        baseURL: config.public.apiUrl,
        headers: { Authorization: token.value }

    };

    return { apiConfig }

});