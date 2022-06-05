CREATE SEQUENCE IF NOT EXISTS "Player_PlayerID_seq";
ALTER SEQUENCE "Player_PlayerID_seq" RESTART WITH 100;

CREATE TABLE public."Player" (
	"PlayerID" integer NOT NULL DEFAULT nextval('"Player_PlayerID_seq"'::regclass),
	"FullName" character varying(40) NOT NULL,
	"PlayerPosition" character varying(30) NOT NULL,
	"PlayerRole" character varying(40) NOT NULL,
	"TeamID" integer NOT NULL
);
--"TeamName" character varying(30) NOT NULL,

CREATE SEQUENCE IF NOT EXISTS "Team_TeamID_seq";
ALTER SEQUENCE "Team_TeamID_seq" RESTART WITH 100;

CREATE TABLE public."Team" (
	"Members" integer NOT NULL,
	"TeamID" integer NOT NULL DEFAULT nextval('"Team_TeamID_seq"'::regclass),
	"ManagerID" integer NOT NULL,
	"Field" character varying(30) DEFAULT NULL
);

CREATE TABLE public."Reservation" (
	"StartDate" timestamp NOT NULL,
    "EndDate" timestamp NOT NULL,
	"Field" character varying(30) NOT NULL,
	"ReservationID" integer NOT NULL,
	"ManagerID" integer NOT NULL
	
);

CREATE SEQUENCE IF NOT EXISTS "Game_GameID_seq";
ALTER SEQUENCE "Game_GameID_seq" RESTART WITH 100;

CREATE TABLE public."Game" (
	"GameID" integer NOT NULL DEFAULT nextval('"Game_GameID_seq"'::regclass),
	"Field" character varying(30) NOT NULL,
	"GameDate" timestamp NOT NULL,
    "HomeTeam" character varying(40) NOT NULL,
    "AwayTeam" character varying(40) DEFAULT NULL
);

CREATE TABLE public."Scrimmage" (
	"ScrimDate" timestamp NOT NULL,
	"OpponentID" character varying(30) NOT NULL,
	"ScrimID" integer NOT NULL,
	"ManagerID" integer NOT NULL
);

CREATE TABLE public."Actions" (
	"Passes" integer DEFAULT 0,
	"Fouls" integer DEFAULT 0,
    "Assists" integer DEFAULT 0,
	"PlayedPosition" character varying(40) DEFAULT NULL,
	"Goals" integer DEFAULT 0,
	"YellowCards" integer DEFAULT 0,
	"PlayerID" integer NOT NULL,
	"GameID" integer NOT NULL	
);

CREATE SEQUENCE IF NOT EXISTS "Manager_MngrID_seq";
ALTER SEQUENCE "Manager_MngrID_seq" RESTART WITH 100;

CREATE TABLE public."Manager" (
	"Email" character varying(50) NOT NULL,
	"MngrPassword" character varying NOT NULL,
	"MngrID" integer NOT NULL DEFAULT nextval('"Manager_MngrID_seq"'::regclass),
	"FirstName" character varying(20) NOT NULL,
	"LastName" character varying(20) NOT NULL,
	"Address" character varying(40) NOT NULL,
	"PostalCode" integer NOT NULL,
	"Phone" integer NOT NULL,
    "TeamName" character varying(40) DEFAULT NULL,
	"Org" character varying(40) DEFAULT NULL

);

CREATE TABLE public."Participate" (
	"PlayerID" integer NOT NULL,
	"GameID" integer NOT NULL	
);

CREATE TABLE public."PlayerSubstitutions" (
	"Substitution" boolean NOT NULL DEFAULT FALSE,
	"SubstitutionMinute" integer NOT NULL DEFAULT 0,
	"PlayerID" integer NOT NULL,
    "PlayerReplaced" integer NOT NULL,
	"GameID" integer NOT NULL	
);

ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT pk1 PRIMARY KEY ("PlayerID");
    
ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT pk2 PRIMARY KEY ("TeamID");

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT pk3 PRIMARY KEY ("ReservationID");
    
ALTER TABLE ONLY public."Game"
    ADD CONSTRAINT pk4 PRIMARY KEY ("GameID");


ALTER TABLE ONLY public."Scrimmage"
    ADD CONSTRAINT pk5 PRIMARY KEY ("ScrimID");


ALTER TABLE ONLY public."Actions"
    ADD CONSTRAINT pk6 PRIMARY KEY ("PlayerID","GameID");

ALTER TABLE ONLY public."Manager"
    ADD CONSTRAINT pk7 PRIMARY KEY ("MngrID");
    
ALTER TABLE ONLY public."Participate"
    ADD CONSTRAINT pk8 PRIMARY KEY ("PlayerID","GameID");  
 
ALTER TABLE ONLY public."PlayerSubstitutions"
    ADD CONSTRAINT pk9 PRIMARY KEY ("Substitution","SubstitutionMinute","PlayerID","GameID");  
 


ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_fk0" FOREIGN KEY ("TeamID") REFERENCES public."Team"("TeamID");
  
ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_fk0" FOREIGN KEY ("ManagerID") REFERENCES public."Manager"("MngrID");


ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_fk0" FOREIGN KEY ("ManagerID") REFERENCES public."Manager"("MngrID");

    
ALTER TABLE ONLY public."Scrimmage"
    ADD CONSTRAINT "Scrimmage_fk0" FOREIGN KEY ("ManagerID") REFERENCES public."Manager"("MngrID");


ALTER TABLE ONLY public."Actions"
    ADD CONSTRAINT "Actions_fk0" FOREIGN KEY ("PlayerID") REFERENCES public."Player"("PlayerID");
  
ALTER TABLE ONLY public."Actions"
    ADD CONSTRAINT "Actions_fk1" FOREIGN KEY ("GameID") REFERENCES public."Game"("GameID");
    
    
ALTER TABLE ONLY public."Participate"
    ADD CONSTRAINT "Participate_fk0" FOREIGN KEY ("PlayerID") REFERENCES public."Player"("PlayerID"); 

ALTER TABLE ONLY public."Participate"
    ADD CONSTRAINT "Participate_fk1" FOREIGN KEY ("GameID") REFERENCES public."Game"("GameID");

ALTER TABLE ONLY public."PlayerSubstitutions"
    ADD CONSTRAINT "PlayerSubstitutions_fk0" FOREIGN KEY ("PlayerID") REFERENCES public."Player"("PlayerID");

ALTER TABLE ONLY public."PlayerSubstitutions"
    ADD CONSTRAINT "PlayerSubstitutions_fk1" FOREIGN KEY ("GameID") REFERENCES public."Game"("GameID"); 