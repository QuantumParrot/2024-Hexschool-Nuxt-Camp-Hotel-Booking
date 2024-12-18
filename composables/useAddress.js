import { zipCodeList } from '@/assets/zipcodes.js';

export const useAddress = () => {

    const address = ref({ city: '臺北市', county: '中正區' });

    const groupByCity = computed(() => {

        const result = {};
    
        zipCodeList.map(data => data.city).forEach(city => {
    
            if (!result[city]) { result[city] = zipCodeList.filter(data => data.city === city) }
    
        });
    
        return result;

        /*

        資料格式：
        
        {
            '臺北市': [ {...}, {...}, ... ],
            '高雄市': [ {...}, {...}, ... ], ...
        }
    
        */

    });

    // 直轄市及縣市列表

    const cityList = Object.keys(groupByCity.value);

    // 根據當前選擇的縣市，動態呈現鄉鎮市區列表

    const countyList = computed(() => {

        if (address.value.city) {

            return groupByCity.value[address.value.city].map(data => data.county);

        }

        return [];
    
    });

    const addressToZipCode = (address) => {

        return zipCodeList.find(data => {

            return data.city === address.city && data.county === address.county;
    
        }).zipcode;

    };

    const zipCodeToAddress = (zipcode) => {

        const result = zipCodeList.find(data => {

            return data.zipcode === zipcode;

        });

        return { city: result.city, county: result.county }

    };

    const setAddress = (addressObject) => {

        address.value = addressObject;

    }

    watch(() => address.value.city, () => {

        if (!countyList.value.includes(address.value.county)) { address.value.county = ''; }
    
    });

    return { address, cityList, countyList, addressToZipCode, zipCodeToAddress, setAddress }

};

/*

原本使用的監聽方式

let isRemoteUpdating = false;

const setAddress = async (addressObject) => {

    isRemoteUpdating = true;
    address.value = addressObject;

    await nextTick();
    
    isRemoteUpdating = false;

    // 使用 nextTick 讓 `isRemoteUpdating = false` 在 watch 完之後執行

};

watch(() => address.value.city, () => {

    if (isRemoteUpdating) return;

    address.value.county = '';

});

*/