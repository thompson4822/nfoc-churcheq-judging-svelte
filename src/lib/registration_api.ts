import type {Registration} from "../models/Registration";
import type {EntryScore} from "../models/EntryScore";
//import type {EntryModel} from "../models/EntryModel";

// Read/GET
export const getRegistrations = async () => {
    return await fetch("/.netlify/functions/get_registrations")
        .then(response => response.json())
        .then(data => data);
}

// Read/GET
export const getCategories = async () => {
    return await fetch("/.netlify/functions/get_categories")
        .then(response => response.json())
        .then(data => data);
}

// Create/POST
export const addRegistration = async (contestant: Registration) => {
    return await fetch("/.netlify/functions/create_registration", {
        method: "POST",
        body: JSON.stringify(contestant)
    })
        .then(response => response.json())
        .then(data => data);
}

// Update/PUT
export const updateRegistration = async (contestant: Registration) => {
    return await fetch("/.netlify/functions/update_registration", {
        method: "PUT",
        body: JSON.stringify(contestant)
    })
        .then(response => response.json())
        .then(data => data);
}

// Delete/DELETE
export const deleteRegistration = async (contestant: Registration) => {
    return await fetch("/.netlify/functions/delete_registration", {
        method: "DELETE",
        body: JSON.stringify(contestant)
    })
        .then(response => response.json())
        .then(data => data);
}

export const getEntryScores = async (): Promise<EntryScore[]> => {
    return await fetch(`/.netlify/functions/get_entryScores`)
        .then(response => response.json())
        .then(data => data);
}

export const saveEntryScores = async (entryScores: EntryScore[]) => {
    return await fetch("/.netlify/functions/save_entryScores", {
        method: "POST",
        body: JSON.stringify(entryScores)
    })
}

