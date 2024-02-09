"use server"

import { db } from "@/lib/db";

export async function getMostActiveProjects(): Promise<{ [key: string]: { id: string, name: string, count: number } }> {
    try {
        const logsLasMonth = await db.log.findMany({
            where: {
                created_at: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
                }
            },
            select: {
                project: true
            }
        });

        //count logs per project
        const logsPerProject = logsLasMonth.reduce((acc, log) => {
            if (!acc[log.project.id]) {
                acc[log.project.id] = { id: log.project.id, name: log.project.name, count: 0 };
            }
            acc[log.project.id].count += 1;
            return acc;
        }, {} as { [key: string]: { id: string, name: string, count: number } });

        //sort projects Object by logs count
        const sortedProjects = Object.fromEntries(Object.entries(logsPerProject).sort(([, a], [, b]) => b.count - a.count));
        //const sortedProjects = Object.keys(logsPerProject).sort((a, b) => logsPerProject[b] - logsPerProject[a]);

        //get fist 5 projects
        const topProjects = Object.fromEntries(Object.entries(sortedProjects).slice(0, 5));
        //const topProjects = sortedProjects.slice(0, 5);

        return topProjects;

    } catch (error) {
        console.log(error);
        throw new Error("Error getting logs");
    }
}
export async function getMostActiveUsers() {
    try {
        const logsLasMonth = await db.log.findMany({
            where: {
                created_at: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
                }
            },
            select: {
                user: true
            }
        });

        //count logs per user
        const logsPerUser = logsLasMonth.reduce((acc, log) => {
            if (!acc[log.user.id]) {
                acc[log.user.id] = { id: log.user.id, name: log.user.name || "", count: 0 };
            }
            acc[log.user.id].count += 1;
            return acc;
        }, {} as { [key: string]: { id: string, name: string, count: number } });

        //sort users Object by logs count
        const sortedUsers = Object.fromEntries(Object.entries(logsPerUser).sort(([, a], [, b]) => b.count - a.count));
        //const sortedUsers = Object.keys(logsPerUser).sort((a, b) => logsPerUser[b] - logsPerUser[a]);

        //get fist 5 users
        const topUsers = Object.fromEntries(Object.entries(sortedUsers).slice(0, 5));
        //const topUsers = sortedUsers.slice(0, 5);

        return topUsers;
    } catch (error) {
        console.log(error);
        throw new Error("Error getting logs");
    }
}


export async function getMostUseTags() {

    try {
        const logsLasMonth = await db.log.findMany({
            where: {
                created_at: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
                }
            },
            select: {
                tags: true
            }
        });

        //count tags per log
        const tagsPerLog = logsLasMonth.reduce((acc, log) => {
            log.tags.forEach(tag => {
                if (!acc[tag.id]) {
                    acc[tag.id] = { id: tag.id, name: tag.name, count: 0 };
                }
                acc[tag.id].count += 1;
            });
            return acc;
        }, {} as { [key: string]: { id: string, name: string, count: number } });

        //sort tags Object by logs count
        const sortedTags = Object.fromEntries(Object.entries(tagsPerLog).sort(([, a], [, b]) => b.count - a.count));
        //const sortedTags = Object.keys(tagsPerLog).sort((a, b) => tagsPerLog[b] - tagsPerLog[a]);

        //get fist 5 tags
        const topTags = Object.fromEntries(Object.entries(sortedTags).slice(0, 5));
        //const topTags = sortedTags.slice(0, 5);

        return topTags;
    } catch (error) {
        console.log(error);
        throw new Error("Error getting logs");
    }
}
export async function getLastLogEntries() {
    try {
        const logs = await db.log.findMany({
            orderBy: {
                created_at: "desc"
            },
            take: 5,
            select: {
                id: true,
                description: true,
                created_at: true,
                tags: true,
                userId: true,
                project: {
                    select: {
                        name: true,
                        id: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });

        /*const parsedLogs = logs.map(log => {
            const aLog = new Log(log.id, log.description, log.userId, log.project.id, log.tags.map(tag => new LogTag(tag.id, tag.name)), log.created_at);
            return { ...log, description: aLog.descriptionWithTags }
        });*/

        return logs;

    } catch (error) {
        console.log(error);
        throw new Error("Error getting logs");
    }
}