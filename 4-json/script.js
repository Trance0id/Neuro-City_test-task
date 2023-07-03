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

const api = new Api('https://reqres.in/api/users');
const nav = document.querySelector('.navigation');
const personList = document.querySelector('.persons');

api.getData().then(res => {
  const numOfPages = res.total_pages;
  for (let i = 1; i <= numOfPages; i++) {
    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('type', 'button');
    buttonElement.classList.add('navigation__button');
    buttonElement.textContent = String(i);
    buttonElement.addEventListener('click', () => {
      personList.innerHTML = '';
      getPage(i);
    });
    nav.append(buttonElement);
  }
});

function getPage(page) {
  api
    .getData(page)
    .then(res => {
      const persons = res.data.toSorted((a, b) => {
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
      persons.forEach(person => {
        const personElement = document.createElement('li');
        personElement.classList.add('persons__item');
        Object.keys(person).forEach(key => {
          const personData = document.createElement('div');
          personData.textContent = `${key}: ${person[key]};`;
          personElement.append(personData);
        });
        personList.append(personElement);
      });
    })
    .catch(err => {
      console.log(err);
    });
}
