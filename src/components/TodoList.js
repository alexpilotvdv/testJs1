import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TodoList = (props) =>{
console.log(props)
    return ( 
    <View style={styles.container}>
        {props.todos.map((todo)=>
        <TouchableOpacity key={todo.id} onPress={()=>props.toggleTodo(todo.id)}>
            <Text style={{fontSize:24, 
            textDecorationLine: todo.completed?'line-through':'none'}}>
                {todo.text}
            </Text>
        </TouchableOpacity>
        )}
    </View>
    )
   
}



const styles = StyleSheet.create(
    {
        container: {
            padding: 10
        }
    }
)
 export default TodoList