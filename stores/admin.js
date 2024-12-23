export default defineStore('admin', () => {

    const config = useRuntimeConfig();
    
    const token = useCookie('nuxt-camp-hotel-booking-auth');

    const apiConfig = {
    
        baseURL: config.public.apiUrl,
        headers: { Authorization: token.value }

    };

    const handleResponseError = ({ response }) => {

        // console.log(response);

        if (import.meta.env.DEV) {

            const { message } = response._data;

            if (message) { console.error(message); }

            console.error(response);
        
        }

    };

    return { apiConfig, handleResponseError }

});