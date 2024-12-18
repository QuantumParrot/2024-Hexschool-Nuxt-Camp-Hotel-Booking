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