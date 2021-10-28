const { User } = require("../models/User")

/////////////////////////////
// '/admission'
/////////////////////////////
const getWaitingRegisterUser = (req, res) => {
	User.find({ role: 2 }).exec((err, result) => {
		if (err) return res.json({ success: false, err })
		return res.status(200).send({
			success: true,
			result,
		})
	})
}

const admissionUser = (req, res) => {
	User.findByIdAndUpdate(req.body.id, {
		role: 0,
	}).exec((err, result) => {
		if (err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, result })
	})
}

const refuseUser = (req, res) => {
	User.findByIdAndDelete(req.body.id).exec((err, result) => {
		if (err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, result })
	})
}

const getAllUserInfo = (req, res) => {
	User.find({}, (err, result) => {
		if (err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, result })
	})
}

const changeUserRole = (req, res) => {
	User.findByIdAndUpdate(req.body.id, {
		role: req.body.role,
	}).exec((err, result) => {
		if (err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, result })
	})
}

module.exports = {
	getWaitingRegisterUser,
	admissionUser,
	refuseUser,
	getAllUserInfo,
	changeUserRole,
}
