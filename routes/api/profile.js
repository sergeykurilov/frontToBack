const express = require('express')
const router = express.Router()
const auth = require("../../middleware/auth")
const Profile = require("../../models/Profile")
const User = require("../../models/User")
const {check, validationResult} = require('express-validator')
//@route get api/profile/me
//@desc test route
//@access public
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user',
            ["name", "avatar"])
        if (!profile) {
            res.status(400).json({
                msg: "There is no profile for this user"
            })
            res.json(profile)
        }
    } catch (err) {
        console.error(err.message)
        res.send('profile route')
    }

})

//@route post api/profile/
//@desc Create or update user profile
//@access private
router.post('/', [auth,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({user: req.user.id})

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            )
            return res.json(profile)
        }

        //create
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)


    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

//@route GET api/profile/
//@desc get all profiles
//@access public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

//@route GET api/profile/user/:user_id
//@desc get all profiles
//@access public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({
                msg: "Profile not found"
            })
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        if (err.kind === "ObjectId") {
            return res.status(400).json({
                msg: "Profile not found"
            })
        }
        res.status(500).send("Server error")
    }
})

//@route PUT api/profile/exprerience
//@desc change profile experience
//@access private
router.put('/experience', [auth, [
    check('title', 'Title is required')
        .not()
        .isEmpty(),
    check('company', 'Company is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        title, company, location, from, to, current, description
    } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id})

        profile.experience.unshift(newExp)

        await profile.save()

        res.json(profile)
    } catch (err) {
        console.error(err)
        res.status(500).send("Server error: " + err.message)
    }
})


//@route DELETE api/profile/exprerience/:exp_id
//@desc delete experience from profile
//@access private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile)
    } catch (e) {
        console.error(e)
        res.status(500).send("Server error: " + e.message)
    }
})

module.exports = router;