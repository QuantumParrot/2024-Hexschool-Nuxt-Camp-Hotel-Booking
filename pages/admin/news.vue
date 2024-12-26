<script setup>

import { Icon } from '@iconify/vue';

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';

import { required, regex } from '@vee-validate/rules';

import { setLocale, localize } from '@vee-validate/i18n';

import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

defineRule('required', required);
defineRule('regex', regex);

configure({

    validateOnInput: true,
    generateMessage: localize({ zhTW })

});

setLocale('zhTW');

//

import useAdminStore from '@/stores/admin';

const adminStore = useAdminStore();

const { apiConfig } = adminStore;

//

const { $dateformat, payload } = useNuxtApp();

const { showToastAlert, showConfirmAlert } = useAlert();

const { handleAsyncError } = useErrorHandler();

//

const { data:newsList, execute } = await useAsyncData('get-news', () => {

    return $fetch('/api/v1/admin/news', {

        ...apiConfig, onResponseError: handleAsyncError,

    });

}, {

    immediate: false,
    transform: (res) => res.result

});

onMounted(() => {

    if (payload.data['get-news']) {

        newsList.value = payload.data['get-news'];
        return;

    }

    execute();

});

//

const form = ref(null); /* ref */

const newsTemp = ref({
    
    title: '',
    description: '',
    image: 'https://fakeimg.pl/474x294?text=😎',

});

const isPending = ref(false);

//

const prepareCreate = () => {

    if (Object.keys(newsTemp.value).some(key => key !== 'image' && newsTemp.value[key].trim())) {

        const isConfirmed = confirm('這將清空您現在輸入的內容，確定嗎？');

        if (!isConfirmed) return;

    };

    delete newsTemp.value._id;
    delete newsTemp.value.createdAt;
    delete newsTemp.value.updatedAt;

    form.value.resetForm();

}

const prepareEdit = (news) => { newsTemp.value = { ...news }; };

const handleUpdateProcess = async (newsData, { resetForm }) => {

    const id = newsTemp.value._id;
    let method;
    let api;

    if (!id) {

        api = '/api/v1/admin/news';
        method = 'POST'

    } else {

        api = `/api/v1/admin/news/${id}`;
        method = 'PUT'

    }

    const res = await $fetch(api, {

        ...apiConfig,
        method,
        body: {
            title: newsTemp.value.title,
            description: newsTemp.value.description,
            image: newsTemp.value.image,
        },
        onResponseError: handleAsyncError,

    });

    if (res.status) {

        showToastAlert({
            
            icon: 'success',
            text: `${id ? '修改' : '新增'}成功！`
        
        });
        
        refreshNuxtData('get-news');

        resetForm();

    }

};

//

const deleteNews = async (id) => {

    isPending.value = true;

    try {

        return await $fetch(`/api/v1/admin/news/${id}`, {

            ...apiConfig,
            method: 'DELETE',
            onResponseError: handleAsyncError,

        });
        
    } finally { isPending.value = false; }

};

const handleDeleteProcess = (id) => {

    if (isPending.value) return;

    showConfirmAlert({

        icon: 'warning',
        iconColor: '#DA3E51',
        title: '確定刪除這則消息？',
        showCancelButton: true,
        cancelButtonColor: '#DA3E51',
        confirmButtonText: '是', cancelButtonText: '否',

    }).then(async (result) => {

        if (result.isConfirmed) {

            const res = await deleteNews(id);

            if (res.status) {

                showToastAlert({ icon: 'success', text: '刪除成功！' });

                refreshNuxtData('get-news');

            }

        }        

    });

};

</script>

<template>

<div>
    <h2 class="fs-3 fw-bold text-primary-600 mb-10">消息管理</h2>
    <button
        class="btn btn-neutral-600 mb-4
        d-flex align-items-center gap-2"
        type="button" @click="prepareCreate">
        <Icon icon="mdi:add-circle" />
        新增消息
    </button>
    <div class="row gx-10">
        <div class="col-md-6">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr class="text-nowrap">
                            <th scope="col" width="30%">發表日期</th>
                            <th scope="col" width="60%">消息標題</th>
                            <th scope="col" width="5%"
                                class="text-center">
                                編輯
                            </th>
                            <th scope="col" width="5%"
                                class="text-center">
                                刪除
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="news in newsList" :key="news._id">
                            <tr class="align-middle">
                                <td>{{ $dateformat(news.createdAt) }}</td>
                                <td>{{ news.title }}</td>
                                <td class="text-center">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-primary-600"
                                        @click="prepareEdit(news)">
                                        <Icon
                                            class="fs-5 text-neutral-100"
                                            icon="mdi:file-document-edit" />
                                    </button>
                                </td>
                                <td class="text-center">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-secondary"
                                        @click="handleDeleteProcess(news._id)">
                                        <Icon
                                            class="fs-5"
                                            icon="mdi-delete-empty" />
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-md-6">
            <div class="alert bg-neutral-300">
                <Form v-slot="{ errors, meta, resetForm }" @submit="handleUpdateProcess" ref="form">
                    <div class="mb-4">
                        <label for="title" class="form-label">消息標題</label>
                        <Field
                            id="title" name="title" type="text"
                            class="form-control" :class="{ 'is-invalid': errors['title'] }"
                            placeholder="請輸入消息標題"
                            v-model.trim="newsTemp.title"
                            rules="required"
                        />
                        <ErrorMessage name="title" v-slot="{ message }">
                            <p class="invalid-feedback my-3">
                            {{ message.replace('title ', '標題') }}
                            </p>
                        </ErrorMessage>
                    </div>
                    <div class="mb-4">
                        <label for="description" class="form-label">消息內容</label>
                        <Field
                            as="textarea"
                            id="description" name="description" type="text"
                            class="form-control" :class="{ 'is-invalid': errors['description'] }"
                            rows="6"
                            placeholder="請輸入消息內容"
                            v-model.trim="newsTemp.description"
                            rules="required"
                        />
                        <ErrorMessage name="description" v-slot="{ message }">
                            <p class="invalid-feedback my-3">
                            {{ message.replace('description ', '內容') }}
                            </p>
                        </ErrorMessage>
                    </div>
                    <div class="mb-4">
                        <label for="image" class="form-label">消息圖片</label>
                        <Field
                            as="textarea"
                            id="image" name="image" type="text"
                            class="form-control" :class="{ 'is-invalid': errors['image'] }"
                            rows="2"
                            placeholder="請輸入圖片網址"
                            v-model.trim="newsTemp.image"
                            :rules="{
                                required: true,
                                regex: /^https:\/\// && (/\.(gif|jpe?g|tiff?|png|webp|bmp)$|^https:\/\/fakeimg\.pl\/\d+/i)
                            }"
                        />
                        <ErrorMessage name="image" v-slot="{ message }">
                            <p class="invalid-feedback my-3">
                            {{ message.replace('image ', '圖片網址') }}
                            </p>
                        </ErrorMessage>
                    </div>
                    <div class="d-flex justify-content-end gap-3">
                        <button
                            type="button" class="btn btn-outline-secondary"
                            @click="resetForm">
                            清空內容
                        </button>
                        <button
                            type="submit" class="btn btn-primary-600"
                            :disabled="!meta.valid">
                            確認送出
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</div>

</template>

<style scoped>

textarea { resize: none; }

</style>
