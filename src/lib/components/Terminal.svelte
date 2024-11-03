<script lang="ts">
	import { goto as routerGoto } from '$app/navigation';
	type TerminalCommand = {
		command: string;
		description: string;
		output: string | string[];
	};
	type TerminalHistory = {
		user: string;
		at: string;
		host: string;
		input: string;
		output: string;
	};
	const commands: TerminalCommand[] = [
		{
			command: 'help',
			description: 'Show available commands',
			output: [
				'Available commands:',
				'- help: Show this help menu',
				'- clear: Clear the terminal',
				'- goto: Go to other pages. Usage: goto <page> , e.g. goto /projects',
				'- contact: Get contact information'
			]
		},
		{
			command: 'clear',
			description: 'Clear the terminal',
			output: ['']
		},
		{
			command: 'goto',
			description: 'Go to other pages. Usage: goto <page> , e.g. goto /projects',
			output: [
				'Other pages:',
				'- "/": Home',
				'- "/projects": Projects',
				'- "/impressum": Impressum'
			]
		},
		{
			command: 'contact',
			description: 'Contact information',
			output: ['Email: jakobkoller@t-online.de', 'GitHub: @jacolate']
		}
	];
	let inputHistory = $state<string[]>([]);
	let currentInput = $state('');
	let terminalOutput = $state<TerminalHistory[]>([
		{
			user: '',
			at: '',
			host: '',
			input: '',
			output: 'Welcome! Type "help" to see available commands.'
		}
	]);

	const handleCommand = () => {
		const trimmedInput = currentInput.trim().toLowerCase();
		inputHistory = [...inputHistory, trimmedInput];

		if (trimmedInput.startsWith('goto ')) {
			const page = trimmedInput.split(' ')[1];
			routerGoto(page);
			terminalOutput = [
				...terminalOutput,
				{
					user: 'visitor',
					at: '@',
					host: 'jacolate',
					input: '$',
					output: trimmedInput
				},
				{
					user: '',
					at: '',
					host: '',
					input: '',
					output: `Navigating to ${page}...`
				}
			];
			currentInput = '';
			return;
		}

		const matchedCommand = commands.find((cmd) => cmd.command === trimmedInput);
		if (matchedCommand) {
			terminalOutput = [
				...terminalOutput,
				{
					user: 'visitor',
					at: '@',
					host: 'jacolate',
					input: '$',
					output: trimmedInput
				},
				...(Array.isArray(matchedCommand.output)
					? matchedCommand.output.map((line) => ({
							user: '',
							at: '',
							host: '',
							input: '',
							output: line
						}))
					: [
							{
								user: '',
								at: '',
								host: '',
								input: '',
								output: matchedCommand.output
							}
						])
			];
		} else {
			terminalOutput = [
				...terminalOutput,
				{
					user: 'visitor',
					at: '@',
					host: 'jacolate',
					input: '$',
					output: trimmedInput
				},
				{
					user: '',
					at: '',
					host: '',
					input: '',
					output: 'Command not found. Type "help" for available commands.'
				}
			];
		}

		if (trimmedInput === 'clear') {
			terminalOutput = [];
		}

		currentInput = '';
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleCommand();
		}
	};
</script>

<div class="w-4/12">
	<div
		class="p-4 rounded-lg h-[90vh] max-w-2xl mx-auto overflow-y-auto"
		on:click|self={() => document.querySelector('input')?.focus()}
	>
		<div class="terminal-output grid overflow-y-auto gap-4 mb-4">
			{#each terminalOutput as line}
				<div class="flex flex-row gap-2">
					{#if line.user}
						<div class="mr-1 self-center flex flex-row">
							<span class="text-green-300">{line.user}</span>
							<span class="text-red-300">{line.at}</span>
							<span class="text-blue-300">{line.host}</span>
							<span class="text-red-300 pl-4">{line.input}</span>
						</div>
					{/if}
					<span>{line.output}</span>
				</div>
			{/each}
		</div>

		<div class="flex">
			<div class="mr-1 self-center flex flex-row">
				<span class="text-green-300">visitor</span>
				<span class="text-red-300">@</span>
				<span class="text-blue-300">jacolate</span>
				<span class="text-red-300 pl-4">$</span>
			</div>
			<input
				type="text"
				bind:value={currentInput}
				on:keydown={handleKeydown}
				autofocus={true}
				class="bg-transparent self-center focus:outline-none border-none outline-transparent focus:ring-0 outline-none flex-grow"
				placeholder="...."
			/>
		</div>
	</div>
</div>
