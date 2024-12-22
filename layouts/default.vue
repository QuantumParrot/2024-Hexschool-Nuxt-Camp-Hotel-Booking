<script setup>

import useAuthStore from '@/stores/auth';
import useUserStore from '@/stores/user';

const authStore = useAuthStore();
const userStore = useUserStore();

const { isLoggedIn } = storeToRefs(authStore);
const { checkAuth } = authStore;

const { userId, username } = storeToRefs(userStore);
const { getUserData } = userStore;

if (import.meta.server) { await checkAuth(); }

onMounted(async () => {

    if (isLoggedIn.value && !userId.value) { await getUserData(); }

});

</script>

<template>

<div>
    <FrontHeader :user-id="userId" :username="username" />
    <slot />
    <FrontFooter />
</div>

</template>

<style scoped></style>
