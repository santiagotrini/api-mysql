DROP DATABASE IF EXISTS school;
CREATE DATABASE IF NOT EXISTS school;

USE school;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT,
  name VARCHAR(30), 
  surname VARCHAR(50),
  age TINYINT, -- TINYINT tiene 8 bits nomá, de -128 a 127  
  grade ENUM('A','B','C','D','E','F'), 
  PRIMARY KEY (id)
); 

