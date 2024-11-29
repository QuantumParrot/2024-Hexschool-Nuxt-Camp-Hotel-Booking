import { Collapse, Modal } from 'bootstrap/dist/js/bootstrap.esm';

export default defineNuxtPlugin((nuxtApp) => {

    return {
        provide: {
            bootstrap: {
                collapse: element => new Collapse(element, { toggle: false }),
                modal: element => new Modal(element),
            }
        }
    }

})
