import { NextApiRequest, NextApiResponse } from "next";
import { addUserToChannel, createChannel, getAllChannels, removeUserFromChannel } from "~/server/db";
import { Channel } from "~/types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if(!req.body) {
        res.statusCode = 404
        res.end("Error")
        return
    }

    if(req.body.type == "ALL_CHANNELS") {
        const channels = await getAllChannels();
        res.json(channels);
    } else if (req.body.type == "ADD_USER_TO_CHANNEL") {
        const status = await addUserToChannel(req.body.channel_code, req.body.email, req.body.role);
        res.json(status);
    } else if (req.body.type == "REMOVE_USER_FROM_CHANNEL") {
        const status = await removeUserFromChannel(req.body.channel_code, req.body.email);
        res.json(status);
    } else if (req.body.type =="CREATE_CHANNEL") {
        const status = await createChannel(req.body.data as Channel);
        res.json(status);
    } else {
        res.json({
            error: "Invalid request"
        })
    }
}