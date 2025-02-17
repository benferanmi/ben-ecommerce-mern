import newsletterModel from "../models/newsletterModel.js"




// updating bestseller status for users
const updateUserBestSeller = async (req, res) => {
    const { email, newsletterStatus } = req.body;

    try {

        const newsletter = new newsletterModel({ email, newsletterStatus })
        await newsletter.save()

        res.json({ success: true, message: "You have Subscribed to Our Newsletter Successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "An Unexpected Error Occured, Input another Email and Try again. Thanks" })
    }
}


export { updateUserBestSeller }