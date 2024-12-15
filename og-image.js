addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get("date");
    const lifespan = url.searchParams.get("lifespan") || 80;

    if (!date) {
      return new Response("Missing date", { status: 400 });
    }

    const totalWeeks = Number(lifespan) * 52;
    const weeksLived = Math.floor(
      (Date.now() - new Date(date).getTime()) / 1000 / 60 / 60 / 24 / 7,
    );

    // SVG dimensions
    const width = 1200;
    const height = 630;

    // Calculate margins
    const margin = 10;
    const availableWidth = width - 2 * margin;
    const availableHeight = height - 2 * margin;

    // Calculate rectangle dimensions
    const cols = Math.ceil(totalWeeks / 52); // Years across
    const rows = 52; // Weeks down

    // Calculate the size of each rectangle
    const rectWidth = Math.floor(availableWidth / cols);
    const rectHeight = Math.floor(availableHeight / rows);
    const rectSize = Math.min(rectWidth, rectHeight); // Use the smaller dimension

    // Calculate actual grid width and height
    const gridWidth = cols * rectSize;
    const gridHeight = rows * rectSize;

    // Center the grid
    const translateX = (width - gridWidth) / 2;
    const translateY = (height - gridHeight) / 2;

    // Create SVG dynamically
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#242424"/>
        <g transform="translate(${translateX}, ${translateY})">
          ${Array.from({ length: totalWeeks }, (_, i) => i)
            .map((i) => {
              const year = Math.floor(i / 52);
              const week = i % 52;
              return `
              <rect
                x="${year * rectSize}"
                y="${week * rectSize}"
                width="${rectSize - 2}"
                height="${rectSize - 2}"
                fill="${i < weeksLived ? "#646cff" : "#f0f0f0"}"
              />
            `;
            })
            .join("")}
        </g>
      </svg>
    `;

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=0", // Cache for 24 hours
      },
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
