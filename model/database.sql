CREATE TABLE public."Player" (
	"PlayerID" integer NOT NULL,
	"FullName" character varying(40) NOT NULL,
	"Position" character varying(30) NOT NULL,
	"Role" boolean NOT NULL,
	"TeamID" integer NOT NULL
);

CREATE TABLE public."Team" (
	"Name" character varying(30) NOT NULL,
	"Members" integer NOT NULL,
	"TeamID" integer NOT NULL,
	"CreationDate" DATE DEFAULT (CURRENT_DATE),
	"ManagerID" integer NOT NULL,
	"Field" character varying(30) DEFAULT NULL
	
);

CREATE TABLE public."Reservation" (
	"Date" timestamp NOT NULL,
	"Field" character varying(30) NOT NULL,
	"Duration" character varying(6) NOT NULL,
	"ReservationID" integer NOT NULL,
	"ManagerID" integer NOT NULL
	
);

CREATE TABLE public."Game" (
	"GameID" integer NOT NULL,
	"Field" character varying(30) NOT NULL,
	"Date" timestamp NOT NULL
);

CREATE TABLE public."Scrimmage" (
	"Date" timestamp NOT NULL,
	"Opponent" character varying(30) NOT NULL,
	"ScrimID" integer NOT NULL,
	"ManagerID" integer NOT NULL
);

CREATE TABLE public."Actions" (
	"Passes" integer DEFAULT '0',
	"Fouls" integer DEFAULT '0',
	"Position" character varying(40) NOT NULL,
	"Goals" integer DEFAULT '0',
	"YellowCards" integer DEFAULT '0',
	"RedCards" integer DEFAULT '0',
	"PlayerID" integer NOT NULL,
	"GameID" integer NOT NULL
	
);


CREATE TABLE public."Manager" (
	"e-mail" character varying(50) NOT NULL,
	"Password" character varying(30) NOT NULL,
	"ID" integer NOT NULL,
	"FirstName" character varying(20) NOT NULL,
	"LastName" character varying(20) NOT NULL,
	"Address" character varying(40) NOT NULL,
	"PostalCode" integer NOT NULL,
	"Phone" integer NOT NULL,
	"Org" character varying(40) DEFAULT NULL

);

CREATE TABLE public."Participate" (
	"PlayerID" integer NOT NULL,
	"GameID" integer NOT NULL
	
	
);

CREATE TABLE public."PlayerSubstitutions" (
	"Substitutions" boolean NOT NULL DEFAULT '0',
	"SubstitutionMinute" integer NOT NULL DEFAULT '0',
	"PlayerID" integer NOT NULL,
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
    ADD CONSTRAINT pk7 PRIMARY KEY ("ID");
    
ALTER TABLE ONLY public."Participate"
    ADD CONSTRAINT pk8 PRIMARY KEY ("PlayerID","GameID");  
 
ALTER TABLE ONLY public."PlayerSubstitutions"
    ADD CONSTRAINT pk9 PRIMARY KEY ("Substitutions","SubstitutionMinute","PlayerID","GameID");  
 


ALTER TABLE ONLY public."Player"
    ADD CONSTRAINT "Player_fk0" FOREIGN KEY ("TeamID") REFERENCES public."Team"("TeamID");
  
ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_fk0" FOREIGN KEY ("ManagerID") REFERENCES public."Manager"("ID");


ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_fk0" FOREIGN KEY ("ManagerID") REFERENCES public."Manager"("ID");

    
ALTER TABLE ONLY public."Scrimmage"
    ADD CONSTRAINT "Scrimmage_fk0" FOREIGN KEY ("ManagerID") REFERENCES public."Manager"("ID");


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

	  
    

-- CREATE TABLE public."Player" (
-- 	"PlayerID" integer NOT NULL,
-- 	"FullName" character varying(40) NOT NULL,
-- 	"Position" character varying(30) NOT NULL,
-- 	"Role" boolean NOT NULL,
-- 	"TeamID" integer NOT NULL,
-- 	CONSTRAINT "Player_fk0" FOREIGN KEY ("TeamID") REFERENCES "Team"("TeamID"),
-- 	PRIMARY KEY ("PlayerID")
-- );

-- CREATE TABLE public."Team" (
-- 	"Name" character varying(30) NOT NULL,
-- 	"Members" integer NOT NULL,
-- 	"TeamID" integer NOT NULL,
-- 	"CreationDate" DATE DEFAULT (CURRENT_DATE),
-- 	"ManagerID" integer NOT NULL,
-- 	"Field" character varying(30) DEFAULT NULL,
-- 	CONSTRAINT "Team_fk0" FOREIGN KEY ("ManagerID") REFERENCES "Manager"("ID"),
-- 	PRIMARY KEY ("TeamID")
-- );

-- CREATE TABLE public."Reservation" (
-- 	"Date" DATETIME NOT NULL,
-- 	"Field" character varying(30) NOT NULL,
-- 	"Duration" character varying(6) NOT NULL,
-- 	"ReservationID" integer NOT NULL,
-- 	"ManagerID" integer NOT NULL,
-- 	CONSTRAINT "Reservation_fk0" FOREIGN KEY ("ManagerID") REFERENCES "Manager"("ID"),
-- 	PRIMARY KEY ("ReservationID")
-- );

-- CREATE TABLE public."Game" (
-- 	"GameID" integer NOT NULL,
-- 	"Field" character varying(30) NOT NULL,
-- 	"Date" DATETIME NOT NULL,
-- 	PRIMARY KEY ("GameID")
-- );

-- CREATE TABLE public."Scrimmage" (
-- 	"Date" DATETIME NOT NULL,
-- 	"Opponent" character varying(30) NOT NULL,
-- 	"ScrimID" integer NOT NULL,
-- 	"ManagerID" integer NOT NULL,
-- 	CONSTRAINT "Scrimmage_fk0" FOREIGN KEY ("ManagerID") REFERENCES "Manager"("ID"),
-- 	PRIMARY KEY ("ScrimID")
-- );

-- CREATE TABLE public."Actions" (
-- 	"Passes" integer DEFAULT '0',
-- 	"Fouls" integer DEFAULT '0',
-- 	"Position" character varying(40) NOT NULL,
-- 	"Goals" integer DEFAULT '0',
-- 	"YellowCards" integer DEFAULT '0',
-- 	"RedCards" integer DEFAULT '0',
-- 	"PlayerID" integer NOT NULL,
-- 	"GameID" integer NOT NULL,
-- 	CONSTRAINT "Actions_fk0" FOREIGN KEY ("PlayerID") REFERENCES "Player"("PlayerID"),
-- 	CONSTRAINT "Actions_fk1" FOREIGN KEY ("GameID") REFERENCES "Game"("GameID"),
-- 	PRIMARY KEY ("PlayerID","GameID")
-- );

-- CREATE SEQUENCE IF NOT EXISTS "Manager_ID_seq"

-- CREATE TABLE public."Manager" (
-- 	"e-mail" character varying(50) NOT NULL,
-- 	"Password" character varying(30) NOT NULL,
-- 	"ID" integer NOT NULL DEFAULT nextval('"Manager_ID_seq"'::regclass),
-- 	"FirstName" character varying(20) NOT NULL,
-- 	"LastName" character varying(20) NOT NULL,
-- 	"Address" character varying(40) NOT NULL,
-- 	"PostalCode" integer NOT NULL,
-- 	"Phone" integer NOT NULL,
-- 	"Org" character varying(40) DEFAULT NULL,
-- 	PRIMARY KEY ("ID")
-- );

-- CREATE TABLE public."Participate" (
-- 	"PlayerID" integer NOT NULL,
-- 	"GameID" integer NOT NULL,
-- 	CONSTRAINT "Participate_fk0" FOREIGN KEY ("PlayerID") REFERENCES "Player"("PlayerID"),
-- 	CONSTRAINT "Participate_fk1" FOREIGN KEY ("GameID") REFERENCES "Game"("GameID"),
-- 	PRIMARY KEY ("PlayerID","GameID")
-- );

-- CREATE TABLE public."PlayerSubstitutions" (
-- 	"Substitutions" boolean NOT NULL DEFAULT '0',
-- 	"SubstitutionMinute" integer NOT NULL DEFAULT '0',
-- 	"PlayerID" integer NOT NULL,
-- 	"GameID" integer NOT NULL,
-- 	CONSTRAINT "PlayerSubstitutions_fk0" FOREIGN KEY ("PlayerID") REFERENCES "Player"("PlayerID"),
-- 	CONSTRAINT "PlayerSubstitutions_fk1" FOREIGN KEY ("GameID") REFERENCES "Game"("GameID"),
-- 	PRIMARY KEY ("Substitutions","SubstitutionMinute","PlayerID","GameID")
-- );










