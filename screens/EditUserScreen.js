import React, { Component } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import { Button } from 'native-base';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Alert, TextInput, Text, View} from 'react-native'
var db = openDatabase({ name: 'sqliteexample.db', createFromLocation : 1});

class EditUserScreen extends Component {
    static navigationOptions = {
        title: 'Contact Edit',
    };
      
    constructor() {
        super();
        this.state = {
            contactID: '',
            contactName: '',
            contactNumber: '',
            contactAddress: '',
        };
    }

    componentDidMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            const { navigation } = this.props;
            const itemId = navigation.getParam('user_id');
         
            console.log(itemId);
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM table_user WHERE user_id = ?', [itemId], (tx, results) => {
                    if(results.rows.length > 0) {
                        let row = results.rows.item(0);
                        this.setState({
                            contactID: row.user_id,
                            contactName: row.user_name,
                            contactNumber: row.user_contact,
                            contactAddress: row.user_address,
                        })
                    }
                });
            });
        });
    }

    handleSubmitEvent = () => {
        const { contactName } = this.state;
        const { contactNumber } = this.state;
        const { contactAddress } = this.state;
        const { contactID } = this.state;
        console.log('====================================');
        console.log(contactName, contactNumber, contactAddress, contactID);
        console.log('====================================');
        db.transaction(function(tx) {
            tx.executeSql(
                'UPDATE table_user SET user_name = ?, user_contact = ?, user_address = ? WHERE user_id = ?', [contactName, contactNumber, contactAddress, contactID],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        alert(
                            'Success',
                        );    
                    } else {
                        alert('Update Failed');
                    }
                }
            )
        });
        this.props.navigation.navigate('UserDetail')
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{ flex: 1, justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder="Enter Name"
                            onChangeText={contactName => this.setState({ contactName })}
                            value={this.state.contactName}
                            style={{ padding:10 }}
                        />
                        <TextInput
                            placeholder="Enter Contact No"
                            onChangeText={contactNumber => this.setState({ contactNumber })}
                            value={this.state.contactNumber.toString()}
                            maxLength={10}
                            keyboardType="numeric"
                            style={{ padding:10 }}
                        />
                        <TextInput
                            placeholder="Enter Address"
                            onChangeText={contactAddress => this.setState({ contactAddress })}
                            value={this.state.contactAddress}
                            maxLength={225}
                            numberOfLines={5}
                            multiline={true}
                            style={{ textAlignVertical: 'top',padding:10 }}
                        />
                        <Button block onPress={this.handleSubmitEvent}>
                            <Text style={{color:'white', fontSize: 16, fontWeight: 'bold',}}>Submit</Text>
                        </Button>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

export default EditUserScreen