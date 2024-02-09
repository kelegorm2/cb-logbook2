'use server'
import { getProjectByName } from "@/data/project";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NewLogSchema, NewProjectSchema } from "@/schemas";
import { z } from "zod";

export async function getProjects() {
    try {
        const projects = await db.project.findMany(
            { orderBy: { name: "asc" } }
        );
        return projects;
    } catch (error) {
        console.log(error);
        throw new Error("Error getting projects");
    }
}

export async function createProject(values: z.infer<typeof NewProjectSchema>) {
    const validatedFields = NewProjectSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { name, description } = validatedFields.data;

    const existingProject = await getProjectByName(name);

    if (existingProject) {
        return { error: "Project already exists!" };
    }

    try {
        const project = await db.project.create({
            data: {
                name,
                description
            }
        });
        return { success: "Project created!" };
    } catch (error) {
        console.log(error);
        throw new Error("Error creating project");
    }
}

export async function addLogToProject(projectId: string, values: z.infer<typeof NewLogSchema>) {
    const validatedFields = NewLogSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const existingProject = await db.project.findFirst({
        where: {
            id: projectId
        }
    });

    if (!existingProject) {
        return { error: "Project does not exist!" };
    }

    const user = await currentUser();

    if (!user) {
        return { error: "User not found!" };
    }

    try {
        const newLog = await db.log.create({
            data: {
                description: values.description,
                userId: user.id,
                projectId: projectId,
                tags: {
                    connect: values.logs.map((tag) => ({ id: tag }))
                }
            }
        });
        return { success: "Log added!" };
    } catch (error) {
        console.log(error);
        throw new Error("Error adding log");
    }
}