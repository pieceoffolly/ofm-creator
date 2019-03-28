export function createRect(x, y, width, height) {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}"/>`
}

export function createLine(fromX, fromY, toX, toY) {
    return `<line x1="${fromX}" x2="${toX}" y1="${fromY}" y2="${toY}"/>`
}