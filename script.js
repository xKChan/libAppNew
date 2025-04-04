let libraryContainer = document.querySelector('.libraryContainer');

const myLibrary = [];
const dummyLib = [
  {
    title: 'Reacher',
    author: 'KC',
    pages: 95,
    read: 'Not Read',
  },
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

function fillDummyLib() {
  for (let i = 0; i < dummyLib.length; i++) {
    let title = dummyLib[i].title;
    let author = dummyLib[i].author;
    let pages = dummyLib[i].pages;
    let read = dummyLib[i].read;

    addBookToLibrary(title, author, pages, read);
  }
}

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
  if (this.read == 'Read') {
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
    const bookReadButton = document.createElement('button');
    const bookDelete = document.createElement('td');
    const deleteSymbol = document.createElement('span');

    bookTitle.classList.add('minWidthTitleAuth');
    bookAuthor.classList.add('minWidthTitleAuth');
    bookDelete.classList.add('deleteContainer');
    bookReadButton.classList.add('toggleButton');
    deleteSymbol.classList.add('centerX');

    let getLibraryBook = myLibrary[i];
    bookTitle.textContent = getLibraryBook.title;
    bookAuthor.textContent = getLibraryBook.author;
    bookPages.textContent = getLibraryBook.pages;
    bookReadButton.textContent = getLibraryBook.read;
    deleteSymbol.textContent = 'X';
    deleteSymbol.setAttribute('data-id', getLibraryBook.id);
    bookReadButton.setAttribute('data-id', getLibraryBook.id);

    bookRead.append(bookReadButton);
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
  toggleReadStatus();
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

function toggleReadStatus() {
  const getStatusToggle = document.querySelectorAll('.toggleButton');

  getStatusToggle.forEach(e => {
    e.addEventListener('click', () => {
      for (let i = 0; i < myLibrary.length; i++) {
        if (e.dataset.id == myLibrary[i].id) {
          myLibrary[i].readStatus();
        }
      }
      clearPage();
      displayBooks();
    });
  });
}

fillDummyLib();
displayBooks();
addBook();
