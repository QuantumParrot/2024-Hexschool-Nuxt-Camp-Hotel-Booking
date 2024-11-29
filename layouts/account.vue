<script setup>

import { Icon } from '@iconify/vue';

const { $bootstrap } = useNuxtApp();

//

const menu = ref(null);
let collapse;

onMounted(() => { collapse = $bootstrap.collapse(menu.value); })
onBeforeUnmount(() => { collapse.dispose(); })

</script>

<template>

<div class="min-vh-100 bg-neutral-700">
    <header class="position-fixed bg-neutral-700 w-100 z-3">
        <nav
            class="navbar navbar-expand-md p-0
            mx-3 my-4 mx-md-20 my-md-6">
            <div class="container-fluid justify-content-between p-0">
                <RouterLink to="/" class="navbar-brand p-0">
                    <img
                        class="logo img-fluid"
                        src="/images/logo-white.svg" alt="logo">
                </RouterLink>
                <button
                    class="navbar-toggler p-2 border-0 shadow-none text-white collapsed"
                    type="button"
                    data-bs-target="#account-navbar" data-bs-toggle="collapse"
                    aria-controls="navbar" aria-expanded="false" aria-label="toggle navigation"
                    @click="collapse.toggle">
                    <Icon
                        class="fs-1"
                        icon="mdi:close" />
                    <Icon
                        class="fs-3"
                        icon="mdi:menu" />
                </button>
                <div id="account-navbar" class="collapse navbar-collapse" ref="menu">
                    <ul class="d-md-none navbar-nav gap-4 ms-auto fw-bold">
                        <li class="nav-item">
                            <NuxtLink
                                to="/rooms"
                                class="nav-link p-4 text-neutral-100">
                                客房旅宿
                            </NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink
                                to="/account/login"
                                class="nav-link p-4 text-neutral-100">
                                立即登入
                            </NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink
                                to="/rooms"
                                class="btn btn-primary-600 px-8 py-4 border-0 rounded-3
                                text-white fw-bold">
                                立即訂房
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div class="d-flex flex-column flex-md-row position-relative">
        <img
            class="d-none d-md-block min-vh-100 object-fit-cover z-1"
            style="max-width: 50%;"
            src="/images/login-hero.png"
            alt="login-hero">
        <div
            class="d-flex flex-column
            justify-content-center align-items-center flex-grow-1
            pt-18 pt-md-0">
            <picture class="w-100">
                <source
                    srcset="/images/deco-line-group-horizontal.svg"
                    media="(min-width: 576px)">
                <img
                    class="deco-line-group"
                    src="/images/deco-line-group-horizontal-sm.svg"
                    alt="deco-line-group">
            </picture>
            <main class="main z-1">
                <slot />
            </main>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.logo { max-width: 27vw; }

@include media-breakpoint-down(md) {

  header { max-height: 72px; }

  .navbar-toggler {

    z-index: 1;
    visibility: hidden;

    svg { transition: opacity .3s; }

    svg:nth-child(1) {

      position: absolute;
      top: 28px; right: 28px;

      opacity: 1;
      visibility: visible;

    }

    svg:nth-child(2) {

      opacity: 0;
      visibility: hidden;

    }

  }

  .navbar-toggler.collapsed {

    svg:nth-child(1) {

      opacity: 0;
      visibility: hidden;

    }

    svg:nth-child(2) {

      opacity: 1;
      visibility: visible;

    }

  }

  .navbar-collapse {

    min-height: 100dvh;
    background-color: #140f0a;
    position: fixed;
    inset: 0;
    overflow: hidden;

    opacity: 0;
    transition: opacity .05s;

    &.show { opacity: 1; }

    .navbar-nav {
    
      height: 100%;
      justify-content: center;
      align-items: center;
      text-align: center;

      a { width: 90dvw; }

    }

  }

}

.main {

  width: 100%;

  @include media-breakpoint-up(md) { width: auto; }

}

.deco-line-group {

  position: absolute;
  top: 192px;
  right: 0;

  @include media-breakpoint-down(md) {
    
    position: static;
    width: 100%;

  }

}

</style>
