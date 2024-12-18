export const useDate = () => {

    const minYear = new Date().getFullYear() - 100;

    const oddMonths = [1, 3, 5, 7, 8, 10, 12];

    const date = ref({ year: '', mon: 1, day: 1 });

    const days = computed(() => {

        if (date.value.mon == 2) return 29;

        if (oddMonths.includes(date.value.mon)) return 31;

        return 30;

    });

    const setDate = (dateObject) => { date.value = dateObject; }

    watch(() => date.value.mon, () => {

        if (date.value.day > days.value) { date.value.day = 1; }
 
    });

    return { minYear, date, days, setDate }

}
