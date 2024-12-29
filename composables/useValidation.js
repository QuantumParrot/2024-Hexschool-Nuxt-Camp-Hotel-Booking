export const useValidation = () => {

    const transText = {

        name: '姓名',
        password: '密碼',
        confirmPassword: '確認密碼',
        address: '地址',
        email: '信箱',

    };

    const translateMessage = (msg, type) => msg.replace(`${type} `, transText[type]);

    return { translateMessage }

};
