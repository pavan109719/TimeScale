const timeLine = document.querySelector(".timescale");

 

for (let i = 0; i <= 1439; i++) {
    var timestamps = document.createElement("div");
        timestamps.classList.add("box");
        timestamps.setAttribute('id',i);
        var flag = document.createElement("span");
        timeLine.appendChild(timestamps);
        // timeLine.appendChild(flag);
    
}
const stamp = document.querySelectorAll(".box");

let startInterval = null;
let stopInterval  = null;
let flagCounter = 0;
let terminalCounter = 0;
let range = 0;
let time =undefined ;

function calculateTime(time){
    let hour = Math.floor(time/60);
    String(hour).length == 1? hour = '0'.concat(String(hour)):hour;
        let min = Math.floor((time - ((hour * 3600)) / 60));
        String(min).length == 1? min = '0'.concat(String(min)):min;
        var time =`${hour} : ${min}`;
        return time; 
}
// timeLine.requestPointerLock();

// timeLine.addEventListener('pointerlockchange', (event) => {
//     console.log('Pointer lock changed');
//   });


stamp.forEach(e=>{
    let pivot = document.createElement("span");
    pivot.classList.add("pivot");
    

    let selector = document.createElement("span");
    let wheel = document.createElement("span");
   
    wheel.classList.add("wheel");
    selector.classList.add("selector");
    selector.setAttribute('draggable',true);

    let selectedFlag = document.createElement('span');
    selectedFlag.classList.add("flag");

    let hoverFlag = document.createElement('span');
    hoverFlag.classList.add("flag");

    if(Number(e.getAttribute('id'))%60 ==0 || Number(e.getAttribute('id'))===0 ){
            e.classList.remove("box");
            e.classList.add("hour");
    };
    e.addEventListener('mouseenter',()=>{
        e.appendChild(hoverFlag);
        time = Number(e.getAttribute("id")); 
        e.firstChild.innerText=calculateTime(time); 
        // console.log(mouse.clientX , mouse.clientY)
    })
    e.addEventListener('mouseleave',()=>{
        e.removeChild(hoverFlag);
        time = Number(e.getAttribute("id")); 
        // e.firstChild.innerText=calculateTime(time); 
    })
    
    if(e.children !== selector){
        e.addEventListener('click',el=>{
        // console.log(el);
        selector.classList.add(`flag-${terminalCounter}`)
        terminalCounter<6?terminalCounter++:terminalCounter=0;
        let startTime = Number(e.getAttribute("id")); 
        terminalCounter<=5?e.appendChild(selector):'';
        // dragger(e,el,selectedFlag);
        
    })   
    selector.addEventListener('dragstart',el=>{
        // console.log(el.y , selector);
        e.appendChild(selectedFlag);
        el.dataTransfer.effectAllowed="all"
        console.log(el.dataTransfer.effectAllowed);
        selectedFlag.classList.add(`flag-${flagCounter}`)
        flagCounter<6?flagCounter++:flagCounter=0;
        e.appendChild(selector);
        startInterval = Number(e.getAttribute("id")); 
        // e.firstChild.innerText=calculateTime(startInterval);  
        selectedFlag.innerText=calculateTime(startInterval); 
        console.log(el.clientY); 
        // if(el.Y <157 || el.Y>161){
        // selector.classList.add('hide');
        // }
        
        // console.log(selector.getBoundingClientRect.clientY);
        
        
    })
    e.addEventListener('dragover',el=>{
        // el.y=160;
        console.log(el.y)
        el.preventDefault();
        e.appendChild(hoverFlag);
        el.dataTransfer.effectAllowed="none";
        // e.appendChild(wheel);
        time = Number(e.getAttribute("id")); 
        e.firstChild.innerText=calculateTime(time); 
        console.log(el.clientY);
        
    })
    e.addEventListener('dragleave',el=>{
        el.preventDefault();
        // if(e.childNodes.keys)
        e.removeChild(hoverFlag);
        // e.removeChild(wheel);
        time = Number(e.getAttribute("id")); 
        // selector.style.transform=`translate3d(${selector.clientX}px,${selector.clientY}px,0)`;
        // e.firstChild.innerText=calculateTime(time); 
    })
    e.addEventListener('drop',()=>{
        e.appendChild(selectedFlag);
        selectedFlag.classList.add(`flag-${flagCounter}`)
        selector.classList.add(`flag-${flagCounter}`)
        flagCounter<6?flagCounter++:flagCounter=0;
        terminalCounter<6?terminalCounter++:terminalCounter=0;
        e.appendChild(selector);
        stopInterval = Number(e.getAttribute("id")); 
        selectedFlag.innerText=calculateTime(stopInterval);
        frameSelection();
        dragger();
    })

    

    function frameSelection(){
        stamp.forEach(el=>{
            let ele = Number(el.getAttribute('id'));
            if(ele >= startInterval &&  ele < stopInterval){
                el.classList.remove("box");
                   el.classList.add(`box-range${range}`);
                } 
                
        }
        )
        range<2?range++:range=0;
    }

} 
timeLine.addEventListener('mouseout',el=>{
    // el.dataTransfer() ="linkmove";
    // console.log(selector) 
    if(el.clientY <157 || el.clientY >162){
        selector.style.cursor = 'grab';
        // el.dataTransfer.setDragImage(selector,el.clientX,161);
    }
})
})


function dragger(e,el,selectedFlag) { 
    console.log("zazaza");

    $(".selector").draggable({
        axis:"x"
        
    })
    e.appendChild(selectedFlag);
    el.dataTransfer.effectAllowed="all"
    console.log(el.dataTransfer.effectAllowed);
    selectedFlag.classList.add(`flag-${flagCounter}`)
    flagCounter<6?flagCounter++:flagCounter=0;
    e.appendChild(selector);
    startInterval = Number(e.getAttribute("id")); 
    // e.firstChild.innerText=calculateTime(startInterval);  
    selectedFlag.innerText=calculateTime(startInterval); 
    console.log(el.clientY); 
    if(el.clientY <157 || el.clientY>161){
    selector.classList.add('hide');
    };  
  } 
  window.addEventListener(
    'dragover',el=>{
        el.preventDefault();
        console.log(el.y);
        if(el.y <157 || el.y>161){
            selector.classList.add('hide');
            }
    }
   
)










