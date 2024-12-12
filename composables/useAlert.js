// https://sweetalert2.github.io/

export const useAlert = () => {

    const { $swal } = useNuxtApp();

    const showToastAlert = ({ icon, text }) => {

        $swal.fire({

            icon,
            text,
            toast: true,
            timer: 1500,
            showConfirmButton: false,

        })

    };

    return { showToastAlert };

};