


let form1 = document.querySelector(".tl form")
let form2 = document.querySelector(".sl form")
let form3 = document.querySelector(".pos form")

let childcount1 = document.querySelectorAll(".tl form div").length
let childcount2 = document.querySelectorAll(".sl form div").length
let childcount3 = document.querySelectorAll(".pos form div").length


for(let i = childcount1; i<11; i++){ 
        let newdiv = document.createElement("div")
        newdiv.innerHTML = `<div class="mp-form">
                            <label for="name"></label>
                            <input type="text" name="Player${i}" placeholder="Player Name" required>
                            </div>`
        form1.append(newdiv)
}

for(let i = childcount3; i<11; i++){ 
    let newdiv = document.createElement("div")
    newdiv.innerHTML = `<div class="mp-form">
                        
                        <input type="text" name="Pos${i}" placeholder="Player Position" required>
                        </div>`
    form3.append(newdiv)
}

function Sumbit1() {
    form1.submit()
}
function Sumbit2() {
    form2.submit()
}
function Sumbit3() {
    form3.submit()
}









const confirmMes = document.createElement("div");

let allSelected = [];
let newar = [];
let k = 3;

document.querySelector("#conf").addEventListener('change', function() {

    let configOpts = document.querySelectorAll('option');
    let forms = document.querySelectorAll('form');

    configOpts.forEach((el)=>{
        if(el.selected){
            allSelected.push(el.value);
        }
    })

    
    if ((configOpts[6].selected)&&(!document.querySelector(".co").classList.contains("co2"))) {
        document.querySelector(".co").classList.add("co2");
        confirmMes.classList.add("new-div");
        document.querySelector(".con-opt").appendChild(confirmMes);
        confirmMes.innerHTML = `Proceed? <input type="checkbox" style="width: 5em;">`;  
        document.querySelector("div.new-div input").addEventListener("change",function() {
            if(document.querySelector("div.new-div input").checked){
                for (let i = 0; i < forms.length; i++) {
                    forms[i].reset();
                }
                confirmMes.innerHTML = "Layout Reset!"
            }
        })      
    }

    for(let i=0;i<configOpts.length-1;i++){
        if((configOpts[i].selected)&&(document.querySelector(".co").classList.contains("co2"))){
            document.querySelector(".con-opt").removeChild(confirmMes);
            document.querySelector(".co").classList.remove("co2");
        }
    }

    document.querySelectorAll(".del-b").forEach((el)=> el.style.display = "none")

    const slLabel = document.querySelectorAll(".sl label");

    // for(let i=0;i<slLabel.length;i++){
    //     slLabel[i].innerHTML = `<label>${i+1}</label>`;
    //     k = i;
    // }
    // k++;

    if (configOpts[1].selected){
        allSelected = []
        newar = [];
        // document.querySelector("#add-sub").classList.remove(".add-sub");
        let subs = document.querySelector(".sl");
        let pos = document.querySelector(".pos");
        let tl = document.querySelector(".tl");
        subs.style.width = "auto"
        pos.style.width = "20%"
        pos.classList.remove("darea");
        document.querySelector(".tl h2").style.color = "white";
        document.querySelector(".tl .fa-users-line").style.color = "white";
        tl.style.borderRight = "5px solid rgb(152, 178, 34)";
        pos.style.borderLeft = "5px solid rgb(152, 178, 34)";
        subs.style.gridArea = "d";
        pos.style.gridArea = "s";
        subs.style.transform = "scale(0.6,0.6)";
        subs.style.transitionDuration = "0.5s";
        setTimeout(()=>subs.style.transform = "scale(1.0,1.0)",600);
        document.querySelector(".pos h2").style.transitionDuration = "0s";
        document.querySelector(".pos .fa-circle-info").style.transitionDuration = "0s";
        document.querySelector(".pos input").style.transitionDuration = "0s";
        pos.style.transitionDuration = "0s";
        document.querySelector("#add-sub").style.visibility = "visible";//display="none"
        document.querySelector("#add-sub").style.height = "fit-content";
        document.querySelector(".fa-user-plus").onclick = () => {
            const newSub = document.createElement('div');
            //<label for="name">${++k}</label>
            newSub.innerHTML = `<label for="name"></label> <input type="text" name="Sub${k}" placeholder="Substitute Name" required>`;
            newSub.classList.add("mp-form");
            document.querySelector(".sl form").appendChild(newSub);
        }

        // const slLabel = document.querySelectorAll(".sl label");
        // document.querySelectorAll(".del-b").forEach((el)=> el.style.display = "none")
        // for(let i=0;i<slLabel.length;i++){
        // slLabel[i].innerHTML = `<label>${i++}</label>`;
    }
        
    else{
        document.querySelector("#add-sub").style.visibility = "hidden";//display="none"
        document.querySelector("#add-sub").style.height = "0";
    }

    if ((configOpts[2].selected)){
        allSelected = [];
        newar = [];
        let subs = document.querySelector(".sl");
        let pos = document.querySelector(".pos");
        let tl = document.querySelector(".tl");
        // subs.style.transitionDuration = "0.5s";
        subs.style.width = "auto"
        pos.style.width = "20%"
        document.querySelector(".tl h2").style.color = "white";
        document.querySelector(".tl .fa-users-line").style.color = "white";
        tl.style.borderRight = "5px solid rgb(152, 178, 34)";
        pos.style.borderLeft = "5px solid rgb(152, 178, 34)";
        subs.style.gridArea = "d";
        pos.style.gridArea = "s";
        subs.style.transform = "scale(0.6,0.6)";
        subs.style.transitionDuration = "0.5s";
        // pos.style.transitionDuration = "none !important;";
        setTimeout(()=>subs.style.transform = "scale(1.0,1.0)",600);
        // document.querySelector(".subs h2").style.transitionDuration = "0s";
        // document.querySelector(".subs .fa-circle-info").style.transitionDuration = "0s";
        // document.querySelector(".subs input").style.transitionDuration = "0s";
        const slLabel = document.querySelectorAll(".sl label");
        for(let i=0;i<slLabel.length;i++){
            slLabel[i].innerHTML = `<button class="del-b" ><i class="fa-solid fa-user-minus"></i></button>`;
        }
        const delBtn = document.querySelectorAll(".del-b");
        for(let i=0;i<delBtn.length;i++){
            delBtn[i].onclick = () => {
                delBtn[i].parentElement.parentElement.remove();
                k--;
            }
        }
        // subs.style.transitionDuration = "0s";
    }

    for(let i=-2;i>-allSelected.length;i--){
        if(allSelected[i] === 3){
            allSelected.slice(i);
        }
        newar = allSelected.filter((el)=> el>3)
    }

    if (configOpts[3].selected){
        if (configOpts[3].selected && (newar.length===0)){
            const pos = document.querySelector(".pos");
            document.querySelector(".sl").style.gridArea = "s";
            document.querySelector(".sl").style.width = "30%"
            pos.style.borderLeft = "none";
            pos.style.gridArea = "d";
            pos.style.transform = "scale(0.6,0.6)";
            pos.style.transitionDuration = "0.5s";
            pos.style.width = "auto"
            setTimeout(()=>pos.style.transform = "scale(1.0,1.0)",600);
            pos.addEventListener("mouseenter",() => {
                document.querySelector(".pos h2").style.color = "gold"
                document.querySelector(".pos .fa-circle-info ").style.color = "yellow"
                document.querySelector(".tl .fa-users-line ").style.color = "yellow"
                document.querySelector(".tl h2").style.color = "gold"
                document.querySelector(".pos h2").style.transitionDuration = "0.8s";
                document.querySelector(".tl .fa-users-line").style.transitionDuration = "1.2s";
                document.querySelector(".tl h2").style.transitionDuration = "0.8s";
                document.querySelector(".pos .fa-circle-info ").style.transitionDuration = "1.2s";
            })
            document.querySelector(".tl").style.borderRight = "none";
            
        }
        else{
            const pos = document.querySelector(".pos");
            document.querySelector(".sl").style.gridArea = "g";
            document.querySelector(".sl").style.width = "30%"
            pos.style.borderLeft = "none";
            pos.style.gridArea = "d";
            // allSelected = [];
            // newar = [];
        }
    }
    
    if (configOpts[5].selected){
        document.querySelectorAll("input").forEach((el)=>{
            el.setAttribute("disabled","");
            el.classList.add("inspect");
            el.style.color = "white";
        })
    }
    else{
        document.querySelectorAll("input").forEach((el)=>{
            el.disabled=false;
            el.classList.remove("inspect");
            el.style.color = "black";
        })
    
     }
    

    if (configOpts[6].selected){
        document.querySelector(".co input").onclick = () =>{
         
            document.body.style.backgroundColor = "white";
            document.body.style.transitionDuration = "0.5s";
            setTimeout(()=>document.body.style.backgroundColor = "black",600);
        }
    }

});
