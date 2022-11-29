const axios = require("axios");
const router = require("express").Router();
require("dotenv").config();

const TOKEN = process.env.authToken;
const URL = process.env.apiURL;

async function getAllIssues() {
	try {
		let response = await axios.get(`${URL}/issues?page_size=500`, {
			headers: {
				Authorization: `${TOKEN}`,
			},
		});
		let issues = await response.data;
		return issues;
	} catch (error) {
		return (dataError = {
			message: error.response.statusText,
			statusCode: error.response.status,
		});
	}
}

async function getIssue(id) {
	if (!id || isNaN(id)) {
		return (dataError = {
			message: "Invalid ID must be a number",
			statusCode: 404,
		});
	}
	try {
		let response = await axios.get(`${URL}/issues/${id}`, {
			headers: {
				Authorization: `${TOKEN}`,
			},
		});
		let issues = await response.data;
		return issues;
	} catch (error) {
		return (dataError = {
			message: error.response.statusText,
			statusCode: error.response.status,
		});
		// console.error(error);
	}
}

async function getAllTypeOfStatus() {
	try {
		let response = await axios.get(
			`${URL}/config?option[]=status_enum_string`,
			{
				headers: {
					Authorization: `${TOKEN}`,
				},
			}
		);
		let statusList = await response.data;
		return statusList;
	} catch (error) {
		return (dataError = {
			message: error.response.statusText,
			statusCode: error.response.status,
		});
	}
}

async function editStatus(data, id) {
	axios.patch(`${URL}/issues/${id}/`, data, {
		headers: {
			Authorization: `${TOKEN}`,
		},
	});
}

async function newIssue(data) {
	axios.post(`${URL}/issues`, data, {
		headers: {
			Authorization: `${TOKEN}`,
		},
	});
}

async function addNote(data, id) {
	axios.post(`${URL}/issues/${id}/notes`, data, {
		headers: {
			Authorization: `${TOKEN}`,
		},
	});
}

// RUTAS
router.get("/", function (req, res) {
	getAllIssues().then((response) => res.status(200).json(response));
});

router.get("/statusList", function (req, res) {
	getAllTypeOfStatus().then((response) => res.status(200).json(response));
});

router.get("/issue/:id", function (req, res) {
	let id = req.params.id;
	getIssue(id).then((response) => res.status(200).json(response));
});

router.patch("/:id", function (req, res) {
	let body = req.body;
	let id = req.params.id;
	editStatus(body, id).then((response) => res.status(200).json(response));
});

router.post("/:id", function (req, res) {
	let body = req.body;
	let id = req.params.id;
	addNote(body, id).then((response) => res.status(200).json(response));
});

router.post("/", function (req, res) {
	let body = req.body;
	newIssue(body).then((response) => res.status(201).json(body));
});

module.exports = router;

// module.exports = {
//   getIssue,
//   getAllIssues,
//   newIssue,
// };
