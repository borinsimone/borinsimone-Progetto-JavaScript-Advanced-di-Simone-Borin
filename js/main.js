let spinner = document.getElementById("spinner");
let scrollContainer = document.getElementById("scrollContainer");
let container = document.getElementById("container");
let headerTitle = document.getElementById("headerTitle");
let searchBox = document.getElementById("searchBox");
let resetCircle = document.getElementById("resetCircle");
let input = document.getElementById("input");
let searchBtn = document.getElementById("searchBtn");
let line = document.getElementById("line");
let output = document.getElementById("output");

let bookDetailsPageUtility = document.getElementById("bookDetailsPageUtility");
let bookDetailsPage = document.getElementById("bookDetailsPage"
);
let coverUtility = document.getElementById("coverUtility");
let descriptionTitle = document.getElementById("descriptionTitle"
);
let descriptionTextBox = document.getElementById("descriptionTextBox"
);
let closeUtility = document.getElementById("closeUtility"
);


//mobile response
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

resetCircle.addEventListener("mouseover", () => {
    resetCircle.classList.add("animated")
})
resetCircle.addEventListener("animationend", () => {    
    resetCircle.classList.remove("animated");
})

function headerStyle() {
        output.innerHTML = "";
        output.classList.add("outputVisible");
        output.style.opacity="1"
        container.style.height ="100vh"
        container.style.width="100vw"
        headerTitle.style.opacity="0"
}
input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            getBooks()
        }
      });
searchBtn.addEventListener("click", function () {
        
getBooks()
      })

let vocalSubmit = document.getElementById("vocalSubmit")
vocalSubmit.addEventListener("click", function () {
    recognition.start()
})
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.onstart = function () {
      recognition.lang = 'en-US';
        console.log("recognition started");


    }
recognition.onspeechend = function () {
        recognition.stop();
      console.log("recognition stopped ");
    }
recognition.onresult = function () {
        var transcript = event.results[0][0].transcript;
        transcript=transcript.toLowerCase()
        input.value= transcript;

        getBooks()

    }




    function createCard(Response) {
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

        card.classList.add("cardOn")
        
                bookTitle.innerHTML = Response.works[i].title;
                authorName.innerHTML =
                Response.works[i].authors[0].name;
                card.classList.add("cardOn")
                
                detailsBtn.addEventListener("click", function () {
                    let chiave=  Response.works[i].key;
              findDescription(chiave, Response, i)
       

    })

      
        }
    }


    let findDescription = async(chiave, Response,i)=> {
        console.log(chiave);
        try {
            let urlDesc="https://openlibrary.org" +
                    chiave +
                    ".json"
            let Result = await fetch(urlDesc) 
            console.log(Result.ok);
            let bookData = await Result.json();
            console.log(bookData.description);

            descriptionTitle.innerHTML =
            Response.works[i].title;
            if (typeof bookData.description.value === "undefined") {
                console.log(bookData.description);
                descriptionTextBox.innerHTML =
                bookData.description;
            } else {
                console.log(bookData.description.value);
                descriptionTextBox.innerHTML =
                bookData.description.value;
            }


                descriptionTitle.after(coverUtility)
                coverUtility.style.backgroundImage =  "url(https://covers.openlibrary.org/b/id/" + Response.works[i].cover_id +"-M.jpg)"

                bookDetailsPageUtility.classList.add("pageFadeIn")
                bookDetailsPageUtility.classList.remove("pageFadeOut")
                spinner.classList.add("spinnerHide")
bookDetailsPageUtility.addEventListener("click", function () {
                // bookDetailsPageUtility,style.pointerEvents = "none";
                // bookDetailsPageUtility.style.opacity="0";

                bookDetailsPageUtility.classList.remove("pageFadeIn")
                bookDetailsPageUtility.classList.add("pageFadeOut")


    
    // bookDetailsPage.style.opacity="0";  
    // bookDetailsPage.style.zIndex="-2"

    // bookDetailsPageUtility.style.opacity="0";
    // bookDetailsPageUtility.style.zIndex="-3"
    descriptionTitle.innerHTML = "";
    // coverUtility.remove();
    // coverUtility.style.backgroundImage = "none";
    descriptionTextBox.innerHTML = "";
    });


            return bookData;
        } catch (e) {
            console.error(e)
        }
    }

    
    let getBooks= async ()=>{
                spinner.style.opacity="1"
                input.value = input.value.replace(" ", '_');
                input.value = input.value.toLowerCase();
                output.style.opacity="0";

                console.log(input.value);
        try {
            let url = "//openlibrary.org/subjects/" +
                input.value +
                ".json?details=true";
            let res = await fetch(url);

            console.log(res.ok);
            let Response = await res.json();
            console.log(Response.work_count);
            if (Response.work_count !== 0 && res.ok) {
                headerStyle();
                createCard(Response);
                
                return Response


            }else{
             
                throw "no book found";

            }

            }
            
 
    catch(err){
        console.error(err);
        input.value = "";
        swal(
            "Seems like you're looking for something that doesn't exist.."
        );
    }
    finally{
    spinner.style.opacity="0"
    };

 

    
    }


  