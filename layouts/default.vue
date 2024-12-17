<script setup>

import useAuthStore from '@/stores/auth';
import useUserStore from '@/stores/user';

const authStore = useAuthStore();
const userStore = useUserStore();

if (import.meta.server) {
    
    const res = await authStore.checkAuth();

    // 回傳的是登入狀態 ( true / false )

    // 若是已經登入，則在 server 端 "只" 取得用戶的 id ( 用來渲染 NuxtLink ) 和用戶名稱

    if (res) {

        await userStore.getUserData();

    }

}

</script>

<template>

<div>
    <FrontHeader />
    <slot />
    <FrontFooter />
</div>

</template>

<style scoped></style>
