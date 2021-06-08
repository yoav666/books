'use strict'
const BOOKS_DB = 'booksDB'
const PAGE_SIZE = 5;

var gSortBy = 'name'
var gBooks;

var gSortDiff = 1
var gCurrPage = 0

_createbooks()

function sortBy(sortBy) {
    gSortDiff = (sortBy === gSortBy) ? -gSortDiff : 1
    gSortBy = sortBy
}

function getBooksToDisplay() {
    var fromIdx = gCurrPage * PAGE_SIZE;
    var toIdx = fromIdx + PAGE_SIZE
    sortDisplay();
    return gBooks.slice(fromIdx, toIdx);
}

function turnPage(diff) {
    if (((gCurrPage + diff) * PAGE_SIZE >= gBooks.length) || (gCurrPage + diff < 0)) return;
    gCurrPage += diff;
}

function getPage() {
    return gCurrPage + 1;
}
function sortDisplay() {
    if (gSortBy === 'name') {
        gBooks.sort(function (a, b) {
            var nameA = a.name.toUpperCase()
            var nameB = b.name.toUpperCase()
            if (nameA < nameB) {
                return -1 * gSortDiff;
            }
            if (nameA > nameB) {
                return 1 * gSortDiff;
            }
            return 0;
        })
    } else if (gSortBy === 'price') {
        gBooks.sort(function (a, b) {
            return (a.price - b.price) * gSortDiff
        })
    }
    // var books = gBooks
    // return books
}
function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function addBook(name, price) {
    if (!name || !isNaN(name)) name = undefined
    if (isNaN(price) || !price) price = undefined
    var newBook = _createBook(name, price)
    gBooks.unshift(newBook)
    _saveBooksToStorage()
}
function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}
function priceUpdate(bookId, bookNewPrice) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks[bookIdx].price = bookNewPrice
    _saveBooksToStorage()
}

function rateUpdate(bookId, newRate) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks[bookIdx].rate = newRate
    _saveBooksToStorage()
}
function _createbooks() {
    var books = loadFromStorage(BOOKS_DB)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 10; i++) books.push(_createBook())
    }
    gBooks = books
    _saveBooksToStorage()
}
function _createBook(name = makeLorem(3), price = +(getRandomIntInclusive(1, 100) + Math.random()).toFixed(2), rate = 0) {
    var book = {
        id: makeId(3),
        name: name,
        price: price,
        rate: rate,
        desc: makeLorem(50),
    }
    return book
}
function _saveBooksToStorage() {
    saveToStorage(BOOKS_DB, gBooks)
}