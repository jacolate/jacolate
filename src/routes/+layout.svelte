<script lang="ts">
	import type { LayoutData } from './$types';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	console.log('clientIP:', data.clientIP);
</script>

<div class="min-h-screen bg-zinc-700 flex flex-col">
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer clientIP={data.clientIP} />
</div>
