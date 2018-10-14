
const Helper = require("../helperMethods/helper");

exports.getArtist = async (req, res) => {

	var no = await Helper.getArtistDataCount();
	var artList = [];
	for (let i = 0; i < no; i++) {
		artList.push(await Helper.getArtistData(i));
	}
	res.status(200)
		.json({ artList });
}

exports.setCertify = async (req, res) => {
	var password = req.body.password;
	var id = req.body.id;
	console.log(password);
	var status = await Helper.setCertify(password, id);
	res.status(200)
		.json({ status });
}

