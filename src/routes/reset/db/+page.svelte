<script lang="ts">

    import {onMount} from "svelte";
    import {deleteEntryScores, deleteRegistrations} from "$lib/registration_api";

    onMount(async () => {
        await deleteRegistrations();
        await deleteEntryScores();
    });

</script>

<div class="container h-full mx-auto flex justify-center content-center">
    <h1 class="h1 mt-20">Records Cleared</h1>
</div>