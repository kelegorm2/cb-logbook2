'use server'

import { db } from "@/lib/db";

export const getTags = async () => {
    try {
        const tags = db.tag.findMany({ orderBy: { name: "asc" } });
        return tags;
    } catch (error) {
        return []
    }

}