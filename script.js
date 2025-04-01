let libraryContainer = document.querySelector('.libraryContainer');

const myLibrary = [
  { title: 'Reacher', author: 'KC', pages: 95, read: 'Not Read' },
  {
    title: 'The Witcher',
    author: 'Andrzej Sapkowski',
    pages: 400,
    read: 'Not Read',
  },
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    pages: 320,
    read: 'Read',
  },
  {
    title: '48 Laws of Power',
    author: 'Robert Greene',
    pages: 480,
    read: 'Read',
  },
];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;

  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read} // Book Id: ${id}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  let getId = crypto.randomUUID();
  let newBook = new Book(title, author, pages, read, getId);
  myLibrary.push(newBook);
}

function displayBooks() {
  const bookTable = document.createElement('table');
  const bookTableHead = document.createElement('thead');
  const bookTableBody = document.createElement('tbody');

  const titleHeader = document.createElement('th');
  const authorHeader = document.createElement('th');
  const pagesHeader = document.createElement('th');
  const readHeader = document.createElement('th');

  titleHeader.textContent = 'Title';
  authorHeader.textContent = 'Author';
  pagesHeader.textContent = 'Pages';
  readHeader.textContent = 'Read';

  bookTableHead.append(titleHeader, authorHeader, pagesHeader, readHeader);
  bookTable.append(bookTableHead, bookTableBody);
  libraryContainer.append(bookTable);

  for (let i = 0; i < myLibrary.length; i++) {
    const bookContainer = document.createElement('tr');
    const bookTitle = document.createElement('td');
    const bookAuthor = document.createElement('td');
    const bookPages = document.createElement('td');
    const bookRead = document.createElement('td');

    let getLibraryBook = myLibrary[i];
    bookTitle.textContent = getLibraryBook.title;
    bookAuthor.textContent = getLibraryBook.author;
    bookPages.textContent = getLibraryBook.pages;
    bookRead.textContent = getLibraryBook.read;

    bookContainer.append(bookTitle, bookAuthor, bookPages, bookRead);
    bookTableBody.appendChild(bookContainer);
  }
}

function addBook() {
  const btnClick = document.querySelector('.newBookBtn');
  const showForm = document.querySelector('.showForm');
  const saveButton = document.getElementById('saveButton');
  const closeButton = document.getElementById('cancelButton');
  const getTitle = document.getElementById('getTitle');
  const getAuthor = document.getElementById('getAuthor');
  const getPages = document.getElementById('getPages');
  const getRead = document.getElementsByName('read');

  btnClick.addEventListener('click', () => {
    showForm.showModal();
  });

  closeButton.addEventListener('click', e => {
    showForm.close();
    e.preventDefault();
  });

  saveButton.addEventListener('click', e => {
    e.preventDefault();

    let addTitle = getTitle.value;
    let addAuthor = getAuthor.value;
    let addPages = getPages.value;
    let addReadStatus = '';

    for (let i = 0; i < getRead.length; i++) {
      if (getRead[i].checked) {
        addReadStatus = getRead[i].value;
      }
    }

    if (addTitle != '' && addAuthor != '' && addPages != '') {
      addBookToLibrary(addTitle, addAuthor, addPages, addReadStatus);
      clearPage();
      displayBooks();
      showForm.close();
    }
  });
}

function clearPage() {
  while (libraryContainer.firstChild) {
    libraryContainer.removeChild(libraryContainer.firstChild);
  }
}

displayBooks();
addBook();
