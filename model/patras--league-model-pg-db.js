const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();
// // console.log(process.env)
const moment = require('moment')
const sql = require('./db-pg.js');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const { resolve } = require("path");


function makeid(length) {
    var result           = [];
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
    	result.push(characters.charAt(crypto.randomInt(0, charactersLength)));

   	}  
   return result.join('');
}


// // const pool = new pg.Pool({
// //     connectionString: process.env.DATABASE_URL, //μεταβλητή περιβάλλοντος
// //     ssl: {
// //       rejectUnauthorized: false
// //     }
// //   });

// // const pool = new pg.Pool();  // to connect to the local database


// // εναλλακτικά...
// const pool = new pg.Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'league',
//     password: '',
//     port: 5432
// })

// async function connect() {
//     try {
//         const client = await pool.connect();
//         console.log("connected")
//         return client
//     }
//     catch(e) {
//         console.error(`Failed to connect ${e}`)
//     }
// }

// exports.PPRINT = function (firstname, password, email, lastname, address, phone, ps,org, callback) {

// 	const query = {
// 		text: `INSERT INTO public."Manager" ("FirstName", "Password", "e-mail","LastName","Address","PostalCode","Phone,"Org") VALUES
// 		($1, $2, $3, $4, $5, $6, $7);`,
// 		values: [firstname, password, email, lastname, address, phone, ps,org]
// 	}

// 	  sql.query(query, (err, res) => {
// 		if (err) {
// 			console.log(err.stack)
// 			callback(err.stack)
// 		}
// 		else {
// 			callback(null, res)

// 		}
// 	})
// }

//################################################

exports.PPRINT = function(req, callback) {

	const query = {
		text: `SELECT * FROM public."Manager"`,
		values: [],
	}
	sql.query(query, (err, res) => {
		if (err) {
			console.log(err)
			callback(err)
		}
		else {
            console.log(res.rows[0])
		}
	})

}
//################################################

function getTeamIdfromManager (managerid,callback) {
	// managerid = "367643"
	const query = {
		text: `SELECT "TeamID" FROM public."Team" JOIN public."Manager"
		 ON "ManagerID"=$1 AND public."Team"."ManagerID" = public."Manager"."MngrID" ;`,
		values: [managerid]
	}

	  sql.query(query, (err, res) => {
		if (err) {
			console.log(err.stack)
			callback(err.stack)
		}
		else {
			callback(null, res)
		}
	})
}

function getTeamPlayers(managerid, callback) {

	const query = {
		text: `SELECT "FullName","PlayerPosition","PlayerRole",public."Team"."TeamID","ManagerID" FROM public."Player" JOIN public."Team" 
		 ON "ManagerID"=$1 AND public."Team"."TeamID" = public."Player"."TeamID" ORDER BY "PlayerID" DESC;`,
		values: [managerid]
	}

	  sql.query(query, (err, res) => {
		if (err) {
			console.log(err.stack)
			callback(err.stack)
		}
		else {
			// console.log(res)
			callback(null, res)
		}
	})
}

exports.showMyTeam = function(req,callback){

	let userid = req.session.loggedUserId
	getTeamPlayers(userid, callback)
	
}

function showHomePlayers(gameid,callback) {
	let homeplayers = []
	const query = {
		text: `SELECT "FullName","GameID",public."Player"."PlayerID" FROM public."Player" JOIN public."Team"
		ON public."Player"."TeamID"= public."Team"."TeamID" JOIN public."Manager"
		ON public."Manager"."MngrID"=public."Team"."ManagerID" JOIN public."Game"
		ON "TeamName"="HomeTeam"
		WHERE "GameID" = $1;`,
		values: [gameid]
	}

	sql.query(query, (err, res) => {
		if (err) {
			console.log(err.stack)
			callback(err.stack)
		}
		else {
			callback(null, res)
		}
	})
}



exports.showPlayersforUpdate = function(gameid,callback){

	let homeplayers = []

	new Promise( (resolve) => {
		showHomePlayers(gameid, (err,result) => {
			if (err) {
				callback(err);
			}
			result.rows.forEach((el) => homeplayers.push(el))
			// console.log(homeplayers)

			resolve(gameid)
		})
	})
	.then( (gameid) => {
		let awayplayers = []
		const query = {
			text: `SELECT "FullName","GameID",public."Player"."PlayerID" FROM public."Player" JOIN public."Team"
			ON public."Player"."TeamID"= public."Team"."TeamID" JOIN public."Manager"
			ON public."Manager"."MngrID"=public."Team"."ManagerID" JOIN public."Game"
			ON "TeamName"="AwayTeam"
			WHERE "GameID" = $1;`,
			values: [gameid]
		}

		sql.query(query, (err, res) => {
			if (err) {
				console.log(err.stack)
				callback(err.stack)
			}
			else {
				// console.log(homeplayers,res)
				callback(null, homeplayers, res)
			}
		})
	})
	
	
}

exports.doinsert = (req,players,callback) => { 
	managerid = req.session.loggedUserId
	new Promise((resolve) => {
		getTeamIdfromManager(managerid,(err,res) => {
			if (err) {
				callback(err);
			}
			teamid = res.rows[0].TeamID
			resolve(teamid)
		})
	})
	.then( (teamid) => {
			const promiseList = []
				players.forEach(el => {
					const query = {
						text: `INSERT INTO public."Player"\
						("FullName","PlayerPosition","PlayerRole","TeamID") VALUES($1, $2, $3, $4);`,
							values: [el.name,"unsigned","retired",teamid],
					}
					promiseList.push(
						sql.query(query)
					)
				})
				Promise.all(promiseList)
					.then(callback(null))
					.catch(e => {
						console.error(e)
						callback(e)
					})
				})
			.catch(e => {
				console.error(e)
				callback(e)
			})

	
}



exports.dotimeSelection = function(req,bodyData,callback) {
	// console.log(bodyData.lista)
	// callback(null, bodyData.lista)
	managerid = req.session.loggedUserId
	const promiseList = []

	bodyData.lista.forEach((element, index) => {
		const year = element.date.slice(-4)
		const month = element.date.slice(0,2)
		const day = element.date.slice(3,5)
		const startHour = element.startTime.slice(0,2)
		const endHour = element.endTime.slice(0,2)
		const startMinutes = element.startTime.slice(3,5)
		const endMinutes = element.endTime.slice(3,5)

		const startTimestamp = `make_timestamp(${year},${month},${day},${startHour},${startMinutes},0.0)`
		const endTimestamp = `make_timestamp(${year},${month},${day},${endHour},${endMinutes},0.0)`
		//callback(null, bodyData.lista)  //leaving it in here will only make only 1 selection go through
	
		const query = {
			text: `INSERT INTO public."Reservation" \
			("StartDate", "EndDate", "Field","ReservationID", "ManagerID") VALUES
			(${startTimestamp}, ${endTimestamp} , $1, $2 ,$3);`,
			values: ["Stadium1",makeid(6), managerid],
				}
			promiseList.push(
				sql.query(query)
			)
		});
		Promise.all(promiseList)
			.then(callback(null, bodyData.lista))
			.catch(e => callback(e))
		}

exports.afterDrawGames = function(bodyData,callback) {
	const promiseList = []

	const year = bodyData.yearnow
	let month = bodyData.monthnow
	const day = bodyData.daynow
	let nday = bodyData.daynow +27

	bodyData.lista.forEach((element, index) => {
		const startHour = "18"
		const startMinutes = "00"

		let date = moment(`${nday}.${month+1}.${year}`,'DD.MM.YYYY');
		if(!date.isValid()){
			month++
			nday = 1
		}
		const timestamp = `make_timestamp(${year},${month+1},${nday++},${startHour},${startMinutes},0.0)`
		const away = element.away
		const home = element.home
	
		let query;
		if(element.away === undefined){
			query = {
				text: `INSERT INTO public."Game" ("Field", "GameDate", "HomeTeam", "AwayTeam") VALUES 
				($1,${timestamp}, '${home}' , 'WAITING...') RETURNING "GameID";`,
				values: ["Stadium4"]
				}
		}
		else{
			query = {
				text: `INSERT INTO public."Game" ("Field", "GameDate", "HomeTeam", "AwayTeam") 
				VALUES ($1,${timestamp},'${home}','${away}') RETURNING "GameID";`,
				values: ["Stadium4"]
			}
		}
			promiseList.push(
				sql.query(query)
			)
		});
		Promise.all(promiseList)
			.then((res)=> { 
			// res.forEach(eachRes => {console.log(eachRes)})
				callback(null, bodyData,res)})
			.catch(e => callback(e))
		}

	

exports.createInitBracket = function(req,callback) {
	let currYear = new Date().getUTCFullYear()

	const query = {
		text: `SELECT "HomeTeam","AwayTeam","GameDate","GameID"
		FROM public."Game" 
		WHERE "GameDate"> '${currYear}-07-01 00:00:00' ;`,
		values: []
	}

	  sql.query(query, (err, res) => {
		if (err) {
			console.log(err.stack)
			callback(err.stack)
		}
		else {
			callback(null, res)
		}
	})
}

exports.showallReservations = function(callback) {
	const query = {
		text:`SELECT * FROM public."Reservation";`,
		values: []
	}
	sql.query(query, (err, res) => {
		if (err) {
			console.log(err.stack)
			callback(err.stack)
		}
		else {
			callback(null, res)
		}
	})
}

exports.getStats = function(callback) {
	// const promiseList = []
	let teamplayerNames = []
	let playerActions = [];

	new Promise( (resolve) => {
		
		const query = {
			text:`SELECT "TeamName","FullName",public."Team"."TeamID" ,public."Player"."PlayerID"
			FROM public."Team" JOIN public."Manager"
			ON "MngrID"="ManagerID"
			JOIN public."Player" 
			ON "Player"."TeamID"="Team"."TeamID"
			JOIN public."Participate"
			ON public."Participate"."PlayerID"=public."Player"."PlayerID"
			ORDER BY public."Player"."PlayerID";`,
			values:[]
		}
		sql.query(query, (err, res) => {
			if (err) {
				console.log(err.stack)
				callback(err.stack)
			}
			teamplayerNames = res.rows
			// callback(null, teamplayerNames)
			resolve(teamplayerNames)
		})
	})
	.then( (teamplayerNames) => {
		// console.log("here",teamplayerNames)
			getActionsfromTPNames(teamplayerNames,(err,actions) => {
				if (err) {
					callback(err);
				}
				actions.forEach((el) => {playerActions.push(el[0])})
				callback(null,teamplayerNames,playerActions)
			})	
	})
	.catch(e => {
		console.log(e)
		callback(e)
	})
}

function getActionsfromTPNames(teamplayerNames,callback) {
	const promiseList = [];

	teamplayerNames.forEach((el) => { 
		let query;
		query = {
			text: `SELECT SUM("Passes") AS "Passes",SUM("Fouls") AS "Fouls",SUM("Assists") AS "Assists",SUM("Goals") AS "Goals",
			SUM("YellowCards") AS "YellowCards",COUNT(*) as "GamesPlayed" FROM public."Actions" JOIN "Participate"
			ON public."Actions"."PlayerID" = public."Participate"."PlayerID"
			WHERE public."Participate"."PlayerID"=$1
			GROUP BY public."Participate"."PlayerID";`,
			values: [el.PlayerID]
		}
		promiseList.push(
			sql.query(query)
		)
	})
	Promise.all(promiseList)
		.then(res => {	
			let actionList = [];
			res.forEach(el => {
			actionList.push(el.rows)
			// console.log(el.rows)
			})
		// console.log(actionList)
		callback(null,actionList)
		})
		.catch(e => callback(e))
}

		


// 		else {
// 			callback(null, bodyData)
// 		}

exports.getTeams = function(callback) {

	const query = {
		text: `SELECT "TeamName" FROM public."Manager";`,
		values: []
	}
	  sql.query(query, (err, res) => {
		if (err) {
			console.log(err.stack)
			callback(err.stack)
		}
		else {
			callback(null, res)

		}
	})
}

exports.resetPlayins = function(req,callback){

	let currYear = new Date().getUTCFullYear()

	const query = {
		text: `DELETE FROM public."Game"
		WHERE "GameDate"> '${currYear}-07-01 00:00:00' AND "GameDate"< '${currYear+1}-02-01 00:00:00';`,
		values: []
	}
	  sql.query(query, (err, res) => {
		if (err) {
			console.log(err.stack)
			callback(err.stack)
		}
		else {
			callback(null, res)

		}
	})
}


exports.showGames = function(req,callback) {

	let currYear = new Date().getUTCFullYear()

	const query = {
		text: `SELECT * 
		FROM public."Game"
		WHERE "GameDate"> '${currYear}-07-01 00:00:00';`,
		values: []
	}
	sql.query(query, (err, res) => {
		if (err) {
			console.log(err.stack)
			callback(err.stack)
		}
		else {
			callback(null, res)
		}
	})
}


exports.updateGame = function(gameid,homeplayersid,awayplayersid,callback) {

	let promiseList = []
	let allplayersid = [...homeplayersid,...awayplayersid]

	allplayersid.forEach( (el) => {
		const query = {
			text: `INSERT INTO public."Participate" ("GameID","PlayerID")
			VALUES ($1,$2);`,
			values: [gameid,el]
		}
		promiseList.push(
			sql.query(query)
		)
	});
	Promise.all(promiseList)
		.then(callback(null))
		.catch(e => callback(e))
}





function getUserNames(username, callback) {

	const query = {
		text: `SELECT * FROM public."Manager" WHERE "Email"=$1;`,
		values: [username]
	}

	  sql.query(query, (err, res) => {
		if (err) {
			console.log(err.stack)
			callback(err.stack)
		}
		else {
			callback(null, res)

		}
	})
}
exports.getUserByUsername = (username, callback) => {

	getUserNames(username, callbackFunction);
	
	function callbackFunction(err, res) {
		let user;
		if (err) {
			callback(err);
		}
		if (res.rowCount == 0){
			console.log("No such user exists")
			callback(null)
		}
		else {
			// user = { id: res.rows[0].MngrID };
            user = { id: res.rows[0].MngrID, email: res.rows[0].Email, password: res.rows[0].MngrPassword, firstname: res.rows[0].FirstName, teamname:res.rows[0].TeamName};
			const query = {
				text: `SELECT "MngrID","TeamName" FROM public."Manager" WHERE "MngrID"=$1;`,
				values: [user.id]
			}
		
			sql.query(query, (err, res) => {
				if (err) {
					console.log(err.stack)
					callback(err.stack)
				}
				else {
					user.userId = res.rows[0].MngrID
					user.teamname = res.rows[0].TeamName
					console.log(user.teamname)
					callback(null, user)
		
				}
			})
		}
		
	} 

}
function addNewUser(newuser, callback) {

	const query = {
		text: `INSERT INTO public."Manager" ("Email", "MngrPassword", "FirstName","LastName","Address","PostalCode","Phone", "TeamName", "Org") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "MngrID";`,
		values: [newuser.email, newuser.password, newuser.fistname, newuser.lastname,
            newuser.address, newuser.postalcode, newuser.phone, newuser.teamname, newuser.org]
	}

	  sql.query(query, (err, res) => {
		if (err) {
			console.log(err.stack)
			callback(err.stack)
		}
		else {
			// callback(null, res)
			const query = {
				text: `INSERT INTO public."Team" ("Members","ManagerID","Field")
				VALUES($1,$2,$3);`,
				values: ["0",res.rows[0].MngrID,""]
			}
		
			  sql.query(query, (err, res) => {
				if (err) {
					console.log(err.stack)
					callback(err.stack)
				}
				else {
					console.log("inserted")
					callback(null, res)
				}
			})

		}
	})
}
exports.registerUser = function (email, password, firstname, lastname, address, postalcode, phone, teamname, org, callback) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    exports.getUserByUsername(email, async (err, user) => {
        if (user != undefined) {
            callback(null, null, { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" })
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                let newuser = {"email" : email, "password":hashedPassword, "fistname":firstname, "lastname":lastname, "address":address, "postalcode":postalcode, "phone":phone, "teamname":teamname, "org":org}
				addNewUser(newuser, callbackFunction)
				function callbackFunction(err, res) {
					let user;
					if (err) {
						callback(err);
					}
					callback(null,res);
				}

            } catch (error) {
                callback(error);
            }
        }
    })
}


// exports.doPlayers = function(players,req,callback) {

// 	// const managerid = req.session.loggedUserId
// 	const managerid = "4850758"
// 	new Promise((resolve) => { 

// 		checkifhasTeam(managerid,(err,res) => {
// 			if (err) {
// 				callback(err);
// 			}
// 			let teamid = res.rows[0]
// 			resolve(teamid)
// 		})
// 	})
// 	.then( (teamid) => {
		
// 		return new Promise((resolve) => {
// 			let query;
// 			let newid = makeid(6)
// 			if(teamid === undefined) {
				
// 				query = {
// 					text: `INSERT INTO public."Team" ("Members","TeamID","ManagerID","Field")
// 					VALUES($1,$2,$3,$4);`,
// 					values: ["0",newid,managerid,"thisfield"]
// 				}
// 			}
// 			sql.query(query, (err, res) => {
// 				if (err) {
// 					console.log(err.stack)
// 					callback(err.stack)
// 				}
// 				else {
// 					resolve(newid)
// 				}
// 			})
// 		})
// 	})
// 	.then((newid) => {
// 		const promiseList = []
// 		return new Promise((resolve) => {
// 			if(newid){
// 				players.forEach(el => {
// 					const query = {
// 						text: `INSERT INTO public."Player"
// 						VALUES("PlayerID","FullName","PlayerPosition","PlayerRole","TeamID");`,
// 						values: [makeid(6),players.name,"unsigned","retired",newid],
// 					}
// 				promiseList.push(
// 					sql.query(query)
// 				)
// 			})
// 			Promise.all(promiseList)
// 			.then(callback(null))
// 			.catch(e => {
// 				console.error(e)
// 				callback(e)
// 			})
				
// 				}
// 			else{
// 				players.forEach(el => {
// 					const query = {
// 						text: `INSERT INTO public."Player"
// 						VALUES("PlayerID","FullName","PlayerPosition","PlayerRole","TeamID");`,
// 						values: [makeid(6),players.name,players.pos,players.role,teamid],
// 					}
// 				promiseList.push(
// 					sql.query(query)
// 				)
// 				})
// 				Promise.all(promiseList)
// 			.then(callback(null))
// 			.catch(e => {
// 				console.error(e)
// 				callback(e)
// 			})
// 			}
// 			sql.query(query, (err, res) => {
// 				if (err) {
// 					console.log(err.stack)
// 					callback(err.stack)
// 				}
// 				else {
// 					resolve()
// 				}
// 			})
// 		})
// 	})
// }




//admin accept button action=/managerid routerget()/:managerid 
//meta id=res.body.managerid kai update Manager 
//################################################

// exports.PPRINT = async function (id,user, callback) {
//     console.log('to insert...',user)

//     const sql = `INSERT INTO "Manager" ("e-mail", "Password","ID" ,"FirstName","LastName","Address","PostalCode","Phone","Org") 
//         VALUES ('${user.email}', '${user.password}', '${id}' , '${user.firstname}','${user.lastname}', '${user.address}', '${user.ps}', '${user.phone}', '${user.org}');`;
//     try {
//         const client = await connect();
//         const res = await client.query(sql)
//         await client.release()
//         callback(null, res.rows) // επιστρέφει array
//     } 
//     catch (err) {
//             callback(err, null);
//         }
//     }

