import api from '.';

 const getCountries = () => {
     return api.get('/country');
 }

 const getCountry = (id) => {
        return api.get(`/country/${id}`);
 }

export default {
    getCountries,
    getCountry
};