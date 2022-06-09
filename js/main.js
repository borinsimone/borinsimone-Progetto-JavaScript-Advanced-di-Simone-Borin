let spinner = document.getElementById("spinner");
let scrollContainer = document.getElementById("scrollContainer");
let container = document.getElementById("container");
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

function resize() {
  scrollContainer.style.height = window.innerHeight
}
window.addEventListener("resize", resize)






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
        // removeSpaces()
        console.log( input.value);
        getBooks()
}

input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
        headerStyle()
        // removeSpaces(input.value)
        // console.log(input.value);
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
        // console.log(input.value);
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
        spinner.classList.add("spinnerHide")
       output.style.opacity="1"
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
            fetch("https://openlibrary.org" +
                    Response.works[i].key +
                    ".json")
            .then((b) => b.json())
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

                bookDetailsPage.classList.add(
                  "bookDetailsPage-visible"
                );
                bookDetailsPageUtility.style.opacity="1";
                bookDetailsPageUtility.style.zIndex="98"
                
        
                
                bookDetailsPageUtility.addEventListener("click", function () {

                  
                    bookDetailsPage.classList.remove("bookDetailsPage-visible");
                    bookDetailsPageUtility.style.opacity="0";
                    descriptionTitle.innerHTML = "";
                    coverUtility.remove();
                    descriptionTextBox.innerHTML = "";
                    bookDetailsPageUtility.style.zIndex="-3"
                });
                closeDetails.addEventListener("click", function () {

                    bookDetailsPage.classList.remove("bookDetailsPage-visible");
                    bookDetailsPageUtility.style.opacity="0";
                    descriptionTitle.innerHTML = "";
                    coverUtility.remove();
                    descriptionTextBox.innerHTML = "";
                    bookDetailsPageUtility.style.zIndex="-3"
                    });

              function newFunction() {
                bookDetailsPage.removeEventListener("click", function () {
                });
              }

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
