import React, {Component} from "react";
import { View, Text, StyleSheet } from "react-native";
import AddToDo from "./conteiners/AddToDo";
import VisibleTodos from "./conteiners/VisibleTodos";

class ToDo extends Component {
    // state={
    //    todos:[],
    //    visibilityFilter:'SHOW_ALL_TODOS'
    // }
    render(){
        
       
        return (
            <View style = {styles.container}>
                <AddToDo/>
                <View>
                    <VisibleTodos/>
                </View>

            </View>
        )
    }

}
export default ToDo
const styles = StyleSheet.create(
    {
        container:{
            flex: 1,
            paddingTop: 40
            
        }
    }
)
