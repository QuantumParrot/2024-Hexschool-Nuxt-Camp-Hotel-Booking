export default defineStore('cache', () => {

    const roomCache = ref({});
    const bookingCache = ref({});

    return { roomCache, bookingCache }

});