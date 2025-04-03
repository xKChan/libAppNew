let libraryContainer = document.querySelector('.libraryContainer');

const myLibrary = [
  {
    title: 'Reacher',
    author: 'KC',
    pages: 95,
    read: 'Not Read',
    id: 'daa5d7jb-8060-9846-c2e9-1711d5e07bd1',
  },
  {
    title: 'The Witcher',
    author: 'Andrzej Sapkowski',
    pages: 400,
    read: 'Not Read',
    id: 'daa5d7db-8060-9846-c2e9-1711d5e05bd5',
  },
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    pages: 320,
    read: 'Read',
    id: 'daa5d7jb-8060-9846-c2e9-1711d5e07bd2',
  },
  {
    title: '48 Laws of Power',
    author: 'Robert Greene',
    pages: 480,
    read: 'Read',
    id: 'dab5d7db-8060-9846-c2f9-1711g5e05bd9',
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

Book.prototype.readStatus = function () {
  this.info();
  if ((this.read = 'Read')) {
    return (this.read = 'Not Read');
  } else {
    return (this.read = 'Read');
  }
};

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
  const deleteHeader = document.createElement('th');

  titleHeader.textContent = 'Title';
  authorHeader.textContent = 'Author';
  pagesHeader.textContent = 'Pages';
  readHeader.textContent = 'Read';
  deleteHeader.textContent = 'Delete';

  bookTableHead.append(
    titleHeader,
    authorHeader,
    pagesHeader,
    readHeader,
    deleteHeader
  );
  bookTable.append(bookTableHead, bookTableBody);
  libraryContainer.append(bookTable);

  for (let i = 0; i < myLibrary.length; i++) {
    const bookContainer = document.createElement('tr');
    const bookTitle = document.createElement('td');
    const bookAuthor = document.createElement('td');
    const bookPages = document.createElement('td');
    const bookRead = document.createElement('td');
    const bookDelete = document.createElement('td');
    const deleteSymbol = document.createElement('span');

    bookTitle.classList.add('minWidthTitleAuth');
    bookAuthor.classList.add('minWidthTitleAuth');
    bookDelete.classList.add('deleteContainer');
    deleteSymbol.classList.add('centerX');

    let getLibraryBook = myLibrary[i];
    bookTitle.textContent = getLibraryBook.title;
    bookAuthor.textContent = getLibraryBook.author;
    bookPages.textContent = getLibraryBook.pages;
    bookRead.textContent = getLibraryBook.read;
    deleteSymbol.textContent = 'X';
    deleteSymbol.setAttribute('data-id', getLibraryBook.id);

    bookDelete.append(deleteSymbol);

    bookContainer.append(
      bookTitle,
      bookAuthor,
      bookPages,
      bookRead,
      bookDelete
    );
    bookTableBody.appendChild(bookContainer);
  }
  deleteBook();
}

function addBook() {
  const saveButton = document.getElementById('saveButton');
  const getTitle = document.getElementById('getTitle');
  const getAuthor = document.getElementById('getAuthor');
  const getPages = document.getElementById('getPages');
  const getRead = document.getElementsByName('read');
  const showForm = document.querySelector('.showForm');

  openDialog(showForm);
  closeDialog(showForm);

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

function openDialog(form) {
  const btnClick = document.querySelector('.newBookBtn');

  btnClick.addEventListener('click', () => {
    form.showModal();
  });
}

function closeDialog(form) {
  const closeButton = document.getElementById('cancelButton');

  closeButton.addEventListener('click', e => {
    form.close();
    e.preventDefault();
  });
}

function clearPage() {
  while (libraryContainer.firstChild) {
    libraryContainer.removeChild(libraryContainer.firstChild);
  }
}

function deleteBook() {
  const getDeleteClick = document.querySelectorAll('.centerX');

  getDeleteClick.forEach(e => {
    e.addEventListener('click', () => {
      for (let i = 0; i < myLibrary.length; i++) {
        if (e.dataset.id == myLibrary[i].id) {
          myLibrary.splice(i, 1);
        }
      }
      clearPage();
      displayBooks();
    });
  });
}

displayBooks();
addBook();
