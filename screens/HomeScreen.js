import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import { Button, Container, Content } from 'native-base';

import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated sqliteexample.db
var db = openDatabase({ name: 'sqliteexample.db', createFromLocation : 1});

import {connect} from 'react-redux'
import {addContactInfo} from '../actions/contact'
import {emptyStore} from '../actions/contact'
import ContactCard from './ContactCard';

class HomeScreen extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
        };
    };
    
    constructor() {
        super();
        this.state = {
            isLoading: true,
            contacts: [],
            notFound: 'Contacts not found.\nPlease click (+) button to add it.'
        };
    }

    componentDidMount() {
        var subscribe;
        subscribe = this.props.navigation.addListener('didFocus', () => {
            this.getContacts();
        });
    }

    getContacts() {
        this.props.empty();

        db.transaction(tx => {
                tx.executeSql('Select * FROM table_user', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                    this.props.addContact(results.rows.item(i).user_id, results.rows.item(i).user_name, results.rows.item(i).user_contact, results.rows.item(i).user_address)
                }
            });
        });
      }

    moveToAddUser = () => {
        this.props.navigation.navigate('AddUser')
    }
    moveToListUser = () => {
        this.props.navigation.navigate('ListUser')
    }
    moveToListUserStore = () => {
        this.props.navigation.navigate('ListUserStore')
    }

    // renderContactCard=()=> {
    //     return this.props.prod.Contacts.map((cont, index) =>
    //         <ContactCard
    //             leftAvatar={{ title: cont.ContactID[0]}}
    //             style={{height: 500}}
    //             key={index}
    //             contact_name={cont.ContactName}
    //             contact_number={cont.ContactNumber}
    //             contact_address={cont.ContactAddress}
    //         />
    //     )
    // };

    render() {
        return (
            <Container>
                <Content padder>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Button block info onPress={this.moveToAddUser}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold',}}>Add User</Text>
                    </Button>
                    <Button block info onPress={this.moveToListUser}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold',}}>List User from DB</Text>
                    </Button>
                    <Button block info onPress={this.moveToListUserStore}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold',}}>List User from store</Text>
                    </Button>
                    {/* <ScrollView>
                        {this.renderContactCard()}
                    </ScrollView> */}
                </Content>
            </Container>
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

const mapStateToProps = state => {
    console.log('====================================');
    console.log(state.contact);
    console.log('====================================');
    return {
        prod: state.contact
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        addContact: (ContactID, ContactName, ContactNumber, ContactAddress) => {  
            console.log('====================================');
            console.log("Add");
            console.log('====================================');   
            dispatch(addContactInfo(ContactID, ContactName, ContactNumber, ContactAddress))
        },
        empty: () => {   
            console.log('====================================');
            console.log("Empty");
            console.log('====================================');   
            dispatch(emptyStore())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)