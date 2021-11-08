import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";



const TodoList = (props) => {
    
    const renderItems = ({item}) => {
        //console.log(item.text)
        return (
            <TouchableOpacity key={item.id} onPress={() => {
                console.log('togggle id=',item.id,' parametr',item.completed)
                props.toggleTodo(item.id,item.completed)}}>
                <Text style={{
                    fontSize: 24,
                    textDecorationLine: (item.completed===1) ? 'line-through' : 'none'
                }}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={props.todos}
                renderItem={renderItems}
                keyExtractor={(item) => item.id}
            />
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