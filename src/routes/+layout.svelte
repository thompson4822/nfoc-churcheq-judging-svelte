<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { onMount } from 'svelte';
	import { serialize, parse } from 'cookie';
	import { userId } from '$lib/stores';

	const generateUUID = (): string => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	onMount(() => {
		const cookie = parse(document.cookie);
		$userId = cookie.userId || generateUUID();
		document.cookie = serialize('userId', $userId, { maxAge: 60 * 60 * 24 * 30 });
		console.log($userId);
	});


</script>
<slot />
