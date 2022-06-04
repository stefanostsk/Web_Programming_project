
// const routes = [
//     {
//         pageName:"Matches",
//         path: "/public/html/matches.html",
//         icon: "fa fa-futbol-o"
//     },
//     {
//         pageName:"Teams",
//         path: "/public/html/teams.html",
//         icon: "fa fa-users"
//     },
//     {
//         pageName:"Scores",
//         path: "/public/html/scores.html",
//         icon: "fa fa-th"
//     },
//     {
//         pageName:"Statistics",
//         path: "/public/html/statistics.html",
//         icon: "fa fa-bar-chart"
//     },
//     {
//         pageName:"Players",
//         path: "/public/html/players.html",
//         icon: "fa fa-user"
//     }
// ];
// window.addEventListener('load', () => {
//     navbar("index");
// })
// function navbar(activePage){
//     navContainer = document.querySelector(".navbar");

//     navCenterPanel = document.createElement('div');
//     navCenterPanel.className = 'nav-center-left';


//     sidePanel = document.createElement('div');
//     sidePanel.className = 'sidepanel';
//     sidePanel.id = 'mySidepanel';
    
//     aElem = document.createElement('a');
//     aElem.className  = 'closebtn';
//     aElem.href = 'javascript:void(0)';
//     aElem.setAttribute('onclick', openNav);
//     aElem.innerHTML = "&times;";
//     sidePanel.appendChild(aElem);

//     for(var route of routes){
//         aElem = document.createElement('a');
//         aElem.href = route.path;
//         aElem.innerHTML = route.pageName;
//         sidePanel.appendChild(aElem);

//         div = document.createElement('div');
//         div.className = 'navlink';

//         a = document.createElement('a');
//         a.href = route.path;
//         a.innerHTML = " " + route.pageName;

//         i = document.createElement('i');
//         i.className = route.icon;
//         i.setAttribute('aria-hidden',true);
//         a.prepend(i);
//         div.appendChild(a);

//         navCenterPanel.appendChild(div);
//     }

//     navContainer.appendChild(sidePanel);

//     button = document.createElement('button');
//     button.className = "header-icon";
//     button.id = "mobile-nav-open";
//     button.setAttribute('onclick',openNav);

//     btnImage = document.createElement('img');
//     btnImage.id = "menu-svg";
//     btnImage.src = "/public/images/menu_icon.svg";

//     button.appendChild(btnImage);
//     navContainer.appendChild(button);

//     logoPanel = document.createElement('div')
//     logoPanel.className = "navbar-logo";

//     img = document.createElement('img')
//     img.src = "/public/images/Logo@2x.png";
//     img.width = "59";
//     img.height = "59";

//     link = document.createElement('a');
//     link.href = "/public/html/index.html";
//     link.className = "nav-item nav-button nav-wide";
//     link.innerHTML = "Patras League";

//     logoPanel.appendChild(img);
//     logoPanel.appendChild(link);

//     navContainer.appendChild(logoPanel);
//     navContainer.appendChild(navCenterPanel);
    
//     navRightContainer = document.createElement('div');
//     navRightContainer.className = 'nav-right';

//     ul = document.createElement('ul');

//     li = document.createElement('li');

//     signInBtn = document.createElement('button');
//     signInBtn.className = "sign-in";
    

//     signInLink = document.createElement('a');
//     signInLink.href = "#"

//     signInImage = document.createElement('img');
//     signInImage.src = "/public/images/football-icon.svg";

//     p = document.createElement('p');

//     strong = document.createElement('strong');
//     strong.innerHTML = "Sign Up";

//     p.appendChild(strong);

//     signInLink.appendChild(signInImage);
//     signInLink.appendChild(p);

//     signInBtn.appendChild(signInLink);

//     li.appendChild(signInBtn);

//     ul.appendChild(li);

//     li = document.createElement('li');

//     signInBtn = document.createElement('button');
//     signInBtn.className = "sign-in";
//     signInBtn.id = "signinbtn"

//     signInLink = document.createElement('a');
//     signInLink.href = "#"

//     signInImage = document.createElement('img');
//     signInImage.src = "/public/images/login-icon.svg";

//     p = document.createElement('p');

//     strong = document.createElement('strong');
//     strong.innerHTML = "Log in";

//     p.appendChild(strong);

//     signInLink.appendChild(signInImage);
//     signInLink.appendChild(p);

//     signInBtn.appendChild(signInLink);

//     li.appendChild(signInBtn);

//     ul.appendChild(li);

//     navRightContainer.appendChild(ul);

//     navContainer.appendChild(navRightContainer);

// }

// function openNav() {
//     document.getElementById("mySidepanel").style.width = "250px";
// }

// function closeNav() {
//     document.getElementById("mySidepanel").style.width = "0";
// }
function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
window.addEventListener('load', () => {
document.querySelector(".navbar").innerHTML = `
        <div id="mySidepanel" class="sidepanel">
          <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
          <a href="/matches">MATCHES</a>
          <a href="/teams">TEAMS</a>
          <a href="/scores">SCORES</a>
          <a href="/statistics">STATISTICS</a>
          <a href="/players">PLAYERS</a>
        </div>
        <button id="mobile-nav-open" class="header-icon" onclick="openNav()">
          <img id="menu-svg" src="/images/menu_icon.svg">
        </button>  
        <script>
          function openNav() {
           document.getElementById("mySidepanel").style.width = "250px";
         }
         function closeNav() {
           document.getElementById("mySidepanel").style.width = "0";
         }
         </script> 
      

        
                <div class="navbar-logo">
                    <img src="/images/Logo@2x.png" alt="" width="59" height="59">
                    <a href="/public/html/index.html" class="nav-item nav-logoname nav-button nav-wide"> Patras League </a>
                </div>
                
                <div class="nav-center-left">
                    <div class="navlink"><a href="/matches"><i class="fa fa-futbol-o" aria-hidden="true"></i> MATCHES</a></div>
                    <div class="navlink"><a href="/teams"><i class="fa fa-users" aria-hidden="true"></i> TEAMS</a></div>
                    <div class="navlink"><a href="/scores"><i class="fa fa-th"></i> SCORES</a></div>
                    <div class="navlink"><a href="/statistics"><i class="fa fa-bar-chart" aria-hidden="true"></i> STATISTICS</a></div>
                    <div class="navlink"><a href="/players"><i class="fa fa-user" aria-hidden="true"></i> PLAYERS</a></div>
                </div>
                <div class="nav-right">
                  <ul>
                    <li>
                      <button class="sign-in">
                        <a href="registration-page">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ball-football"
                          width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" 
                          stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z" />
                          <path d="M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45" />
                          </svg>
                          <p><strong>Sign Up</strong></p>
                        </a>
                      </button>
                    </li>
                    <li>
                      <button class="sign-in" id="signinbtn">
                        <a>
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login" width="50"
                          height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                          stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                          <path d="M20 12h-13l3 -3m0 6l-3 -3"></path>
                          </svg>
                          <p><strong>Log in</strong></p>
                        </a>
                      </button>
                    </li>
                  </ul>
                </div>
                <!-- <div class="nav-right">
                    <img src="/images/clipart2027230.png" height="40">
                    <a href="#signin" class="sign-in">Sign Up</a>
                    <button class="sign-in" id="signinbtn">Log In</button>
                </div> 
       `});