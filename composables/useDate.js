export const useDate = () => {

  const oddMonths = [1, 3, 5, 7, 8, 10, 12]; 

  const month = ref(1);

  const days = computed(() => {

    if (month.value == 2) return 29;

    if (oddMonths.includes(month.value)) return 31;

    return 30;

  });

  return { month, days }

}
