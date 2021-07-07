const pool = require("./pool");
class DataCollection {
  constructor(table) {
    this.table = table;
  }

  read(id) {
    console.log(this.table);
    if (id) {
      return pool.query(`SELECT * FROM ${this.table} WHERE id=$1`, [id]);
    }
    return pool.query(`SELECT * FROM ${this.table}`);
  }
  create({ name, description, price }) {
    const query = `INSERT INTO ${this.table}(name, description, price) VALUES($1,$2,$3) RETURNING *`;
    const values = [name, description, price];
    return pool.query(query, values);
  }
  update(id, { name, description, price }) {
    const query = `UPDATE  ${this.table} SET name=$1,description=$2,price=$3 where id=$4 RETURNING *`;
    const values = [name, description, price, id];
    return pool.query(query, values);
  }
  delete(id) {
    const query = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
    const values = [id];
    return pool.query(query, values);
  }
}
module.exports = DataCollection;
