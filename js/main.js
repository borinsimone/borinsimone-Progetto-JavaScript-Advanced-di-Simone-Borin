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
    console.log("ciao");
})
resetCircle.addEventListener("animationend", () => {    
    resetCircle.classList.remove("animated");
})

function headerStyle() {
        // output.style.height="80vh"
        // spinner.classList.remove("spinnerHide")
        output.innerHTML = "";
        output.classList.add("outputVisible");
        output.style.opacity="1"
        container.style.height ="100vh"
        container.style.width="100vw"
        headerTitle.style.opacity="0"
        console.log( input.value);
        // getBooks()
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
        // headerStyle()

        getBooks()

    }
// const getDescription = async (responseKey, Response) => {
//         try {
//             const descrUrl = "https://openlibrary.org" +
//                     responseKey +
//                     ".json";
//         const descRes = await fetch(descrUrl);
//         console.log(descRes.ok);
            
//         } catch (error) {
//             console.error(error);
//         }
//         console.log(Response);
        
//     }



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
                
                // console.log( Response.works[i].key);
                detailsBtn.addEventListener("click", function () {
                    let chiave=  Response.works[i].key;
                    // console.log(chiave);
              findDescription(chiave, Response, i)
                // fetch("https://openlibrary.org" +
                //     Response.works[i].key +
                //     ".json").then((b)=>{
                //        return b.json()
                //     }).then((bookData) => {
                //         console.log(bookData);
                        // console.log( bookData.description );
                        // if (typeof bookData.description.value === "undefined") {
                        // desc = bookData.description;
                        // // console.log(bookData.description );
                            
                        // } else {
                        //     desc = bookData.description.value;
                        //     // console.log(bookData.description.value );
                        // }
                        // console.log( bookData.description);
                //         setText();
                //         return bookData;
                //     })

    })

      
        }
    }
    
    // function setText(bookData) {
    //     console.log(bookData);
    // }
    // const setText  = async (bookData) => {
    //     console.log(bookData);

    // }

    // function getBooks() {
    //     input.value = input.value.replace(" ", '_');
    //     input.value = input.value.toLowerCase();
    //     console.log(input.value);
    //     console.log();
    // }
        //  .addEventListener ("load", function () {
        //         spinner.classList.remove("spinnerHide")
        //     })

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

            if (typeof bookData.description.value === "undefined") {
                console.log(bookData.description);
                descriptionTitle.innerHTML =
                Response.works[i].title;
                descriptionTextBox.innerHTML =
                bookData.description;
            } else {
                console.log(bookData.description.value);
                descriptionTitle.innerHTML =
                Response.works[i].title;
                descriptionTextBox.innerHTML =
                bookData.description.value;
            }


                // let coverUtility = document.createElement("div");
                // coverUtility.classList.add("coverUtility");
                descriptionTitle.after(coverUtility)
                coverUtility.style.backgroundImage = "url(https://covers.openlibrary.org/b/id/" + Response.works[i].cover_id +"-M.jpg)"

                // bookDetailsPage.style.opacity="1";
                // bookDetailsPage.style.zIndex="99"
                // bookDetailsPageUtility.style.opacity="1";
                // bookDetailsPageUtility,style.pointerEvents = "auto !important";
                // bookDetailsPageUtility.style.zIndex="98"
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
                // spinner.classList.remove("spinnerHide")
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
                // throw "no book found"
                // console.log(res);
                headerStyle();
                createCard(Response);
                
                return Response


            }else{
                throw "no book found"

            }

            }
 
    catch(err){
        console.error(err);
    }
    finally{
    // spinner.classList.add("spinnerHide")
    spinner.style.opacity="0"
    // headerStyle()
    };

 

    
    }


    

    // getBooks().then((Response) => console.log(Response))

