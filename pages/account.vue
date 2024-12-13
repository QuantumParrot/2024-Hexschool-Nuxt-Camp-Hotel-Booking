<script setup>

definePageMeta({ layout: 'account' });

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
