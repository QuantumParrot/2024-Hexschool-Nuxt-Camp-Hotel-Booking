// https://sweetalert2.github.io/

export const useAlert = () => {

    const { $swal } = useNuxtApp();

    const iconColor = '#909090';
    const confirmButtonColor = '#909090';
    const cancelButtonColor = '#BF9D7D';

    const showToastAlert = ({ icon, text }) => {

        $swal.fire({

            icon,
            text,
            toast: true,
            timer: 1500,
            showConfirmButton: false,

        })

    };

    const showConfirmAlert = (config) => {

        return $swal.fire({

            ...config,
            
            iconColor: config.iconColor || iconColor,
            
            confirmButtonColor: config.confirmButtonColor || confirmButtonColor,
            
            cancelButtonColor: config.cancelButtonColor || cancelButtonColor

        });

    }

    return { showToastAlert, showConfirmAlert };

};