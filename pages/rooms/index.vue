<script setup>

import { Icon } from '@iconify/vue';

const config = useRuntimeConfig();

const { data } = await useAsyncData(() => {

    return $fetch('api/v1/rooms', {

        baseURL: config.public.apiUrl,

    });

}, {

    transform: (res) => res.result

});

</script>

<template>

<main>
    <section class="hero position-relative">
        <SwiperCarousel>
            <template v-for="(num, idx) in 5" :key="idx">
                <swiper-slide>
                <picture>
                    <source
                        srcset="/images/home-hero.png"
                        media="(min-width: 576px)">
                    <img
                        class="hero-img"
                        src="/images/home-hero-sm.png"
                        alt="hero banner">
                </picture>
                </swiper-slide>
            </template>
        </SwiperCarousel>
        <div
            class="hero-wrapper w-100
            position-absolute z-2
            d-flex flex-column flex-md-row
            justify-content-center align-items-center
            gap-10 gap-md-20">
            <div
                class="d-md-block d-flex flex-column align-items-center
                text-center text-md-start">
                <div
                    class="text-primary-600 fw-bold
                    mt-10 mt-md-0 mb-5 mb-md-10">
                    <h2 class="fw-semibold">享樂酒店</h2>
                    <h5 class="fs-7 fs-md-5 fw-semibold">Enjoyment Luxury Hotel</h5>
                </div>
                <div class="deco-line" />
            </div>
            <h1 class="text-neutral-100 fw-bold mb-0">客房旅宿</h1>
        </div>
    </section>
    <section class="bg-primary-100 py-10 py-md-30">
        <div class="container mb-md-12">
            <h4
                class="text-neutral-500 fs-8 fs-md-6 fw-bold
                mb-2 mb-md-4">
                房型選擇
            </h4>
            <h2
                class="text-primary-600 fs-1 fw-bold
                mb-10 mb-md-20">
                各種房型，任您挑選
            </h2>
            <ul class="d-flex flex-column gap-6 gap-md-12 list-unstyled">
                <template v-for="room in data" :key="room._id">
                    <li class="card flex-lg-row border-0 rounded-3xl overflow-hidden">
                        <div class="row">
                            <div class="col-lg-7">
                                <SwiperCarousel>
                                    <template v-for="(img, idx) in room.imageUrlList" :key="img">
                                        <swiper-slide>
                                            <img
                                                class="w-100 object-fit-cover"
                                                :src="img" :alt="`${room.name} - ${idx + 1}`">
                                        </swiper-slide>
                                    </template>
                                </SwiperCarousel>
                            </div>
                            <div class="col-lg-5">
                                <div class="card-body pe-md-10 py-md-10">
                                    <h3 class="card-title fs-2 fw-bold text-neutral-600">
                                    {{ room.name }}
                                    </h3>
                                    <p class="card-text fs-8 fs-md-7 fw-medium text-neutral-500
                                    mb-6 mb-md-10">{{ room.description }}</p>
                                    <ul class="d-flex gap-4 mb-6 mb-md-10 list-unstyled">
                                        <li class="card-info px-4 py-5 border border-primary-300 rounded-3">
                                            <Icon
                                                class="fs-5 text-primary-600 mb-2"
                                                icon="fluent:slide-size-24-filled"
                                                />
                                            <p class="text-neutral-500 fw-bold text-nowrap mb-0">
                                            {{ room.areaInfo }}
                                            </p>
                                        </li>
                                        <li class="card-info px-4 py-5 border border-primary-300 rounded-3">
                                            <Icon
                                                class="fs-5 text-primary-600 mb-2"
                                                icon="material-symbols:king-bed"
                                                />
                                            <p class="text-neutral-500 fw-bold text-nowrap mb-0">
                                            {{ room.bedInfo }}
                                            </p>
                                        </li>
                                        <li class="card-info px-4 py-5 border border-primary-300 rounded-3">
                                            <Icon
                                                class="fs-5 text-primary-600 mb-2"
                                                icon="ic:baseline-person"
                                                />
                                            <p class="text-neutral-500 fw-bold text-nowrap mb-0">
                                            2 - {{ room.maxPeople }} 人
                                            </p>
                                        </li>
                                    </ul>
                                    <div class="deco-line w-100 mb-6 mb-md-10" />
                                    <div
                                        class="d-flex justify-content-between align-items-center
                                        fs-7 fs-md-5 text-primary-600">
                                        <p class="fw-bold mb-0">NT$ {{ room.price }}</p>
                                        <NuxtLink
                                            :to="`/rooms/${room._id}`"
                                            class="icon-link icon-link-hover text-primary-600">
                                            <Icon class="bi fs-5" icon="mdi:arrow-right" />
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </section>
</main>

</template>

<style lang="scss" scoped>

.hero-img {

  width: 100%;
  height: 100vh;
  object-fit: cover;
  filter: brightness(40%);

}

.hero-wrapper { inset: 0; }

.hero .deco-line {

  width: 33vw;

  @include media-breakpoint-down(md) {

    width: 2px; height: 83px;
    z-index: 1;
    background-image: linear-gradient(to bottom, #BE9C7C, #FFF);
    margin-bottom: 2.5rem;

  }

}

.card-info { width: 97px; height: 97px; }

.card ::part(container) {

  --origin-width: 1000;
  --container-width: 1920;
  --percent-width: calc(var(--origin-width) / var(--container-width) * 100vw);

  max-width: var(--percent-width);

  @include media-breakpoint-down(md) {
  
    --origin-width: 1920;
    --percent-width: calc(var(--origin-width) / var(--container-width) * 95vw);

  }

}

</style>