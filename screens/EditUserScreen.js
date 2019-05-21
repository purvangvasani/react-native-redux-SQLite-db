import React, { Component } from 'react';
import { Button } from 'native-base';
import { ScrollView, KeyboardAvoidingView, TextInput, Text, View} from 'react-native'
import Database from '../database';
const db = new Database()
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
            db.SELECT_BY_ID(itemId).then((data) => {
                this.setState({
                    contactID: data.user_id,
                    contactName: data.user_name,
                    contactNumber: data.user_contact,
                    contactAddress: data.user_address,
                })
            });
        });
    }

    handleSubmitEvent = () => {
        const { contactName } = this.state;
        const { contactNumber } = this.state;
        const { contactAddress } = this.state;
        const { contactID } = this.state;

        db.UPDATE_DATABASE(contactName, contactNumber, contactAddress, contactID);

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