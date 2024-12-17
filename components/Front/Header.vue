<script setup>

import { Icon } from '@iconify/vue';

//

import useAuthStore from '@/stores/auth';

//

defineProps({

    username: { type: String, required: true },
    userId: { type: String, required: true },

})

const { $bootstrap } = useNuxtApp();

const route = useRoute();

//

const authStore = useAuthStore();

const { isLoggedIn } = storeToRefs(authStore);
const { logout } = authStore;

// 操作 collapse

const menu = ref(null);
let menuCollapse;

onMounted(() => { menuCollapse = $bootstrap.collapse(menu.value); });

watch(() => route.name, () => { menuCollapse.hide(); })

// 監聽 scroll 事件

const isScrolled = ref(false);
const handleScroll = () => { isScrolled.value = window.scrollY > 50; }

onMounted(() => { window.addEventListener('scroll', handleScroll); });
onUnmounted(() => { window.removeEventListener('scroll', handleScroll); })

// 在特定路由下的 header 需要轉換為透明背景

const transparentBgRoute = ['index', 'rooms'];
const isTransparentRoute = computed(() => transparentBgRoute.includes(route.name));

const bgColor = computed(() => {

    if (isScrolled.value) {

        return "scrolled"

    } else {

        return isTransparentRoute.value ? "bg-transparent" : "bg-neutral-700"

    }

});

</script>

<template>

<header
    :class="bgColor"
    class="w-100 position-fixed top-0 z-3">
    <nav class="navbar navbar-expand-md px-3 py-4 px-md-20 py-md-6">
        <div class="container-fluid p-0">
            <NuxtLink class="navbar-brand p-0" to="/">
                <img src="/images/logo-white.svg" alt="LOGO" class="logo">
            </NuxtLink>
            <button
                class="navbar-toggler p-2 border-0 shadow-none text-white collapsed"
                type="button"
                data-bs-target="#navbar" data-bs-toggle="collapse"
                aria-controls="navbar" aria-expanded="false" aria-label="toggle navigation"
                @click="menuCollapse.toggle">
                <Icon
                    class="fs-1"
                    icon="mdi:close" />
                <Icon
                    class="fs-3"
                    icon="mdi:menu" />
            </button>
            <div id="navbar" class="navbar-collapse collapse" ref="menu">
                <ul class="navbar-nav gap-4 ms-auto fw-bold">
                    <li class="nav-item">
                        <NuxtLink
                            to="/rooms"
                            class="nav-link p-4 text-neutral-100">
                        客房旅宿
                        </NuxtLink>
                    </li>
                    <li class="nav-item d-none d-md-block" v-if="isLoggedIn && userId">
                        <div class="btn-group">
                            <button
                                class="nav-link p-4 d-flex gap-2 text-neutral-100"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                type="button">
                                <Icon
                                    class="fs-5"
                                    icon="mdi:account-circle-outline" />
                                {{ username }}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <NuxtLink
                                        :to="{ name: 'user-userId-profile', params: { userId } }"
                                        class="dropdown-item px-6 py-4">
                                    我的帳戶
                                    </NuxtLink>
                                </li>
                                <li>
                                    <a role="button" class="dropdown-item px-6 py-4" @click="logout">
                                    登出
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <template v-else>
                        <li class="nav-iten d-none d-md-block">
                            <NuxtLink
                                to="/account/signup"
                                class="nav-link p-4 text-neutral-100">
                            註冊
                            </NuxtLink>
                        </li>
                        <li class="nav-iten d-none d-md-block">
                          <NuxtLink
                                to="/account/login"
                                class="nav-link p-4 text-neutral-100">
                            登入
                            </NuxtLink>
                        </li>
                    </template>
                    <li class="nav-item d-md-none" v-if="isLoggedIn && userId">
                        <NuxtLink
                            :to="{ name: 'user-userId-profile', params: { userId } }"
                            class="nav-link p-4 text-neutral-100">
                        會員中心
                        </NuxtLink>
                    </li>
                    <li class="nav-item d-md-none" v-else>
                        <NuxtLink
                            to="/account/login"
                            class="nav-link p-4 text-neutral-100">
                        會員登入
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

</template>

<style lang="scss" scoped>

@include media-breakpoint-down(md) {

  // 切換 'close' 和 'menu' 兩個按鈕

  .navbar-toggler {

    z-index: 1;
    visibility: hidden;

    svg { transition: opacity .3s; }

    svg:nth-child(1) {

      position: absolute;
      top: 28px; right: 28px;
      visibility: visible;
      opacity: 1;

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

    opacity: 0;
    transition: opacity .05s;

    &.show { opacity: 1; }

  }

  .navbar-nav {

    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;

    a { width: 90dvw; }

  }

}

.logo {

  max-width: 27vw;
  height: 100%;

}

header {

  transition: background-color .3s;

  &.scrolled { background-color: #000; }

}

.dropdown-menu {
    
  border-radius: 20px;
  overflow: hidden;
  --bs-dropdown-link-hover-color: #BF9D7D;
  --bs-dropdown-link-hover-bg: #F7F2EE;
  --bs-dropdown-link-active-color: #fff;
  --bs-dropdown-link-active-bg: #BF9D7D;

}

</style>
