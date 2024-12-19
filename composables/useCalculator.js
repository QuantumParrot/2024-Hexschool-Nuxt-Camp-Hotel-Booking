export const useCalculator = () => {

    const getDays = (start, end) => {

        if (!start || !end) return 0;

        const differenceTime = new Date(end).getTime() - new Date(start).getTime();
    
        return Math.round(differenceTime / (1000 * 60 * 60 * 24));

    };

    return { getDays }

};