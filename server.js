import app from "./server/express.js";
import router from "./server/assets-router.js";

app.use("/src", router);
app.use("/",(req, res)=>{
res.send("Welcome to User Application")
});

app.listen(3000);
console.log("Server running at http://localhost:3000/");

export default app