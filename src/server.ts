import app from "./app";
import dbconnection from "./config/database";

const port = process.env.PORT;

dbconnection();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
