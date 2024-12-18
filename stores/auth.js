export default defineStore("auth", () => {

    // composables

    const config = useRuntimeConfig();

    const { showToastAlert } = useAlert();

    //

    const isLoggedIn = ref(false);

    const checkAuth = async () => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        if (!token.value) return;

        /***/

        if (import.meta.env.DEV) { console.trace('pinia store: check auth'); }

        /***/

        try {

            const res = await $fetch('/api/v1/user/check', {

                baseURL: config.public.apiUrl,
                method: 'GET',
                headers: { Authorization: token.value }

            });

            isLoggedIn.value = true;

            return res.status;

        } catch (error) { isLoggedIn.value = false; }

    };

    const sendSignUpAuth = async (body) => {

        // console.log(body);

        try {

            const res = await $fetch('/api/v1/user/signup', {
                
                baseURL: config.public.apiUrl,
                method: 'POST',
                body,

            });

            showToastAlert({ icon: 'success', text: '註冊成功！請登入' });

            return res;
            
        } catch (error) {

            const { message } = error.data

            if (message) {

                showToastAlert({ icon: 'warning', text: message });

                // throw new Error(message);

            } else {

                showToastAlert({ icon: 'error', text: '出現錯誤，請稍後再試' })

                // console.error(error.data);

            }
            
        }

    };

    const sendLoginAuth = async (body) => {

        try {

            const res = await $fetch('api/v1/user/login', {

                baseURL: config.public.apiUrl,
                method: 'POST',
                body,

            });

            const token = useCookie('nuxt-camp-hotel-booking-auth');

            token.value = res.token;

            showToastAlert({ icon: 'success', text: '登入成功' });

            isLoggedIn.value = true;

            return res.result._id;

        } catch (error) {

            const { message } = error.data;

            if (message) {

                showToastAlert({ icon: 'warning', text: message });

                // throw new Error(message);

            } else {

                showToastAlert({ icon: 'error', text: '出現錯誤，請稍候再試' });

                // console.error(error.data);

            }

        }

    };

    const logout = () => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');
        token.value = null;

        isLoggedIn.value = false;

        showToastAlert({ icon: 'success', text: '登出成功，期待您的再訪！' });
        navigateTo('/', { replace: true });

    };

    return { isLoggedIn, checkAuth, sendSignUpAuth, sendLoginAuth, logout }

});