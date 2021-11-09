import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import {createThunkEditCompl} from '../reducers/todos'

const mapStateToProps=(state)=>({
   todos: state.todos 
})
const mapDispatchToProps = (dispatch)=>({
    toggleTodo: (id,current)=>dispatch(createThunkEditCompl(id,current)),
   // afterLoad: ()=>dispatch({type:'AFTERLOAD'})
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)