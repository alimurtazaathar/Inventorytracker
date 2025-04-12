const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

sql = `CREATE TABLE stock (
    stock_mov_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    mov_typ TEXT CHECK(mov_typ IN ('add', 'sell', 'remove')) NOT NULL
);
`;

db.run(sql);
