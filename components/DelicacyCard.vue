<script setup>

defineProps({

    title: String, description: String, diningTime: String,

});

</script>

<template>

<div class="col-10 col-md-6 col-xl-4">
    <div class="card border-0 rounded-3 position-relative">
        <picture>
            <slot name="image" />
        </picture>
        <div
            class="card-body p-4 p-md-6 rounded-bottom-3 position-absolute bottom-0
            text-neutral-100">
            <div class="d-flex justify-content-between align-items-center mb-4 mb-md-6">
                <h5 class="fw-bold">{{ title }}</h5>
                <div
                    class="d-flex justify-content-between gap-4
                    text-neutral-300 fs-8 fs-md-7">
                    <span class="fw-bold">{{ diningTime }}</span>
                </div>
            </div>
            <p class="card-text fs-8 fs-md-7">
            {{ description }}
            </p>
        </div>
    </div>            
</div>

</template>

<style scoped>

.card-body {

  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #140F0A 77.6%);
  backdrop-filter: blur(10px);

}

</style>
