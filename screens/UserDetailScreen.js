import React, { Component } from 'react';
import { Text, Container, Content, Card, CardItem, Button } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import Database from '../database';
var db = openDatabase({ name: 'sqliteexample.db', createFromLocation : 1});

const database = new Database()
class UserDetailScreen extends Component {
    static navigationOptions = {
        title: 'Contact Details',
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

            database.SELECT_BY_ID(itemId).then((data) => {
                this.setState({
                    contactID: data.user_id,
                    contactName: data.user_name,
                    contactNumber: data.user_contact,
                    contactAddress: data.user_address,
                })
            });
        });
    }

    handleDeleteContact = () => {
        database.DELETE_FROM_DATABASE(this.state.contactID);

        alert("Deleted....")
        this.props.navigation.navigate('ListUser')
    }

    render() {
        return (
            <Container>
                <Content padder style={{height: 1000}}>
                    <Card>
                        <CardItem>
                            <Text style={{fontSize: 16}}>Contact ID: {this.state.contactID}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{fontSize: 16}}>Contact Name: {this.state.contactName}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{fontSize: 16}}>Contact Number: {this.state.contactNumber}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{fontSize: 16}}>Contact Address: {this.state.contactAddress}</Text>
                        </CardItem>
                            <Button block info onPress={() => {this.props.navigation.navigate('EditUser', {user_id: `${this.state.contactID}`,})}}>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold',}}>EDIT</Text>
                            </Button>
                            <Button block onPress={this.handleDeleteContact}>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold',}}>DELETE</Text>
                            </Button>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default UserDetailScreen;
