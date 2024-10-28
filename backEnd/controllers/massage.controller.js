export const sendMassage = async (req, res) => {
  try {
    const {massage} = req.body;
    const {id} = req.params

    const senderId = req
  } catch (error) {
    console.log('Error in sendMassage controller:' , error);
    res.status(500).json({error: 'internal server Error'});
  }
}