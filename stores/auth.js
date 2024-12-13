export default defineStore("auth", () => {

    const config = useRuntimeConfig();

    const { showToastAlert } = useAlert();

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

                throw new Error(message);

            } else {

                showToastAlert({ icon: 'error', text: '出現錯誤，請稍後再試' })

                console.error(error.data);

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

            return res.result.id;

        } catch (error) {

            const { message } = error.data;

            if (message) {

                showToastAlert({ icon: 'warning', text: message });

                throw new Error(message);

            } else {

                showToastAlert({ icon: 'error', text: '出現錯誤，請稍候再試' });

                console.error(error.data);

            }

        }

    };

    const logout = () => {

        const token = useCookie('nuxt-hotel-booking-auth');
        token.value = null;

        showToastAlert({ icon: 'success', text: '登出成功，期待您的再訪！' });
        setTimeout(() => navigateTo('/'), 1500);

    };

    return { sendSignUpAuth, sendLoginAuth, logout }

});