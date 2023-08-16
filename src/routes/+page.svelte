<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import {onMount} from 'svelte';
	import {getEntryScores, getRegistrations} from "$lib/registration_api";
	import {registrations} from "$lib/stores";
	import type {EntryScore} from "../models/EntryScore";

	let mapOfMaps = new Map();

	const createDescription = (entryScore: EntryScore) => {
		let name = $registrations.filter(registration => registration.entryNumber === entryScore.entryNumber)[0].name;
		return `${name}'s '${entryScore.description}'`;
	}

	// Given an entry with an entry number, description and score, add its score to the final scores
	const addToMap = (entryScore: EntryScore) => {
		let description = createDescription(entryScore);
		let category = entryScore.category;
		let map = mapOfMaps.get(category);
		// When the category exists, a map for that category must also exist with which we'll work
		if (map) {
			let currentScore = map.get(description);
			// When the entry's description exists, update its score
			if (currentScore) {
				map.set(description, currentScore + entryScore.score)
			}
			// Otherwise, add the entry description and score to the map
			else {
				map.set(description, entryScore.score)
			}
		}
		// When no map exists for the category, add it, and create its sub-map with the description and entry score
		else {
			mapOfMaps.set(category, new Map([[description, entryScore.score]]))
		}
	}

	onMount(async () => {
		$registrations = await getRegistrations();
		let entryScores: EntryScore[] = await getEntryScores();

		mapOfMaps = new Map();
		entryScores.forEach((entryScore) => {
			addToMap(entryScore);
		});

		mapOfMaps = mapOfMaps
	});

	// Sort all entries in a category in descending order based on overall score
	const orderedMap = (categoryMap) => {
		return new Map([...categoryMap.entries()].sort((a, b) => b[1] - a[1]));
	}

</script>


<div class="container h-full mx-auto flex justify-center m-4">
	<div class="">
		<h1 class="h1 mb-4">NFOC Church-EQ Judging</h1>
		{#each [...mapOfMaps.keys()] as category }
			<div class="mb-3">
					<h2 class="h2">{category}s</h2>
					<ol class="list-decimal">
						{#each [...orderedMap(mapOfMaps.get(category)).keys()] as description}
							<li>{description}, score = {mapOfMaps.get(category).get(description)}</li>
						{/each}
					</ol>
			</div>
		{/each}
	</div>
</div>

<style>
	ol {
		padding: 5px 0 0px 40px;
	}
</style>