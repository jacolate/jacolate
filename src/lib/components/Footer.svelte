<script lang="ts">
    import { page } from '$app/stores';
	let { clientIP, weather } = $props();

	const formatDate = (date: Date) => {
		return date
			.toLocaleString('en-US', {
				weekday: 'short',
				day: '2-digit',
				month: 'short',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			})
			.replace(',', '')
			.replace('at', ',');
	};

	let date = $state(formatDate(new Date()));

	setInterval(() => {
		date = formatDate(new Date());
	}, 60000);

    const isActive = (path: string) => $page.url.pathname === path;

</script>

<footer class="bg-gray-500 flex flex-row text-white w-full text-center justify-between self-end mb-4">
	<div class="flex flex-row justify-start">
		<a href="/">
		<div class={`px-4 ${isActive("/") ? "bg-blue-300" : "hover:bg-red-500"}`}>
			<p>1 > Home</p>
		</div>
		</a>
		<a href="/projects">
		<div class={`px-4 ${isActive("/projects") ? "bg-blue-300" : "hover:bg-red-500"}`}>
			<p>2 > Projects</p>
		</div>
		</a>
		<a href="/impressum">
		<div class={`px-4 ${isActive("/impressum") ? "bg-blue-300" : "hover:bg-red-500"}`}>
				<p>3 > Impressum</p>
			</div>
		</a>
	</div>

	<div class="flex flex-row justify-end text-gray-800">
		<div class="bg-blue-300 px-4">
			<p>{clientIP}</p>
		</div>
		<div class="bg-red-500 px-4">
			{#if weather}
				<p>{weather}</p>
			{:else}
				<p>Weather unavailable</p>
			{/if}
		</div>
		<div class="bg-green-600 px-4">
			<p>{date}</p>
		</div>
	</div>
</footer>
