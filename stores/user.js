export default defineStore('user', () => {

    const config = useRuntimeConfig();

    const { handleAsyncError } = useErrorHandler();

    //

    const userData = ref({ address: {} });

    const username = ref('');
    const userId = ref('');

    const getUserData = async () => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        /***/

        if (import.meta.env.DEV) { console.trace('pinia store: get user data'); }

        /***/

        return await $fetch('/api/v1/user', {

            baseURL: config.public.apiUrl,
            method: 'GET',
            headers: { Authorization: token.value },

            onResponse({ response }) {

                if (response.ok) {

                    const { result } = response._data;
                    
                    userData.value = result;
                    
                    userId.value = result._id;
                    username.value = result.name;

                }

            },

            onResponseError: handleAsyncError

        });

    };

    const updateUserData = async (body) => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        return await $fetch('/api/v1/user', {

            baseURL: config.public.apiUrl,
            method: 'PUT',
            headers: { Authorization: token.value },
            body,

            onResponseError: handleAsyncError

        });

    };

    const resetUserData = () => {

        userData.value = { address: {} }

    }

    return { userData, userId, username, getUserData, updateUserData, resetUserData }

});