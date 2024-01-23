
// Your Code Here
async function admin() {
    let response = await fetch("http://localhost:3001/listBooks")
    let books = await response.json()
    books.forEach(renderBook)
}

function renderBook(book) {
    let bookContainer = document.querySelector(".book-container")
    bookContainer.innerHTML += `
        <section class="col-sm-3">
            <section class="card admin-card" style="width: 100%;">
                <img class="card-img-top" src="${book.imageURL}" />
                <section class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Available:</h6>
                    <input type="number" id="book-${book.id}" value="${book.quantity}"/>
                    <input type="submit" id="submit-btn" value="Update Quantity" onClick="updateQuantity(${book.id})"/>
                    <p class="card-text">${book.description}</p>
                </section>
            </section>
        </section>
    `
}

async function updateQuantity(bookId) {
    let newQuantity = document.getElementById(`book-${bookId}`).value
    let response = await fetch("http://localhost:3001/updateBook/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "id": bookId,
            "quantity": newQuantity
        })
    })
    response = await response.json()
    return response;
}

admin()