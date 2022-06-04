document.querySelectorAll(".all-players .containerdiv").forEach(item=>{
    item.onclick = function () {
        let tobeUncovered = this.nextElementSibling;

        if(!tobeUncovered.classList.contains("hidden-stats")){
            tobeUncovered.classList.add("hidden-stats");
            item.style.opacity = 1.0;
        }
        else{
            tobeUncovered.classList.remove("hidden-stats");
            item.style.opacity = 0.5;
        }
        
    }
})
