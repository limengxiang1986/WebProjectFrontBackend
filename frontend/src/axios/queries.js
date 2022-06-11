import axios from "axios";


const queryPostData = (url) => {
    return new Promise((resolve) => {
        axios.get(url)
            .then(
                data => resolve(data.data)
                )
            .catch(e => console.log(e))
    })
}


export {queryPostData };