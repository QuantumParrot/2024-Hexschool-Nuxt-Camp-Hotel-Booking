<script setup>

import { Icon } from '@iconify/vue';

const { payload } = useNuxtApp();

//

const isHeroLoading = ref(true);

//

const config = useRuntimeConfig();

const handleAsyncError = (error) => {

    // 給開發者看的錯誤訊息

    if (!import.meta.env.DEV) return;

    if (error.response._data) {

        console.error(error.response._data.message);
        console.error(error.response);

    } else {
      
        console.error(error);
    
    }

}

const { data, refresh } = await useAsyncData("hotelInfo", async () => {

    return await Promise.allSettled([

        $fetch(`/api/v1/home/news`, {

          baseURL: config.public.apiUrl,
          onResponseError: handleAsyncError

        }),
        $fetch(`/api/v1/home/culinary`, {

          baseURL: config.public.apiUrl,
          onResponseError: handleAsyncError

        }),
        $fetch(`/api/v1/rooms`, {

          baseURL: config.public.apiUrl,
          onResponseError: handleAsyncError

        })

    ])

}, {

    transform: (resArr) => {

        // console.log('response-array', resArr);

        return resArr.map(res => res.value.status ? res.value.result : [])

    },

});

const [ news, culinary, rooms ] = toRefs(data.value || []);

onMounted(() => {

    if (!payload.serverRendered['hotelInfo']) { refresh(); }

});

// 在首頁隨機顯示其中一種房型

const pickup = ref({});

const getRandomRoom = () => {

    return Math.floor(Math.random() * rooms.value.length);

}

onMounted(() => {

    if (Array.isArray(rooms.value) && rooms.value.length) {

        const randomIndex = getRandomRoom();
        pickup.value = rooms.value[randomIndex];

    }

});

</script>

<template>

<main class="overflow-hidden">

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
                        alt="hero banner"
                        @load="isHeroLoading = false">
                </picture>
                </swiper-slide>
            </template>
        </SwiperCarousel>
        <div
            class="hero-wrapper w-100 px-md-20
            position-absolute z-2
            d-flex flex-column flex-md-row 
            justify-content-center justify-content-md-between align-items-center
            gap-md-10">
            <template v-if="!isHeroLoading">
                <div
                    class="d-md-block d-flex flex-column align-items-center
                    text-center text-md-start">
                    <div class="mt-10 mt-md-0 mb-5 mb-md-10 text-primary-600 fw-bold">
                        <h2>享樂酒店</h2>
                        <h5 class="fs-7 fs-md-5 mb-0">Enjoyment Luxury Hotel</h5>
                    </div>
                    <div class="deco-line" />
                </div>
                <div class="hero-intro">
                    <div class="hero-intro-content">
                        <h1 class="text-white fw-bold text-nowrap mb-6">
                        高雄<br>豪華住宿之選
                        </h1>
                        <p class="text-neutral-100 fw-semibold">我們致力於為您提供無與倫比的奢華體驗與優質服務</p>
                        <NuxtLink
                            to="/rooms"
                            class="cta-btn btn w-100 btn-neutral-100 border-0
                            d-flex justify-content-end align-items-center gap-3
                            text-end fs-5 fw-semibold">
                            立即訂房
                            <div class="cta-deco" />
                        </NuxtLink>
                    </div>
                </div>
            </template>
            <div class="w-100 h-100 d-flex justify-content-center align-items-center gap-4" v-else>
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
        </div>
    </section>

    <section class="news bg-primary-100 py-20 py-md-30">
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <div class="mb-10 mb-md-0">
                        <h2 class="fs-1 fw-bold text-primary-600 mb-6 mb-md-10">
                        最新<br>消息
                        </h2>
                        <div class="deco-line" />
                    </div>
                </div>
                <div class="col-md-10 d-flex flex-column gap-10">
                    <div
                        class="card bg-transparent border-0"
                        v-for="item in news" :key="item._id">
                        <div class="d-flex flex-column flex-md-row align-items-center gap-6">
                            <picture>
                                <source
                                    :srcset="item.image"
                                    media="(min-width: 576px)">
                                <img
                                    :src="item.image"
                                    :alt="item.title"
                                    class="w-100 rounded-3">
                            </picture>
                            <div class="card-body p-0">
                                <h3 class="card-title fw-bold mb-2 mb-md-6">
                                {{ item.title }}
                                </h3>
                                <p class="card-text text-neutral-500 fs-8 fs-md-7 fw-medium">
                                {{ item.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="about bg-neutral-700 py-20 py-md-30">
        <div class="container p-0">
            <div
                class="about-content p-6 p-md-20 mt-10 ms-10 me-5 mt-md-20 mx-md-auto
                text-neutral-100">
                <div class="d-flex align-items-center gap-10 mb-10 mb-md-20">
                    <h2 class="fs-1 fw-bold mb-0">
                    關於<br>我們
                    </h2>
                    <div class="deco-line" />
                </div>
                <div class="d-flex flex-column gap-4 gap-md-10 fw-medium">
                    <p class="mb-0 fs-8 fs-md-7">
                    享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。
                    <br>
                    我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。
                    </p>
                    <p class="mb-0 fs-8 fs-md-7">
                    我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。
                    <br>
                    我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。 
                    </p>
                    <p class="mb-0 fs-8 fs-md-7">
                    在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。
                    </p>
                    <p class="mb-0 fs-8 fs-md-7">
                    享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
                    </p>
                </div>
            </div>
        </div>
    </section>
    
    <section
        class="room-intro position-relative bg-neutral-700 
        px-3 px-md-0 tpy-20 py-md-30">
        <div
            class="d-flex flex-column flex-md-row
            justify-content-center justify-content-md-start
            align-items-center align-items-md-end gap-6 gap-md-20">
            <SwiperCarousel
                v-slot="{ onSlidePrev, onSlideNext }">
                <template v-for="(num, idx) in 5" :key="idx">
                    <swiper-slide>
                    <picture>
                        <source
                            :srcset="`/images/home-room-1.png`"
                            media="(min-width:768px)">
                        <img
                            class="w-100 object-fit-cover"
                            :src="`/images/home-room-sm-1.png`"
                            alt="room-a">
                    </picture>
                    </swiper-slide>
                </template>
                <Teleport to="#swiper-nav">
                    <button
                        class="bg-transparent text-primary-600 border-0
                        icon-link icon-link-hover"
                        type="button"
                        @click="onSlidePrev">
                        <Icon class="arrow-icon bi m-4" style="--bs-icon-link-transform: translateX(-0.25em);"
                        icon="mdi:arrow-left" />
                    </button>
                    <button
                        class="bg-transparent text-primary-600 border-0
                        icon-link icon-link-hover"
                        type="button"
                        @click="onSlideNext">
                        <Icon class="arrow-icon bi m-4"
                        icon="mdi:arrow-right" />
                    </button>                    
                </Teleport>
            </SwiperCarousel>
            <div class="room-intro-content text-neutral-100">
                <h2 class="fw-bold mb-2 mb-md-4">
                {{ pickup.name }}
                </h2>
                <p class="fs-8 fs-md-7 mb-6 mb-md-10">
                {{ pickup.description }}</p>
                <p class="fs-3 fw-bold mb-6 mb-md-10">
                NT$ {{ pickup.price }}
                </p>
                <NuxtLink
                    :to="`/rooms/${pickup._id}`"
                    class="cta-btn btn btn-neutral-100 border-0
                    w-100 d-flex justify-content-end align-items-center gap-3
                    p-5 p-md-10 mb-6 mb-md-10
                    fs-7 fs-md-5 fw-bold text-end">
                    查看更多
                    <div class="cta-deco" />
                </NuxtLink>
                <div id="swiper-nav" class="d-flex justify-content-end"></div>
            </div>
        </div>
    </section>

    <section class="delicacy position-relative bg-primary-100 py-20 py-md-30">
        <div class="container">
            <div class="d-flex align-items-center gap-10 mb-10 mb-md-20">
                <h2 class="fs-1 fw-bold text-primary-600 mb-0">
                佳餚<br>美饌
                </h2>
                <div class="deco-line" />
            </div>
            <div class="row flex-nowrap overflow-x-auto">
                <template v-for="item in culinary" :key="item._id">
                    <DelicacyCard
                        :title="item.title" :description="item.description"
                        :dining-time="item.diningTime"
                        :image="item.image" />
                </template>
            </div>
        </div>
    </section>

    <section class="transporatation bg-neutral-700">
        <div class="container pt-20 pb-10 pt-md-30 pb-md-20">
            <div class="d-flex align-items-center gap-10 mb-10 mb-md-20">
                <h2 class="fs-1 fw-bold text-primary-600 mb-0">
                交通<br>方式
                </h2>
                <div class="deco-line" />
            </div>
            <div class="row gap-6 gap-md-0">
                <div class="col-12">
                    <p class="text-neutral-300 fw-bold">台灣高雄市新興區六角路123號</p>
                    <picture>
                        <source
                            srcset="/images/home-map.png"
                            media="(min-width: 576px)">
                        <img class="w-100 mb-md-10" src="/images/home-map-sm.png" alt="台灣高雄市新興區六角路123號">
                    </picture>
                </div>
                <div class="col-md-4 text-neutral-100">
                    <Icon
                        class="display-1 text-primary-600 mb-2 mb-md-4"
                        icon="ic:baseline-directions-car" />
                    <h5 class="fs-7 fs-md-5 fw-bold">
                    自行開車
                    </h5>
                    <p class="fs-8 fs-md-7 mb-0">
                    如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。
                    </p>
                </div>
                <div class="col-md-4 text-neutral-100">
                    <Icon
                        class="display-1 text-primary-600 mb-2 mb-md-4"
                        icon="ic:baseline-train" />
                    <h5 class="fs-7 fs-md-5 fw-bold">
                    高鐵 / 火車
                    </h5>
                    <p class="mb-0 fs-8 fs-md-7">
                    如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約 20 分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約 10 分鐘便可抵達。
                    </p>
                </div>
                <div class="col-md-4 text-neutral-100">
                    <Icon 
                        class="display-1 text-primary-600 mb-2 mb-md-4"
                        icon="mdi:car-side" />
                    <h5 class="fs-7 fs-md-5 fw-bold">
                    禮賓車服務
                    </h5>
                    <p class="mb-0 fs-8 fs-md-7">
                    享樂酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567
                    </p>
                </div>
            </div>
        </div>
        <picture>
            <source
                srcset="/images/deco-line-group-horizontal.svg"
                media="(min-width: 576px)">
            <img class="w-100" src="/images/deco-line-group-horizontal-sm.svg" alt="deco-line-group">
        </picture>
    </section>

</main>

</template>

<style lang="scss" scoped>

.hero {

  height: 100vh;
  background-color: #7B6651;
  overflow: hidden;

}

.hero-img {

  width: 100%;
  height: 100vh;
  object-fit: cover;
  filter: brightness(40%);

}

.hero-wrapper { inset: 0 }

.hero-wrapper .deco-line {
  
  width: 33vw;

  @include media-breakpoint-down(md) {

    width: 2px; height: 83px;
    z-index: 1;
    background-image: linear-gradient(to bottom, #BE9C7C, #FFF);
    margin-bottom: 2.5rem;

  }

}

.hero-intro {

  display: flex;
  justify-content: center;
  align-items: center;

  max-height: min(62vh, 672px);
  max-width: clamp(291px, 48vw, 924px);
  padding: 5.5%;

  background-image: linear-gradient(to bottom, #FFFFFF00, #FFFFFF4D);
  backdrop-filter: blur(6px);

  border-radius: 80px;
  border-width: 1px 1px 0 0;
  border-style: solid;
  border-color: #F5F7F9;

  @include media-breakpoint-down(md) {
  
    transform: translateX(10%);
    height: 420px;

  }

}

.hero-intro-content {

  max-width: 39vw;
  transform: translateX(-18%);

  @include media-breakpoint-down(md) {

    max-width: none;
    transform: translateX(-11%);

  }
 
  h1 { font-size: clamp(3rem, 5.2vw, 6.25rem); }

  p {

    font-size: clamp(1rem, 1.7vw, 2rem);
    margin-bottom: min(5vh, 3.75rem);
    white-space: nowrap;

    @include media-breakpoint-down(md) { white-space: normal; }

  }

}

.news picture {

  --parent-width: 1076;
  --width: 474;
  --percent-width: calc(var(--width) / var(--parent-width) * 100%);
  width: var(--percent-width);
  flex-shrink: 0;

  @include media-breakpoint-down(md) { width: 100% }

}

.news .container {

  position: relative;

  &::before {

    content: '';
    display: block;
    width: 200px; height: 200px;
    background-image: url('/images/deco-dot-group.svg');
    position: absolute;
    top: -20px; right: -120px;

    @include media-breakpoint-down(md) {

      width: 100px; height: 100px;
      background-image: url('/images/deco-dot-group-sm.svg');
      top: -40px; right: 24px;

    }

  }

  &::after {

    content: '';
    display: block;
    width: 200px; height: 200px;
    background-image: url('/images/deco-dot-group.svg');
    position: absolute;
    left: -100px;
    bottom: -200px;

    @include media-breakpoint-down(md) {

      width: 100px; height: 100px;
      background-image: url('/images/deco-dot-group-sm.svg');
      left: 24px;
      bottom: -140px;

    }

  }

}

.news .deco-line { width: 140px; }

.about {

  background-image: url('/images/home-about.png');
  height: 992px;
  background-position-y: 120px;
  background-repeat: no-repeat;

  @include media-breakpoint-down(md) {

    background-position-y: 80px;
    height: 794px;

  }

}

.about-content {

  max-width: 1044px;
  background-image: linear-gradient(180deg, rgba(20, 15, 10, 0.8) 0%, rgba(190, 156, 124, 0.8) 100%);
  backdrop-filter: blur(10px);
  
  border-color: #ffffff;
  border-style: solid;
  border-width: 0 0 1px 1px;

  border-radius: 80px 80px 0 80px;
  transform: translateX(7vw);

  @include media-breakpoint-down(md) {

    height: 594px;
    border-radius: 40px 40px 0 40px;
    transform: none;

  }

}

.about-content .deco-line {

  width: 165px;
  background: #fff;

  @include media-breakpoint-down(md) { width: 161px; }

}

.arrow-icon { font-size: 1.5rem; }

.room-intro ::part(container) {

  --origin-width: 900;
  --container-width: 1920;
  --percent-width: calc(var(--origin-width) / var(--container-width) * 100vw);

  max-width: var(--percent-width);

  @include media-breakpoint-down(md) {
    
    --origin-width: 1920;
    --percent-width: calc(var(--origin-width) / var(--container-width) * 95vw);
  
  }

}

.room-intro::before {

    // mobile first

    content: '';
    position: absolute;
    top: -24px; right: -80px;
    z-index: 2;

    width: 375px; height: 84px;

    background-repeat: no-repeat;
    background-image: url('/images/deco-line-group-horizontal-sm.svg');
    
    @include media-breakpoint-up(md) { 

      width: 1060px; height: 187px;
      background-image: url('/images/deco-line-group-horizontal.svg');
      
      top: -50px; left: 430px; right: auto;

    }

    @include media-breakpoint-up(lg) { top: 0; left: 430px; }

    @include media-breakpoint-up(xl) { top: 130px; left: 630px; }

    @include media-breakpoint-up(xxxl) { top: 180px; left: 860px; }

}

.room-intro::after {

  content: '';
  position: absolute;
  bottom: 265px; right: 0;
  z-index: -1;

  width: 375px; height: 132px;

  background-repeat: no-repeat;
  background-image: url('/images/deco-wave-bg-sm.svg');

  @include media-breakpoint-up(md) {

    width: 1920px; height: 86%;
    background-image: url('/images/deco-wave-bg.svg');
    
    bottom: 0; left: -280px; right: auto;

  }

  @include media-breakpoint-up(lg) { height: 80%; }

  @include media-breakpoint-up(xl) { height: 62.5%; left: -100px; }

  @include media-breakpoint-up(xxxl) {

    height: 677px;
    bottom: 0;
    left: 0;

  }
  
}

.room-intro-content {

  max-width: 628px;

  @include media-breakpoint-up(xxxl) { flex-grow: 1; }

}

.cta-btn {

  --primary: #BF9D7D;
  --neutral: #FFFFFF;

  height: clamp(4rem, 12vh, 7.25rem);
  padding: 5%;

  /* 最小值 4rem, 首選值 12vh, 最大值 7.25rem */

  @include media-breakpoint-down(md) { height: 4rem; }

  color: #000;

  &:hover {

    box-shadow: inset 48vw 0 0 0 var(--primary);
    color: var(--neutral);

  }

  &:hover .cta-deco {

    background-color: var(--neutral);
    width: 8vw;

  }

}

.cta-deco {

  width: 10vw; height: 1px;
  background-color: #000;
  transition: background-color 0.25s ease-in-out, width 0.25s ease-in-out;

  @include media-breakpoint-down(md) { width: 5rem; }

}

.delicacy::before {

  @include media-breakpoint-up(lg) {

    width: 200px; height: 200px;
    position: absolute;
    top: -40px; right: 80px;
    content: '';
    background-image: url('/images/deco-dot-group.svg');

  }

}

.delicacy::after {

  @include media-breakpoint-up(xxxl) {

    width: 187px; height: 1068px;
    position: absolute;
    top: 55px; left: 40px;
    content: '';
    background-image: url('/images/deco-line-group-vertical.svg');
    
  }

}

.delicacy .deco-line {

  width: 200px;

  @include media-breakpoint-up(md) { width: 167px; }

}

.overflow-x-auto {

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }

}

.transporatation .deco-line {

  width: 161px;
  @include media-breakpoint-down(md) { width: 194px; }

}

</style>
