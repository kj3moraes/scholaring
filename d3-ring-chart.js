document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('chart-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const nodeRadius = 20;

    const svg = d3.select('#chart-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('background-color', '#000');

    // Create a group for zoom transformation
    const g = svg.append('g');

    // Add zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])  // Set min and max zoom scale
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);

    // Add tooltip div
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Add unique IDs to each site
    webringData.sites.forEach((site, index) => {
        site.id = `node-${index}`;
    });

    const simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(50)) // Changed to use id instead of name
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(nodeRadius * 1.2))
        .alphaDecay(0.02)
        .velocityDecay(0.3);

    const links = webringData.sites.map((site, index) => ({
        source: site.id, // Changed to use id
        target: webringData.sites[(index + 1) % webringData.sites.length].id // Changed to use id
    }));

    const link = g.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke', '#fff')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', 1);

    const node = g.append('g')
        .selectAll('g')
        .data(webringData.sites)
        .enter().append('g')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
            .filter(event => !event.button && event.type !== "wheel"));

    node.append('circle')
        .attr('r', nodeRadius)
        .attr('fill', '#fff')
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        .on('click', handleClick);

    simulation
        .nodes(webringData.sites)
        .on('tick', ticked);

    simulation.force('link')
        .links(links);

    // Modified fitToView function
    function fitToView() {
        simulation.tick(30); // Run some ticks immediately
        
        // Calculate bounds of all nodes
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        node.each(d => {
            minX = Math.min(minX, d.x);
            minY = Math.min(minY, d.y);
            maxX = Math.max(maxX, d.x);
            maxY = Math.max(maxY, d.y);
        });
        
        // Add padding
        const padding = 50;
        minX -= padding;
        minY -= padding;
        maxX += padding;
        maxY += padding;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        const scale = Math.min(
            width / (maxX - minX),
            height / (maxY - minY)
        ) * 0.9;
        
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        
        // Apply the initial transform
        svg.call(zoom.transform, d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(-centerX, -centerY)
        );
    }

    // Call fitToView after a short delay
    setTimeout(fitToView, 100);

    function ticked() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('transform', d => `translate(${d.x},${d.y})`);
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    function handleMouseOver(event, d) {
        d3.select(this)
            .attr('fill', '#bd082c');

        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        
        const trimmedUrl = d.website.replace(/^https?:\/\//, '');
        tooltip.html(trimmedUrl)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    }

    function handleMouseOut(event, d) {
        d3.select(this)
            .attr('fill', getNodeColor(d));

        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }

    function handleClick(event, d) {
        window.open(d.website, '_blank');
    }

    function getNodeColor(d) {
        const searchInput = document.getElementById('search');
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === '') {
            return '#fff';
        }
        const isFiltered = d.name.toLowerCase().includes(searchTerm) ||
                           d.year.toString().includes(searchTerm) ||
                           d.website.toLowerCase().includes(searchTerm);
        return isFiltered ? '#bd082c' : '#fff';
    }

    // Update node colors when search input changes
    document.getElementById('search').addEventListener('input', updateNodeColors);

    function updateNodeColors() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        
        // Reset all nodes to default color
        node.selectAll('circle')
            .attr('fill', '#fff');
        
        if (searchTerm) {
            // Find matching nodes
            const matchingNodes = node.filter(d => 
                d.name.toLowerCase().includes(searchTerm) ||
                d.year.toString().includes(searchTerm) ||
                d.website.toLowerCase().includes(searchTerm)
            );
            
            if (matchingNodes.size() > 0) {
                // Highlight matching nodes
                matchingNodes.selectAll('circle')
                    .attr('fill', '#bd082c');
                
                // Calculate the bounding box of all matching nodes
                let minX = Infinity, minY = Infinity;
                let maxX = -Infinity, maxY = -Infinity;
                
                matchingNodes.each(d => {
                    minX = Math.min(minX, d.x);
                    minY = Math.min(minY, d.y);
                    maxX = Math.max(maxX, d.x);
                    maxY = Math.max(maxY, d.y);
                });
                
                // Add padding
                const padding = 100;
                minX -= padding;
                minY -= padding;
                maxX += padding;
                maxY += padding;
                
                // Calculate the scale and translate to focus on matching nodes
                const width = container.clientWidth;
                const height = container.clientHeight;
                
                const scale = Math.min(
                    width / (maxX - minX),
                    height / (maxY - minY)
                ) * 0.9;
                
                const centerX = (minX + maxX) / 2;
                const centerY = (minY + maxY) / 2;
                
                // Animate the transition
                svg.transition()
                    .duration(750)
                    .call(zoom.transform, d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(scale)
                        .translate(-centerX, -centerY)
                    );
            }
        } else {
            // If search is cleared, reset the view
            svg.transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity);
        }
    }

    // Resize function to update SVG dimensions
    function resizeChart() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        svg.attr('viewBox', `0 0 ${newWidth} ${newHeight}`);
        simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2));
        simulation.alpha(1).restart();
    }

    // Add event listener for window resize
    window.addEventListener('resize', resizeChart);

    function handleSearch(searchTerm) {
        // Reset all nodes to default color
        node.attr("fill", d => d.children ? "#fff" : "#999");
        
        if (searchTerm) {
            // Find matching nodes
            const matchingNodes = node.filter(d => 
                d.data.name && d.data.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (matchingNodes.size() > 0) {
                // Highlight matching nodes
                matchingNodes.attr("fill", "red");
                
                // Calculate the bounding box of all matching nodes
                let minX = Infinity, minY = Infinity;
                let maxX = -Infinity, maxY = -Infinity;
                
                matchingNodes.each(function(d) {
                    const bbox = this.getBBox();
                    const transform = d3.zoomTransform(svg.node());
                    const x = d.x;
                    const y = d.y;
                    
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                });
                
                // Add padding
                const padding = 50;
                minX -= padding;
                minY -= padding;
                maxX += padding;
                maxY += padding;
                
                // Calculate the scale and translate to focus on matching nodes
                const width = svg.node().getBoundingClientRect().width;
                const height = svg.node().getBoundingClientRect().height;
                
                const scale = Math.min(
                    width / (maxX - minX),
                    height / (maxY - minY)
                ) * 0.9; // 0.9 to add some margin
                
                const centerX = (minX + maxX) / 2;
                const centerY = (minY + maxY) / 2;
                
                // Animate the transition
                svg.transition()
                    .duration(750)
                    .call(zoom.transform, d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(scale)
                        .translate(-centerX, -centerY)
                    );
            }
        } else {
            // If search is cleared, reset the view
            svg.transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity);
        }
    }

    // Update the search input event listener
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });
});
