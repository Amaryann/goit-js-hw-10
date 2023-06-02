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
export const renderMarkupCat = (dataObject, objectTarget) => {
    let catInfoMarkup = `<div class="container"><div class="img-container">
    <img class="cat-img" src="${dataObject["image"]}" width="600" alt="${dataObject["info"].name}">
    </div>
    <div class="info-container">
        <h1 class="cat-name">${dataObject["info"].name}</h1>
        <p>${dataObject["info"].description}</p>
        <p><strong>Temperament</strong>: ${dataObject["info"].temperament}</p>
    </div></div>`
    objectTarget.insertAdjacentHTML("afterbegin", catInfoMarkup);
}