import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

class AddToDo extends Component {
    state = {
        text: ''
    }
    addtodo = (text) => {
        //console.log(this.props)
        this.props.dispatch({ type: 'ADD_TODO', text: text, func:this.afterLoad })
        this.setState({text:''})

    }
    componentDidMount=()=>{
        this.props.dispatch({type:'LOAD',func:this.afterLoad})
    }
    //следующая функция должна вызваться после того, как сяитаются данные
    afterLoad = ()=>{
        console.log('func afterload')
        this.props.dispatch({type:'AFTERLOAD'})
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    value={this.state.text}
                    onChangeText={(text) => this.setState({text:text})}
                    placeholder='test'
                    style={{
                        borderWidth: 1, borderColor: '#f2f2e1', backgroundColor: '#eaeaea',
                        height: 50, flex: 1, padding: 7
                    }}>
                </TextInput>
                <TouchableOpacity onPress={() => this.addtodo(this.state.text)}>
                    <View style={{
                        backgroundColor: 'eaeaea', height: 50,
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Ionicons name='md-add' size={50} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}
export default connect()(AddToDo)
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'

        }
    }
)
