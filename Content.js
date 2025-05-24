(function hideYouTubeShorts() {
    const hideShorts = () => {
        // 1. Hide all rich section renderers (main Shorts shelves)
        document.querySelectorAll('ytd-rich-section-renderer').forEach(el => {
            el.style.display = 'none';
        });

        // 2. Hide reel shelves (alternative Shorts containers)
        document.querySelectorAll('ytd-reel-shelf-renderer').forEach(el => {
            el.style.display = 'none';
        });

        // 3. Hide individual Shorts items in the feed
        document.querySelectorAll('a[href^="/shorts/"]').forEach(el => {
            const container = el.closest('ytd-rich-item-renderer, ytd-reel-item-renderer, ytd-video-renderer');
            if (container) container.style.display = 'none';
        });

        // 4. Hide Shorts thumbnails (alternative detection)
        document.querySelectorAll('ytd-thumbnail[overlay-style="SHORTS"]').forEach(el => {
            const container = el.closest('ytd-rich-item-renderer, ytd-reel-item-renderer');
            if (container) container.style.display = 'none';
        });

        // 5. Specific case you found - nth-of-type rich sections
        document.querySelectorAll('ytd-rich-grid-renderer ytd-rich-section-renderer').forEach(el => {
            el.style.display = 'none';
        });
    };

    // Run immediately
    hideShorts();
    
    // Observe for dynamic content changes
    const observer = new MutationObserver(hideShorts);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
    
    // Handle YouTube's SPA navigation
    document.addEventListener('yt-navigate-finish', hideShorts);
    
    // Extra safety - run periodically in case some elements are missed
    const safetyInterval = setInterval(hideShorts, 1000);
    
    // Clean up when the script is unloaded (optional)
    window.addEventListener('unload', () => {
        clearInterval(safetyInterval);
        observer.disconnect();
    });
})();