// backend/routes/user.js
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod = require("zod");
const { Router } = require("express");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const router = Router();


// Signup--------------------------
const signupBody = zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})
router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            msg: "Email already taken/ Incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })
    if (existingUser) {
        return res.status(411).json({
            msg: "Email already taken/ User already exists"
        })
    }

    const user = await User.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    // ----- Create new account with a random balance -----

    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    })

    //-----------------------------------------------------
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.status(200).json({
        msg: "User created Successfully",
        token: token
    })
})

// Signin--------------------------
const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.status(200).json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

// Update--------------------------
router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            msg: "Error while updating the information"
        })
    }

    await User.updateOne({ _id: req.userId }, req.body)
    res.json({
        msg: "Updated Successfully"
    })
})

// Filter--------------------------
router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        _id: { $ne: req.userId },
        $or: [{
            firstName: {
                "$regex": filter,
                "$options": "i"
            }
        }, {
            lastName: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router;

