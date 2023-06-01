const url = `https://api.thecatapi.com/v1/breeds`;
const apiKey = "live_2wK86qLcZSv4Gz9hc07XayVt9dghXFN2zf0DhaGpB2GLRx8k0UhcyBDp8424aGyK"

export const fetchBreeds = () => {
    return fetch(url, {headers: {
        "x-api-key": apiKey,
    }}).then((response) => {
        return response.json();
    }).catch(
        ()=>{
            return
        }
    )
}
export const fetchCatByBreed = (breedId) => {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {headers: {
        "x-api-key": apiKey,
}
    }).then((response) => {
        return response.json()
    }).catch(()=>{
        return
    })
}