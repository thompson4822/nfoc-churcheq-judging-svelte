<script lang="ts">
    import type {Registration} from "../models/Registration";

    export let contestant: Registration;
</script>

<section class="p-4 entry-description">
    <h3>#{contestant.entryNumber} - {contestant.description}</h3>
</section>

<style>
   .entry-description {
       background-color: #6b7280;
       margin: 1rem 1rem 1rem 1rem;
       padding: 1rem 1rem 1rem 1rem;
       border-radius: 10px;
   }
</style>