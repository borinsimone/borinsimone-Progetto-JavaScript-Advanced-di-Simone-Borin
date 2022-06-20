let spinner = document.getElementById("spinner");
let scrollContainer = document.getElementById("scrollContainer");
let container = document.getElementById("container");
let headerTitle = document.getElementById("headerTitle");
let searchBox = document.getElementById("searchBox");
let input = document.getElementById("input");
let searchBtn = document.getElementById("searchBtn");
let line = document.getElementById("line");
let output = document.getElementById("output");

let bookDetailsPageUtility = document.getElementById("bookDetailsPageUtility");
let bookDetailsPage = document.getElementById("bookDetailsPage"
);
let closeDetails = document.getElementById("closeDetails");
let descriptionTitle = document.getElementById("descriptionTitle"
);
let descriptionTextBox = document.getElementById("descriptionTextBox"
);
let closeUtility = document.getElementById("closeUtility"
);

let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);


function createCard(params) {
        let card = document.createElement("div");
          card.classList.add("card")
            output.appendChild(card);
        let bookTitle = document.createElement("div");
            bookTitle.classList.add("bookTitle");
            card.appendChild(bookTitle);
        let authorName = document.createElement("div");
            authorName.classList.add("authorName");
            card.appendChild(authorName);

        let detailsBtn = document.createElement("div");
            detailsBtn.classList.add("detailsBtn");
            detailsBtn.innerHTML = "see description";
            card.appendChild(detailsBtn);
        bookTitle.innerHTML = Response.works[i].title;
        authorName.innerHTML =
                Response.works[i].authors[0].name;
        card.classList.add("cardOn")

        
      }

function headerStyle() {
        output.style.height="80vh"
        spinner.classList.remove("spinnerHide")
        output.style.opacity="0"
        container.style.height="100vh"
        container.style.width="100vw"
        headerTitle.style.opacity="0"
        console.log( input.value);
        getBooks()
}

input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
        headerStyle()
        
        }
      });
searchBtn.addEventListener("click", function () {
        headerStyle()
        

      })
      










    let vocalSubmit = document.getElementById("vocalSubmit")
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();



    recognition.onstart = function () {
      recognition.lang = 'en-US';
        console.log("ascolto");


    }
    recognition.onspeechend = function () {
        recognition.stop();
      console.log("non ascolto");
    }
    recognition.onresult = function () {
        var transcript = event.results[0][0].transcript;
        transcript=transcript.toLowerCase()
        input.value= transcript;
        headerStyle()

        getBooks()

    }
       vocalSubmit.addEventListener("click", function () {
           
           recognition.start()

       })




















function getBooks(){
        input.value = input.value.replace(" ", '_');
        input.value = input.value.toLowerCase();
        console.log(input.value);
        console.log();
        fetch(
          "//openlibrary.org/subjects/" +
            input.value +
            ".json?details=true"
        )  
        .then((Response) => {
            if (Response.status >= 200  && Response.status <= 299) {
              console.log(Response.status);
              console.log(typeof Response);

              return Response.json();
                

            } else{
                
                spinner.classList.add("spinnerHide")

                swal(
                    "Please write something :)"
                    );
               
                
            }
        })
        
        .then((Response) => {
            
          console.log(Response.work_count);
              if (Response.work_count !== 0) {
                // headerStyle();
        spinner.classList.add("spinnerHide");
       output.style.opacity="1";
        output.innerHTML="";
        line.style.opacity=".7";
        line.style.margin="1em";
        output.style.height="fit-content"
        output.style.minHeight="80vh"
            for (let i = 0; i < 10; i++) {
        let card = document.createElement("div");
            card.classList.add("card")
            output.appendChild(card);
  
        
        let cardBg = document.createElement("div");
            cardBg.classList.add("cardBg");
            card.appendChild(cardBg);
        let bookTitle = document.createElement("div");
            bookTitle.classList.add("bookTitle");
            cardBg.appendChild(bookTitle);
        let authorName = document.createElement("div");
            authorName.classList.add("authorName");
            cardBg.appendChild(authorName);
        let detailsBtn = document.createElement("div");
            detailsBtn.classList.add("detailsBtn");
            detailsBtn.innerHTML = "see description";
            cardBg.appendChild(detailsBtn);


        bookTitle.innerHTML = Response.works[i].title;
        authorName.innerHTML =
        Response.works[i].authors[0].name;
        card.classList.add("cardOn")

        detailsBtn.addEventListener("click", function () {
        spinner.classList.remove("spinnerHide")

            fetch("https://openlibrary.org" +
                    Response.works[i].key +
                    ".json")
            



.then((b) => {
            if (b.status >= 200  && b.status <= 299) {
              console.log(b.status);
              console.log(typeof b);

              return b.json();}})







            .then((bookData) => {
                if (
                      typeof bookData.description.value ===
                      "undefined"
                    ){
                        descriptionTitle.innerHTML =
                        Response.works[i].title;
                        descriptionTextBox.innerHTML =
                        bookData.description;
                        
                        console.log(bookData.description);
                    }     else {
                            descriptionTitle.innerHTML =
                            Response.works[i].title;
                            descriptionTextBox.innerHTML =
                            bookData.description.value;

                        }

                let coverUtility = document.createElement("div");
                coverUtility.classList.add("coverUtility");
                descriptionTitle.after(coverUtility)
                coverUtility.style.backgroundImage = "url(https://covers.openlibrary.org/b/id/" + Response.works[i].cover_id +"-M.jpg)"

                bookDetailsPage.style.opacity="1";
                bookDetailsPage.style.zIndex="99"
                bookDetailsPageUtility.style.opacity="1";
                bookDetailsPageUtility.style.zIndex="98"
                spinner.classList.add("spinnerHide")

                
        
                
                bookDetailsPageUtility.addEventListener("click", function () {

                  
                    bookDetailsPage.style.opacity="0";  
                    bookDetailsPage.style.zIndex="-2"

                    bookDetailsPageUtility.style.opacity="0";
                    bookDetailsPageUtility.style.zIndex="-3"
                    descriptionTitle.innerHTML = "";
                    coverUtility.remove();
                    descriptionTextBox.innerHTML = "";
                });
                closeDetails.addEventListener("click", function () {

                    bookDetailsPage.style.opacity="0";
                    bookDetailsPage.style.zIndex="-2"

                    bookDetailsPageUtility.style.opacity="0";
                    bookDetailsPageUtility.style.zIndex="-3"
                    descriptionTitle.innerHTML = "";
                    coverUtility.remove();
                    descriptionTextBox.innerHTML = "";
                    });

                bookDetailsPage.removeEventListener("click", function () {
                });
              

            })
        })
        
        
      }
              } else{
                spinner.classList.add("spinnerHide")
                swal(
                    "Seems like you're looking for something that doesn't exist.."
                    );
              }








        })
      
    }
