document.addEventListener('DOMContentLoaded', function() {
    // Get the search input element
    const searchInput = document.getElementById('search');
    const webringList = document.getElementById('webring-list');

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
        
        webringData.sites.forEach((site, index) => {
            const listItem = webringList.children[index];
            if (listItem) {
                const matches = site.name.toLowerCase().includes(searchLower) ||
                              site.website.toLowerCase().includes(searchLower) ||
                              site.year.toString().includes(searchLower);  // Added year search back
                listItem.style.display = matches ? '' : 'none';
            }
        });
    }

    // Create and populate the webring list
    webringData.sites.forEach((site, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = site.website;
        a.target = "_blank";
        a.textContent = `${index + 1}. ${site.name} | ${site.website} | ${site.year}`;
        li.appendChild(a);
        webringList.appendChild(li);
    });

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
