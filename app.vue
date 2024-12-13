<script setup>

useHead({

    titleTemplate: (titleChunk) => {

        return titleChunk ? 
        `${titleChunk} - 享樂酒店｜Enjoyment Luxury Hotel` : '享樂酒店｜Enjoyment Luxury Hotel'

    }

});

</script>

<template>

<NuxtLayout>
    <NuxtPage />
</NuxtLayout>

</template>

<style scoped>

.page-enter-active,
.page-leave-active { transition: all .5s ease; }

.page-enter-active {

  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 5; 

}

.page-enter-from, .page-leave-to {

  opacity: 0;
  filter: blur(1rem);

}

</style>
