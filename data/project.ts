
import { db } from "@/lib/db";

export const getProjectByName = async (name: string) => {
    try {
        const project = await db.project.findFirst(
            {
                where: {
                    name
                }
            }
        );

        return project;
    } catch {
        return null;
    }
}

export const getProjectById = async (id: string) => {
    try {
        const project = await db.project.findFirst(
            {
                where: {
                    id
                }
            }
        );

        return project;
    } catch {
        return null;
    }
}

export const getLogsFromProjectId = async (id: string, query: string) => {
    let whereClausule: any = {
        projectId: id,
        description: {
            contains: query
        }
    }
    if (query.includes("#")) {
        whereClausule = {
            projectId: id,
            tags: {
                some: {
                    name: {
                        contains: query
                    }
                }
            }
        }
    }
    try {
        const logs = await db.log.findMany(
            {
                where: whereClausule,
                orderBy: {
                    created_at: "desc"
                },
                include: {
                    user: true,
                    tags: true
                }
            }
        );

        return logs;
    } catch {
        return null;
    }
}