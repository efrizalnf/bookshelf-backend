const { getBooks, addBook, getBookById, updateBook, deleteBookById } = require("./handler");

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getBooks
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookById,
    },
];

module.exports = routes;