import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { randomUUID } from "crypto"

export async function voteOnPoll(app: FastifyInstance) {

    app.post('/poll/:pollId/vote', async (request, reply) => {

        const votePollBody = z.object({
            pollOptionId: z.string().uuid()
        });

        const pollParams = z.object({
            pollId: z.string().uuid()
        });

        const { pollId } = pollParams.parse(request.params);

        const { pollOptionId } = votePollBody.parse(request.body);

        let { sessionId } = request.cookies;
        
        if (!sessionId){
            sessionId = randomUUID();

            reply.setCookie('sessionId',sessionId,{
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                signed: true,
                httpOnly: true,
            })
        }

        return reply.status(201).send( { sessionId } )
    })
}