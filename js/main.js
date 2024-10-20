/// <reference types="../@types/jquery" />
const close = document.getElementById('close');
const bar = document.getElementById('bar');
const over = document.querySelector('.cardd');
$(() => {
    $('.sk-chase').fadeOut(1000, () => {
        $('.loading').fadeOut(500)
    })
});
close.addEventListener('click', () => {
    $('.nav-conn').animate({ left: '-260px' }, 500);
    $('.nav-h').animate({ left: '0px' }, 500);
    $('.nav-links .lnk5').animate({ top: '330px', left: '-50px' }, 500);
    $('.nav-links .lnk4').animate({ top: '310px', left: '-50px' }, 600);
    $('.nav-links .lnk3').animate({ top: '290px', left: '-50px' }, 700);
    $('.nav-links .lnk2').animate({ top: '270px', left: '-50px' }, 800);
    $('.nav-links .lnk1').animate({ top: '250px', left: '-50px' }, 900);
    bar.classList.replace('d-none', 'd-block');
    close.classList.replace('d-block', 'd-none');
});
bar.addEventListener('click', () => {
    $('.nav-conn').animate({ left: '0px' }, 500);
    $('.nav-h').animate({ left: '258px' }, 500);
    $('.nav-links .lnk1').animate({ top: '0', left: '0' }, 500);
    $('.nav-links .lnk2').animate({ top: '0', left: '0' }, 600);
    $('.nav-links .lnk3').animate({ top: '0', left: '0' }, 700);
    $('.nav-links .lnk4').animate({ top: '0', left: '0' }, 800);
    $('.nav-links .lnk5').animate({ top: '0', left: '0' }, 900);
    close.classList.replace('d-none', 'd-block');
    bar.classList.replace('d-block', 'd-none');
});
if (performance.navigation.type === 1) {
    window.location.href = "index.html";
};
let temp = [];
const searchFN = document.getElementById('searchFN');
const searchFL = document.getElementById('searchFL');
async function searchByName(item, loc) {
    let searchF = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);
    let res = await searchF.json();
    temp = res.meals;
    // console.log(res);
    display(res, loc);
}
async function searchByFLetter(item, loc) {
    let searchF = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`);
    let res = await searchF.json();
    temp = res.meals;

    display(res, loc);

}
async function detailes(item) {
    let searchF = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`);
    let res = await searchF.json();
    let meal = res.meals[0];
    let cartona =
        `<div class="col-md-4 p-1">
            <img src="${meal.strMealThumb}" class="w-100 p-0 rounded-2" alt="${meal.strMeal}">
            <h1>${meal.strMeal}</h1>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3>Area: ${meal.strArea}</h3>
            <h3>Category: ${meal.strCategory}</h3>
            <h3>Recipes:</h3>
             <div class="d-flex flex-wrap mb-3">
               <p class="contant rounded-2">${meal.strMeasure1} ${meal.strIngredient1}</p>
               <p class="contant rounded-2">${meal.strMeasure2} ${meal.strIngredient2}</p>
               <p class="contant rounded-2">${meal.strMeasure3} ${meal.strIngredient3}</p>
               <p class="contant rounded-2">${meal.strMeasure4} ${meal.strIngredient4}</p>
               <p class="contant rounded-2">${meal.strMeasure5} ${meal.strIngredient5}</p>
               <p class="contant rounded-2">${meal.strMeasure6} ${meal.strIngredient6}</p>
               <p class="contant rounded-2">${meal.strMeasure7} ${meal.strIngredient7}</p>
               <p class="contant rounded-2">${meal.strMeasure8} ${meal.strIngredient8}</p>
               <p class="contant rounded-2">${meal.strMeasure9} ${meal.strIngredient9}</p>
               <p class="contant rounded-2">${meal.strMeasure10} ${meal.strIngredient10}</p>
               <p class="contant rounded-2">${meal.strMeasure11} ${meal.strIngredient11}</p>
               <p class="contant rounded-2">${meal.strMeasure12} ${meal.strIngredient12}</p>
               <p class="contant rounded-2">${meal.strMeasure13} ${meal.strIngredient13}</p>
               <p class="contant rounded-2">${meal.strMeasure14} ${meal.strIngredient14}</p>
               <p class="contant rounded-2">${meal.strMeasure15} ${meal.strIngredient15}</p>
               <p class="contant rounded-2">${meal.strMeasure16} ${meal.strIngredient16}</p>
               <p class="contant rounded-2">${meal.strMeasure17} ${meal.strIngredient17}</p>
               <p class="contant rounded-2">${meal.strMeasure18} ${meal.strIngredient18}</p>
               <p class="contant rounded-2">${meal.strMeasure19} ${meal.strIngredient19}</p>
               <p class="contant rounded-2">${meal.strMeasure20} ${meal.strIngredient20}</p>
            </div>

            <h3>Tags:</h3>
            <div class="d-flex flex-wrap mb-3">
                <p class="tags rounded-2">${meal.strTags ? meal.strTags.split(',').join('</p><p class="tags rounded-2">') : ''}</p>
            </div>
            <a href="${meal.strSource} " target="_blank"  class="btn btn-success">Source</a>
            <a href="${meal.strYoutube}" target="_blank"  class="btn btn-danger">YouTube</a>
        </div>`;

    document.getElementById('deta').innerHTML = cartona;
}
function ingredients(meal) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<p class="contant rounded-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</p>`;
        }
    }
    return ingredients;
}

async function category(loc) {
    let searchF = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let res = await searchF.json();
    displayCat(res, loc);
}
document.addEventListener('DOMContentLoaded', () => {
    let selectedCategory = localStorage.getItem('selectedCategory');
    let selectedArea = localStorage.getItem('selectedArea');
    let selectedIngre = localStorage.getItem('selectedIngre');

    if (selectedCategory) {
        filterCategory(selectedCategory, 'demo');
        localStorage.removeItem('selectedCategory');
    } else if (selectedArea) {
        filterArea(selectedArea, 'demo');
        localStorage.removeItem('selectedArea');
    } else if (selectedIngre) {
        filterIngre(selectedIngre, 'demo');
        localStorage.removeItem('selectedIngre');
    } else {
        searchByName("", 'demo');
    }
});



function displayCat(res, loc) {
    let cartona = "";
    if (res.categories != null) {
        for (let i = 0; i < res.categories.length; i++) {
            cartona += `<div class="col-md-3">
                <div class="cardd catg-filt" data-category="${res.categories[i].strCategory}">
                    <a href="javascript:void(0);">
                        <img src="${res.categories[i].strCategoryThumb}" class="card-img-top" alt="...">
                        <div class="overlay text-center overflow-hidden">
                            <h2>${res.categories[i].strCategory}</h2>
                            <p class="font">${res.categories[i].strCategoryDescription}</p>
                        </div>
                    </a>
                </div>
            </div>`;
        }
    }

    if (document.getElementById(`${loc}`) != null) {
        document.getElementById(`${loc}`).innerHTML = cartona;
        document.querySelectorAll('.catg-filt').forEach(card => {
            card.addEventListener('click', function () {
                let category = this.getAttribute('data-category');
                localStorage.setItem('selectedCategory', category);
                window.location.href = "index.html";
            });
        });
    }
}
async function filterCategory(item, loc) {
    let searchF = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`);
    let res = await searchF.json();
    display(res, loc);
}

// display
// const x = 0;
function display(res, loc) {
    x = 1;
    let cartona = "";
    if (res.meals != null) {
        for (let i = 0; i < res.meals.length; i++) {
            cartona += `<div class="col-md-3">
                <div class="cardd">
                   <img src="${res.meals[i].strMealThumb}" class="card-img-top" alt="...">
                  <a href="detailes.html?id=${res.meals[i].idMeal}">
                      <div class="overlay d-flex align-items-center p-2">
                         <h2>${res.meals[i].strMeal}</h2>
                      </div>
                   </a>
                </div>
             </div>`
        }
    } else {
        cartona = "";
    }
    if (document.getElementById(loc) != null)
        document.getElementById(loc).innerHTML = cartona;
}

function Id() {
    const url = new URLSearchParams(window.location.search);
    return url.get('id');
}
async function displayDeta() {
    const mealId = Id();
    if (mealId) {
        await detailes(mealId);
    }
}
displayDeta();
// Search By First Name
if (searchFN != null) {
    searchFN.addEventListener('keyup', () => {
        searchByName(searchFN.value, 'sear');
    });
}
/////


// Search By First letter
if (searchFL != null) {
    searchFL.addEventListener('keyup', (e) => {
        if (searchFL.value == "") {
            searchByFLetter('a', 'sear');
        } else
            searchByFLetter(searchFL.value, 'sear');
    });
}
////

async function area(loc) {
    let searchF = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let res = await searchF.json();
    console.log(res.meals);

    displayArea(res, loc);
}

function displayArea(res, loc) {
    let cartona = "";
    for (let i = 0; i < res.meals.length; i++) {
        cartona += `<div class="col-md-3 text-center text-white">
            <a href="javascript:void(0);" class="text-white" data-area="${res.meals[i].strArea}"> 
                <i class="fa-solid fa-house-laptop fa-4x "></i>
                <h3>${res.meals[i].strArea}</h3>
            </a>
        </div>`;
    }

    if (document.getElementById(loc) != null) {
        document.getElementById(loc).innerHTML = cartona;
        document.querySelectorAll('[data-area]').forEach(area => {
            area.addEventListener('click', function () {
                let areaName = this.getAttribute('data-area');
                localStorage.setItem('selectedArea', areaName);
                window.location.href = "index.html";
            });
        });
    }
}

async function filterArea(item, loc) {
    let searchF = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${item}`);
    let res = await searchF.json();
    display(res, loc);
}

async function ingredients(loc) {
    let searchF = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let res = await searchF.json();
    console.log(res.meals);

    displayIngredients(res, loc);
}

function displayIngredients(res, loc) {
    let cartona = "";
    for (let i = 0; i < 20; i++) {
        cartona += `<div class="col-md-3 text-center text-white max overflow-hidden">
            <a href="javascript:void(0);" class="text-white" data-ingre="${res.meals[i].strIngredient}"> 
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${res.meals[i].strIngredient}</h3>
                <p class ="max overflow-hidden">${res.meals[i].strDescription}</p>
            </a>
        </div>`;
    }

    if (document.getElementById(loc) != null) {
        document.getElementById(loc).innerHTML = cartona;
        document.querySelectorAll('[data-ingre]').forEach(ingredient => {
            ingredient.addEventListener('click', function () {
                let ingreName = this.getAttribute('data-ingre');
                localStorage.setItem('selectedIngre', ingreName);
                window.location.href = "index.html";
            });
        });
    }
}


async function filterIngre(item, loc) {
    let searchF = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${item}`);
    let res = await searchF.json();
    display(res, loc);
}

let loc = location.href;
let locArr = loc.split('/');
console.log(locArr);

if (locArr[4] == "catg.html") {
    category('catg');
} else if (locArr[4] == "area.html") {
    area('areaa');
} else if (locArr[4] == "ingredients.html") {
    ingredients('ingredientss');
}

let nameVal = /^[a-zA-Z ]+$/;
let emailVal = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let phoneVal = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let ageVal = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
let passVal = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

let submit = document.getElementById("sub");

if(document.getElementById("nameInput") != null){
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    });
}
if(document.getElementById("emailInput") != null){
    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    });
}
if(document.getElementById("phoneInput") != null){
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    });
}
if(document.getElementById("ageInput") != null){
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    });
}
if(document.getElementById("passwordInput") != null){
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    });
}
if(document.getElementById("repasswordInput")){
    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    });
}


function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submit.removeAttribute("disabled")
    } else {
        submit.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (nameVal.test(document.getElementById("nameInput").value));
}

function emailValidation() {
    return (emailVal.test(document.getElementById("emailInput").value));
}

function phoneValidation() {
    return (phoneVal.test(document.getElementById("phoneInput").value));
}

function ageValidation() {
    return (ageVal.test(document.getElementById("ageInput").value));
}

function passwordValidation() {
    return (passVal.test(document.getElementById("passwordInput").value));
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value;
}

if(document.getElementById("nameInput") != null){
    document.getElementById("nameInput").addEventListener('keyup' , () =>{
        inputsValidation();
    });
}
if(document.getElementById("emailInput") != null){
    document.getElementById("emailInput").addEventListener('keyup' , () =>{
        inputsValidation();
    });
}
if(document.getElementById("phoneInput") != null){
    document.getElementById("phoneInput").addEventListener('keyup' , () =>{
        inputsValidation();
    });
}
if(document.getElementById("ageInput") != null){
    document.getElementById("ageInput").addEventListener('keyup' , () =>{
        inputsValidation();
    });
}
if(document.getElementById("passwordInput") != null){
    document.getElementById("passwordInput").addEventListener('keyup' , () =>{
        inputsValidation();
    });
}
if(document.getElementById("repasswordInput") != null){
    document.getElementById("repasswordInput").addEventListener('keyup' , () =>{
        inputsValidation();
    });
}

if(submit != null){
    submit.addEventListener('click' , () => {
        window.location.reload();
    });
} 