(function($) {
    // Defining the Plugin
    $.fn.simpleTabs = function(options) {
        
        // Setup Default Options
        const settings = $.extend({
            activeClass: 'active',
            speed: 200, // Animation speed in ms
            defaultTab: '#home' 
        }, options);

        return this.each(function() {
            const $container = $(this);
            const $tabs = $container.find('.tab-links a');
            const $panels = $container.find('.tab-pane');

            // Main Function to Switch Tabs
            function switchTab(hash, updateHistory = true) {
                const $targetTab = $tabs.filter(`[href="${hash}"]`);
                const $targetPanel = $container.find(hash);

                // Exit if tab doesn't exist
                if ($targetTab.length === 0 || $targetPanel.length === 0) return;

                // Update tab link styling
                $tabs.parent().removeClass(settings.activeClass);
                $tabs.attr('aria-selected', 'false').attr('tabindex', '-1');
                
                $targetTab.parent().addClass(settings.activeClass);
                $targetTab.attr('aria-selected', 'true').attr('tabindex', '0').focus();

                // Cross-fade the panels
                $panels.hide().attr('aria-hidden', 'true');
                $targetPanel.fadeIn(settings.speed).attr('aria-hidden', 'false');

                // Updating URL Hash without jumping the page down
                if (updateHistory && history.pushState) {
                    history.pushState(null, null, hash);
                }
            }

            // Check if there's a hash in the URL already, otherwise use default
            let initialHash = window.location.hash || settings.defaultTab;
            if ($tabs.filter(`[href="${initialHash}"]`).length === 0) {
                initialHash = $tabs.first().attr('href'); // Fallback to very first tab
            }
            switchTab(initialHash, false); // Load initial tab without pushing history

            // Mouse Click Event
            $tabs.on('click', function(e) {
                e.preventDefault(); // Prevents page jump
                switchTab($(this).attr('href'));
            });

            // Browser Back/Forward Button Event
            $(window).on('hashchange', function() {
                const hash = window.location.hash || settings.defaultTab;
                switchTab(hash, false);
            });

            // Keyboard Accessibility (Left/Right Arrows)
            $tabs.on('keydown', function(e) {
                let $currentLi = $(this).parent();
                let $nextLi;

                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    $nextLi = $currentLi.next('li');
                    if ($nextLi.length === 0) $nextLi = $currentLi.siblings().first(); // Wrap to start
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    $nextLi = $currentLi.prev('li');
                    if ($nextLi.length === 0) $nextLi = $currentLi.siblings().last(); // Wrap to end
                }

                if ($nextLi) {
                    $nextLi.find('a').click(); // Triggers the click on the next tab
                }
            });
        });
    };
}(jQuery));

// Initialize the Plugin on the page
$(document).ready(function() {
    $('#myTabs').simpleTabs({
        activeClass: 'is-active', // Matches our CSS
        speed: 300,               
        defaultTab: '#home'
    });
});