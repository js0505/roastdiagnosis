const express = require("express")
const {
	addScrap,
	getScrap,
	deleteScrap,
} = require("../controllers/scrapController")
const { auth } = require("../middleware/auth")
const router = express.Router()

/////////////////////////////
// api/scrap/
/////////////////////////////

router.route("/").post(auth, addScrap)
router.route("/:id").get(auth, getScrap).delete(auth, deleteScrap)

module.exports = router
