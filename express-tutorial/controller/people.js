const { people } = require("../data");

const getPerson = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(401).json({ success: false, msg: "Please provide name" });
  return res.status(201).json({ success: true, person: name });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));
  if (!person)
    return res
      .status(401)
      .json({ success: false, msg: `No person found with id ${id}` });

  const updatedPersons = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  return res.status(201).json({ success: true, data: updatedPersons });
};

const deletePerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));
  if (!person)
    return res
      .status(401)
      .json({ success: false, msg: `No person found with id ${id}` });

  const updatedPersons = people.filter((person) => person.id !== Number(id));
  return res.status(201).json({ success: true, data: updatedPersons });
};

module.exports = { getPerson, createPerson, updatePerson, deletePerson };
