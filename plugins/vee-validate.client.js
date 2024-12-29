import { defineRule, configure } from 'vee-validate';

import { confirmed, required, regex, email, min } from '@vee-validate/rules';

import { setLocale, localize } from '@vee-validate/i18n';

import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

export default defineNuxtPlugin((nuxtApp) => {

    defineRule('confirmed', confirmed);
    defineRule('required', required);
    defineRule('regex', regex);
    defineRule('email', email);
    defineRule('min', min);

    defineRule('phoneFormat', (value) => {

        const regex = /^09\d{8}$/;
    
        if (!regex.test(value)) return '需填寫國內的手機號碼';
    
        return true;
    
    });

    defineRule('passwordFormat', (value) => {

        if (value.length < 8) return '密碼不能小於 8 個字元';

        if (!/\d+/.test(value) || !/[A-Za-z]+/.test(value)) return '密碼必須為英數混合';

        return true;

    });

    configure({

        validateOnInput: true,
        generateMessage: localize({ zhTW })

    });

    setLocale('zhTW');

});