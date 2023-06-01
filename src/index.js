import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import Notiflix from "notiflix";
const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector("p.loader");
const error = document.querySelector("p.error");
const catInfo = document.querySelector(".cat-info");
const showError = () => {
    error.hidden = true;
    Notiflix.Notify.failure(error.textContent)
    loader.hidden = true;
    breedSelect.hidden = true;
    catInfo.hidden = true;
}
const showLoader = () => {
    error.hidden = true;
    loader.hidden = false;
    breedSelect.hidden = true;
    catInfo.hidden = true;
}
const showBreedSelect = () => {
    error.hidden = true;
    loader.hidden = true;
    breedSelect.hidden = false;
    catInfo.hidden = true;
}
const showBreedSelectInfo = () => {
    breedSelect.hidden = false;
    loader.hidden = true;
    error.hidden = true;
    catInfo.hidden = false;
}
showLoader()
const renderBreeds = (list) => {
    const markup = list.map(element => {
        return `<option value="${element.id}">${element.name}</option>`
    })
    return markup
}
fetchBreeds().then(result => breedSelect.insertAdjacentHTML("afterbegin", renderBreeds(result).join(""))).then(showBreedSelect()).catch(()=>{showError()});
breedSelect.addEventListener("change", () => {
    showLoader();
    fetchCatByBreed(breedSelect.value).then((result) => {
        let catInfoData = {info: result[0].breeds[0], image: result[0].url}
        console.log(catInfoData);
    let catInfoMarkup = `<div class="container"><div class="img-container">
    <img class="cat-img" src="${catInfoData["image"]}" width="600" alt="${catInfoData["info"].name}">
    </div>
    <div class="info-container">
        <h1 class="cat-name">${catInfoData["info"].name}</h1>
        <p>${catInfoData["info"].description}</p>
        <p><strong>Temperament</strong>: ${catInfoData["info"].temperament}</p>
    </div></div>`
    catInfo.insertAdjacentHTML("afterbegin", catInfoMarkup);
    showBreedSelectInfo();
    }
    ).catch(
        ()=>{showError()}
    )
})