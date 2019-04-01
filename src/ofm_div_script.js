var scheme = [{
    "id" : "1",
    "title" : "Руководитель",
    "functions" : {},
    "indicators": ['Nпп`', 'Nпп'],
    "children" : [  
        { 
            "id" : "2",
            "title" : "Первый заместитель руководителя",
            "data" : ['10. Ключевая функция', '11. Ключевая функция', '12. Ключевая функция'],
            "children" : [] 
        },
        {   
            "id" : "3",
            "title" : "Главный инженер",
            "data" : {},
            "children" : [] 
        },
        {
            "id" : "4",
            "title" : "Заместитель руководителя (по экономике и финансам)",
            "data" : {},
            "children" : [] 
        }
    ]
}];

var PARENT_WIDTH = 250;
var STD_BLOCK_HEIGHT = 100;
var STD_HEIGHT = 130;
var HEIGHT_STEP = 20;
var WIDTH_STEP = 20;

function init() {
    var root = document.getElementById("root");

    // createScheme(screen.width/2, screen.height/2);
    // var title = scheme[0].title;
    var parent = scheme[0];
    var parent_block = createBlock(100, 475, PARENT_WIDTH, STD_HEIGHT, parent.title, parent.functions, parent.indicators);
    root.appendChild(parent_block);

    var newHeight = parent_block.children[0].clientHeight + 7 ;

    if (parent_block.clientHeight > newHeight) {
        parent_block.children[0].style.height = STD_BLOCK_HEIGHT + 'px';
        newHeight = parent_block.clientHeight;
    }
    else {
        parent_block.style.height = newHeight + 'px';
        parent_block.children[1].style.top = newHeight + 'px';
    }
};

function createScheme() {
    var rectMap = new Map();
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
    // parent.children.forEach(child => {
    //     // let rect = createRect(x, y, width, height)
    //     // rectMap.set(child.id, rect);
    //     // svg.appendChild(rect);     

    //     // let foreignObject = createForeignObject(x, y, width, height, 'parent-title', child.title);
    //     // foMap.set(child.id, foreignObject);
    //     // svg.appendChild(foreignObject);

    //     // let childHeight = foreignObject.children[0].clientHeight;
    //     // if (maxHeight < childHeight) {
    //     //     maxHeight = childHeight;
    //     // }        
    //     // (child.depth > 1)
    //     //     ? y += height +50
    //     //     : x += width + WIDTH_STEP;
    // });
    // изменение высоты блоков
    if (maxHeight > height) {
        // parent.children.forEach(child => {
        //     foMap.get(child.id)
        //          .setAttribute('height', maxHeight);
        //     rectMap.get(child.id)
        //            .setAttribute('height', maxHeight);

        //     //    createChild(svg, struct, )
        // });
    }
};

function createBlock(x, y, width, height, title, functions, indicators) {
    var outerBlock = document.createElement('div');
    outerBlock.setAttribute('class', 'outer_block');
    outerBlock.style.top = x + 'px';
    outerBlock.style.left = y + 'px';
    outerBlock.style.width = width + 'px';
    outerBlock.style.height = height + 'px';

    var blockBody = document.createElement('div');
    blockBody.setAttribute('class', 'block_body');

    var blockTitle = document.createElement('h3');
    blockTitle.textContent = title;
    blockBody.appendChild(blockTitle);

    outerBlock.appendChild(blockBody);

    for(var i=0; i<functions.length; i++){
        var funcText = document.createElement('p');
        funcText.textContent = functions[i];
        blockBody.appendChild(funcText); 
    };

    var footerBlock = document.createElement('div');
    footerBlock.setAttribute('class', 'block_indicators');
    footerBlock.style.top = '108px';
    var indicator_width = 40;
    var indicator_y = width - indicator_width + 6;    
    for(var i=0; i<indicators.length; i++){
        var indicator = document.createElement('div');
        indicator.setAttribute('class', 'indicator');
        indicator.style.left = indicator_y + 'px';
        indicator.style.width = indicator_width + 'px';
        indicator.textContent = indicators[i];
        footerBlock.appendChild(indicator); 

        indicator_y -= (indicator_width + 1);
    };
    outerBlock.appendChild(footerBlock);

    return outerBlock;
};
