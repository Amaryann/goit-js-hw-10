import { fetchBreeds, renderBreedsSelect } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import { renderMarkupCat } from "./cat-api";
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
fetchBreeds().then((result) =>{ 
    let markup = result.map(element=> {return `<option value="${element.id}">${element.name}</option>`});
    breedSelect.insertAdjacentHTML("afterbegin", markup.join(""))
})
.then(()=>{showBreedSelect()})
.catch(()=>{showError()})

breedSelect.addEventListener("change", () => {
    showLoader();
    fetchCatByBreed(breedSelect.value)
    .then((result) => {
        let catInfoData = {info: result[0].breeds[0], image: result[0].url}
        renderMarkupCat(catInfoData, catInfo);
        showBreedSelectInfo();
    }
    ).catch(
        ()=>{showError()}
    )
})