<script lang="ts">
    import { page } from "$app/stores";
    import {onMount} from "svelte";
    import {getRegistrations} from "$lib/registration_api";
    import type {Registration} from "../../../models/Registration";
    import {entryScores} from "$lib/stores";
    const { category } = $page.params;

    onMount(async () => {
        let registrations = (await getRegistrations()).filter((registration: Registration) => registration.category === category);
        $entryScores = registrations.map((registration: Registration) => {
            return {
                entryNumber: registration.entryNumber,
                description: registration.description,
                category,
                score: 0
            }
        })
    });

</script>

<h1>Your Chosen Category Was {category}</h1>
<h2>Items Include:</h2>
{#each $entryScores as entryScore}
    <p>{entryScore.entryNumber} - {entryScore.description}</p>
{/each}
