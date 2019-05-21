import React, { Component } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, Alert, TextInput, Text, View} from 'react-native'
import { Button,} from 'native-base';

import Database from '../database';

const db = new Database()

class AddUserScreen extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add User',
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_contact: '',
            user_address: '',
        };
    }

    handleSubmitEvent=()=>{
        const { user_name } = this.state;
        const { user_contact } = this.state;
        const { user_address } = this.state;
        if (user_name) {
            if (user_contact.length === 10) {
                if (user_address) {
                    
                    db.ADD_INTO_DATABASE(user_name, user_contact, user_address)
                    
                    this.props.navigation.navigate('Home')

                } else {
                    alert('Please fill Address');
                }
            } else if(user_contact.length < 10 || user_contact.length > 10){
                alert('Number length must be 10');
            }else{
                alert('Please fill Number')
            }
        } else {
             alert('Please fill Name');
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1, margin: 10, }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{ flex: 1, justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder="Enter Name"
                            onChangeText={user_name => this.setState({ user_name })}
                            style={{ padding:10 }}
                        />
                        <TextInput
                            placeholder="Enter Contact No"
                            onChangeText={user_contact => this.setState({ user_contact })}
                            maxLength={10}
                            keyboardType="numeric"
                            style={{ padding:10 }}
                        />
                        <TextInput
                            placeholder="Enter Address"
                            onChangeText={user_address => this.setState({ user_address })}
                            maxLength={225}
                            numberOfLines={5}
                            multiline={true}
                            style={{ textAlignVertical: 'top',padding:10 }}
                        />
                            <Button block onPress={this.handleSubmitEvent}>
                                <Text style={{fontSize: 16, color:'white', fontWeight: 'bold',}}>Submit</Text>
                            </Button>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

// const mapStateToProps = state => {
//     console.log('====================================');
//     console.log(state);
//     console.log('====================================');
//     return {
//         prod: state.contact.Contacts
//     }
// }
  
// const mapDispatchToProps = dispatch => {
//     return {
//         addContact: (ContactID, ContactName, ContactNumber, ContactAddress) => {      
//             dispatch(addContactInfo(ContactID, ContactName, ContactNumber, ContactAddress))
//         }
//     }
// }

export default AddUserScreen;
