import { connect } from "react-redux";
import TodoList from "../components/TodoList";

const mapStateToProps=(state)=>({
   todos: state.todos 
})
const mapDispatchToProps = (dispatch)=>({
    toggleTodo: (id,current)=>dispatch({type:'TOGGLE_TODO',id:id,
    current:current,func:()=>dispatch({type:'AFTERLOAD'})}),
   // afterLoad: ()=>dispatch({type:'AFTERLOAD'})
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)