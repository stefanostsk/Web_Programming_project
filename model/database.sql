CREATE SEQUENCE IF NOT EXISTS "Player_PlayerID_seq";
ALTER SEQUENCE "Player_PlayerID_seq" RESTART WITH 300;

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

	  

INSERT INTO public."Manager" ("Email", "MngrPassword", "MngrID", "FirstName", "LastName", "Address", "PostalCode","Phone","TeamName","Org") VALUES
('asds@gmail.com','sdfg4tgsdg','1', 'giorgos', 'giorgos', 'asdfs3','32433','34535435','TEAM1','ORG1'),
('sdffsdf@gmail.com','456fd','2', 'nikos', 'nikos', 'fgjf45','54674','534535534','TEAM2','ORG2'),
('sdgsssss@gmail.com','987','3', 'apostolis', 'apostolis', 'fdgh5','86766','32765745','TEAM3','ORG3'),
('ewwers@gmail.com','099806','4', 'grigoris', 'grigoris', 'ghkj65','42433','45345345','TEAM5','ORG5'),
('vn45v@gmail.com','236','5', 'stathis', 'stathis', 'sdf34','32433','4575684','TEAM4','ORG4'),
('vyew@gmail.com','624234','6', 'sfdf', 'manolhs', 'mghj87','32433','3534578','TEAM7','ORG7'),
('vyew@gmail.com','624234','7', 'wetr', 'manolhs', 'mghj87','32433','3534578','TEAM8','ORG7'),
('vyew@gmail.com','624234','8', 'manolhs', 'manolhs', 'mghj87','32433','3534578','TEAM9','ORG7'),
('vyew@gmail.com','624234','9', 'bxcvb', 'manolhs', 'mghj87','32433','3534578','TEAM10','ORG7'),
('vyew@gmail.com','624234','10', 'dsc', 'manolhs', 'mghj87','32433','3534578','TEAM11','ORG7'),
('vyew@gmail.com','624234','11', 'nhz', 'manolhs', 'mghj87','32433','3534578','TEAM12','ORG7'),
('vyew@gmail.com','624234','12', 'amue', 'manolhs', 'mghj87','32433','3534578','TEAM6','ORG7'),
('vyew@gmail.com','624234','13', 'amue', 'manolhs', 'mghj87','32433','3534578','FFFFF','ORG7'),
('vyew@gmail.com','624234','14', 'amue', 'manolhs', 'mghj87','32433','3534578','OLYMPIAKOS','ORG7'),
('vyew@gmail.com','624234','15', 'amue', 'manolhs', 'mghj87','32433','3534578','TOTENAM','ORG7');

INSERT INTO public."Team" ("Members", "TeamID" ,"ManagerID") VALUES
('13','1','1'),
('12','2','2'),
('11','3','3'),
('12','4','4'),
('11','5','5'),
('14','6','6'),
('11','7','7'),
('11','8','8'),
('11','9','9'),
('11','10','10'),
('11','11','11'),
('11','12','12'),
('11','13','13'),
('11','14','14'),
('11','15','15');


INSERT INTO public."Player" ("PlayerID", "FullName", "PlayerPosition", "PlayerRole","TeamID") VALUES
('1','Mitch Mitch','Goalkeeper','Basic','1'),
('2','Doug Doug','Center Back','Basic','1'),
('3','John John','Sweeper','Basic','1'),
('4','Doe Doe','Defending','Basic','1'),
('5','Frank Frank','Winger','Basic','1'),
('6','Tyler Tyler','Striker','Basic','1'),
('7','Rich Rich','Central','Basic','1'),
('8','Oliver Oliver' ,'Playmaker','Basic','1'),
('9','Remy Remy','Right Fullback','Basic','1'),
('10','Remy Oliver',' Left Midfielder','Basic','1'),
('11','Oliver Tyler','Left Fullback','Basic','1'),
('12','Rich Nine','Goalkeeper','Substitute','1'),
('13','Tyler Frank','Left Fullback','Substitute','1'),
('14','Frank Doe','Goalkeeper','Basic','2'),
('15','John Oliver','Right Fullback','Basic','2'),
('16','John Remy','Left Fullback','Basic','2'),
('17','Eric Yes','Center Back','Basic','2'),
('18','Eric No','Sweeper','Basic','2'),
('19','Rich One','Defending','Basic','2'),
('20','Rich Two','Right Midfielder','Basic','2'),
('21','Rich Threee','Central','Basic','2'),
('22','Rich Four','Striker','Basic','2'),
('23','Doug Twenty','Attacking Midfielder','Basic','2'),
('24','Doug Five','Left Midfielder','Basic','2'),
('25','Rich Ten','Striker','Substitute','2'),
('26','Rich Eleven','Goalkeeper','Basic','3'),
('27','Mitch elEven','Right Fullback','Basic','3'),
('28','Mitch Fifty','Left Fullback','Basic','3'),
('29','Tyler Two','Center Back','Basic','3'),
('30','Tyler Five','Center Back ','Basic','3'),
('31','Rich Twentyone','Defending','Basic','3'),
('32','Rich Twentytwo','Winger','Basic','3'),
('33','Rich Twentythree','Central','Basic','3'),
('34','Rich Twentyfour','Striker','Basic','3'),
('35','Rich Fiftyone','Attacking Midfielder','Basic','3'),
('36','Rich Fiftytwo','Left Midfielder','Basic','3'),
('37','Rich Fiftythree','Goalkeeper','Basic','4'),
('38','Rich Fiftyfour','Right Fullback','Basic','4'),
('39','Rich Fiftyfive','Left Fullback','Basic','4'),
('40','Rich Fiftysix','Center Back','Basic','4'),
('41','Rich Fiftyseven','Sweeper','Basic','4'),
('42','Rich Fiftyeight','Defending','Basic','4'),
('43','Rich Fiftynine','Right Midfielder','Basic','4'),
('44','Rich Sixty','Box-to-Box Midfielder','Basic','4'),
('45','Rich Sone','Striker','Basic','4'),
('46','Rich Alive','Playmaker','Basic','4'),
('47','Rich Dead','Left Midfielder','Basic','4'),
('48','Rich Ad','Striker','Substitute','4'),
('49','Rich Ef','Goalkeeper','Basic','5'),
('50','Rich Th','Right Fullback','Basic','5'),
('51','Rich Wg','Left Fullback','Basic','5'),
('52','Rich Qo','Center Back','Basic','5'),
('53','Rich Uh','Sweeper','Basic','5'),
('54','Rich Ok','Holding Midfielder','Basic','5'),
('55','Rich Oj','Right Midfielder','Basic','5'),
('56','Rich Tg','Box-to-Box Midfielder','Basic','5'),
('57','Rich Ep','Striker','Basic','5'),
('58','Rich Oneone','Playmaker','Basic','5'),
('59','Rich Twotwo','Left Midfielder','Basic','5'),
('60','Rich  Threethree','Goalkeeper','Basic','6'),
('61','Rich Fourfour','Right Fullback','Basic','6'),
('62','Rich Fivefive','Left Fullback','Basic','6'),
('63','Rich Sixsix','Center Back','Basic','6'),
('64','Rich Sevsev','Center Back','Basic','6'),
('65','Rich Eighteight','Defending','Basic','6'),
('66','Rich Ninenine','Right Midfielder','Basic','6'),
('67','Rich Ff','Central','Basic','6'),
('68','Rich Hh','Striker','Basic','6'),
('69','Rich Kk','Attacking Midfielder','Basic','6'),
('70','Rich Qq','Wingers','Basic','6'),
('71','Rich Fd','Wingers','Substitute','6'),
('72','Rich Dd','Striker','Substitute','6'),
('73','Rich Qp','Left Fullback','Substitute','6'),
('74','Millo Mitch','Goalkeeper','Basic','7'),
('75','Millo Doug','Center Back','Basic','7'),
('76','Millo John','Sweeper','Basic','7'),
('77','Millo Doe','Defending','Basic','7'),
('78','Millo Frank','Winger','Basic','7'),
('79','Tyler Millo','Striker','Basic','7'),
('80','Rich Millo','Central','Basic','7'),
('81','Millo Oliver' ,'Playmaker','Basic','7'),
('82','Millo Remy','Right Fullback','Basic','7'),
('83','Remy Oliver',' Left Midfielder','Basic','7'),
('84','Oliver Tyler','Left Fullback','Basic','7'),
('85','Mitch Mitch','Goalkeeper','Basic','8'),
('86','Doug Five','Center Back','Basic','8'),
('87','John Five','Sweeper','Basic','8'),
('88','Doe Doe','Defending','Basic','8'),
('89','Frank Five','Winger','Basic','8'),
('90','Five Tyler','Striker','Basic','8'),
('91','Rich Five','Central','Basic','8'),
('92','Oliver Oliver' ,'Playmaker','Basic','8'),
('93','Five Remy','Right Fullback','Basic','8'),
('94','Remy Oliver',' Left Midfielder','Basic','8'),
('95','Oliver Yes','Left Fullback','Basic','8'),
('96','Mitch Yes','Goalkeeper','Basic','9'),
('97','Doug Yes','Center Back','Basic','9'),
('98','John Yes','Sweeper','Basic','9'),
('99','Yes Doe','Defending','Basic','9'),
('100','Frank Frank','Winger','Basic','9'),
('101','Tyler Tyler','Striker','Basic','9'),
('102','Yes Rich','Central','Basic','9'),
('103','Yes Oliver' ,'Playmaker','Basic','9'),
('104','Yes Remy','Right Fullback','Basic','9'),
('105','Yes Oliver',' Left Midfielder','Basic','9'),
('106','Yes Tyler','Left Fullback','Basic','9'),
('107','Yes Mitch','Goalkeeper','Basic','10'),
('108','Doug Yes','Center Back','Basic','10'),
('109','John Yes','Sweeper','Basic','10'),
('110','Doe Yes','Defending','Basic','10'),
('111','Yes Frank','Winger','Basic','10'),
('112','Tyler Tyler','Striker','Basic','10'),
('113','Rich Yes','Central','Basic','10'),
('114','Oliver Oliver' ,'Playmaker','Basic','10'),
('115','Yes Remy','Right Fullback','Basic','10'),
('116','Remy Yes',' Left Midfielder','Basic','10'),
('117','Oliver Tyler','Left Fullback','Basic','10'),
('118','Yes Mitch','Goalkeeper','Basic','11'),
('119','Doug Millo','Center Back','Basic','11'),
('120','Millo John','Sweeper','Basic','11'),
('121','Doe Doe','Defending','Basic','11'),
('122','Frank Frank','Winger','Basic','11'),
('123','Tyler Tyler','Striker','Basic','11'),
('124','Rich Rich','Central','Basic','11'),
('125','Oliver Oliver' ,'Playmaker','Basic','11'),
('126','Remy Millo','Right Fullback','Basic','11'),
('127','Remy Oliver',' Left Midfielder','Basic','11'),
('128','Oliver Tyler','Left Fullback','Basic','11'),
('129','Millo Mitch','Goalkeeper','Basic','12'),
('130','Doug Millo','Center Back','Basic','12'),
('131','John John','Sweeper','Basic','12'),
('132','Millo Doe','Defending','Basic','12'),
('133','Frank Millo','Winger','Basic','12'),
('134','Tyler Millo','Striker','Basic','12'),
('135','Millo Rich','Central','Basic','12'),
('136','Oliver Millo' ,'Playmaker','Basic','12'),
('137','Remy Millo','Right Fullback','Basic','12'),
('138','Remy Millo',' Left Midfielder','Basic','12'),
('139','Millo ONE','Left Fullback','Basic','12'),
('140','TWO Mitch','Goalkeeper','Basic','13'),
('141','Doug Millo','Center Back','Basic','13'),
('142','John ONE','Sweeper','Basic','13'),
('143','ONE Doe','Defending','Basic','13'),
('144','Frank Millo','Winger','Basic','13'),
('145','ONE Millo','Striker','Basic','13'),
('146','Millo Rich','Central','Basic','13'),
('147','THREE Millo' ,'Playmaker','Basic','13'),
('148','TWO Millo','Right Fullback','Basic','13'),
('149','Remy TWO',' Left Midfielder','Basic','13'),
('150','Millo Tyler','Left Fullback','Basic','13'),
('151','TWO Mitch','Goalkeeper','Basic','14'),
('152','Doug TWO','Center Back','Basic','14'),
('153','John John','Sweeper','Basic','14'),
('154','TWO Doe','Defending','Basic','14'),
('155','Frank TWO','Winger','Basic','14'),
('156','Tyler TWO','Striker','Basic','14'),
('157','Millo ONE','Central','Basic','14'),
('158','Oliver ONE' ,'Playmaker','Basic','14'),
('159','Remy THREE','Right Fullback','Basic','14'),
('160','Remy Millo',' Left Midfielder','Basic','14'),
('161','Millo ONE','Left Fullback','Basic','14'),
('162','THREE Mitch','Goalkeeper','Basic','15'),
('163','Doug ONE','Center Back','Basic','15'),
('164','THREE John','Sweeper','Basic','15'),
('165','Millo THREE','Defending','Basic','15'),
('166','ONE Millo','Winger','Basic','15'),
('167','Tyler ONE','Striker','Basic','15'),
('168','THREE Rich','Central','Basic','15'),
('169','Oliver THREE' ,'Playmaker','Basic','15'),
('170','Remy ONE','Right Fullback','Basic','15'),
('171','THREE Millo',' Left Midfielder','Basic','15'),
('172','ONE Tyler','Left Fullback','Basic','15');


INSERT INTO public."Reservation" ("StartDate","EndDate", "Field", "ReservationID","ManagerID") VALUES
('2021-11-20 12:00','2021-11-20 14:00','Field1','453345','1'),
('2020-09-20 12:00','2020-09-20 12:30','Field2','234','2'),
('2020-11-20 16:00','2020-11-20 17:00','Field1','5644','3'),
('2022-11-20 16:00','2022-11-20 18:45','Field1','67866','3');


INSERT INTO public."Game" ("GameID", "Field", "GameDate","HomeTeam","AwayTeam") VALUES
('1','Field9','2021-11-20 12:00','1','2'),
('2','Field9','2021-11-21 12:00','3','4'),
('3','Field9','2021-11-22 12:00','5','6'),
('4','Field9','2021-11-23 12:00','2','1'),
('5','Field9','2021-11-24 12:00','4','3');
    
INSERT INTO public."Scrimmage" ("ScrimDate", "OpponentID", "ScrimID", "ManagerID") VALUES
('2021-10-20 12:00','25','3','2');  

INSERT INTO public."Participate" ("PlayerID", "GameID") VALUES
('1','1'),
('2','1'),
('3','1'),
('4','1'),
('5','1'),
('6','1'),
('7','1'),
('8','1'),
('9','1'),
('10','1'),
('11','1'),
('14','1'),
('15','1'),
('16','1'),
('17','1'),
('18','1'),
('19','1'),
('20','1'),
('21','1'),
('22','1'),
('23','1'),
('24','1'),
('26','2'),
('27','2'),
('28','2'),
('29','2'),
('30','2'),
('31','2'),
('32','2'),
('33','2'),
('34','2'),
('35','2'),
('36','2'),
('37','2'),
('38','2'),
('39','2'),
('40','2'),
('41','2'),
('42','2'),
('43','2'),
('44','2'),
('45','2'),
('46','2'),
('47','2'),
('49','3'),
('50','3'),
('51','3'),
('52','3'),
('53','3'),
('54','3'),
('55','3'),
('56','3'),
('57','3'),
('58','3'),
('59','3'),
('60','3'),
('61','3'),
('62','3'),
('63','3'),
('64','3'),
('65','3'),
('66','3'),
('67','3'),
('68','3'),
('69','3'),
('70','3'),
('71','3'),
('72','3'),
('48','2'),
('25','1'); 

INSERT INTO public."PlayerSubstitutions" ("Substitution", "SubstitutionMinute", "PlayerID", "PlayerReplaced", "GameID") VALUES
('1','80','71','68','3'), 
('0','80','68','71','3'),
('1','60','70','71','3'), 
('0','60','71','70','3'),
('1','40','48','42','2'),
('0','40','42','48','2'),
('1','30','25','21','1'),
('0','30','21','25','1');
   --Game Actions 
INSERT INTO public."Actions" ("Passes", "Fouls", "Assists", "PlayedPosition",
                              "Goals","YellowCards","PlayerID","GameID") VALUES

('1','2','3','THIS','1','1','1','1'),
('1','2','3','THIS','0','0','2','1'),
('1','2','3','THIS','0','0','3','1'),
('1','2','3','THIS','0','0','4','1'),
('1','2','3','THIS','0','0','5','1'),
('1','2','3','THIS','0','0','6','1'),
('1','2','3','THIS','0','0','7','1'),
('1','2','3','THIS','0','0','8','1'),
('1','2','3','THIS','1','0','9','1'),
('1','2','3','THIS','0','0','10','1'),
('1','2','3','THIS','0','0','11','1'),
('1','2','3','THIS','0','1','14','1'),
('1','2','3','THIS','0','0','15','1'),
('1','2','3','THIS','0','0','16','1'),
('1','2','3','THIS','1','0','17','1'),
('1','2','3','THIS','0','0','18','1'),
('1','2','3','THIS','0','0','19','1'),
('1','2','3','ANOTHER','0','0','20','1'),
('1','2','3','ANOTHER','0','2','21','1'),
('1','2','3','THIS','0','0','22','1'),
('1','2','3','THIS','2','0','23','1'),
('1','2','3','THIS','0','0','24','1'),
('1','2','3','THIS','0','0','26','2'),
('1','2','3','THIS','0','0','27','2'),
('1','2','3','THIS','0','0','28','2'),
('1','2','3','THIS','0','2','29','2'),
('1','2','3','THIS','0','0','30','2'),
('1','2','3','THIS','2','0','31','2'),
('1','2','3','THIS','1','0','32','2'),
('1','2','3','THIS','0','0','33','2'),
('1','2','3','THIS','0','0','34','2'),
('1','2','3','THIS','0','0','35','2'),
('1','2','3','THIS','0','0','36','2'),
('1','2','3','THIS','0','0','37','2'),
('1','2','3','THIS','1','0','38','2'),
('1','2','3','THIS','0','0','39','2'),
('1','2','3','THIS','0','1','40','2'),
('1','2','3','THIS','0','1','41','2'),
('1','2','3','THIS','0','1','42','2'),
('1','2','3','THIS','1','0','43','2'),
('1','2','3','THIS','1','0','44','2'),
('1','2','3','ANOTHER','1','0','45','2'),
('1','2','3','ANOTHER','0','0','46','2'),
('1','2','3','ANOTHER','0','1','47','2'),
('1','2','3','THIS','0','0','49','3'),
('1','2','3','THIS','0','0','50','3'),
('1','2','3','THIS','0','0','51','3'),
('1','2','3','THIS','0','1','52','3'),
('1','2','3','THIS','0','0','53','3'),
('1','2','3','THIS','2','0','54','3'),
('1','2','3','THIS','0','0','55','3'),
('1','2','3','THIS','0','1','56','3'),
('1','2','3','THIS','0','1','57','3'),
('1','2','3','THIS','0','0','58','3'),
('1','2','3','THIS','0','0','59','3'),
('1','2','3','THIS','1','0','60','3'),
('1','2','3','THIS','1','0','61','3'),
('1','2','3','THIS','1','0','62','3'),
('1','2','3','THIS','0','1','63','3'),
('1','2','3','THIS','0','1','64','3'),
('1','2','3','THIS','0','0','65','3'),
('1','2','3','THIS','0','0','66','3'),
('1','2','3','THIS','0','0','67','3'),
('1','2','3','THIS','0','0','68','3'),
('1','2','3','THIS','0','0','69','3'),
('1','2','3','THIS','0','0','70','3'),
('1','2','3','THIS','3','0','71','3'),
('1','2','3','THIS','2','0','72','3'),
('1','2','3','THIS','1','1','48','2'),
('1','2','3','THIS','0','1','25','1');