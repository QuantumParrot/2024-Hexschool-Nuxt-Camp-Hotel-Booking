import useUserStore from '@/stores/user';

export default defineStore("auth", () => {

    const userStore = useUserStore();
    
    const { resetUserData } = userStore;

    // composables

    const config = useRuntimeConfig();

    const { showToastAlert } = useAlert();

    const { handleAsyncError } = useErrorHandler();

    //

    const isLoggedIn = ref(false);

    const checkAuth = async () => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        if (!token.value) return;

        /***/

        if (import.meta.env.DEV) { console.log('pinia store: check auth'); }

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

        const res = await $fetch('/api/v1/user/signup', {
            
            baseURL: config.public.apiUrl,
            method: 'POST',
            body,
            onResponseError: handleAsyncError

        });

        showToastAlert({ icon: 'success', text: '註冊成功！請登入' });

        return res;

    };

    const sendLoginAuth = async (body) => {

        const res = await $fetch('api/v1/user/login', {

            baseURL: config.public.apiUrl,
            method: 'POST',
            body,
            onResponseError: handleAsyncError

        });

        const token = useCookie('nuxt-camp-hotel-booking-auth');
        token.value = res.token;

        isLoggedIn.value = true;

        showToastAlert({ icon: 'success', text: '登入成功' });

        return res.result._id;

    };

    const logout = () => {

        const token = useCookie('nuxt-camp-hotel-booking-auth');
        token.value = null;

        isLoggedIn.value = false;

        resetUserData();

        showToastAlert({ icon: 'success', text: '登出成功，期待您的再訪！' });
        navigateTo('/', { replace: true });

    };

    return { isLoggedIn, checkAuth, sendSignUpAuth, sendLoginAuth, logout }

});