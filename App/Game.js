import {Quote} from "./Quote.js"

class Game{

    currentStep=0;
    lastStep=7;

    quotes=[
        {
            text:"pizza",
            category:"food"
        }, {
            text:"spaghetti",
            category:"food"
        }, {
            text:"mathematics",
            category:"school subject"
        }, {
            text:"geographics",
            category:"school subject"
        },{
            text:"blue",
            category:"colors"
        }, {
            text:"yellow",
            category:"colors"
        }, {
            text:"teacher",
            category:"jobs"
        }, {
            text:"doctor",
             category:"jobs"
        }
    ];
    constructor({
        lettersWrapper, categoryWrapper, wordWrapper, outputWrapper
    }){
this.lettersWrapper=lettersWrapper;
this.categoryWrapper=categoryWrapper;
this.wordWrapper=wordWrapper;
this.outputWrapper=outputWrapper;

const{text,category}=this.quotes[Math.floor(Math.random()*this.quotes.length)];
this.categoryWrapper.innerHTML=category;
this.quote=new Quote(text);
    }
    guess(letter,e){
        e.target.disabled=true;
        if(this.quote.guess(letter)){
        this.drawQuote();

}else{
    this.currentStep++;
    document.getElementsByClassName("step")[this.currentStep].style.opacity=1;
    if(this.currentStep==this.lastStep){
        this.loosing();
    }
};
    }

    drawLetters(){
        for(let i=0; i<26; i++){
            const label=(i+10).toString(36);
            const button=document.createElement("button");
            button.innerHTML=label;
            button.addEventListener('click', (e)=> this.guess(label,e));
            this.lettersWrapper.appendChild(button);
    }
}

    drawQuote(){
    const content=this.quote.getContent();
    this.wordWrapper.innerHTML=content;  
    if(!content.includes("_")){
        this.winning();
    }
}

    start() {
    document.getElementsByClassName("step")[this.currentStep].style.opacity=1;
    this.drawLetters();
    this.drawQuote();

   }

   winning(){
       this.wordWrapper.innerHTML="🎉CONGRATULATIONS, YOU WON!";
       this.lettersWrapper.innerHTML="";
       setTimeout(function(){ 
        if(confirm('Do you want to play again?')){
            window.location.reload();  
        }}, 2000);

   }
   loosing(){
    this.wordWrapper.innerHTML="YOU LOOSE! END OF GAME 😔";
    this.lettersWrapper.innerHTML="";
    setTimeout(function(){ 
        if(confirm('Do you want to play again?')){
            window.location.reload();  
        }}, 2000);
   }
}

            const game= new Game({
            lettersWrapper:document.getElementById('letters'),
            categoryWrapper:document.getElementById('category'),
            wordWrapper:document.getElementById('word'),
            outputWrapper:document.getElementById('output')
        });
        game.start();


