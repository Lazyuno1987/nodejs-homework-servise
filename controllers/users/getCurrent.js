

const getCurrent = async (req, res) => {
    const { email, subscription, name, token } = req.user;
    res.json({
        status: "success",
        code: 200,
        ResponseBody: {
             email,
          subscription,
          name, 
             token
        }
  })
}

module.exports = getCurrent;