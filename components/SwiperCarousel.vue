<script setup>

import { register } from "swiper/element/bundle";

import 'swiper/css';
import 'swiper/css/pagination';

onMounted(() => register());

//

const swiper = ref(null);

const slidePrev = () => { swiper.value.swiper.slidePrev(); }

const slideNext = () => { swiper.value.swiper.slideNext(); }

</script>

<template>

<ClientOnly>
    <swiper-container ref="swiper"
        :slides-per-view="1"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="true" :pagination-clickable="true"
        :loop="true">
        <slot @slide-prev="slidePrev" @slide-next="slideNext" />
    </swiper-container>
</ClientOnly>

</template>

<style lang="scss" ascoped>

swiper-container { margin: 0 !important; }

::part(pagination) {
  
  bottom: 24px;

  @include media-breakpoint-down(md) { bottom: 12px; }

}

::part(bullet) {

  width: 32px; height: 4px;
  background-color: #F1EAE4;
  border-radius: 100px;
  opacity: 1;
  
}

::part(bullet-active) {

  width: 60px; height: 4px;
  background-color: #BF9D7D;
  border-radius: 100px;
  opacity: 1;

}

</style>
