<script setup>

useHead({

    titleTemplate: (titleChunk) => {

        return titleChunk ? 
        `${titleChunk} - 享樂酒店｜Enjoyment Luxury Hotel` : '享樂酒店｜Enjoyment Luxury Hotel'

    }

})

</script>

<template>

<NuxtLayout>
    <NuxtPage />
</NuxtLayout>

</template>
