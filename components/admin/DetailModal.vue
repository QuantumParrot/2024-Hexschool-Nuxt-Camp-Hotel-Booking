<script setup>

const { $bootstrap } = useNuxtApp();

const detailModal = ref(null);
let modal;

const showModal = () => { modal.show(); }

const hideModal = () => { modal.hide(); }

onMounted(() => {

    modal = $bootstrap.modal(detailModal.value);

});

onBeforeUnmount(() => { hideModal(); })

defineExpose({ showModal, hideModal })

</script>

<template>

<div class="modal" tabindex="-1" ref="detailModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">訂單內容</h4>
                <button
                    type="button" class="btn-close"
                    data-bs-dismiss="modal" aria-label="Close"
                    @click="hideModal">
                </button>
            </div>
            <div class="modal-body">
                <slot />
            </div>
            <slot name="footer" />
        </div>
    </div>
</div>

</template>

<style scoped></style>
