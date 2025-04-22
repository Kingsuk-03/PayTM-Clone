// backend/routes/account.js
const zod = require("zod");
const { Router } = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");
const router = Router();

// Balance --------------------
router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.status(200).json({
        balance: account.balance
    })
});

// Transfer Money --------------

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficent Balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Invalid Account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    await session.commitTransaction();

    res.json({
        msg: "Transaction Successfull"
    });
})

module.exports = router;