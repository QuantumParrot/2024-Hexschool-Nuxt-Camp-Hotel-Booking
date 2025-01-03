import useAuthStore from '@/stores/auth';
import useUserStore from '@/stores/user';

export default defineNuxtRouteMiddleware(async (to, from) => {

    const requiresAuth = ['account', 'user', 'admin', 'booking'];
    
    const currentDirectory = to.path.split('/')[1];
    
    if (!requiresAuth.includes(currentDirectory)) {

       // console.log('不需驗證即可瀏覽');

       return;

    }

    //

    if (import.meta.server) return;

    //

    const authStore = useAuthStore();
    const userStore = useUserStore();

    const { isLoggedIn } = storeToRefs(authStore);
    const { userId } = storeToRefs(userStore);

    if (currentDirectory === 'account') {

        if (isLoggedIn.value) {

            if (!userId.value) { await userStore.getUserData(); }

            return navigateTo({
            
                name: 'user-userId-profile',
                params: { userId: userId.value }
            
            }, {
                
                replace: true,
                redirectCode: 302
            
            });

        }

    };

    if (currentDirectory === 'user') {

        if (isLoggedIn.value && !userId.value) {

            await userStore.getUserData();

        }

    };

    if (currentDirectory === 'booking') {

        if (!isLoggedIn.value) { return false; }

        if (!userId.value) { await userStore.getUserData(); }

    };

});