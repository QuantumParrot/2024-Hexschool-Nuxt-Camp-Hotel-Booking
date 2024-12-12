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

            } else {

                showToastAlert({ icon: 'error', text: '出現錯誤，請稍後再試' })

            }

            throw new Error(error);
            
        }

    };

    const sendLoginAuth = async (body) => {


    };

    return { sendSignUpAuth, sendLoginAuth }

});