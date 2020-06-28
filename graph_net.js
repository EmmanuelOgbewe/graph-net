

function Node(x,y, color, id){
    this.x = x;
    this.y = y;
    this.id = id;
    this.color = color;
    this.adj = [];
}

function GraphMeta () {
    this.numOfLines =  0;
    this.numOfNodes = 0;
}

let nodes = [];
let edgeMatrix = [];
let meta = new GraphMeta();
let isConnected = false;
let selectedNode = null;

// Controls 
let clear = document.getElementById("clear");
let connectPoints = document.getElementById("connect-points");
let runBFS = document.getElementById("bfs");


//Handle event listeners 

clear.addEventListener("click", clearGraph);
connectPoints.addEventListener("click", connectAllPoints);
runBFS.addEventListener("click",() => BFS());

// control methods
function clearGraph() {
   if(confirm("Are you sure you want to clear the graph?")){
        nodes = [];
        meta = new GraphMeta();
        selectedNode = null;
        updateGraphInfo();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
   }
}

function highlightLine(event){
    for (node in nodes){

    }
}

function updateGraphInfo(){
    document.getElementById("line-count").innerHTML = `<strong> Line count: </strong> ${meta.numOfLines}`;
    document.querySelector("#node-count").innerHTML = `<strong> Node count: </strong> ${meta.numOfNodes}`;
}

function connectAllPoints(){
    if(nodes.length <= 1){
        alert("You must first create at least two nodes.");
        return;
    }
    isConnected = true;
    //create edges matrix
    for(node in nodes){
        edgeMatrix[node] = Array(nodes.length).fill(false);
    } 
    
    for(parent in nodes){
        for(child in nodes){
          // add to adj 
            let p = nodes[parent];
            let c= nodes[child];
            if(edgeMatrix[parent][c.id] === false && p.id != c.id){
                p.adj.push(c);
                c.adj.push(p);
                edgeMatrix[c.id][p.id] = true;
                ctx.beginPath();
                ctx.moveTo(p.x,p.y);
                ctx.lineTo(c.x, c.y);
                ctx.stroke();
                meta.numOfLines = meta.numOfLines + 1;
            } 
         }
    }
    updateGraphInfo();
}

// search algorithms

function BFS(){
    if(isConnected === false){
        alert("You must first connect all points");
        return;
    }

    let src = nodes[0];

    if(selectedNode != null){
        src = selectedNode;
    }

    let visited = [];
    let queue = new Queue();
    queue.push(src.id);
  
    while(queue.length() != 0){
        let curr = queue.pop();
        if(!visited.includes(curr)){
            visited.push(curr);
        }
        for(adj in nodes[src.id].adj){
            if(!visited.includes(nodes[src.id].adj[adj].id)){
                queue.push(nodes[src.id].adj[adj].id);
            }
        }
    
    }
    animateSearch(visited);
}

// animations 

function animateSearch(paths){
    let index = 0;

    console.log(paths);
    console.log(nodes);
    
    var id = setInterval(function(){
    
        if(index === paths.length - 2){
            
            clearInterval(id);
        }
        let startNode = nodes[paths[index]];
        let endNode = nodes[paths[index + 1]];

        ctx.beginPath();
        ctx.moveTo(startNode.x,startNode.y);
        ctx.lineTo(endNode.x, endNode.y);
        ctx.strokeStyle = "red";
        ctx.stroke();
        console.log(index);
        index = index + 1;
    },400);

}


