<script lang="ts">
    import { page } from "$app/stores";
    import {onMount} from "svelte";
    import {getRegistrations, saveEntryScores} from "$lib/registration_api";
    import type {Registration} from "../../../models/Registration";
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import type {EntryScore} from "../../../models/EntryScore";
    import {goto} from "$app/navigation";

    let items: { id: number, entryScore: EntryScore }[]  = []

    let entryScores: EntryScore[] = [];

    const flipDurationMs = 300;
    const handleDndConsider = e => {
        items = e.detail.items;
    };
    const handleDndFinalize = e => {
        items = e.detail.items;
    };
    const { category } = $page.params;

    const saveAndRedirect = async () => {
        let entries = [...Array(items.length).keys()].map(index => {
            return { ...items[index].entryScore, score: items.length - index }
        });
        console.log(entries)
        await saveEntryScores(entries);
        await goto('/');
    };

    onMount(async () => {
        let registrations = (await getRegistrations()).filter((registration: Registration) => registration.category === category);
        entryScores = registrations.map((registration: Registration) => {
            return {
                entryNumber: registration.entryNumber,
                description: registration.description,
                category,
                score: 0
            }
        })
        items = [...Array(entryScores.length).keys()].map(id => {
            return { id, entryScore: entryScores[id] }
        })
    });


</script>

<h1 class="h1 text-center">{category}s</h1>
<h2 class="h2 text-center">From Best To Last</h2>
<!--<div class="container h-full mx-auto flex justify-center">-->
    <div class="flex flex-col justify-center m-10">
        <section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
            {#each items as item(item.id)}
                <div class="card card-hover p-4 m-2" style="width: 100%" animate:flip="{{duration: flipDurationMs}}">
                    <span class="flex-auto">Entry# {item.entryScore.entryNumber} - {item.entryScore.description}</span>
                </div>
            {/each}

            <!--
            {#each items as item(item.id)}
                <div animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
            {/each}
            -->
        </section>
        <div class="flex justify-center m-10">
            <button type="button" class="btn variant-filled" on:click={() => saveAndRedirect()}>Finished</button>
        </div>
    </div>
<!--</div>-->