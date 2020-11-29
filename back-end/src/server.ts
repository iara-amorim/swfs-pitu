import app from "./app";
import database from "./database";
database.sync({ force: false });
app.listen(3001, ()=>{
	console.log("Back-end running on port 3001.");
});