import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import type {Registration} from "../models/Registration";
import type {EntryScore} from "../models/EntryScore";

export const entries: Writable<EntryScore[]> = writable([]);

export const registrations: Writable<Registration[]> = writable([]);

export const categories: Writable<string[]> = writable([]);

export const entryScores: Writable<EntryScore[]> = writable([]);

/*
export const populateEntries = (contestantRegistrations: Registration[]) => {
    const result: EntryScore[] = [];
    for (let i = 0; i < contestantRegistrations.length; i++) {
        const contestant = contestantRegistrations[i];
        const entry: EntryScore = {
            _id: contestant._id,
            entryNumber: contestant.entryNumber,
            description: contestant.description,
            score: 0
        }
        result.push(entry);
    }
    entries.set(result);
}
*/
