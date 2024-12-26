export const useValidation = () => {

    const transText = {

        name: '姓名',
        password: '密碼',
        confirmPassword: '確認密碼',
        address: '地址',
        email: '信箱',

    };

    const translateMessage = (msg, type) => msg.replace(`${type} `, transText[type]);

    const phoneFormat = (value) => {

        const regex = /^09\d{8}$/;
    
        if (!regex.test(value)) return '需填寫國內的手機號碼';
    
        return true;
    
    };

    const passwordFormat = (value) => {

        if (value.length < 8) return '密碼不能小於 8 個字元';

        if (!/\d+/.test(value) || !/[A-Za-z]+/.test(value)) return '密碼必須為英數混合';

        return true;

    };

    return { translateMessage, phoneFormat, passwordFormat }

};
