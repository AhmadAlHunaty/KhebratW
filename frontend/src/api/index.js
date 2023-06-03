import axios from 'axios';

const service = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:8000/api',
});

service.interceptors.request.use(
    (config) => {
        // const token = store.getState().token;
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjMzNmMxM2JjMmVmZGMzYjg3MGM1ZWQxMmI1YTYyOWE2YzExNTk0OTc0MTNlNGYzZjM5OTRlOGU2NmFhOGVmMjQ5MGZlYjBjYzAyODQ5NjkiLCJpYXQiOjE2ODU3MTQ1NzYuOTA5ODg1LCJuYmYiOjE2ODU3MTQ1NzYuOTA5ODg3LCJleHAiOjE3MTczMzY5NzYuODgxMjA2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.TaC6sQTUFhjPyQJklTO41C3czoMFBS-5D2KYwNa9DXT0KqkC8Bm5t50Gh_QZQWL3E2i7Oe0vxGPmREOc2mszrrCwZCb7bPk-WFRBNjfveASIe8byEvOcSRMYHdOncnSlG99SCoohE6xB1PH7sn_sefmr__Mu0MSyoe5yx6eAVwKXJskqtbEZFuLdBXO9SQ-q2sh6MxsT1KRacPJ3jMJj2GSBsgaXBLahnA-WAo1TvUi3zDbFCDcnkD8e4u8V6-JorORmMjzyJsGSTGzz7H-71TtgzehGItbZLtlry_HjCqTQtxdgr32unVYTDV0kciSU5tTse_Jau7OG7XWKTfIek0BVkhY0x4GEBk7WxllUDJi6PU5kFAMRL6jRk8DGzhc2bIuSorsqzHEQCLXjiPQ0EW_mHSlyr2ZHZvtlQIJ5b-4KjlvaAyNIx9K3u1XlD5R8Yttv_hs8CaUNtncwFM_pKwb5Mj5iW-KbYHAnVg0V4N0w5ir_57D1Y-8BUXo76ib-oqT8U7czlKcDewZ2iHs7rwup_cH9u8aZTOrQU7ZETcdlyKkwnJjDrKSsPuCG1gVXYgNXSUd-ipw90E_JV7dBwK0bVnSZUEm3ttFETDIrOxSv4P97icQ559HsFSbzHCmhc5_RulEtiOr62Rqi7GsebgwTvW9ghcSkGrdncUSd4ok';
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    });


export default service;

