const express = require("express")

const subscribersModel = require("../models/subscribers.model")
const subscriberRouter = express.Router()

subscriberRouter.get("/", async (req, res) => {
    try {
        const subscriber = await subscribersModel.find()
        res.json(subscriber)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

subscriberRouter.get("/:id", getSubscribers, (req, res) => {
    res.send(res.subscribers.name)
})


subscriberRouter.post("/", async (req, res) => {

   const newSubscriber = new subscribersModel({
       name: req.body.name,
       subscribedToChannel: req.body.subscribedToChannel,
   })

    try {
       const subscriber = await newSubscriber.save()
        res.status(201).json(subscriber)
    } catch (e) {
       res.json({ message: e.message }).status(400)

    }
})

subscriberRouter.patch("/:id", getSubscribers, async (req, res) => {
    if(req.body.name !== null) {
        res.subscribers.name = req.body.name
    }

    if (req.body.subscribedToChannel !== null) {
        res.subscribers.subscribedToChannel = req.body.subscribedToChannel
    }

    try {
       const updatedSubscriber =  await res.subscribers.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ messsage: err.message })
    }
})

subscriberRouter.delete("/:id", getSubscribers, async (req, res) => {
    try {
        await res.subscribers.remove()
        res.json({ message: "Deleted Subscriber" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


async function getSubscribers(req, res, next) {
    let subscriber;
    try {
        subscriber = await subscribersModel.findById(req.params.id)
        if (subscriber === null) {
            return res.status(404).json({ message: "Cannot find subscriber" })
        }
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

    res.subscribers = subscriber
    next()
}

module.exports = subscriberRouter
