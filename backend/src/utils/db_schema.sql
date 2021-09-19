CREATE DATABASE Concorde;

CREATE TABLE Guild (
    guildId VARCHAR (100) NOT NULL PRIMARY KEY,
    prefix VARCHAR (10) DEFAULT '>',
    logschannel VARCHAR (100),
    mongourl VARCHAR (1000),
    logs BOOLEAN,
    punishmentLogs BOOLEAN
);

CREATE TABLE Bans (
   guildId VARCHAR (100) NOT NULL,
   userId VARCHAR (100) NOT NULL,
   createAt VARCHAR (5000) NOT NULL 
);

CREATE TABLE Mutes (
   guildId VARCHAR (100) NOT NULL,
   userId VARCHAR (100) NOT NULL,
   createAt VARCHAR (5000) NOT NULL 
);