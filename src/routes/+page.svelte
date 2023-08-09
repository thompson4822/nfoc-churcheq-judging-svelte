<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { onMount } from 'svelte';
	import {getRegistrations} from "$lib/registration_api";
	import {registrations} from "$lib/stores";

	onMount(async () => {
		$registrations = await getRegistrations();
	});

</script>


<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">NFOC Church-EQ Judging</h1>
		<p>Here are some registrations:</p>
		<ul>
			{#each $registrations as registration}
				<li>({registration.entryNumber}) {registration.name} with '{registration.description}'</li>
			{/each}
		</ul>
	</div>
</div>
