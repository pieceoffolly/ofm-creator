
var svgNS = "http://www.w3.org/2000/svg";
var PARENT_WIDTH = 250;
var STD_HEIGHT = 30;
var HEIGHT_STEP = 20;
var WIDTH_STEP = 20;

window.onload = init(struct);

function init(struct) {
    var div = createContainer(); 

    // var svg = createSVG(div, screen.width, screen.height);

    // var x = screen.width / 2 - PARENT_WIDTH / 2;
    // var y = 200;
    
    // // корневой блок
    // var rect = createRect(x, y, PARENT_WIDTH, STD_HEIGHT)
    // svg.appendChild(rect);      
    // var foreignObject = createForeignObject(x, y, PARENT_WIDTH, STD_HEIGHT, 'parent-title', struct[0].title);
    // svg.appendChild(foreignObject);
    // var newHeight = foreignObject.children[0].clientHeight;
    // if (foreignObject.clientHeight > newHeight) {
    //     newHeight = foreignObject.clientHeight;
    // }
    // else {
    //     foreignObject.setAttribute('height', newHeight);
    //     rect.setAttribute('height', newHeight);
    // }
    // добавление потомков
    // createChild(svg, struct, x + PARENT_WIDTH / 2, y + newHeight, PARENT_WIDTH, newHeight, 0);
};   

// Создание структуры
function createChild(svg, struct, parX, parY, parWidth, parHeight, index) {
    let rectMap = new Map();
    let foMap = new Map();
    let maxHeight = 0;    

    const parent = struct[index];
    const count = struct[index].children.length;
    const width = PARENT_WIDTH - 20;
    const height = STD_HEIGHT;

    const globalWidth = width * count + WIDTH_STEP * ( count - 1 )
    const globalHeight = height * count + 20 * ( count - 1 );
    let x = 0;
    let y = 0;
    if(parent.depth > 0) { 
        x = parX;
        // y = parY + parHeight + 
    } else {
        x = parX - globalWidth / 2;
        y = parY + 50
    }

    // создание блоков для потомков
    parent.children.forEach(child => {
        let rect = createRect(x, y, width, height)
        rectMap.set(child.id, rect);
        svg.appendChild(rect);     

        let foreignObject = createForeignObject(x, y, width, height, 'parent-title', child.title);
        foMap.set(child.id, foreignObject);
        svg.appendChild(foreignObject);

        let childHeight = foreignObject.children[0].clientHeight;
        if (maxHeight < childHeight) {
            maxHeight = childHeight;
        }        
        (child.depth > 1)
            ? y += height +50
            : x += width + WIDTH_STEP;
    });
    // изменение высоты блоков
    if (maxHeight > height) {
        parent.children.forEach(child => {
            foMap.get(child.id)
                 .setAttribute('height', maxHeight);
            rectMap.get(child.id)
                   .setAttribute('height', maxHeight);

            //    createChild(svg, struct, )
        });
    }
}

// Инициализация 
function createContainer() {
    const container = document.createElement('div');

    document.body.appendChild(container);

    return container;
};


// function createForeignObject( x, y, width, height, className, str) {
//     let foreignObject = document.createElementNS(svgNS, 'foreignObject');
//     foreignObject.setAttribute('x', x);
//     foreignObject.setAttribute('y', y);
//     foreignObject.setAttribute('width', width);
//     foreignObject.setAttribute('height', height);

//     let title = document.createElement('div');
//     title.setAttribute('xlmns', "http://www.w3.org/1999/xhtml");
//     title.setAttribute('class', className);
//     title.textContent = str;
//     foreignObject.appendChild(title);
    
//     return foreignObject;
// }

// function createRectWithText( x, y, maxWidth, maxHeight) {

// }

// function createText( x, y, className, str) {
//     let text = document.createElementNS(svgNS, 'text');
//     text.setAttribute('x', x);
//     text.setAttribute('y', y);
//     text.setAttribute('fill', '#000');
//     text.setAttribute('class', className);
//     text.textContent = str;
//     return text;
// }

// function createLine(fromX, fromY, toX, toY) {
//     return `<line x1="${fromX}" x2="${toX}" y1="${fromY}" y2="${toY}"/>`
// };

