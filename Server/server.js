import app from "./app.js";

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`Server listening at ${process.env.PORT || 3000}`);
});
