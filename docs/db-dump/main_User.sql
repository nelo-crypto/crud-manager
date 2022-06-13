create table User
(
    id        INTEGER not null
        primary key autoincrement,
    createdAt DATETIME default CURRENT_TIMESTAMP not null,
    email     TEXT    not null,
    name      TEXT    not null,
    image     TEXT,
    role      TEXT    not null
);

create unique index User_email_key
    on User (email);

INSERT INTO User (id, createdAt, email, name, image, role) VALUES (1, '1654790117903', 'ricardo@gmail.com', 'Ricardo', 'ricardo.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (2, '1654790244468', 'ana@gmail.com', 'Ana', 'ana.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (3, '1654790244468', 'carlos@gmail.com', 'Carlos', 'carlos.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (4, '1654790244468', 'maria@gmail.com', 'Maria', 'maria.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (5, '1654790279796', 'joao@gmail.com', 'João', 'joao.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (6, '1654790347428', 'ze@gmail.com', 'Zé', 'ze.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (7, '1654790347428', 'carla@gmail.com', 'Carla', 'carla.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (8, '1654790366435', 'antonio@gmail.com', 'António', 'antonio.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (9, '1654790387591', 'fabio@gmail.com', 'Fábio', 'fabio.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (10, '1654790402291', 'catarina@gmail.com', 'Catarina', 'catarina.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (11, '1654790429220', 'manual@gmail.com', 'Manuel', 'manuel.jpg', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (12, '1654821520305', 'E', 'N', 'I', 'USER');
INSERT INTO User (id, createdAt, email, name, image, role) VALUES (13, '1654821591710', 'E1', 'N1', 'I1', 'ADMIN');
