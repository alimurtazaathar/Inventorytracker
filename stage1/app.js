const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});
const productsCreate=`CREATE TABLE products(
    product_id TEXT PRIMARY KEY,
    product_name TEXT NOT null
);
`;
const stockCreate = `CREATE TABLE stock (
    stock_mov_id INTEGER PRIMARY KEY,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    mov_typ TEXT CHECK(mov_typ IN ('add', 'sell', 'remove')) NOT NULL
);
`;
// db.serialize(()=>{
//     db.run(productsCreate,(err)=>{if(err){console.error(err.message)}else{console.log('db products created')}});
//     db.run(stockCreate,(err)=>{if(err){console.error(err.message)}else{console.log('db stocks created')}});
// })
const insert=`INSERT INTO products (product_id,product_name) values(?,?)`
const stockMove=`INSERT INTO STOCK (product_id,quantity,mov_typ) values (?,?,?)`;
const fetchRows='SELECT mov_typ, quantity FROM stock WHERE product_id = ?'
const [,, command, product_id, argu2] = process.argv;
if(command==="insert"){
    db.run(insert,[product_id,argu2],(err)=>{
        if(err)return console.error(err.message);
    
        console.log(`${argu2} id:${product_id} added to products`)
    })
}
else if(command==='qty'){
    db.all(fetchRows,[product_id],(err,rows)=>{
        if(err)return console.error(err.message)
        let qty=0;
        rows.forEach(element => {
            if(element.mov_typ==='add'){qty+=element.quantity;}
            else{qty-=element.quantity}
        });    
        console.log(qty);
    })
}
else{
    const quantity=parseInt(argu2);
    db.run(stockMove,[product_id,quantity,command],(err)=>{
        if(err)return console.error(err.message);
        
        console.log(`${command} perfomed on product:${product_id} with ${quantity} items`);

    })    
}





// db.run(sql);
// db.run('DROP TABLE products');