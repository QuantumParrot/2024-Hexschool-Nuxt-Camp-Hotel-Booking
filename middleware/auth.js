/*

使用的頁面：/user/* || /admin/* || /account/*

*/

import useAuthStore from '@/stores/auth';
import useUserStore from '@/stores/user';

export default defineNuxtRouteMiddleware(async (to, from) => {

    // console.trace('middleware: check auth');

    const { isHydrating, payload } = useNuxtApp();

    const authStore = useAuthStore();
    const userStore = useUserStore();

    const { userId } = storeToRefs(userStore);

    if (import.meta.client && isHydrating && payload.serverRendered) return;

    /* 以下程式碼只於伺服器端執行 */

    const status = await authStore.checkAuth();

    const currentDir = to.path.split('/')[1];

    if (status) {

        /* 身份驗證成功 */

        if (currentDir !== 'user') {
            
            await userStore.getUserData();

            // 因為 /user/* 頁面同時包含了 default 的 layout

            // 該元件本身就會執行一次 checkAuth --> getUserData 的流程
            
            // 所以不需要再執行ㄧ次
        
        } 

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

        }

    }

});