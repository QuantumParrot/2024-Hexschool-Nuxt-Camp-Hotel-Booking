/*

使用的頁面：/account/*

這一個 middleware 是為了非登入狀態下前往會員 ( user ) 或後台 ( admin ) 時，

在客戶端提醒使用者需要重新登入而做的。

*/

import useAuthStore from '@/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {

    const { isLoggedIn } = storeToRefs(useAuthStore());
    
    const { showToastAlert } = useAlert();

    if (import.meta.server) return;

    const redirectPath = from.query.redirect && from.query.redirect.split('/')[1];

    if (!isLoggedIn.value && (redirectPath === 'user' || redirectPath === 'admin')) {

        showToastAlert({ icon: 'warning', text: '請重新登入' });

    }

});