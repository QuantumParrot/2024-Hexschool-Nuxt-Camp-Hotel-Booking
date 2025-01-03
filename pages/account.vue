<script setup>

import useAuthStore from '@/stores/auth';

definePageMeta({
    
    layout: 'account',
    
    middleware: [
        (to, from) => {

            if (import.meta.server) return;

            const { showToastAlert } = useAlert();
            const { isLoggedIn } = storeToRefs(useAuthStore());

            const redirectPath = from.query.redirect && from.query.redirect.split('/')[1];

            if (!isLoggedIn.value && (redirectPath === 'user' || redirectPath === 'admin')) {

                showToastAlert({ icon: 'warning', text: '請重新登入' });

            }

        }
    ]

});

const route = useRoute();

onMounted(() => {

    /* 處理無畫面渲染的路由 */

    if (route.name === 'account') {
        
        navigateTo('account/login', {
            
            replace: true,
            redirectCode: 302
    
        });

    }

});

</script>

<template>

<div>
    <NuxtPage />
</div>

</template>

<style scoped></style>
