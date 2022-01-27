const calendar = require("./controllers/calendar");

const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/calendar", calendar.getAllEvents);

app.post("/calendar", calendar.addNewEvent);

app.put("/calendar/:id", calendar.updateEvent);

app.delete("/calendar/:id", calendar.deleteEvent);

app.use("/", (_, res) => {
  res.send("this is calendar api");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("listening on", PORT);
});
