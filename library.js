function Books(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Books.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

let myLibrary = [];

function addBookToLibrary() {
    let title = prompt('Title:');
    let author = prompt('Author:');
    let pages = prompt('Number of Pages:');
    let read = prompt('Has it been read yet?');
    let book = new Books(title, author, pages, read);
    myLibrary.push(book);
};

let container = document.createElement('div');
document.body.appendChild(container);

function clearPage() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };
};

function removeBook(i) {
    document.getElementById(`div${i}`).remove();
};

function change(i) {
    if (myLibrary[i].read == 'read') {
        myLibrary[i].read = 'not read';
    } else if (myLibrary[i].read == 'not read') {
        myLibrary[i].read = 'read';
    } else {
        myLibrary[i].read = 'read';
    };

    document.getElementById(`button${i}`).previousSibling.textContent = myLibrary[i].info();
};

function display() {
    clearPage();
    
    let divs = [];
    let lines = [];
    let buttons = [];
    let change = [];

    for (let i = 0; i < myLibrary.length; i++) {
        divs[i] = container.appendChild(document.createElement('div'));
        divs[i].setAttribute('id', `div${i}`);
        lines.push(divs[i].appendChild(document.createElement('p')).textContent = myLibrary[i].info());
        
        buttons[i] = document.createElement('button');
        buttons[i].textContent = 'Remove';
        divs[i].appendChild(buttons[i]).setAttribute('id', `button${i}`);
        buttons[i].setAttribute('onclick', `removeBook(${i})`);

        change[i] = document.createElement('button');
        change[i].textContent = 'Read / Not Read';
        divs[i].appendChild(change[i]).setAttribute('id', `change${i}`);
        change[i].setAttribute('onclick', `change(${i})`);
    };
};

function populateStorage() {
    for (i = 0; i < myLibrary.length; i++) {
        localStorage.setItem(`Book ${i}`, JSON.stringify(myLibrary[i]));
    };
};

function retrieveStorage() {
    for (i = 0; i < localStorage.length; i++) {
        let obj = Object.values(JSON.parse(localStorage[`Book ${i}`]));
        myLibrary[i] = new Books(obj[0], obj[1], obj[2], obj[3]);
    };
};

function newbook() {
    addBookToLibrary();
    display();
    populateStorage();
};

function load() {
    retrieveStorage();
    display();
};