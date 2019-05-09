import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import {connect} from 'react-redux'
import { Container, Content } from 'native-base';
import ContactCard from './ContactCard';

export class ListUserStore extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'User List by store',
        };
    };

    renderContactCard=()=> {
        return this.props.prod.Contacts.map((cont, index) =>
            <ContactCard
                leftAvatar={{ title: cont.ContactID[0]}}
                style={{height: 500}}
                key={index}
                contact_name={cont.ContactName}
                contact_number={cont.ContactNumber}
                contact_address={cont.ContactAddress}
            />
        )
    };

    render() {
        return (
            <Container>
                <Content padder>
                    <ScrollView>
                        {this.renderContactCard()}
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        prod: state.contact
    }
}

export default connect(mapStateToProps)(ListUserStore)
