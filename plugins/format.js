import moment from "moment";

export default defineNuxtPlugin((nuxtApp) => {

    return {

        provide: {

            toThousands: (number = 0) => {

                return number.toString().split('.')
                .map((item, index) => index === 0 ? item.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : item)
                .join('.');
                
            },

            dateformat: (time, formation = 'YYYY-MM-DD') => {
                
                return moment(time).format(formation);
            
            }
            
        }

    }

});