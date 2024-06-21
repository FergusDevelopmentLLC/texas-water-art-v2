// Function to load data based on location
function loadData(location) {
    // Paths to the CSV files for the selected location
    const barDataPath = `data/${location}_bar.csv`;
    const pieDataPath = `data/${location}_pie.csv`;

    // Load the bar chart data and create the visualizations
    d3.csv(barDataPath).then(data => {
        createHorizontalBarCharts(data);
        createVerticalBarChart(data);
    });

    // Load the pie chart data and create the visualization
    d3.csv(pieDataPath).then(data => {
        createPieChart(data);
    });
}

// Function to create horizontal bar charts
function createHorizontalBarCharts(data) {
    d3.select("#chart1").selectAll("*").remove();
    d3.select("#chart2").selectAll("*").remove();
    d3.select("#chart3").selectAll("*").remove();

    // Your code to create 3 horizontal bar charts in chart1, chart2, and chart3
    // For simplicity, let's assume the data format is {category, value1, value2, value3}
    
    const categories = data.map(d => d.category);
    const values1 = data.map(d => +d.value1);
    const values2 = data.map(d => +d.value2);
    const values3 = data.map(d => +d.value3);

    createBarChart(d3.select("#chart1"), categories, values1, "Bar Chart 1");
    createBarChart(d3.select("#chart2"), categories, values2, "Bar Chart 2");
    createBarChart(d3.select("#chart3"), categories, values3, "Bar Chart 3");
}

// Function to create a single bar chart
function createBarChart(container, categories, values, title) {
    const width = container.node().getBoundingClientRect().width;
    const height = 200;
    const margin = {top: 20, right: 30, bottom: 40, left: 40};

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(categories)
        .range([0, width - margin.left - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(values)])
        .nice()
        .range([height, 0]);

    svg.append("g")
        .selectAll(".bar")
        .data(values)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => x(categories[i]))
        .attr("y", d => y(d))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d))
        .attr("fill", "steelblue");

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("x", (width - margin.left - margin.right) / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(title);
}

// Function to create a vertical bar chart
function createVerticalBarChart(data) {
    const chart4 = d3.select("#chart4");
    chart4.selectAll("*").remove();

    // Your code to create a vertical bar chart in chart4
    // For simplicity, let's assume the data format is {category, value}

    const categories = data.map(d => d.category);
    const values = data.map(d => +d.value);

    createBarChart(chart4, categories, values, "Vertical Bar Chart");
}

// Function to create a pie chart
function createPieChart(data) {
    const chart5 = d3.select("#chart5");
    chart5.selectAll("*").remove();

    // Your code to create a pie chart in chart5
    // For simplicity, let's assume the data format is {category, value}

    const width = chart5.node().getBoundingClientRect().width;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = chart5.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie()
        .value(d => d.value);

    const arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const data_ready = pie(data);

    svg.selectAll('path')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.category));

    svg.append("text")
        .attr("x", 0)
        .attr("y", -radius - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Pie Chart");
}

// Initial load
loadData('location1');
