import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createPoll(app: FastifyInstance) {

    app.post('/poll', async (request, reply) => {

        const createPollBody = z.object({
            title: z.string(),
            options: z.array(z.string())
        })

        const { title, options } = createPollBody.parse(request.body)

        const poll = await prisma.poll.create({
            data: { 
                title,
                options: {
                    createMany: {
                        data: options.map(options =>{
                            return { title: options }
                        })
                    }
                }
            }
        })

        return reply.status(201).send({ pollId : poll.id })
    })
}