<script lang="ts">
    import {categories, registrations} from "$lib/stores";
    import RegisterEntry from "../../components/RegisterEntry.svelte";
    import type {Registration} from "../../models/Registration";
    import {onMount} from "svelte";
    import {
        addRegistration,
        deleteRegistration,
        getCategories,
        getRegistrations,
        updateRegistration
    } from "$lib/registration_api";
//    import {RingLoader} from "svelte-loading-spinners";

    let formVisible = false;

    let newContestant: Registration;

    onMount(async () => {
        $registrations = await getRegistrations();
        let cats: [{_id: string, description: string}] = await getCategories();
        $categories = cats.map(c => c.description);
    });


    function addNewContestantForm() {
        formVisible = true;
        newContestant = {
            entryNumber: 0,
            name: "",
            description: "",
            phone: "",
            category: ""
        };
    }

    const updateAction = async () => {
        formVisible = false;
        await updateRegistration(newContestant);
        $registrations = await getRegistrations();
    }

    const addAction = async () => {
        formVisible = false;
        let highestEntryNumber = ($registrations.length > 0) ?
            $registrations.reduce((prev, current) => (prev.entryNumber > current.entryNumber) ? prev : current).entryNumber
            : 0;
        newContestant.entryNumber = highestEntryNumber + 1;
        await addRegistration(newContestant);
        $registrations = await getRegistrations();
    }

    const cancelAction = () => {
        formVisible = false;
    }

    const deleteAction = async () => {
        formVisible = false;
        await deleteRegistration(newContestant);
        $registrations = await getRegistrations();
    }

    $: console.log($registrations)

    const editAction = (contestant: Registration) => {
        formVisible = true;
        newContestant = contestant;
    };

    // Order by entry number
    $: if($registrations) $registrations.sort((a, b) => a.entryNumber - b.entryNumber);

</script>

<h2 class="text-center">Registration</h2>
{#if formVisible===false}
    <button class="btn variant-filled" on:click={addNewContestantForm}>Register</button>
{:else}
    <div class="card">
        <section class="p-4">
            <div class="md:flex md:items-center mb-4">
                <div class="sm:w-1/2 md:w-1/3">
                    <label class="label" for="name-field">
                        Full Name
                    </label>
                </div>
                <div class="sm:w-1/2 md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="name-field"
                           type="text" bind:value={newContestant.name}>
                </div>
            </div>

            <div class="md:flex md:items-center mb-4">
                <div class="sm:w-1/2 md:w-1/3">
                    <label class="label" for="description-field">
                        Description
                    </label>
                </div>
                <div class="sm:w-1/2 md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="description-field"
                           type="text" bind:value={newContestant.description}>
                </div>
            </div>

            <div class="md:flex md:items-center mb-4">
                <div class="sm:w-1/2 md:w-1/3">
                    <label class="label" for="phone-field">
                        Phone
                    </label>
                </div>
                <div class="sm:w-1/2 md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="phone-field"
                           type="text" bind:value={newContestant.phone}>
                </div>
            </div>

            <div class="md:flex md:items-center mb-4">
                <div class="sm:w-1/2 md:w-1/3">
                    <label class="label" for="category-field">
                        Category
                    </label>
                </div>
                <div class="sm:w-1/2 md:w-2/3">
                    <select class="select" id="category-field" bind:value={newContestant.category}>
                        <option value="">Select a category</option>
                        {#each $categories as category}
                            <option value={category}>{category}</option>
                        {/each}
                    </select>
<!--

                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="category-field"
                           type="text" bind:value={newContestant.category}>
-->
                </div>
            </div>

            <div class="flex">
                <div class="flex-1 text-center">
                    {#if newContestant._id}
                        <button class="btn variant-filled-primary" type="button" on:click={updateAction}>
                            Update
                        </button>
                    {:else}
                        <button class="btn variant-filled-primary" type="button" on:click={addAction}>
                            Add
                        </button>
                    {/if}
                </div>
                <div class="flex-1 text-center">
                    <button class="btn variant-filled-primary" type="button" on:click={cancelAction}>
                        Cancel
                    </button>
                </div>
                {#if newContestant.entryNumber > 0}
                    <div class="flex-1 text-center">
                        <button class="btn variant-filled-primary" type="button" on:click={deleteAction}>
                            Delete
                        </button>
                    </div>
                {/if}
            </div>
        </section>
    </div>
{/if}

{#if $registrations === undefined}
    <div class="flex justify-center m-10">
<!--        <RingLoader size="100" color="#FF3E00"/>-->
    </div>
{:else}
    {#each $registrations as contestant}
        <div  on:click={() => editAction(contestant)}>
            <RegisterEntry {contestant}/>
        </div>

    {/each}
{/if}
