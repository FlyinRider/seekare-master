const EnlistedEmail = require("../models/EnlistedEmail");

exports.getEmail = async (req, res) => {
  try {
    const emails = await EnlistedEmail.find({});

    res.status(200).json({
      emails,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

exports.addEmail = async (req, res) => {
  const { email } = req.body;
  const existing = await EnlistedEmail.findOne({
    address:email
  });
  if (existing) {
      return res.status(403).json({
        status: 'error',
        message: 'Can not Enlist this email again'
      });
  }
  try {
    await new EnlistedEmail({
      address: email,
    })
      .save()
      .then((email) => email);
    res.status(200).json({
      status: "success",
      message: "You are enlisted! Stay tuned",
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

exports.deleteEmail = async (req, res) => {
  const email = req.params.email
  const existing = await EnlistedEmail.findOne({
    address:email
  });
  if (!existing) {
      return res.status(403).json({
        status: 'error',
        message: 'Can find this email'
      });
  }
  try {
    await EnlistedEmail.deleteOne({ address: email });
    res.status(200).json({
      status: "success",
      message: "Successfully delete email from the list",
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};