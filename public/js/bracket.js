
document.querySelectorAll(".slot-wrapper").forEach( (el,index) => {
  el.style.top = `${`${index}`*63}px`
})

if(document.querySelectorAll(".lowertn").length > 3){ 
  console.log("in")
  let nc = document.querySelectorAll(".upper .up").length
  console.log(nc)
  if(document.querySelectorAll(".lower").length>0){
    // console.log("here",document.querySelector(".slotted-bracket .lower:last-child .team-name").innerHTML)
    // console.log(document.querySelector(`.slotted-bracket > .upper .slot-wrapper:nth-child(${(nc)}) .team2 .team-name`).innerHTML)
    let UppertobeFilled = document.querySelector(`.slotted-bracket > .upper .slot-wrapper:nth-child(${(nc)}) .team2 .team-name`)
    let LowertobeRemoved = document.querySelector(".lower .team-name:nth-child(2)")
    UppertobeFilled.innerHTML = LowertobeRemoved.innerHTML
    document.querySelector(".lower .slot-wrapper:first-child").remove()
  }
}


// .team-name:nth-child(2)"
// let bracketDiv = document.querySelector(".bracket-tamper")

// let newdiv = document.createElement("div");
// newdiv.innerHTML = `<div class="slot-wrapper" style="top: 0px;">
// <div class="match">
//   <div class="team team1 winner">
//     <div class="slot-team-image-container fixed-candidate">
//       <img
//         class="team-image night-only">
//       <img
//         class="team-image day-only">
//     </div>
//     <span class="team-name text-ellipsis">Team1</span>
//     <span class="result">2</span>
//   </div>
//   <div class="team team2 loser">
//     <div class="slot-team-image-container fixed-candidate">
//       <img
//         class="team-image night-only">
//       <img
//         class="team-image day-only">
//     </div>
//     <span class="team-name text-ellipsis">Team8</span>
//     <span class="loser-icon fa fa-long-arrow-down"></span>
//     <span class="result">1</span>
//   </div>
// </div>
// <div class="exit down " style="height: 18px;">
//   <div class="entry down "></div>
// </div>
// </div>
// <div class="slot-wrapper" style="top: 63px;">
// <div class="match">
//   <div class="team team1 loser">
//     <div class="slot-team-image-container fixed-candidate">
//       <img
//         class="team-image night-only">
//       <img
//         class="team-image day-only">
//     </div>
//     <span class="team-name text-ellipsis">Team2</span>
//     <span class="loser-icon fa fa-long-arrow-down"></span>
//     <span class="result">0</span>
//   </div>
//   <div class="team team2 winner">
//     <div class="slot-team-image-container fixed-candidate">
//       <img
//         class="team-image night-only">
//       <img
//         class="team-image day-only">
//     </div>
//     <span class="team-name text-ellipsis">Team5</span>
//     <span class="result">2</span>
//   </div>
// </div>
// <div class="exit up " style="height: 19px;">
//   <div class="entry up "></div>
// </div>
// </div>
// `
// let newdiv2 = document.createElement("div");
// newdiv2.innerHTML = `<div class="slot-wrapper" style="top: 0px;">
// <div class="match">
//   <div class="team team1 winner">
//     <div class="slot-team-image-container fixed-candidate">
//       <img
//         class="team-image night-only">
//       <img
//         class="team-image day-only">
//     </div>
//     <span class="team-name text-ellipsis">Team1</span>
//     <span class="result">2</span>
//   </div>
//   <div class="team team2 loser">
//     <div class="slot-team-image-container fixed-candidate">
//       <img
//         class="team-image night-only">
//       <img
//         class="team-image day-only">
//     </div>
//     <span class="team-name text-ellipsis">Team8</span>
//     <span class="loser-icon fa fa-long-arrow-down"></span>
//     <span class="result">1</span>
//   </div>
// </div>
// <div class="exit down " style="height: 18px;">
//   <div class="entry down "></div>
// </div>
// </div>
// <div class="slot-wrapper" style="top: 63px;">
// <div class="match">
//   <div class="team team1 loser">
//     <div class="slot-team-image-container fixed-candidate">
//       <img
//         class="team-image night-only">
//       <img
//         class="team-image day-only">
//     </div>
//     <span class="team-name text-ellipsis">Team2</span>
//     <span class="loser-icon fa fa-long-arrow-down"></span>
//     <span class="result">0</span>
//   </div>
//   <div class="team team2 winner">
//     <div class="slot-team-image-container fixed-candidate">
//       <img
//         class="team-image night-only">
//       <img
//         class="team-image day-only">
//     </div>
//     <span class="team-name text-ellipsis">Team5</span>
//     <span class="result">2</span>
//   </div>
// </div>
// <div class="exit up " style="height: 19px;">
//   <div class="entry up "></div>
// </div>
// </div>
// `
// bracketDiv.innerHTML=
// `<div class="slotted-bracket">
//     <div class="slotted-bracket-tier" style="height: 308px;">
//     <div class="bracket-tier-header">Upper Bracket</div>
//     <div class="rounds">
//         <div class="round">
//         <div class="round-header" title="Collapse round" style="top: 0px;">Opening round</div>
//         <div class="slots" style="height: 244px;">


//         </div>
    
//         </div>
//         </div>
//  </div>`
 
//  document.querySelector(".bracket-tamper .slots").appendChild(newdiv)
//  document.querySelector(".bracket-tamper .slots").appendChild(newdiv2)