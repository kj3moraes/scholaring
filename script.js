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
});
