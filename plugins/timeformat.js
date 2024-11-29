import moment from "moment";

export default defineNuxtPlugin((nuxtApp) => {

    return {

        provide: {

            timeformat: (timestamp, formation = 'YYYY-MM-DD') => {
                
                return moment(timestamp).format(formation);
            
            }

        }

    }

});