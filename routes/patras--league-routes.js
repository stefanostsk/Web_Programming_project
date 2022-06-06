const express = require('express');
const router = express.Router({caseSensitive:true});

const patrasleagueController = require('../controller/patras--league-controller');
const model = require('../model/db-pg.js');

router.get('/manager-register', (req, res) => {
      res.render('manager-register', { loggedin: false,notadmin:true, disabled:false,teamname:"My Team" ,
        style: ["modal","loginstyle","index","manager-register"]})
    });

// router.post('/signup', (req, res) => {console.log(req.body.FirstName)});
router.get('/', (req, res) => res.render('index',{notadmin:true,style:["modal","loginstyle","index"]}))
// router.get('/s', (req, res) => res.render('manager-register',
//     { loggedin : false , style:["modal","loginstyle","index","manager-register"]}))
router.get('/registration-page', (req, res) => res.render('registration-page',{ notadmin:true, style:["modal","loginstyle","index","registration-page"]}))
router.get('/statistics',patrasleagueController.getStats, (req, res) => res.render('statistics',{notadmin:true,loggedin:false,style:["modal","loginstyle","statistics","index"]}))

// router.get('/yes',patrasleagueController.showMyTeam)
router.get('/team-layout-management',patrasleagueController.checkAuthenticated,patrasleagueController.showMyTeam)
router.get('/time-selection',patrasleagueController.checkAuthenticated,patrasleagueController.showallReservations, (req, res) => res.render('time-selection',{notadmin:true,loggedin:true , style: ["signed-manager-main","time-selection"]}))
router.post('/time-selection',patrasleagueController.checkAuthenticated,patrasleagueController.dotimeSelection, (req, res) => res.render('time-selection',{notadmin:true,loggedin:true , style: ["signed-manager-main","time-selection"]}))

router.get('/time-selection/reserve-stadium',patrasleagueController.checkAuthenticated, (req, res) => res.render('time-selection',{notadmin:true,loggedin:true ,reservationmade:true,reservation: req.session.dateData, style: ["signed-manager-main","time-selection","alert2"]}))
// reservation:{"date":(req.session.dateData)[0].date,"st":(req.session.dateData)[0].startTime,"et":(req.session.dateData)[0].endTime}
router.post('/submit1-status',patrasleagueController.checkAuthenticated,patrasleagueController.doinsert)
// router.post('/submit-status',patrasleagueController.doPlayers)

// router.post('/submit-status',patrasleagueController.doPlayers)

router.get('/matches' ,patrasleagueController.createInitBracket)
// ,patrasleagueController.showScores
router.get('/scores' ,(req, res) => res.render('scores',{ notadmin:true,style:["modal","loginstyle","index","scores"]}))
router.get('/teams',patrasleagueController.getTeamsforTeams)
router.get('/players' ,(req, res) => res.render('players',{ notadmin:true,style:["modal","loginstyle","index","players"]}))

router.post('/login', patrasleagueController.doLogin);
router.post('/signup', patrasleagueController.doRegister);
router.get('/login', (req, res) => res.render('index',{ style:["modal","loginstyle","index"]}))
router.get('/loggedin',patrasleagueController.checkAuthenticated,(req, res) => res.render('signed-manager',{ notadmin:true,loggedin:true , mainpage:false, style:["modal","loginstyle","signed-manager-main"]}))
router.get('/logout', patrasleagueController.doLogout);

// router.get('/afterregister',(req, res) => res.render('signed-manager', {mainpage:true,partialContext: {name:req.session.loggedUserName},aftersignup:true , notadmin:true,loggedin:true,style:["modal","loginstyle","index","alert2","signed-manager-main"]}))
router.get('/afterregister',(req, res) => res.render('index', {mainpage:true,partialContext: {name:req.session.loggedUserName},aftersignup:true , notadmin:true,style:["modal","loginstyle","index","alert2",]}))
router.get('/failed', (req, res) => res.render('index',{ notadmin:true, failedloggin: true ,style:["modal","loginstyle","index","alert3"]}))

router.get('/admin-login', (req, res) => res.render('admin-login', {notadmin:false, style: ["main", 'admin-login']} ))
router.post('/admin-login', patrasleagueController.doAdminLogin)

router.get('/admin', patrasleagueController.checkAdminAuthenticated, (req, res) => res.render('admin', {style: ["admin","signed-manager-main"]}))
router.get('/admin-requests', patrasleagueController.checkAdminAuthenticated, (req, res) => res.render('admin-requests', {style: ["signed-manager-main","admin-requests"]}))
router.get('/draw' ,patrasleagueController.checkAdminAuthenticated,patrasleagueController.getTeams, (req, res) => res.render('draw', {style: ["draw","signed-manager-main"]}))
router.post('/draw' ,patrasleagueController.checkAdminAuthenticated,patrasleagueController.afterDrawGames, (req, res) => res.render('draw', {style: ["draw","signed-manager-main"]}))
router.get('/admin-update' ,patrasleagueController.checkAdminAuthenticated,patrasleagueController.showGames, (req, res) => res.render('admin-update', {style: ["admin-update","signed-manager-main"]}))
router.get('/admin-update/playins-reset' ,patrasleagueController.checkAdminAuthenticated,patrasleagueController.resetPlayins,patrasleagueController.showGames, (req, res) => res.render('admin-update', {style: ["admin-update","signed-manager-main"]}))

router.post('/expand-teams' ,patrasleagueController.checkAdminAuthenticated,patrasleagueController.showPlayersforUpdate)
// , (req, res) => res.render('admin-update', {style: ["admin-update","signed-manager-main"]})

router.post('/update-game' ,patrasleagueController.checkAdminAuthenticated,patrasleagueController.updateGame)
// , (req, res) => res.render('admin-update', {style: ["admin-update","signed-manager-main"]})

// router.get('/draw/sucess' , (req, res) => res.render('draw', {standingssubmited:true,style: ["draw","signed-manager-main","alert2"]}))
//patrasleagueController.checkAdminAuthenticated
module.exports = router;
