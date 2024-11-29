<script setup>

definePageMeta({ layout: 'account' });

//

const route = useRoute();

onMounted(() => {

    if (route.name === 'account') { navigateTo({ name: 'account-login' }); }

});

</script>

<template>

<NuxtPage />

</template>

<style scoped></style>
