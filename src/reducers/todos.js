let nextid=2
const init = [{
                id:0,
                text:'action.text',
                completed:false  
}, {
    id:1,
    text:'action.text',
    completed:false  
}]
const todos = (state = init,action)=>{
    switch(action.type){
        case 'ADD_TODO':
            // console.log([
            //     ...state,{
            //         id:nextid++,
            //         text:action.text,
            //         completed:false
            //     }
            // ])
            return [
                ...state,{
                    id:nextid++,
                    text:action.text,
                    completed:false
                }
            ]

        case 'TOGGLE_TODO':
            return state.map(todo=>(todo.id===action.id)?{
                ...todo, completed:!todo.completed
            }:todo)
        default:return state

    }
    
}
export default todos