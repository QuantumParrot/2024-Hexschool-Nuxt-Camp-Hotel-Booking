<script setup>

import useUserStore from '@/stores/user';

const userStore = useUserStore();

const route = useRoute();

onMounted(() => {

    /* 處理無畫面渲染的路由 */

    if (route.name === 'user' || route.name === 'user-userId') {

        if (userStore.userId) {

            return navigateTo({

                name: 'user-userId-profile',
                params: { userId: userStore.userId }

            }, {

                replace: true,
                redirectCode: 302

            });

        }

        return navigateTo('/');

    }

});

</script>

<template>

<div>
    <ClientOnly>
        <NuxtPage />
    </ClientOnly>
</div>

</template>

<style scoped></style>
