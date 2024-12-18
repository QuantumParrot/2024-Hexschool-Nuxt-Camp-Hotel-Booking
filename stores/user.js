export default defineStore('user', () => {

    const config = useRuntimeConfig();

    const { showToastAlert } = useAlert();

    // get them in client-side

    const userData = ref({ address: {} });

    // get them in server-side

    const username = ref('');
    const userId = ref('');

    const getUserData = async () => {

        /***/

        if (import.meta.env.DEV) { console.trace('pinia store: get user data'); }

        /***/

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        try {

            await $fetch('/api/v1/user', {

                baseURL: config.public.apiUrl,
                method: 'GET',
                headers: { Authorization: token.value },

                onResponse({ response }) {

                    // console.log(import.meta.server ? 'server' : 'client');

                    const { result } = response._data;

                    if (import.meta.server) {

                        username.value = result.name;
                        userId.value = result._id;

                    }

                    if (import.meta.client) { userData.value = result; }

                }
    
            });
            
        } catch (error) {

            const { message } = error.data;

            if (message) {

                throw new Error(error.data.message);

            }

            console.error(error.data);
            
        }

    };

    const updateUserData = async (body) => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        try {

            const res = await $fetch('/api/v1/user', {

                baseURL: config.public.apiUrl,
                method: 'PUT',
                headers: { Authorization: token.value },
                body,

            });

            showToastAlert({ icon: 'success', text: '更新成功！' });

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

    return { userData, userId, username, getUserData, updateUserData }

});