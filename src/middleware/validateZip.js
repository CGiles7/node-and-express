function validateZip(req, res, next) {
    const zipPattern = /^\d{5}$/;
    const zip = req.params.zip;
    if (!zip || !zip.match(zipPattern)) {
      return res.status(400).send(`Zip (${zip}) is invalid!`);
    }
    next();
  }
  
  module.exports = validateZip;
  