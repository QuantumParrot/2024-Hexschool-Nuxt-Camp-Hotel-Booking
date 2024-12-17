<script setup>

import useAuthStore from '@/stores/auth';
import useUserStore from '@/stores/user';

const authStore = useAuthStore();
const userStore = useUserStore();

const { isLoggedIn } = storeToRefs(authStore);
const { userId, username } = storeToRefs(userStore);

if (import.meta.server) { authStore.checkAuth(); }

onMounted(() => {

    if (isLoggedIn.value) { userStore.getUserData(); }

})

</script>

<template>

<div>
    <FrontHeader :user-id="userId" :username="username" />
    <slot />
    <FrontFooter />
</div>

</template>

<style scoped></style>
