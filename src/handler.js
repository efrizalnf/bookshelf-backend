const { nanoid } = require('nanoid')
const books = require('./books')

const addBook = (request, h) => {
    try {
        let {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading
        } = request.payload

        if (name === null) {
            const res = h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. Mohon isi nama buku"
            }).code(400);
            return res;
        }

        let id = nanoid(16).toString();
        let insertedAt = new Date().toISOString();
        let updatedAt = insertedAt;
        let finished = readPage === pageCount
        if (readPage > pageCount) {
            const res = h.response({
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400);
            return res;
        }
        let newBook = {
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt,
            updatedAt,
        }
        books.push(newBook);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            },
        }).code(201);
        return response;
    } catch (error) {
        console.log(error)
        const response = h.response({
            "status": "error",
            "message": "Buku gagal ditambahkan"
        }).code(500);
        return response;
    }
}

const getBooks = (request, h) => {
    try {
        const {
            name,
            reading,
            finished
        } = request.query
        const dat = books
            .filter((data) => {
                return (name ? (data.name.toLowerCase().includes(name.toLowerCase())) : true)
            }).filter((data) => {
                return (reading && ['0', '1'].includes(reading.toString()) ? data.reading == (reading.toString() == '1') : true)
            })
            .filter((data) => {
                return (finished && ['0', '1'].includes(finished.toString()) ? data.finished == (finished.toString() == '1') : true)
            })
            .map(data => { return { id: data.id, name: data.name, publisher: data.publisher } });
        console.log(dat);
        const respon = h.response({ status: 'success', data: { books: dat } }).code(200);
        return respon;

    } catch (error) {
        console.log(error)
        const response = h.response({
            status: 'fail',
            message: 'Maaf, Buku kamu gagal ditampilkan',
        }).code(500);
        return response;
    }
};

const getBookById = (request, h) => {
    try {
        const id = request.params;
        console.log(id);
        const book = books.filter((data) => data.id === id.bookId)[0];
        console.log(book);
        if (!book) {
            const respon = h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
            return respon;
        } else {
            const respon = h.response({
                status: 'success',
                data: { book: book }
            }).code(200);
            return respon;
        }
    } catch (error) {
        console.log(error);
        const respon = h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
        return respon;
    }
}

const updateBook = (request, h) => {
    try {

        let {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading
        } = request.payload

        let id = request.params;
        let findBook = books.findIndex((data) => data.id === id.bookId);
        let updatedAt = new Date().toISOString();
        if (readPage > pageCount) {
            const res = h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400);
            return res;
        }

        if (findBook !== -1) {
            books[findBook] = {
                ...books[findBook],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
                updatedAt,
            }
            if (!name) {
                const res = h.response({
                    "status": "fail",
                    "message": "Gagal memperbarui buku. Mohon isi nama buku"
                }).code(400);
                return res;
            }
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            }).code(200);
            return response;
        } else {
            const response = h.response({
                "status": "fail",
                "message": "Gagal memperbarui buku. Id tidak ditemukan"
            }).code(404);
            return response;
        }
    } catch (error) {
        console.log(error)
        const response = h.response({
            "status": "error",
            "message": "Buku gagal diperbarui"
        }).code(500);
        return response;
    }
}

const deleteBookById = (request, h) => {
    try {
        const id = request.params;
        console.log(id);
        const book = books.filter((data) => data.id === id.bookId)[0];
        console.log(book);
        if (!book) {
            const respon = h.response({ status: 'fail', message: 'Buku gagal dihapus. Id tidak ditemukan' }).code(404);
            return respon;
        } else {
            const respon = h.response({
                status: 'success',
                message: 'Buku berhasil dihapus'
            }).code(200);
            return respon;
        }
    } catch (error) {
        console.log(error);
        const respon = h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
        return respon;
    }
}

module.exports = { getBooks, addBook, getBookById, updateBook, deleteBookById };