create table Option
(
    id        INTEGER not null
        primary key autoincrement,
    createdAt DATETIME default CURRENT_TIMESTAMP not null,
    name      TEXT    not null,
    value     REAL    not null
);

create unique index Option_name_key
    on Option (name);

INSERT INTO Option (id, createdAt, name, value) VALUES (1, '1654879906000', 'Spread', 5);
