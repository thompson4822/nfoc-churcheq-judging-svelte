<script lang="ts">
    import { onMount } from "svelte";
    import { addCategory, getCategories, deleteCategory, deleteAllCategories, deleteRegistrations, deleteEntryScores } from "$lib/registration_api";
	import type { Category } from "../../models/Category";

    let newCategory = "";
    let categories: Category[] = [];

    const addNewCategory = async () => {
        await addCategory({ description: newCategory });
        loadCategories();
        newCategory = "";
    };

    const deleteSelectedCategory = async (categoryId: string) => {
        await deleteCategory(categoryId);
        await loadCategories();
    };

    const clearAllCategories = async () => {
        await deleteAllCategories();
        loadCategories();
    };

    const resetDatabase = async () => {
        // Clear registrations, entry scores, and categories
        // Implement the logic to clear these entities in your backend
        // Example: 
        await deleteRegistrations(); 
        await deleteEntryScores(); 
        await deleteAllCategories();
        await loadCategories();
    };

    const loadCategories = async () => {
        // Load categories from the database
        // You can implement this based on your setup
        // Example: 
        categories = await getCategories();
    };

    onMount(async () => {
        loadCategories();
    });
</script>

<div class="container h-full mx-auto flex justify-center m-4">
    <div class="">
        <h1 class="h1 mb-4">Admin Page</h1>
        <div class="mb-3">
            <input type="text" bind:value={newCategory} placeholder="Enter new category name" />
            <button class="btn variant-filled-primary" on:click={addNewCategory}>Add Category</button>
        </div>
        
        <h2 class="h2">Categories</h2>
        <ul>
            {#each categories as category}
                <li>
                    {category.description}
                    <button class="btn variant-filled-primary" type="button" on:click={() => deleteSelectedCategory(category._id)}>Delete</button>
                </li>
            {/each}
        </ul>

        <button class="btn variant-filled-primary" on:click={resetDatabase}>Reset Database</button>
    </div>
</div>