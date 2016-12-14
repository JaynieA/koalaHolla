--DATABASE NAME: koalla_holla
--TABLE NAME: koalas

CREATE TABLE koalas (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(30),
	sex VARCHAR(1),
	age INTEGER,
	ready_for_transfer BOOLEAN NOT NULL,
	notes TEXT
);

INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Scotty', 'M', 4 , TRUE , 'Born in Guatemala');
INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Jean' , 'F' , 5 , TRUE , 'Allergic to lots of lava');
INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Ororo' , 'F' , 7 , FALSE , 'loves listening to Paula (Abdul)');
INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Logan' , 'M' , 15 , FALSE , 'Love the sauna');
INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Charlie' , 'M' , 9 , TRUE , 'Favorite band is Nirvana');
INSERT INTO koalas (name, sex, age, ready_for_transfer, notes) VALUES ('Betsy' , 'F' , 4 , TRUE , 'Has a pet iguana');
