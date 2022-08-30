const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';

    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }


    const phonesNotFound = document.getElementById('phone-not-found');
    if (phones.length === 0) {
        phonesNotFound.classList.remove('d-none')
    }
    else {
        phonesNotFound.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
    <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
    </div>
    `;
        phonesContainer.appendChild(phoneDiv);
    })
    toggleSpinner(false)
}


const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // searchField.value = '';
    loadPhones(searchText, dataLimit);
}


document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);

})

const toggleSpinner = isLoading => {
    const spinLoader = document.getElementById('spin-loader');
    if (isLoading) {
        spinLoader.classList.remove('d-none')
    }
    else {
        spinLoader.classList.add('d-none')
    }
}


document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})
