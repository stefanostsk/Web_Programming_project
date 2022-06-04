function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
}

let lista = []

let id = 0;
let teamNames = []

document.querySelectorAll(".mikrografies div p").forEach((el) => {
    teamNames.push(el.innerHTML)
})

document.querySelector(".draw").addEventListener('click', ()=> {
    if(teamNames.length>0){
        id++;
        shuffleArray(teamNames);
        let newel = document.createElement("div");
        document.querySelector(".panel").appendChild(newel);
        let namedivs = document.querySelectorAll(".teamname")
        if(teamNames.length === 1){
            newel.innerHTML = `<br><br> <div class="flex-res3" style="justify-self:flex-end"><img class="imgs" src="/images/logo.png"> <p class="teamname2">${teamNames[0]}</p></div>
            <span id="${id}"; style="font-family:Black Ops One; font-size:45px; text-align:center; margin-bottom:2em; width:7em; display:inline;" >
            ADDED TO THE LOWER BRACKET</span> `;
            newel.classList.add("matchdiv");

            document.querySelectorAll(".teamname").forEach((el) => {
                if(el.innerHTML === teamNames[0]) el.parentElement.remove()
            })

        }
        else{
            newel.innerHTML = `<br><br> <div class="flex-res1" style="justify-self:flex-end"><img class="imgsz" src="/images/logo.png"> <p class="teamname2">${teamNames[0]}</p></div>
            <span id="${id}"; style="font-family:Black Ops One; font-size:90px; text-align:center; display:inline;" >
            VS</span> <div class="flex-res2"><img class="imgsz" src="/images/logo.png"> <p class="teamname2">${teamNames[1]}</p></div> `;
            newel.classList.add("matchdiv");


            document.querySelectorAll(".teamname").forEach((el) => {
                if(el.innerHTML === teamNames[0]) el.parentElement.remove()
            })
            document.querySelectorAll(".teamname").forEach((el) => {
                if(el.innerHTML === teamNames[1]) el.parentElement.remove()
            })
        }

        let dict = {}
        dict['home'] = (teamNames.splice(0,1)[0])
        dict['away'] = (teamNames.splice(0,1)[0])
        lista.push(dict)
        // lista.push(teamNames.splice(0,1)[0])
        // lista.push(teamNames.splice(0,1)[0])
        document.querySelector(`.panel div span[id="${id}"]`).scrollIntoView();

        if(teamNames.length===0) {
            document.querySelector(".draw").style.display = "none"
            document.querySelector(".yes").style.display = "block"
        }
    }
})

let datenow = new Date();
const dataToSend = {"lista":lista,"yearnow":datenow.getUTCFullYear(),"daynow":datenow.getUTCDate(),
"monthnow":datenow.getUTCMonth()+1}


document.querySelector(".yes").onclick = () => {
if ((lista.length != 0)) {

    fetch('/draw', {
        method: 'POST',
        // mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },

        body: JSON.stringify(dataToSend) // body data type must match "Content-Type" header
    })
    .then((response) => {
        if (response.ok) {        
            console.log('Written to db')
            return response.text()
        }
        else {
            alert("HTTP-Error: " + response.status);
        }
    })
    .then((data) => {
        console.log("DATA",data)
        // window.location.href = '/draw/'+data
        // window.location.href = '/draw/sucess';
    })

    
}
    
}


























// const logos = [
//     '/public/images/team-logos/boston.jpg',
//     '/public/images/team-logos/cavalry.jpg',
//     '/public/images/team-logos/ccut.jpg',
//     '/public/images/team-logos/dragons.jpg',
//     '/public/images/team-logos/evergreen.jpg',
//     '/public/images/team-logos/hammerheads.jpg',
//     '/public/images/team-logos/ny.jpg',
//     '/public/images/team-logos/weston.jpg'
// ]

// shuffleArray(logos);



// for(let item of logos){
//     const im = document.createElement("img");
//     document.querySelector(".mikrografies").appendChild(im);
//     im.setAttribute("src",item);
// }

// let id = 0;

// document.querySelector(".draw").addEventListener('click', ()=> {
//     id++;
//     const firstTeam = document.querySelector(".mikrografies img:first-child");
//     const ftImg = firstTeam.src;
//     firstTeam.remove();
//     shuffleArray(logos);
//     const secondTeam = document.querySelector(".mikrografies img:first-child");
//     const stImg = secondTeam.src;
//     secondTeam.remove();
//     let el = document.createElement("div");
//     document.querySelector(".panel").appendChild(el);
//     el.innerHTML = `<br><br> <img class="imgsz" src="${ftImg}"> 
//     <span id="${id}"; style="font-family:Black Ops One; font-size:90px; text-align:center; display:inline;" >
//     VS</span> <img class="imgsz" src="${stImg}"> `;
//     // el.style.textAlign = "center";
//     el.classList.add("matchdiv");
//     document.querySelector(`.panel div span[id="${id}"]`).scrollIntoView();
// })




// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * i)
//       const temp = array[i]
//       array[i] = array[j]
//       array[j] = temp
//     }
//     return array
//   }