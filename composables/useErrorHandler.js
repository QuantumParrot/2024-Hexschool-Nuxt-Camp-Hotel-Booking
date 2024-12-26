export const useErrorHandler = () => {

    const { showToastAlert } = useAlert();

    const handleAsyncError = (error) => {

        // console.log(error);

        if (import.meta.env.DEV) {

            if (error.response._data) {
    
                console.error(error.response._data.message);
                console.error(error.response);
        
            } else {
              
                console.error(error);
            
            }

        }

        showToastAlert({
                
            icon: 'warning',
            text: error.response?._data?.message || '出現錯誤，請稍後再試'
        
        });

    };

    return { handleAsyncError };

};