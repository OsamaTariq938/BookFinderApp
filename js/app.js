console.log('added');


// Initialize everything
let btn = document.getElementById('submit');
let booktype = document.getElementById('booktype');
let books = document.getElementById('books');
let url = "https://www.googleapis.com/books/v1/volumes?q=";
let data = {}; //for getting data from api
let str = ''; //to add innerhtml

//When user search, add event listner to the button
btn.addEventListener('click', () => {

    //1- When search again, then delete all previous cards from DOM
    let card = document.getElementsByClassName('card')
    //console.log(card);
    for (let c of card) {
        if (c != undefined) {
            c.style.display = 'none';
            //console.log(c);
        }
    }
    //1- Completed


    let type = booktype.value;
    console.log('before url ', data);
    //if user has enter any thing in search book 
    if (type != null && type != undefined) {
        url += type;
        fetch(url, {
            method: 'GET'
        }).then(response => response.text()).then((text) => {
            data = JSON.parse(text);
            let titles = data["items"];
            titles.forEach(function (element, index) {
                str = `<div id = "card" class="card my-2">
                            <h5 class="card-header">Book Title: ${titles[index]["volumeInfo"]["title"]}</h5>
                            <div class="card-body">
                            <h5 class="card-title">Author(s): ${titles[index]["volumeInfo"]["authors"]}</h5>
                            <p class="card-text">Published on: ${titles[index]["volumeInfo"]["publishedDate"]}</p>
                            </div>
                        </div>`;
                console.log('After url ', titles[index]["volumeInfo"]["title"]);
                books.innerHTML += str;

            })
            url = "https://www.googleapis.com/books/v1/volumes?q=";
            data = {};
        })
    }
    books.innerHTML = '<br><h2> Results..</h2>';
})