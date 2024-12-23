<script setup>

definePageMeta({ layout: 'admin', middleware: ['auth'] });

//

useSeoMeta({ title: '後台管理' });

</script>

<template>

<main class="container-fluid pt-md-18 px-md-20 pt-8 px-10">
    <NuxtPage />
</main>

</template>

<style scoped></style>
