export default defineStore('user', () => {

    const config = useRuntimeConfig();

    const userData = ref({});
    const userId = ref('');
    const username = ref('');

    const getUserData = async () => {

        // console.log('執行 get user data');

        const token = useCookie('nuxt-camp-hotel-booking-auth');

        try {

            const res = await $fetch('/api/v1/user', {

                baseURL: config.public.apiUrl,
                method: 'GET',
                headers: { Authorization: token.value }
    
            });
    
            userData.value = res.result;
            
            username.value = res.result.name;
            userId.value = res.result._id;
            
        } catch (error) {

            const { message } = error.data;

            if (message) {

                throw new Error(error.data.message);

            }

            console.error(error.data);
            
        }

    };

    const updateUserData = () => {

    };

    return { userData, userId, username, getUserData, updateUserData }

});