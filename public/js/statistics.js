
const refR = document.querySelectorAll(".data");

for(let i=9;i<16;i++){
    for(let j=1;j<refR.length+1;j++){
        document.querySelector(`tbody .data:nth-child(${j}) td:nth-child(${i+1})`).classList.add("disn");
    }

} 

document.querySelector(".rfrbtn").onclick = () => {
    
    const allth = document.querySelectorAll("th");
    const alltr = document.querySelectorAll(".data");
    const alldata = document.querySelectorAll(".data td");

    let tableHeader = document.querySelector(".main thead");

    if(!tableHeader.classList.contains("redend")){
        tableHeader.classList.remove("headergrad");
        tableHeader.classList.add("redend");
    }
    else{
        tableHeader.classList.remove("redend");
        tableHeader.classList.add("headergrad");
    }

    if(!allth[4].classList.contains("disn")){
        for(let i=9;i<16;i++){
            for(let j=1;j<alltr.length+1;j++){
                document.querySelector(`tbody .data:nth-child(${j}) td:nth-child(${i+1})`).classList.remove("disn");
            } 
            allth[i].classList.remove("disn"); 
        }
        for(let i=3;i<9;i++){
            for(let j=1;j<alltr.length+1;j++){
                document.querySelector(`tbody .data:nth-child(${j}) td:nth-child(${i+1})`).classList.add("disn");
            } 
            allth[i].classList.add("disn"); 
        }
        document.querySelector(".rfrbtn").innerHTML = "Return to Player actions";
    }

    else{
        for(let i=3;i<9;i++){
            for(let j=1;j<alltr.length+1;j++){
                document.querySelector(`tbody .data:nth-child(${j}) td:nth-child(${i+1})`).classList.remove("disn");
            } 
            allth[i].classList.remove("disn"); 
        }
        for(let i=9;i<16;i++){
            for(let j=1;j<alltr.length+1;j++){
                document.querySelector(`tbody .data:nth-child(${j}) td:nth-child(${i+1})`).classList.add("disn");
            } 
            allth[i].classList.add("disn"); 
        }    
        document.querySelector(".rfrbtn").innerHTML = "Referee Signaled Stats";
    }
}

function highlight(){
    const playerDt = document.querySelectorAll(".data");
    for(let i=0;i<playerDt.length;i++){
        playerDt[i].onclick = function () {
            if(!this.classList.contains("hlb")){
                this.classList.add("hlb");
            }
            else{
                this.classList.remove("hlb");
            }
            let chlN = this.children;
            if(!chlN[1].classList.contains("hlc")){
                for(let j=0;j<chlN.length;j++){
                    chlN[j].classList.add("hlc");
                }
            }
            else{
                for(let j=0;j<chlN.length;j++){
                    chlN[j].classList.remove("hlc");
                }
            }
        }
    }
}

highlight();


function sortTable(elInd) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector(".main");
    switching = true;

    while (switching) {

      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;

        x = rows[i].querySelectorAll("td")[elInd];
        y = rows[i + 1].querySelectorAll("td")[elInd];

        const myRe = new RegExp("%");
        let strgx = "";
        let strgy = "";
 
        strgx = x.innerHTML.replace("%","");
        strgy = y.innerHTML.replace("%","");

        if(myRe.exec(x.innerHTML)){
            if (strgx-strgy>0) {
                shouldSwitch = true;
                break;
              }
        }
    
        if (x.innerHTML-y.innerHTML>0) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
}

function sortTable2(elInd) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector(".main");
    switching = true;

    while (switching) {

      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;

        x = rows[i].querySelectorAll("td")[elInd];
        y = rows[i + 1].querySelectorAll("td")[elInd];

        const myRe = new RegExp("%");
        let strgx = "";
        let strgy = "";
 
        strgx = x.innerHTML.replace("%","");
        strgy = y.innerHTML.replace("%","");

        if(myRe.exec(x.innerHTML)){
            if (strgx-strgy<0) {
                shouldSwitch = true;
                break;
              }
        }
    
        if (x.innerHTML-y.innerHTML<0) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
}

document.querySelectorAll(".arrowdown").forEach((el) =>{  
    elInd =0;
    let hdr = document.querySelectorAll("thead th"); //("thead > th"); ->hdr  length=1
    el.onclick = function (){
        for(elInd=0;(elInd<hdr.length&&elInd!==1||elInd!==2);(elInd++?(elInd!==1||elInd!==2):elInd=3)){

            if(hdr[elInd].querySelector("td div:first-child").innerHTML ===
            this.parentElement.parentElement.querySelector("div:first-child").innerHTML){

                sortTable(elInd);
                break;
            }
        }
    }
});    

document.querySelectorAll(".arrowup").forEach((el) =>{  
    elInd=0;
    let hdr = document.querySelectorAll("thead th"); //("thead > th"); ->hdr  length=1
    el.onclick = function (){
        for(elInd=0;(elInd<hdr.length&&elInd!==1||elInd!==2);(elInd++?(elInd!==1||elInd!==2):elInd=3)){

            if(hdr[elInd].querySelector("td div:first-child").innerHTML ===
            this.parentElement.parentElement.querySelector("div:first-child").innerHTML){

                sortTable2(elInd);
                break;
            }
        }
    }
});    


        // document.querySelectorAll("tr td div:nth-child(1)").forEach((el) =>{
        
        //     el.onclick = function (){
                
        //         while(!el.parentElement.classList.contains("yes")){
        //             el = el.parentElement;
        //         }
        //         let strg = "";
        //         let getTd = [];
        //         tdData = el.querySelectorAll(".sl tr > td"); -->
        //         tdData.forEach((elem,i) => {
            //             const myRe = new RegExp("%");//% anywhere in the string, since there are lots of spaces and therefore cant pinpoint)
            //             const myRe2 = new RegExp(" [0-9]{1}%");
            //             const myRe3 = new RegExp("[0-9]{2}%");
            //             if(myRe.exec(elem.innerHTML)){
            //                 getTd[i] = elem.innerHTML
            //             }
            //             if(elem.innerHTML.match(myRe2)!==null){
            //                 strg += elem.innerHTML.match(myRe2);           
            //             }
            //             else{
            //                 strg += elem.innerHTML.match(myRe3);  
            //             }
            //             getTd[i] = elem.innerHTML;
            //         });
            
            //         let str2Ar = strg.split("%");
            //         str2Ar.pop();
            
            //         const sortedData = getTd.sort(function(a, b){return a-b});
            //         const sortedDataprcntg = str2Ar.sort(function(a, b){return a-b});
            
            //         if(strg[0] !== "n"){
            //             for(let i=0;i<str2Ar.length;i++){
            //                 tdData[i].innerHTML = sortedDataprcntg[i] +"%";
            //             }
            //         }
            //         else{
            //             for(let i=0;i<getTd.length;i++){
            //                 tdData[i].innerHTML = sortedData[i];
            //             }
            //         }
            //     }