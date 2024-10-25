document.addEventListener('DOMContentLoaded', function() {
    // Colorful console message for curious developers
    console.log(
        "%c👋 Hey there" +
        "\n\n%cLooks like you're poking around in the console. Why not add your site to the webring?" +
        "\n\n%c→ https://github.com/JusGu/uwatering",
        "font-size: 18px; font-weight: bold; color: #FF3366;",
        "font-size: 14px; color: #00FF00;",
        "font-size: 14px; color: #3399FF; text-decoration: underline;"
    );

    // Get the search input element
    const searchInput = document.getElementById('search');

    // Handle URL fragment on page load
    function handleUrlFragment() {
        const fragment = window.location.hash.slice(1); // Remove the # symbol
        if (fragment) {
            searchInput.value = decodeURIComponent(fragment);
            filterWebring(fragment);
            const searchEvent = new Event('input');
            searchInput.dispatchEvent(searchEvent);
        }
    }

    // Filter webring sites based on search input
    function filterWebring(searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const filteredSites = webringData.sites.filter(site => 
            site.name.toLowerCase().includes(searchLower) ||
            site.website.toLowerCase().includes(searchLower) ||
            site.year.toString().includes(searchLower)
        );
        createWebringList(filteredSites);
    }

    // Create and populate the webring list
    function createWebringList(sites) {
        const webringList = document.getElementById('webring-list');
        webringList.innerHTML = sites.map((site) => {
            const displayUrl = site.website
                .replace(/^https?:\/\/(www\.)?/, '') 
                .replace(/\/$/, ''); 
                
            const originalIndex = webringData.sites.findIndex(s => s.website === site.website);
                
            return `
                <li>
                    <a href="${site.website}" target="_blank">
                        <span class="number">${originalIndex + 1}.</span>
                        <span class="name">${site.name}</span>
                        <span class="separator">|</span>
                        <span class="website">${displayUrl}</span>
                        <span class="separator">|</span>
                        <span class="year">${site.year}</span>
                    </a>
                </li>
            `;
        }).join('');
    }

    // Initial creation of the list
    createWebringList(webringData.sites);

    // Add event listener for search input
    searchInput.addEventListener('input', (e) => {
        filterWebring(e.target.value);
    });

    // Handle URL changes
    window.addEventListener('hashchange', handleUrlFragment);

    // Handle initial URL fragment without any delay
    handleUrlFragment();

    // Function to handle previous and next navigation
    function navigateWebring() {
        const fragment = window.location.hash.slice(1); // Get the current site and nav from the URL fragment
        const [currentSite, query] = fragment.split('?');
        const params = new URLSearchParams(query);
        const nav = params.get('nav');

        const currentIndex = webringData.sites.findIndex(site => site.website.includes(currentSite));

        if (currentIndex === -1 || !nav) return; // If the site or nav is not found, do nothing

        let newIndex;
        if (nav === 'prev') {
            newIndex = (currentIndex === 0) ? webringData.sites.length - 1 : currentIndex - 1;
        } else if (nav === 'next') {
            newIndex = (currentIndex === webringData.sites.length - 1) ? 0 : currentIndex + 1;
        }

        const newSite = webringData.sites[newIndex];
        if (newSite) {
            // Redirect without preserving the hash
            window.location.href = newSite.website;
        }
    }

    // Call navigateWebring on page load if there's a nav in the URL
    if (window.location.hash.includes('?nav=')) {
        navigateWebring();
    }

    // Example usage: navigateWebring('left') or navigateWebring('right')
    // You can call these functions based on user input or button clicks
});
