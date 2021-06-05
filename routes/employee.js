const express = require("express");
const router = express.Router();
const Joi = require("joi");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const keys = require("../configs/keys");

const schema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  salary: Joi.number().required(),
  designation: Joi.string().required(),
});

router.post("/", async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  value.id = uuidv4();
  try {
    // if EMPLOYEE EXIST return error
    let response = await axios.get(`${keys.URI}/employees`);

    const isEmployeeExist = response.data.filter(
      (employee) =>
        employee.lastname.toLowerCase() === value.lastname.toLowerCase()
    ).length;

    if (isEmployeeExist) {
      return res.status(500).json({ error: "Employee already exist" });
    }

    // if EMPLOYEE NOT EXIST add employee
    response = await axios.post(`${keys.URI}/employees`, value);

    res.json(response.data);
  } catch (err) {
    console.log("error: ", err.message);
    res.status(500).json(err);
  }
});

module.exports = router;
