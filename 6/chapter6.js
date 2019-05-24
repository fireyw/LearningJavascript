const o={
    name: 'Julia',
    greetBackward: function(){
        const self=this;
        function getReverseName(){
            let nameBackWards='';
            for(let i=self.name.length-1;i>=0;i--){
                nameBackWards+=self.name[i];
            }
            return nameBackWards;
        }
        return `${getReverseName()} si eman ym, olleh`;
    },
};

console.log(o.greetBackward());