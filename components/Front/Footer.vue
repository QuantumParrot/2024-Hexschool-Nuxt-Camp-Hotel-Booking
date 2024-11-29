<script setup>

import { Icon } from '@iconify/vue';

</script>

<template>

<footer class="py-20 pb-md-30 bg-neutral-700">
    <div class="container">
        <div
            class="d-flex flex-column flex-md-row
            justify-content-md-between align-items-md-center gap-10 gap-md-0 mb-20">
            <div>
                <img
                    class="mb-10"
                    src="/images/logo-white.svg"
                    alt="logo">
                <div class="d-flex align-items-center gap-4">
                    <a href="#" class="text-neutral-100 border rounded-circle">
                        <Icon class="p-2 fs-2" icon="bi:line" />
                    </a>
                    <a href="#" class="text-neutral-100 border rounded-circle">
                        <Icon class="p-2 fs-2" icon="mdi:instagram" />
                    </a>
                </div>
            </div>
            <div class="d-flex flex-column flex-md-row gap-4 gap-md-20">
                <address class="d-flex flex-column mb-0">
                    <p class="mb-4 mb-md-10 fw-bold text-neutral-100">
                    TEL
                    <a
                    class="d-block mt-2
                    text-neutral-300 text-decoration-none fs-8 fs-md-7 fw-normal"
                    href="tel:+886-7-1234567">+886-7-1234567</a>
                    </p>
                    <p class="mb-0 fw-bold text-neutral-100">
                    FAX
                    <a
                    class="d-block mt-2
                    text-neutral-300 text-decoration-none fs-8 fs-md-7 fw-normal"
                    href="fax:+886-7-1234567">+886-7-1234567</a>
                    </p>
                </address>
                <address class="d-flex flex-column mb-0">
                    <p class="mb-4 mb-md-10 fw-bold text-neutral-100">
                    MAIL
                    <a
                    class="d-block mt-2
                    text-neutral-300 text-decoration-none fs-8 fs-md-7 fw-normal"
                    href="mailto:elh@hexschool.com">elh@hexschool.com</a>
                    </p>
                    <p class="mb-0 fw-bold text-neutral-100">
                    WEB
                    <a
                    class="d-block mt-2
                    text-neutral-300 text-decoration-none fs-8 fs-md-7 fw-normal"
                    href="https://www.elhhexschool.com.tw/" target="_blank">
                    www.elhhexschool.com.tw
                    </a>
                    </p>
                </address>
            </div>
        </div>
        <div
            class="d-flex flex-column flex-md-row
            justify-content-md-between align-items-md-center gap-4 gap-md-0
            text-neutral-100 fs-8 fs-md-7">
            <address class="mb-0">806023 台灣高雄市新興區六角路123號</address>
            <p class="mb-0">© 享樂酒店 2024 All Rights Reserved.</p>
        </div>
    </div>
</footer>

</template>

<style scoped></style>
