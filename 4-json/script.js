class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._url = this._baseUrl;
  }

  getData(page = 0) {
    if (page) {
      this._url = this._baseUrl + `?page=${page}`;
    }
    return fetch(this._url).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка! Статус: ${res.status}`);
      }
    });
  }
}

function makeSortedArray(arr) {
  return arr.toSorted((a, b) => {
    const nameA = a.last_name.toLowerCase();
    const nameB = b.last_name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

async function getPageByNo(pageNo) {
  try {  
    const personsUnsorted = await api.getData(pageNo);
    console.log(personsUnsorted.data);
    const personsSorted = makeSortedArray(personsUnsorted.data);
    personsSorted.forEach(person => {
      const personElement = document.createElement('li');
      personElement.classList.add('persons__item');
      Object.keys(person).forEach(key => {
        const personData = document.createElement('div');
        personData.textContent = `${key}: ${person[key]};`;
        personElement.append(personData);
      });
      personList.append(personElement);
    });
  } catch(err) {
    console.log(err);
  }  
}

async function renderButtons() {
  const serverData = await api.getData();
  const numOfPages = serverData.total_pages;
  for (let i = 1; i <= numOfPages; i++) {
    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('type', 'button');
    buttonElement.classList.add('navigation__button');
    buttonElement.textContent = String(i);
    buttonElement.addEventListener('click', () => {
      personList.innerHTML = '';
      getPageByNo(i);
    });
    nav.append(buttonElement);
  }
}

const api = new Api('https://reqres.in/api/users');
const nav = document.querySelector('.navigation');
const personList = document.querySelector('.persons');

renderButtons();

// api.getData().then(res => {
//   const numOfPages = res.total_pages;
//   for (let i = 1; i <= numOfPages; i++) {
//     const buttonElement = document.createElement('button');
//     buttonElement.setAttribute('type', 'button');
//     buttonElement.classList.add('navigation__button');
//     buttonElement.textContent = String(i);
//     buttonElement.addEventListener('click', () => {
//       personList.innerHTML = '';
//       getPageByNo(i);
//     });
//     nav.append(buttonElement);
//   }
// });
