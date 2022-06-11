import axios from "../../axios/axios";


export async function fetchDataForSelector(url) {
    if (url) {
        return axios.get(url, {
            headers: {'Authorization': `Token ${localStorage.token}`}
        }).then(response => {
           if (response.status === 200) {
               if (response.data.results) {
                   let data = response.data.results.map((value) => ({
                       label: value,
                       key: value,
                       value: value
                   }));

                   return data;
               }
           }
           else {
               return null;
           }
        }).catch(response => {
            return null;
        });
    } else {
        return null;
    }
}