var scheme = [{
    "id" : "1",
    "title" : "Руководитель",
    "functions" : {},
    "indicators": ['Nпп`', 'Nпп'],
    "level": "first_level",
    "children" : [  
        { 
            "id" : "2",
            "title" : "Первый заместитель руководителя",
            "functions" : ['10. Ключевая функция', '11. Ключевая функция', '12. Ключевая функция'],
            "indicators": ['Nпп`', 'Nпп'],
            "level": "second_level",
            "children" : [] 
        },
        {   
            "id" : "3",
            "title" : "Главный инженер",
            "functions" : ['20. Ключевая функция', '21. Ключевая функция', '22. Ключевая функция', '23. Супер-ключевая ключевая функция очень важная и неотчуждаемая от этого блока', '24. Ключевая функция', '25. Ключевая функция'],
            "indicators": ['Nпп`', 'Nпп'],
            "level": "second_level",
            "children" : [] 
        },
        {
            "id" : "4",
            "title" : "Заместитель руководителя (по экономике и финансам)",
            "functions" : {},
            "indicators": ['Nпп`', 'Nпп'],
            "level": "second_level",
            "children" : [] 
        }
    ]
}];

var PARENT_WIDTH = 250;
var STD_BLOCK_HEIGHT = 100;
var STD_HEIGHT = 130;
var HEIGHT_STEP = 30;
var WIDTH_STEP = 40;
var IND_HEIGHT = 30;
var blocks = new Map();
var connectors = [];

function init() {
    var root = document.getElementById("root");

    var parent = scheme[0];
    var x = screen.width/2 - PARENT_WIDTH;
    var y = 100;
    var parentBlock = createBlock(x, y, PARENT_WIDTH, STD_HEIGHT, parent.title, parent.functions, parent.indicators, parent.level);
    root.appendChild(parentBlock);

    var newHeight = parentBlock.children[0].clientHeight + 7 ;

    if (parentBlock.clientHeight > newHeight) {
        parentBlock.children[0].style.height = STD_BLOCK_HEIGHT + 'px';
        newHeight = parentBlock.clientHeight;
    }
    else {
        parentBlock.style.height = newHeight + 'px';
        parentBlock.children[1].style.top = newHeight + 'px';
    }
    blocks.set(parent.id, getNewBlock(parentBlock));
    createScheme(root, x + PARENT_WIDTH/2, y + newHeight, 0);
    createConnectors(root, 0);
};



function createConnectors(root, index) {
    parent = scheme[index];
    parentBlock = blocks.get(parent.id);
    for(var i in parent.children){
        var childBlock = blocks.get(parent.children[i].id);
        createConnectorBetween(root, parentBlock, childBlock);
    }
}

function createConnectorBetween(root, blockFrom, blockTo) {
    // точки соединения находятся на одной вертикали
    if(blockFrom.bottom_p.x >= (blockTo.top_p.x - 2) && blockFrom.bottom_p.x <= (blockTo.top_p.x + 2)){
        createLine(root, blockFrom.bottom_p, blockTo.top_p, 'vertical_line');
    }
    
}

function createLine(root, start_point, end_point, lineClass) {
    var line = document.createElement('div');
    line.setAttribute('class', 'line ' + lineClass);

    switch(lineClass){
        case 'horizontal_line':
            if(start_point.x <= end_point.x) {
                line.style.top = start_point.x +'px';                
            } else {
                line.style.top = end_point.x +'px';
            }

            break;
        case 'vertical_line':
            if(start_point.x <= end_point.x) {
                line.style.left = start_point.x +'px';                
            } else {
                line.style.left = end_point.x +'px';
            }
            if(start_point.y <= end_point.y) {
                line.style.top = start_point.y + 'px';
                line.style.height = (end_point.y - start_point.y) + 'px';
            } else {
                line.style.top = end_point.y + 'px';
                line.style.height = (start_point.y - end_point.y) + 'px';
            }   
                     
            break;
        default:
            break;
    }

    root.appendChild(line);
}

function createScheme(root, parX, parY, index) {
    var blockMap = new Map();
    var parent = scheme[index];
    var count = scheme[index].children.length;
    var width = PARENT_WIDTH - 20;
    var height = STD_HEIGHT;
    var maxHeight = STD_BLOCK_HEIGHT;
    var newHeight = STD_BLOCK_HEIGHT;

    var globalWidth = width * count + WIDTH_STEP * ( count - 1 )
    var globalHeight = height * count + 20 * ( count - 1 );
    if(parent.depth > 0) { 
        var x = parX;
        // y = parY + parHeight + 
    } else {
        var x = parX - globalWidth / 2;
        var y = parY + HEIGHT_STEP;
    }

    for(var i in parent.children) {
        child =  parent.children[i];
        var childBlock = createBlock(x, y, width, height, child.title, child.functions, child.indicators, child.level);
        blockMap.set(i, childBlock);
        root.appendChild(childBlock);

        var childHeight = childBlock.children[0].clientHeight + 8 ;

        if (maxHeight < childHeight) {
            maxHeight = childHeight;
            newHeight = childHeight;
        } else {
            childBlock.children[0].style.height = STD_BLOCK_HEIGHT + 'px';
        }

        x += width + WIDTH_STEP;
    }

    var indTop = newHeight + 8;
    if (maxHeight > height) {        
        maxHeight += IND_HEIGHT;         
    } else {
        maxHeight = height;
    }

    for(var i in parent.children) {
        var childBlock = blockMap.get(i);        
        childBlock.style.height = maxHeight + 'px';
        childBlock.children[0].style.height = newHeight + 'px';
        childBlock.children[1].style.top = indTop + 'px';
        blocks.set(parent.children[i].id, getNewBlock(childBlock));
    }
};

function getNewBlock(block) {
    return {
        x: parseInt(block.style.left, 10),
        y: parseInt(block.style.top),
        
        top_p: {
            x: parseInt(block.style.left) + parseInt(block.style.width)/2,
            y: parseInt(block.style.top)
        },

        bottom_p: {
            x: parseInt(block.style.left) + parseInt(block.style.width)/2,
            y: parseInt(block.style.top) + parseInt(block.style.height) - IND_HEIGHT + 8
        }
    };
}

function createBlock(x, y, width, height, title, functions, indicators, level) {
    var outerBlock = document.createElement('div');
    outerBlock.setAttribute('class', 'outer_block');    
    outerBlock.style.left = x + 'px';
    outerBlock.style.top = y + 'px';
    outerBlock.style.width = width + 'px';
    outerBlock.style.height = height + 'px';

    var blockBody = document.createElement('div');
    blockBody.setAttribute('class', 'block_body');

    var blockTitle = document.createElement('h3');
    blockTitle.setAttribute('class', level)
    blockTitle.textContent = title;
    blockBody.appendChild(blockTitle);

    outerBlock.appendChild(blockBody);

    for(i in functions){
        var funcText = document.createElement('p');
        funcText.setAttribute('class', level);
        funcText.textContent = functions[i];
        blockBody.appendChild(funcText); 
    };

    var footerBlock = document.createElement('div');
    footerBlock.setAttribute('class', 'block_indicators');
    footerBlock.style.top = '108px';
    var indicator_width = 40;
    var indicator_x = width - indicator_width + 6;    
    for(i in indicators){
        var indicator = document.createElement('div');
        indicator.setAttribute('class', 'indicator');
        indicator.style.left = indicator_x + 'px';
        indicator.style.width = indicator_width + 'px';
        indicator.textContent = indicators[i];
        footerBlock.appendChild(indicator); 

        indicator_x -= (indicator_width + 1);
    };
    outerBlock.appendChild(footerBlock);

    return outerBlock;
};