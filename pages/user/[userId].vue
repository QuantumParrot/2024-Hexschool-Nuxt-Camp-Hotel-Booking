<script setup>

definePageMeta({ middleware: 'auth' });

//

import useAuthStore from '@/stores/auth';
import useUserStore from '@/stores/user';

// composables

const router = useRouter();

const route = useRoute();

// pinia

const { userId, username } = storeToRefs(useUserStore());

const { logout } = useAuthStore();

//

onMounted(() => {

    if (route.name === 'user-userId') {
        
        router.replace({

            name: 'user-userId-profile',
            params: { userId }
            
        });
    
    };

});

</script>

<template>

<main class="pt-18 pt-md-30 bg-neutral-700">
    <section class="position-relative">
        <picture>
            <source
                srcset="/images/profile-hero.png"
                media="(min-width: 576px)">
            <img
                class="w-100 object-fit-cover"
                style="height: 384px;"
                src="/images/profile-hero-sm.png">
        </picture>
        <div class="container">
            <div
                class="hero-content
                d-flex flex-column flex-md-row justify-content-center justify-content-md-start
                align-items-md-center gap-4 gap-md-6 mx-5 my-10 m-md-0">
                <img class="avatar" src="/images/avatar-6.png" alt="avatar">
                <div class="w-100 d-flex justify-content-between gap-4">
                    <h2 class="h1 text-neutral-100 fw-bold mb-0">Hello，{{ username || '訪客' }}</h2>
                    <button
                        class="d-md-none align-self-stretch btn btn-primary-600
                        text-neutral-100"
                        type="button" @click="logout">
                        登出
                    </button>
                </div>
            </div>
        </div>
    </section>
    <section class="py-10 pt-md-20 pb-md-30">
        <div class="container">
            <ul class="nav mb-10 mb-md-20 fw-bold">
                <li class="nav-item">
                    <NuxtLink
                        :to="`/user/${userId}/profile`"
                        exact-active-class="text-primary-600"
                        class="nav-link px-6 py-4 text-white position-relative">
                        個人資料
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink
                        :to="`/user/${userId}/order`"
                        exact-active-class="text-primary-600"
                        class="nav-link px-6 py-4 text-white position-relative">
                        我的訂單
                    </NuxtLink>
                </li>
            </ul>
            <NuxtPage />
        </div>
    </section>
    <picture>
        <source
            srcset="/images/deco-line-group-horizontal-full.svg"
            media="(min-width: 576px)">
        <img
            class="w-100"
            src="/images/deco-line-group-horizontal-sm.svg" alt="deco-line-group">
    </picture>
</main>

</template>

<style lang="scss" scoped>

.hero-content {

  position: absolute;
  top: 0;
  bottom: 0;

  @include media-breakpoint-down(md) { inset: 0; }

}

.avatar {

  width: 144px; height: 144px;

  @include media-breakpoint-down(md) { width: 72px; height: 72px; }

}

.nav-link.text-primary-600::after {

  content: '';

  position: absolute;
  right: 0; left: 0;

  display: block;
  width: 2rem;
  margin: 0.5rem auto 0 auto;

  border-color: currentColor;
  border-bottom: 4px solid;
  border-radius: 10px;

}

</style>
