
function Queue(){
    this.list = [];
    this.push = function (item){
        this.list.push(item);
    }
    this.pop = function(item){
        return this.list.shift();
    }
    this.length = function(){
        return this.list.length;
    }
}

function Stack(){
    this.list = [];
    this.push = function (item){
        this.list.push(item);
    }
    this.pop = function(item){
        return this.list.pop();
    }
    this.length = function(){
        return this.list.length;
    }
}
