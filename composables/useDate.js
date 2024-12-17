export const useDate = () => {

    const minYear = new Date().getFullYear() - 100;

    const oddMonths = [1, 3, 5, 7, 8, 10, 12];

    const date = ref({ year: '', month: 1, day: 1 });

    const days = computed(() => {

        if (date.month == 2) return 29;

        if (oddMonths.includes(date.month)) return 31;

        return 30;

    });

    watch(() => date.month, () => date.day = 1);

    return { minYear, date, days }

}
