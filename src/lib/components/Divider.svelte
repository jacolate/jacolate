<script lang="ts">
    import { browser } from '$app/environment';

    const calculateVerticalLines = () => {
        if (!browser) return 25; 
        return Math.floor(window.innerHeight / 25);
    };

    let verticalLines = $state(calculateVerticalLines());

    $effect(() => {
        if (!browser) return;

        const handleResize = () => {
            verticalLines = calculateVerticalLines();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });
</script>


<div class="h-full w-1/12 flex justify-center items-center py-2">
    <div class="text-gray-300 text-opacity-50 tracking-tightest">
        {#each Array(verticalLines) as _}
            <div class="text-center">|</div>
        {/each}
    </div>
</div>
