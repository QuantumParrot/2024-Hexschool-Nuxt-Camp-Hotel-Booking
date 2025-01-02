<script setup>
</script>

<template>

<nav class="navbar navbar-expand-lg bg-primary-300">
    <div class="container-fluid px-3 py-4 px-md-20 py-md-6 gap-6">
        <NuxtLink to="/">
        <h1 class="mb-0 me-6">
            <img src="/images/logo-primary.svg" alt="Enjoyment Luxury Hotel Logo">
        </h1>
        </NuxtLink>
        <button
            class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#admin-nav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="admin-nav">
            <ul class="navbar-nav gap-6">
                <li class="nav-item">
                    <NuxtLink
                        class="nav-link fw-bold"
                        to="/admin/room">
                    房型管理
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink
                        class="nav-link fw-bold"
                        to="/admin/news">
                    消息管理
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink
                        class="nav-link fw-bold"
                        to="/admin/culinary">
                    餐廳管理
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink
                        class="nav-link fw-bold"
                        to="/admin/order">
                    訂單管理
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</nav>

</template>

<style scoped></style>