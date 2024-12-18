export const useDate = () => {

    let isRemoteUpdating = false;

    const minYear = new Date().getFullYear() - 100;

    const oddMonths = [1, 3, 5, 7, 8, 10, 12];

    const date = ref({ year: '', mon: 1, day: 1 });

    const days = computed(() => {

        if (date.value.mon == 2) return 29;

        if (oddMonths.includes(date.value.mon)) return 31;

        return 30;

    });

    const setDate = async (dateObject) => {

        isRemoteUpdating = true;
        date.value = dateObject;

        await nextTick();

        isRemoteUpdating = false;
        
    }

    watch(() => date.value.mon, () => {

        if (isRemoteUpdating) return;
        
        date.value.day = 1;
 
    });

    return { minYear, date, days, setDate }

}
