import useAuthStore from '@/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {

    const requiresAuth = ['account', 'user', 'admin', 'booking'];
    
    const currentDirectory = to.path.split('/')[1];
    
    if (!requiresAuth.includes(currentDirectory)) {

       // console.log('不需驗證即可瀏覽');

       return;

    }

    //

    const { payload } = useNuxtApp();

    const authStore = useAuthStore();

    if (import.meta.client && payload.serverRendered) return;

    if (authStore.isLoggedIn) return;

    await authStore.checkAuth();

    if (currentDirectory === 'admin' || currentDirectory === 'user') {

        if (!authStore.isLoggedIn) {

            return navigateTo({
                
                name: 'account-login',
                query: { redirect: to.path }
            
            }, {

                replace: true,
                redirectCode: 302

            });

        }

    };

});