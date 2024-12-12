<script setup></script>

<template>

<div
    class="loading-modal-backdrop position-fixed z-3
    d-flex justify-content-center align-items-center px-3">
    <div
        class="loading-modal w-100 h-50 bg-neutral-100 rounded-4
        d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex gap-6 mb-12">
            <div
                class="spinner-grow bg-primary-600"
                style="--bs-spinner-animation-speed: 1s"
                role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div
                class="spinner-grow bg-primary-500"
                style="--bs-spinner-animation-speed: 1.5s"
                role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div
                class="spinner-grow bg-primary-400"
                style="--bs-spinner-animation-speed: 2s"
                role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <img
            class="mb-8"
            style="max-width: 144px;"
            src="/images/logo-primary.svg" alt="logo">
        <slot />
    </div>
</div>

</template>

<style lang="scss" scoped>

.loading-modal-backdrop {

  inset: 0;
  background-color: #0005;
  backdrop-filter: blur(10px);

}

.loading-modal { max-width: 1020px; }

</style>