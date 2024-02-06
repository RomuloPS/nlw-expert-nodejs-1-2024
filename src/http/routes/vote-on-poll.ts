import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createPoll(app: FastifyInstance) {

    app.post('/poll/:pollId/vote', async (request, reply) => {

        const votePollBody = z.object({
            pollOptionId: z.string().uuid()
        })

        const pollParams = z.object({
            pollId: z.string().uuid()
        })

        const { pollId } = pollParams.parse(request.params)

        const { pollOptionId } = votePollBody.parse(request.body)

        

        return reply.status(201).send()
    })
}