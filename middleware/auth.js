/*

使用的頁面：/user/* || /admin/* || /account/*

*/

import useAuthStore from '@/stores/auth';
import useUserStore from '@/stores/user';

export default defineNuxtRouteMiddleware(async (to, from) => {

    const authStore = useAuthStore();
    const userStore = useUserStore();

    const { isHydrating, payload } = useNuxtApp();

    const { userId } = storeToRefs(userStore);

    if (import.meta.client && isHydrating && payload.serverRendered) return;

    const status = await authStore.checkAuth();

    const currentPath = to.path.split('/')[1];

    if (status) {

        /* 身份驗證成功 */

        await userStore.getUserData();

        if (currentPath === 'account') {

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

        if (currentPath === 'user' || currentPath === 'admin') {

            return navigateTo({
                
                name: 'account-login',
                query: { redirect: to.path }
            
            }, {

                replace: true,
                redirectCode: 302

            });

        }

    }

});