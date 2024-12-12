export const useValidation = () => {

    const transText = reactive({

        name: '姓名',
        password: '密碼',
        confirmPassword: '確認密碼',
        email: '信箱',

    });

    const translateMessage = (msg, type) => msg.replace(`${type} `, transText[type]);

    const phoneFormat = (value) => {

        const regex = /^09\d{8}$/;
    
        if (!regex.test(value)) return '需填寫國內的手機號碼';
    
        return true;
    
    };

    const passwordFormat = (value) => {

    };

    return { translateMessage, phoneFormat }

};
