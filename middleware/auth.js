/*

使用的頁面

/user/* || /admin/* || /account/* || /booking/confirmation/[bookingId]

*/

import useAuthStore from '@/stores/auth';
import useUserStore from '@/stores/user';

export default defineNuxtRouteMiddleware(async (to, from) => {

    const { isHydrating, payload } = useNuxtApp();

    const authStore = useAuthStore();
    const userStore = useUserStore();

    const { userId } = storeToRefs(userStore);
    const { isLoggedIn } = storeToRefs(authStore);

    if (import.meta.client && isHydrating && payload.serverRendered && isLoggedIn.value) return;

    /***/

    if (import.meta.env.DEV) { console.trace('middleware: check auth'); }

    /***/

    /* 以下程式碼只於伺服器端執行 */

    const status = await authStore.checkAuth();

    const currentDir = to.path.split('/')[1];

    if (status) {

        /* 身份驗證成功 */

        if (currentDir === 'account') {

            return navigateTo({
                
                name: 'user-userId-profile',
                params: { userId: userId.value }
            
            }, {
                
                replace: true,
                redirectCode: 302
            
            });

        }

    } else {

        /* 身份驗證失敗 */

        if (currentDir === 'user' || currentDir === 'admin') {

            return navigateTo({
                
                name: 'account-login',
                query: { redirect: to.path }
            
            }, {

                replace: true,
                redirectCode: 302

            });

        };

        if (currentDir === 'booking') {

            return navigateTo('/', { replace: true, redirectCode: 302 });

        }

    }

});