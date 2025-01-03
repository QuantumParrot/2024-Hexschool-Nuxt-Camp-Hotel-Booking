<script setup>

const event = useRequestEvent();

definePageMeta({ layout: false });

setResponseStatus(event, 404);

</script>

<template>

<main class="bg-neutral-500 text-neutral-300 pt-10 pt-md-30 text-center">
    <h1 class="display-1 fw-bold">404 Not Found</h1>
    <hr class="my-10 opacity-100 text-neutral-300">
    <p>找不到您請求的網頁，請確認網址是否輸入正確</p>
    <NuxtLink to="/" class="text-info-300 fw-medium" replace>回首頁</NuxtLink>
</main>

</template>

<style scoped>

main { height: 100dvh; }

</style>
