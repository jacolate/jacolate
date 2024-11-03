<script lang="ts">
    import type { LayoutData } from './$types';
    import Footer from '$lib/components/Footer.svelte';
    import '../app.css';
    import Terminal from '$lib/components/Terminal.svelte';
    import Divider from '$lib/components/Divider.svelte';
    let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<!-- Main container with min-height to ensure footer stays at bottom -->
<div class="min-h-screen bg-zinc-700 flex flex-col">
    <!-- Main content area that can grow but won't push footer down -->
    <main class="flex flex-grow flex-row h-[calc(100vh-theme(spacing.16))]">
        <Terminal />
        <Divider />
        <!-- Content container with relative positioning -->
        <div class="w-7/12 relative">
            <!-- Scrollable content area with absolute positioning -->
            <div class="absolute inset-0 ">
                <div class="my-7 mr-5 h-5/6 overflow-y-auto scrollbar-no-track">
                    {@render children()}
                </div>
            </div>
        </div>
    </main>
    <!-- Footer will always stay at bottom -->
    <Footer clientIP={data.clientIP} weather={data.weather} />
</div>
