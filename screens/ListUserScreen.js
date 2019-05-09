import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native';
import {Button} from 'native-base'
import { openDatabase } from 'react-native-sqlite-storage';
import { ListItem } from 'react-native-elements';
//Connction to access the pre-populated sqliteexample.db
var db = openDatabase({ name: 'sqliteexample.db', createFromLocation : 1});

class ListUserScreen extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'User List From db',
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            FlatListItems: [],
        };
    }

    componentDidMount() {
        var subscribe;
        subscribe = this.props.navigation.addListener('didFocus', () => {
            this.getContacts();
        });
    }

    getContacts() {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }
                this.setState({
                    FlatListItems: temp,
                });
            });
        });
      }

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
        );
    };
    
    renderItem = ({ item }) => (
        <View>
            <ListItem
                title={item.user_name}
                leftAvatar={{
                    title: item.user_name[0]
                }}
                onPress={() => {
                    this.props.navigation.navigate('UserDetail', {
                        user_id: `${item.user_id}`,
                    });
                }}
                chevron
                bottomDivider
            />
        </View>
    )

    render() {
    return (
        <View>
            <FlatList
                data={this.state.FlatListItems}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
            />
      </View>
    )
  }
}

export default ListUserScreen
