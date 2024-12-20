<script setup>

import useAuthStore from '@/stores/auth';
import useUserStore from '@/stores/user';

const authStore = useAuthStore();
const userStore = useUserStore();

const { isLoggedIn } = storeToRefs(authStore);
const { checkAuth } = authStore;

const { userId, username } = storeToRefs(userStore);
const { getUserData } = userStore;

if (import.meta.server) {
    
    await checkAuth();

    // 若是已經登入，則在 server 端 "只" 取得用戶的 id ( 用來渲染 NuxtLink ) 和用戶名稱

    if (isLoggedIn.value) { await getUserData(); }

}

</script>

<template>

<div>
    <FrontHeader :user-id="userId" :username="username" />
    <slot />
    <FrontFooter />
</div>

</template>

<style scoped></style>
