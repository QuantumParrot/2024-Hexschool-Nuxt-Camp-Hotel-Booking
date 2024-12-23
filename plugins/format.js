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

                moment.updateLocale('zh-tw', {

                    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
                    
                });
                
                return moment(time).format(formation);
            
            }
            
        }

    }

});