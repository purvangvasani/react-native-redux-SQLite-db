import React, { Component } from 'react';
import { Text,
    View, StyleSheet} from 'react-native';
import { Button, Card, CardItem, Left, Right, Content, Thumbnail } from 'native-base';

class ContactCard extends Component {
    render(contact_name, contact_number, contact_address){
        return(
            <View>
                <Card>
                    <CardItem>
                        <Left>
                            <Text>{this.props.contact_name}</Text>
                        </Left>
                        <Content>
                            <Text>{this.props.contact_number}</Text>
                        </Content>
                        <Right>
                           <Text>{this.props.contact_address}</Text>
                        </Right>
                    </CardItem>
                </Card>
            </View>
        )   
    }
}

export default ContactCard;

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