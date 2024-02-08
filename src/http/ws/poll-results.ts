import { z } from "zod";
import { FastifyInstance } from "fastify";
import { voting } from "../utils/voting-pub-sub";

export async function pollResults(app: FastifyInstance) {

    app.get('/poll/:pollId/results', { websocket: true }, (connection, request) => {

        const pollParams = z.object({
            pollId: z.string().uuid()
        });

        const { pollId } = pollParams.parse(request.params);

        voting.subscribe(pollId, (message) => {
            connection.socket.send(JSON.stringify(message))
        })
    })
    
}