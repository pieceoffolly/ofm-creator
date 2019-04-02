
// import { createRect as createRect } from './core/drawer.mjs';

const struct = [{
    id : "1",
    title : "Тестовый региональный центр связи арываортываотывапьыкапьывапьыап",
    data : {},
    depth : 0,
    children : [  
        { 
            id : "2",
            title : "Технический отдел",
            data : {},
            depth : 1,
            children : [] 
        },
        {   id : "3" ,
            title : "Финансово-экономический отдел впфварфываоыпыапьываьврбьырьбыьбыьы",
            data : {},
            depth : 1,
            children : [] 
        },
        {
            id : "4",
            title : "Произв. уч. монит. и диаг.сети связи(ЦТО)",
            data : {},
            depth : 1,
            children : [
                { 
                    id : "6",
                    title : "Бригада механизации и автотранспорта",
                    data : {},
                    depth : 2,
                    children : [] 
                },
                {   id : "7",
                    title : "Финансово-экономическая группа",
                    data : {},
                    depth : 3,
                    children : [] 
                },
            ] 
        },
        {
            id : "5",
            title : "Участок устр-в связи Каясан-Введенское",
            data : {},
            depth : 1,
            children : [] 
        }
    ]
}];

const svgNS = "http://www.w3.org/2000/svg";
const PARENT_WIDTH = 250;
const STD_HEIGHT = 30;
const HEIGHT_STEP = 20;
const WIDTH_STEP = 20;

window.onload = init(struct);

function init(struct) {
    const div = createContainer(); 

    const svg = createSVG(div, screen.width, screen.height);

    let x = screen.width / 2 - PARENT_WIDTH / 2;
    let y = 200;
    
    // корневой блок
    let rect = createRect(x, y, PARENT_WIDTH, STD_HEIGHT)
    svg.appendChild(rect);      
    let foreignObject = createForeignObject(x, y, PARENT_WIDTH, STD_HEIGHT, 'parent-title', struct[0].title);
    svg.appendChild(foreignObject);
    let newHeight = foreignObject.children[0].clientHeight;
    if (foreignObject.clientHeight > newHeight) {
        newHeight = foreignObject.clientHeight;
    }
    else {
        foreignObject.setAttribute('height', newHeight);
        rect.setAttribute('height', newHeight);
    }
    // добавление потомков
    createChild(svg, struct, x + PARENT_WIDTH / 2, y + newHeight, PARENT_WIDTH, newHeight, 0);
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

function createSVG(container, width, height) {
    let svg = document.createElementNS(svgNS, 'svg');    
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    container.appendChild(svg);
    return svg;
};

// Утилиты
function createRect( x, y, width, height) {
    let rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('stroke', 'black' )
    rect.setAttribute('fill', 'white');
    return rect;
};

function createForeignObject( x, y, width, height, className, str) {
    let foreignObject = document.createElementNS(svgNS, 'foreignObject');
    foreignObject.setAttribute('x', x);
    foreignObject.setAttribute('y', y);
    foreignObject.setAttribute('width', width);
    foreignObject.setAttribute('height', height);

    let title = document.createElement('div');
    title.setAttribute('xlmns', "http://www.w3.org/1999/xhtml");
    title.setAttribute('class', className);
    title.textContent = str;
    foreignObject.appendChild(title);
    
    return foreignObject;
}

function createRectWithText( x, y, maxWidth, maxHeight) {

}

function createText( x, y, className, str) {
    let text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('fill', '#000');
    text.setAttribute('class', className);
    text.textContent = str;
    return text;
}

function createLine(fromX, fromY, toX, toY) {
    return `<line x1="${fromX}" x2="${toX}" y1="${fromY}" y2="${toY}"/>`
};

