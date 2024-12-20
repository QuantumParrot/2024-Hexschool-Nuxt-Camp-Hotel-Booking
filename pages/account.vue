<script setup>

import useAuthStore from '@/stores/auth';

definePageMeta({
    
    layout: 'account',
    
    middleware: [
        'auth',
        (to, from) => {

            if (import.meta.server) return;

            const { showToastAlert } = useAlert();
            const { isLoggedIn } = storeToRefs(useAuthStore());

            const redirectPath = from.query.redirect && from.query.redirect.split('/')[1];

            if (!isLoggedIn.value && (redirectPath === 'user' || redirectPath === 'admin')) {

                showToastAlert({ icon: 'warning', text: '請重新登入' });

            }

        },
    ]

});

//

const route = useRoute();

onMounted(() => {

    if (route.name === 'account') { navigateTo({ name: 'account-login' }); }

});

</script>

<template>

<div>
    <NuxtPage />
</div>

</template>

<style scoped></style>
