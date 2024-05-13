<script lang="ts">
    import { page } from "$app/stores";
    import {onMount} from "svelte";
    import {deleteEntryScores, deleteEntryScoresForUser, getEntryScores, getRegistrations, saveEntryScores} from "$lib/registration_api";
    import type {Registration} from "../../../models/Registration";
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import type {EntryScore} from "../../../models/EntryScore";
    import {goto} from "$app/navigation";
	import { userId } from "$lib/stores";
	import { capitalize } from "$lib/utils";

    let items: { id: number, entryScore: EntryScore }[]  = []

    let entryScores: EntryScore[] = [];

    const flipDurationMs = 300;
    const handleDndConsider = e => {
        items = e.detail.items;
    };
    const handleDndFinalize = e => {
        items = e.detail.items;
    };
    const category = capitalize($page.params["category"]);

    const saveAndRedirect = async () => {
        await deleteEntryScoresForUser($userId);
        let entries = [...Array(items.length).keys()].map(index => {
            return { ...items[index].entryScore, score: items.length - index }
        });
        console.log(entries)
        await saveEntryScores(entries);
        await goto('/');
    };

    onMount(async () => {
        let registrations = (await getRegistrations()).filter((registration: Registration) => registration.category === category);
        // If the user has already submitted scores for this category, we'll want to use those.
        let existingScoresForUser = (await getEntryScores()).filter((entryScore: EntryScore) => entryScore.category === category && entryScore.userId === $userId);
        entryScores = registrations.map((registration: Registration) => {
            return {
                entryNumber: registration.entryNumber,
                description: registration.description,
                category,
                userId: $userId,
                score: existingScoresForUser.filter((entryScore: EntryScore) => entryScore.entryNumber === registration.entryNumber)[0]?.score || 0
            }
        })
        // As an aid to the user, entry scores are associated with the registration number.
        items = [...Array(entryScores.length).keys()].map(id => {
            return { id, entryScore: entryScores[id] }
        })
        // Sort all entries in a category in descending order based on overall score. This is important because if a user revisits this page, the entries will be
        // sorted by the score they provided.        
        items = items.sort((a, b) => b.entryScore.score - a.entryScore.score);
    });

    $: console.log(userId)




</script>

<h1 class="h1 text-center">{category}s</h1>
<h2 class="h2 text-center">From Best To Last</h2>
<div class="flex flex-col justify-center m-10">
    <section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
        {#each items as item(item.id)}
            <div class="card card-hover p-4 m-2" style="width: 100%" animate:flip="{{duration: flipDurationMs}}">
                <span class="flex-auto">Entry# {item.entryScore.entryNumber} - {item.entryScore.description}</span>
            </div>
        {/each}
    </section>
    <div class="flex justify-center m-10">
        <button type="button" class="btn variant-filled" on:click={() => saveAndRedirect()}>Finished</button>
    </div>
</div>
