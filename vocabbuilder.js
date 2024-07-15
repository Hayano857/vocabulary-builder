async function fetchData(url) {
const response = await fetch(url);
let words = response.json();
return words;
}

function startPage(){
    document.body.innerHTML = "";
    const wordsA = fetchData("./vocabbuilder.json");
    wordsA.then(wordsA => {
        document.write("<div><h1>Remember words below</h1></div>");
        for(let i=0;i<wordsA.length;i++){
            num = i+1;
            document.write("<div>" + 
                                String(num) + ". " + wordsA[i].word +
                            "</div>");
            document.write("<div>" + 
                                "Definition: " + wordsA[i].definitionA +
                            "</div><br>");
        }
        document.write("<br><button onclick=\"startQuiz()\">Start Quiz</button>");
    });
}
function startQuiz(){
    document.body.innerHTML = "";
    const wordsA = fetchData("./vocabbuilder.json");
    wordsA.then(wordsA => {
        vocabs = [];
        for(let i=0;i<3;i++){
            let num = Math.floor(Math.random() * wordsA.length - 1) + 1;
            newWordA = wordsA[num];
            vocabs.push(newWordA);
            wordsA.splice(num,1);
        }
        let numA = Math.floor(Math.random() * vocabs.length - 1) + 1;
        document.write("<div id=\"questionA\" data-word=" + vocabs[numA].word + "><h2>Please select a definition of the word \"" + vocabs[numA].word + "\"</h2></div><br>");
        for(let i=0;i<vocabs.length;i++){
            txtNum = i+1;
            document.write("<div>" + 
                                "<input type=\"radio\" name=\"wordlist\" value=" + vocabs[i].word + ">" +
                                "<label for=" + vocabs[i].word + ">" + String(txtNum)+". "+vocabs[i].definitionA + "</label>" +
                            "</div>");
        }
        document.write("<br><button onclick=\"checkA()\">Submit</button>");
        document.write("<br><br><button onclick=\"startQuiz()\">Another word</button>");
        document.write("<button onclick=\"startPage()\">Go back to the word list</button>");
    });
}


function checkA(){
    wordA = document.getElementById("questionA").getAttribute("data-word");
    document.getElementsByName("wordlist")
        .forEach(radio => {
            if(radio.checked){
                wordC = radio.value;
            }
        });
    if(wordA===wordC){
        alert("Correct");
    }
    else{
        alert("That is the definition of \"" + wordC + "\".");
    }
}

startPage();