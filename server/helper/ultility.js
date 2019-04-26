import db from '../model/database';

export const dbResults = (sql, user, res) => {
  db.query(sql, (err, result) => {
    res.status(200)
      .json({
        user,
        result: result.rows,
      });
  });
};
