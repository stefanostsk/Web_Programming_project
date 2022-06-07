// 'use strict';

// const model = require('../model/meet--me-model-heroku-pg-db.js');

const bcrypt = require('bcrypt');
const { Console } = require('console');
const crypto = require("crypto");

const dotenv = require('dotenv');
const { read } = require('fs');
const { resolve } = require('path');
const { isContext } = require('vm');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

function makeid(length) {
    var result           = [];
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
    	result.push(characters.charAt(crypto.randomInt(0, charactersLength)));

   	}  
   return result.join('');
}

// exports.PPRINT = function (req, res) {
//     // model.registerUser(req.body.username, req.body.password, (err, result, message) => {
//     model.PPRINT( req.body.FirstName, req.body.UserPass,req.body.UserEmail
//         ,req.body.LastName,req.body.Address,req.body.Phone1,req.body.ZipCode,req.body.OrgName,(err, result, message) => {
        
//         if (err) {
//             console.error('registration error: ' + err);
//             res.render('index');
//         }
//         else if (message) {
//             res.render('index')
//         }
//         else {
//             res.redirect('/index');
//         }
//     })
// }
//##############################################################
const model = require('../model/patras--league-model-pg-db.js');

exports.PPRINT = (res,req) => {

	
	model.PPRINT( (err, res) => {
		if (err) {
            res.send(err);
        }
        else {
            res.forEach(console.log(res))
            }
    })
}
//##############################################################

// exports.createMyTeam = (req,res) => {

//     model.createMyTeam(req,(err,result) =>{
//         if (err) {
//             console.error('registration error: ' + err);
//         }
//         else {
//             console.log(res.rows)
//     }
//     })
// }

exports.showMyTeam = function (req, res) {
    
    model.showMyTeam(req, (err, result) => {
        
        if (err) {
            console.error('registration error: ' + err);
            res.render('index');
        }
        else {
            players = []
            subs = []
            players = result.rows.slice(0,11)
            subs = result.rows.slice(11)

            res.render('team-layout-management',{ players: players, subs:subs, notadmin:true,loggedin: true, disabled:false, 
                teamname:req.session.teamname , style: ["signed-manager-main","team-layout-management"]})
        }
    })
}


exports.doinsert = (req,res) => {

    let players= [{"name":req.body.Player0},{"name":req.body.Player1},{"name":req.body.Player2},{"name":req.body.Player3},
    {"name":req.body.Player4},{"name":req.body.Player5},{"name":req.body.Player6},{"name":req.body.Player7},
    {"name":req.body.Player8},{"name":req.body.Player9},{"name":req.body.Player10}]

    let playerstoadd = players.filter((el) => el.name !== "")

        model.doinsert(req,playerstoadd, (err, res) => {
            if (err) {
               res.send(err)
            }
            else{
                console.log("written to db")
            }
        })
    res.redirect('/team-layout-management')
}



exports.dotimeSelection = (req,res) => {
    // console.log(req.body)

    model.dotimeSelection(req,req.body, (err, data) => {
        if (err) {
            res.send(err);
        }
        req.session.dateData = data
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end(data, 'utf-8')
        
    });
}

exports.afterDrawGames = (req,res) => { 
    // console.log("req.body",req.body)

    model.afterDrawGames (req.body, (err,result,gameids) => {
        if (err) {
            res.send(err);
        }
        // console.log(gameids[0].rows[0].GameID)
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end(result.lista, 'utf-8')

        // res.end(result, 'utf-8')
    })
}

exports.createInitBracket = (req,res) => {
    model.createInitBracket(req, (err,result) => {
        if (err) {
            res.send(err);
        }
        // console.log(result.rows)
        let uparray = result.rows.filter((el,index,arr) => {
           return index%2 === 0 
        })
        let botarray = result.rows.filter((el,index,arr) => {
            return index%2 !== 0 
        })
        let lista1 = []
        let lista2 = []
 
        // let elem = {...lista1[0],...lista2[0]}
        // console.log(elem)
        uparray.forEach((el) => {
            let dict = {}
            dict['team1']= el.HomeTeam
            dict['team2']= el.AwayTeam
            dict['date12']= el.GameDate
            lista1.push(dict)
        })
        botarray.forEach((el) => {
            let dict = {}
            dict['team3']= el.HomeTeam
            dict['team4']= el.AwayTeam
            dict['date34']= el.GameDate
            lista2.push(dict)
        })
        // console.log(lista1)
        // console.log(lista2)
        let finalarr = [];

        if(uparray.length>botarray.length){
            finalarr = new Array(uparray.length)
        }
        else{
            finalarr = new Array(botarray.length)
        }
        // let finalarr = new Array(uparray.length)
        // console.log(botarray.length)
        finalarr.fill(0)

        finalarr.forEach( (el,index) => {
            el = {...lista1[index], ...lista2[index]}
            finalarr.push(el)
            // console.log("el",el)
        })
        if(lista2[lista1.length] === undefined)

        if(uparray.length>botarray.length){
            for(let i=0;i<=botarray.length;i++){
                finalarr.shift()
            }
        }
        else{
            for(let i=0;i<botarray.length;i++){
                finalarr.shift()
            }
        }
        // console.log(uparray.length)
        // console.log(botarray.length)

        // console.log(finalarr.length)
        // console.log(uparray)
        // console.log(botarray)
        let lowerteam = [];
        let lowerteams = [];
        let lowerteamss = []
        
        if(finalarr.length>1) {
            
            if((finalarr[finalarr.length-1].team2 == "WAITING...")){
                lowerteam = finalarr[finalarr.length-1].team1
                // console.log(lowerteam)
                finalarr.pop()
            }
            if((finalarr[finalarr.length-1].team3 == undefined) && (finalarr[finalarr.length-1].team2 !== "WAITING...")){
                let newdict = {}
                newdict['team1'] =finalarr[finalarr.length-1].team1
                newdict['team2'] =finalarr[finalarr.length-1].team2
                lowerteams.push(newdict)
                // console.log(lowerteams)
                finalarr.pop()
            } 
            if((finalarr[finalarr.length-1].team4 == "WAITING...")){
                let newdict = {}
                newdict['team1'] =finalarr[finalarr.length-1].team1
                newdict['team2'] =finalarr[finalarr.length-1].team2
                newdict['team3'] =finalarr[finalarr.length-1].team3
                lowerteamss.push(newdict)
                // console.log("popped",finalarr.pop())
            }
        }

        let datearr = []
        let gamee = []
        gamee = result.rows
        gamee.forEach((el,index) => {
            el.GameDate = String(el.GameDate).slice(0,24)
        })
        // console.log(finalarr)
        if(req.session.admin)
            res.render('matches', {notadmin:false, game:finalarr,lowerteam:lowerteam,lowerteams:lowerteams,lowerteamss:lowerteamss,gamee:gamee,style: ["matches","signed-manager-main"]})
        else{
            res.render('matches', {notadmin:true, game:finalarr,lowerteam:lowerteam,lowerteams:lowerteams,lowerteamss:lowerteamss,gamee:gamee,style: ["matches","loginmodal","modal","signed-manager-main"]})

        }
    })
}

exports.showScores = (req,res) => {
    model.showScores( (err,res) => {
        if (err) {
            res.send(err);
        }
        res.render('time-selection',{options:result.rows,date:date,notadmin:true,loggedin:true , style: ["signed-manager-main","time-selection"]})
    })
}

exports.showallReservations = (req,res) => {
    model.showallReservations((err,result) => {
        if (err) {
            res.send(err);
        }

        let sdffsd = new Date(result.rows[0].StartDate)
        let date = sdffsd.getUTCMonth()+"-"+sdffsd.getUTCDate()+"-"+sdffsd.getUTCFullYear()

        res.render('time-selection',{options:result.rows,date:date,notadmin:true,loggedin:true , style: ["signed-manager-main","time-selection"]})
    })
}

exports.getTeams = (req,res) => {
    model.getTeams ((err,result) => {
        if (err) {
            res.send(err);
        }
        res.render('draw', {team:result.rows,style: ["draw","signed-manager-main"]})
    })
}

exports.getTeamsforTeams = (req,res) => {
    model.getTeams ((err,result) => {
        if (err) {
            res.send(err);
        }
        res.render('teams',{ team:result.rows,notadmin:true,style:["modal","loginstyle","index","teams"]})
    })
}


exports.showPlayersforUpdate = (req,res) => {
    let gameid = req.body.GameID
    model.showPlayersforUpdate (gameid,(err, homeplayers, awayplayers) => {
        if (err) {
            res.send(err);
        }
        // console.log(homeplayers)
        res.render('admin-update',{ homeplayer:homeplayers, awayplayer:awayplayers.rows ,notadmin:false,style:["admin-update","signed-manager-main"]})
    })
}

exports.updateGame = (req,res) => {
    // console.log(req.body.Goalies)
  if(req.body.GameID){
      console.log(req.body.GameID[0],req.body.Goalies,req.body.PlayerHomeID,req.body.PlayerAwayID)
    model.updateGame(req.body.GameID[0],req.body.Goalies,req.body.PlayerHomeID,req.body.PlayerAwayID,(err,result) => {
        if (err) {
            res.send(err);
        }
        res.render('admin-update', {notadmin:false, style: ["admin-update","signed-manager-main"]})
    })
  }
}


exports.getStats  =(req,res) => {
    model.getStats ( (err,names,actions) => {
        if (err) {
            res.send(err);
        }
        // console.log("con",names)
        // console.log("con2",actions)
        const lista = [];
        names.forEach( (el,index) => {
            let item
            item = {...names[index], ...actions[index]}
            lista.push(item)
        })
        res.render('statistics',{player:lista,notadmin:true,loggedin:false,style:["modal","loginstyle","statistics","index"]})
    })
}


exports.resetPlayins = (req,res) => {
    model.resetPlayins(req, (err,result) => {
        if (err) {
            res.send(err);
        }
        res.render('admin-update', {style: ["admin-update","signed-manager-main"]})
    })
}

exports.showGames = (req,res) => {
    model.showGames(req, (err,result) => {
        if (err) {
            res.send(err);
        }
        // console.log(result.rows)
        res.render('admin-update', {gameinfo: result.rows ,style: ["admin-update","signed-manager-main"]})
    })
}








exports.doLogin = function (req, res) {
    //Ελέγχει αν το username και το password είναι σωστά και εκτελεί την
    //συνάρτηση επιστροφής authenticated

    model.getUserByUsername(req.body.UserEmail, (err, user) => {
        if (user == undefined) {
            console.log("undefined")
            res.render('index',{ failedloggin: true ,notadmin:true,style:["modal","loginstyle","index","alert3"]})
        }
        else {
            //Θέτουμε τη μεταβλητή συνεδρίας "loggedUserId"
            async function checkcode(){
                // console.log(req.body.UserPass)
                    //   console.log(req.body.UserPass)  
                    //   console.log(user.password)  

                bcrypt.compare(req.body.UserPass, user.password, function(err, isMatch) {

                    if (err) {
                    throw err
                    } else if (!isMatch) {
                        res.redirect("/failed");
                    } else {
                        req.session.loggedUserId = user.id;
                        // console.log(req.session.loggedUserId)
                        req.session.loggedUserName = user.firstname;
                        req.session.teamname = user.teamname
                        console.log(req.session.loggedUserName)
                        // req.session.userId = user.userId
            
                        async function saveit(){
                            await req.session.save()
                            console.log(req.session)
                            const redirectTo = "/loggedin";               
                            res.redirect(redirectTo);
                        }
                        saveit();
                    }
                })
            }
            checkcode();
        }
    })
}

//Τη χρησιμοποιούμε για να ανακατευθύνουμε στη σελίδα /login όλα τα αιτήματα από μη συνδεδεμένςου χρήστες
exports.checkAuthenticated = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    // if(req.originalUrl=="/" && req.session.loggedUserId){
    //     console.log("efttasa")
    //     res.render('index',{ loggedin:true ,style:["modal","loginstyle","index2","alert2"]})
    // }
    // else if(req.originalUrl=="/"){
    //     next()
    // }
    // else if (req.session.loggedUserId) {
    //     console.log("user is authenticated", req.originalUrl);
    //     //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
    //     next();
    // }
    // else {
    //     res.redirect('/login');
    // }
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedUserId) {
        console.log("user is authenticated", req.originalUrl);
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        next();
    }
    else if(req.originalUrl=="/"){
        next()
    }
    else {
        //Ο χρήστης δεν έχει ταυτοποιηθεί, αν απλά ζητάει το /login ή το register δίνουμε τον
        //έλεγχο στο επόμενο middleware που έχει οριστεί στον router
        if ((req.originalUrl === "/login") || (req.originalUrl === "/register")) {
            console.log("yes")
            next()
        }
        else {
            //Στείλε το χρήστη στη "/login" 
            console.log("not authenticated, redirecting to /login")
            res.redirect(req.originalUrl)
        }
    }
}


exports.doLogout = (req, res) => {
    //Σημειώνουμε πως ο χρήστης δεν είναι πια συνδεδεμένος
    console.log("loggedout")
    req.session.destroy();
    res.redirect('/');
}

exports.doRegister = function (req, res) { 
    // model.registerUser(req.body.username, req.body.password, (err, result, message) => {
    model.registerUser(req.body.UserEmail, req.body.UserPass, req.body.FirstName,req.body.LastName, req.body.Address,
         req.body.ZipCode,req.body.Phone1, req.body.TeamName, req.body.OrgName, (err, result, message) => {
        
        if (err) {
            console.error('registration error: ' + err);
            res.render('index', { message: 'An error occured in the database' });
        }
        // else if (message) {
        //     res.render('index')
        // }
        else {
            req.session.teamname = req.body.TeamName
            req.session.loggedUserName = req.body.FirstName;
            res.redirect('/afterregister');
        }
    })
}


exports.doAdminLogin = function (req, res) {

    if (req.body.username == process.env.ADMINUSERNAME && req.body.password == process.env.ADMINPASSWORD){
        req.session.loggedUserId=undefined;
        req.session.loggedLibraryId=undefined;


        req.session.loggedUserName='Admin';
        req.session.admin=1;
        console.log( process.env.ADMINUSERNAME)
        // req.session.userId = user.userId
        
        async function saveit(){
            await req.session.save()
            // console.log(req.session)
            // const redirectTo = "/loggedin";               
            //res.render('home', {alert: 'Επιτυχής σύνδεση', style: ['home'], partialContext: {name:req.session.loggedUserName, userid: req.session.loggedUserId}, loggedin:true})
            // res.render('admin', {style: ["staff"], partialContext: {name:'Admin', admin:true}, loggedin:true})
            res.redirect('/admin')
        }
        saveit();
    }
    else {
        res.render('admin-login', {alert:'Λάθος στοιχεία', style: ["main", 'admin-login'], loggedin:false})
    }

}


exports.checkAdminAuthenticated = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος

    if(req.session.admin){
        next()
    }
    else {
        res.redirect('/admin-login');
    }
}

//showallreservations

 // let datelist = []
        
        // // console.log(result)
        
        // result.rows.forEach( (el) => {
        //     let datedict = {}
        //     let datein = new Date(el.StartDate)
        //     // console.log(datein)/
        //     datedict['start'] = (parseInt((String(el.StartDate).slice(16)).slice(0,2))*4 + parseInt((String(el.StartDate).slice(16)).slice(3,5))/15)==0?1:
        //     parseInt((String(el.StartDate).slice(16)).slice(0,2))*4 + parseInt((String(el.StartDate).slice(16)).slice(3,5))/15
        //     // console.log(String(result.rows[0].StartDate),String(result.rows[0].StartDate).slice(16).slice(0,2))
        //     datedict['end'] = (String(el.EndDate).slice(16)).slice(0,2)*4 + (String(el.EndDate).slice(16)).slice(3,5)/15?01:
        //     (String(el.EndDate).slice(16)).slice(0,2)*4 + (String(el.EndDate).slice(16)).slice(3,5)/15

        //     datedict['datein'] = (String(datein.getUTCMonth()).length===2?datein.getUTCMonth():"0"+datein.getUTCMonth())+"-"+(String(datein.getUTCDate()).length===2?datein.getUTCDate():"0"+datein.getUTCDate())+"-"+datein.getUTCFullYear()
        //     datelist.push(datedict)
        // })
        // console.log(datelist)

        // console.log((String(result.rows[0].StartDate).slice(16)).slice(3,5))
        // console.log((String(result.rows[0].StartDate).slice(16)).slice(0,2))

        // console.log((String(result.rows[0].StartDate).slice(16)).slice(0,5))
        // console.log((String(result.rows[0].EndDate).slice(16)).slice(0,5))
