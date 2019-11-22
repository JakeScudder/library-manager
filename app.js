const db = require('./db');
const { Library } = db.models;

(async () => {
  await db.sequelize.sync({force: true});
  try {
    const book = await Library.create({
      title: "The Green Mile",
      author: "Steven King"
    })
    console.log(book.toJSON());

    const book2 = await Library.create({
      title: "Thinner",
      author: "Steven King"
    })
    console.log(book2.toJSON());

  } catch (error) {
    console.error('Error connection to the database: ', error );
  }
})();

