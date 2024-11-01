<script lang="ts">
	import { onMount } from 'svelte';
	let { clientIP } = $props();

	let weather = $state('');

	const fetchWeather = async () => {
		try {
			const response = await fetch('https://wttr.in/Bamberg?format=%c+%t');
			weather = await response.text();
			console.log('Weather:', weather);
		} catch (error) {
			console.error('Error fetching weather:', error);
			weather = 'Weather ..unavailable';
		}
	};

	onMount(() => {
		fetchWeather();
		setInterval(fetchWeather, 3600000);
	});

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
</script>

<footer class="bg-gray-500 flex flex-row text-white w-full text-center justify-between">
	<div class="flex flex-row justify-start">
		<div class="bg-blue-300 px-4">
			<p>1 > Home</p>
		</div>
		<div class="px-4">
			<p>2 > IDK</p>
		</div>
		<div class="px-4">
			<p>3 > Impressum</p>
		</div>
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
