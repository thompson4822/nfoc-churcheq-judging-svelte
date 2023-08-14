<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { onMount } from 'svelte';
	import {getEntryScores, getRegistrations} from "$lib/registration_api";
	import {registrations} from "$lib/stores";
	import type {EntryScore} from "../models/EntryScore";

	let dessertMap = new Map();
	let meatMap = new Map();

	// Entry #1 'Braized Beef' by Steve Thompson
	const createDescription = (entryScore: EntryScore) => {
		let name = $registrations.filter(registration => registration.entryNumber === entryScore.entryNumber)[0].name;
		return `${name}'s '${entryScore.description}'`;
	}

	const addToMap = (entryScore: EntryScore) => {
		let description = createDescription(entryScore);
		let map = entryScore.category === 'Dessert' ? dessertMap : meatMap;
		let score = (map.has(description)) ? map.get(description) + entryScore.score : entryScore.score;
		map.set(description, score);
	}

	onMount(async () => {
		$registrations = await getRegistrations();
		let entryScores: EntryScore[] = await getEntryScores();
		entryScores.forEach((entryScore) => {
			addToMap(entryScore);
		});
		meatMap = meatMap;
		dessertMap = dessertMap;

	});

	const orderedMap = (map: Map<string, number>) => {
		let ordered = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
		return ordered;
	}

</script>


<div class="container h-full mx-auto flex justify-center m-4">
	<div class="">
		<h1 class="h1 mb-4">NFOC Church-EQ Judging</h1>
		<div class="mb-3">
			<h2 class="h2">Meats</h2>
			<ol class="list-decimal">
				{#each [...orderedMap(meatMap).keys()] as description}
					<li>{description}, score = {meatMap.get(description)}</li>
				{/each}
			</ol>
		</div>
		<div class="mb-3">
			<h2 class="h2">Desserts</h2>
			<ol class="list-decimal">
				{#each [...orderedMap(dessertMap).keys()] as description}
					<li>{description}, score = {dessertMap.get(description)}</li>
				{/each}
			</ol>
		</div>
	</div>
</div>

<style>
	ol {
		padding: 5px 0 0px 40px;
	}
</style>