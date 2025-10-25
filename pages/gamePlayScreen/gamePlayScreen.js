
//TABULEIRO================================================================================
const table={

    altura: 5,
    largura: 7,
    trashList: [],
    renderiza:()=>{

        let object=document.querySelector("#table");
        object.style.gridTemplateColumns=`repeat(${table.largura}, 100px)`;

        for (let i=0; i < (table.largura*table.altura); i++) {

            let element=document.createElement("div");
            element.classList.add("block");
            object.appendChild(element);

        }

    },
    
    addTrash:(left, topo, tipo)=>{
        let element=document.createElement('article');
        element.classList.add('trash');
        element.style.top=`${topo}px`;
        element.style.left=`${left}px`;

        let img = document.createElement("img")

        switch (tipo) {
            case 0:
                img.src='../../game_assets/lixo/papel.png';
                break;
            case 1:
                img.src='../../game_assets/lixo/sacola.png';
                break;
            case 2:
                img.src='../../game_assets/lixo/lata.png';
                break;
        
            default:
                break;
        }


        element.appendChild(img)
        let object=document.querySelector("#table");
        object.appendChild(element);


        table.trashList.push({
            object:element,
            tipo:tipo,
            top:topo,
            left:left,
            onTable: true
        })
    }
}




//LIXEIRAS=============================================================================================


const lixeiras={

    list:[],
    add:(tipo)=>{
        let element = document.createElement("article")
        element.classList.add('bin');
        
        let top=((lixeiras.list.length)*103);
        element.style.top=`${top}px`;

        element.style.left=`${(-1*103)}px`;

        let img = document.createElement("img");


        if(tipo===0){
            img.src="https://cdn-icons-png.flaticon.com/512/5142/5142514.png"
        }

        switch (tipo) {
            case 0:
                img.src="../../game_assets/lixeiras/lixeira_papel.png"
                break;
            case 1:
                img.src="../../game_assets/lixeiras/lixeira_plastico.png"
                break;
            case 2:
                img.src="../../game_assets/lixeiras/lixeira_metal.png"
                break;
        
        }

        let placar = document.createElement("div");
        placar.innerText='0';


        element.appendChild(img);
        element.appendChild(placar)

        let object=document.querySelector("#table");
        object.appendChild(element);

        lixeiras.list.push({
            object: element,
            tipo: tipo,
            count: 0,
            placar: placar,
            top: top,
            
        })

    }
}




/*
count: 0,
    add:(number)=>{
        //let object=document.querySelector("#lixo_count");
        lixeira.count+=number;

        //object.textContent=`${lixeira.count}`
    }
*/



// const trash={
//     object:document.querySelector(".trash"),
//     top:106,
//     left: 212,
//     onTable: true
// }






// trash.object.style.left=`${trash.left}px`
// trash.object.style.top=`${trash.top}px`




//PERSONAGEM===================================================================================
const character={
    object:document.querySelector("#character"),
    imgObj:document.querySelector("#character>img"),
    top:0,
    left:0,
    papel: 0,
    metal: 0,
    plastico: 0,
    frontSprite: "../../game_assets/marcio/front.png",
    backSprite: "../../game_assets/marcio/back.png",
    rightSprite: "../../game_assets/marcio/right.png",
    leftSprite: "../../game_assets/marcio/left.png"
}






//FUNÇÃO PARA VERIFICAR COLETA===========================================================================
function verificaColeta(){
    

    table.trashList.forEach((trash)=>{
        
        if(character.top===trash.top && character.left===trash.left && trash.onTable){
            
            trash.object.style.display='none';
            trash.onTable=false;

            switch (trash.tipo) {
                case 0:
                    character.papel++;
                    break;
                case 1:
                    character.plastico++;
                    break;
                case 2:
                    character.metal++;
                    break;
            }
            
        }

    })
}

function verificaVitoria(){
    let limpo=true
    table.trashList.forEach((trash)=>{
        if(trash.onTable){
            limpo=false
        }

    })

    if(limpo && character.papel===0 && character.plastico===0 && character.metal===0){
        let popup=document.getElementById("vitoriaPopup");
        popup.style.display='flex';
    }
}











//RENDERIZAÇÃO========================================================================================

//TABULEIRO=========================
table.renderiza();

//LIXO==============================
table.addTrash((1*103), (1*103), 0);
table.addTrash((3*103), (2*103), 2);
table.addTrash((0*103), (2*103), 1);
table.addTrash((3*103), (4*103), 2);
table.addTrash((5*103), (2*103), 1);


//LIXEIRAS==========================
lixeiras.add(0);
lixeiras.add(1);
lixeiras.add(2);


//PERSONAGEM========================
character.imgObj.src=character.frontSprite;
character.imgObj.alt="marcio";





//MOVIMENTA ÇÃO DO PERSONAGEM=========================================================================
document.addEventListener('keydown', (key)=>{
      

    if(key.code==='ArrowRight'){
        if(character.left<(table.largura-1)*103){
            character.left+=103;
            character.object.style.left=`${character.left}px`;
        };

        character.imgObj.src = character.rightSprite;

    }else if(key.code==='ArrowLeft'){

        if(character.left>0){
            character.left-=103;
            character.object.style.left=`${character.left}px`;
        };

        character.imgObj.src = character.leftSprite;
    
    }else if(key.code==='ArrowDown'){

        if(character.top<(table.altura-1)*103){
            character.top+=103;
            character.object.style.top=`${character.top}px`;
        };

        character.imgObj.src = character.frontSprite;
    
    }else if(key.code==='ArrowUp'){

        if(character.top>0){
            character.top-=103;
            character.object.style.top=`${character.top}px`;
        };

        character.imgObj.src = character.backSprite;
 
    }else if(key.code=='Enter' && character.left===0){
        

        lixeiras.list.forEach((bin)=>{

            if(bin.top===character.top ){
             
                switch (bin.tipo) {
                    case 0:
                        bin.count+=character.papel;
                        bin.placar.innerText=bin.count;
                        character.papel=0;
                        break;
                    case 1:
                        bin.count+=character.plastico;
                        bin.placar.innerText=bin.count;
                        character.plastico=0;
                        break;
                    case 2:
                        bin.count+=character.metal;
                        bin.placar.innerText=bin.count;
                        character.metal=0;
                        break;
                
                    default:
                        break;
                }
            }
        })
        
        
        verificaVitoria();
    }

    

    verificaColeta();
    console.log(`papel: ${character.papel}`);
    console.log(`plastico: ${character.plastico}`);
    console.log(`metal: ${character.metal}`);

    

})