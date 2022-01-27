const axios = require("axios").default;
const db = require("../database/firebase");

// try{} catch (error){return res.status(404).send(error)}

const getAllEvents = async (req, res) => {
  try {
    let events = await db.getAllEvents();
    return res.status(200).send(events);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const updateEvent = async (req, res) => {
  const event = req.body;
  const id = req.params.id;

  if (event.id != null) {
    delete event.id;
  }

  try {
    await db.updateEvent(id, event);
    return res.status(200).send(`event id: ${id} is updated`);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const addNewEvent = async (req, res) => {
  const event = req.body;

  try {
    let id = await db.addNewEvent(event);
    return res.status(200).send(`event id: ${id} is added`);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const deleteEvent = async (req, res) => {
  const id = req.params.id;

  try {
    await db.deleteEvent(id);
    return res.status(200).send(`event id: ${id} has been deleted`);
  } catch (error) {
    return res.status(404).send(error);
  }
};

module.exports = { getAllEvents, updateEvent, addNewEvent, deleteEvent };
