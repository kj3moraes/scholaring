document.addEventListener('DOMContentLoaded', () => {
    const webringList = document.getElementById('webring-list');
    const searchInput = document.getElementById('search');
    let webringEntries = webringData.sites;

    webringEntries = webringEntries.map((entry, index) => ({...entry, originalIndex: index + 1}));

    displayEntries(webringEntries);

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredEntries = webringEntries.filter(entry => 
            entry.name.toLowerCase().includes(searchTerm) ||
            entry.year.toString().includes(searchTerm) ||
            entry.website.toLowerCase().includes(searchTerm)
        );
        displayEntries(filteredEntries);
    });

    function displayEntries(entries) {
        webringList.innerHTML = entries.map(entry => formatEntry(entry)).join('');
    }

    function formatEntry(entry) {
        return `
            <li>
               <a href="${entry.website}" target="_blank">${entry.originalIndex}. ${entry.name} | ${trimUrl(entry.website)} | ${entry.year}</a>
            </li>
        `;
    }

    function trimUrl(url) {
        return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    }
});
