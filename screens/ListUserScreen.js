import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { ListItem } from 'react-native-elements';
// import { SELECT_ALL } from '../database';
var db = openDatabase({ name: 'sqliteexample.db', createFromLocation : 1});
import Database from '../database'

const database = new Database()

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

        database.SELECT_ALL().then((data) => {
            this.setState({
                FlatListItems: data,
            });
        });
            

        // db.transaction(tx => {
        //     tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        //         var temp = [];
        //         for (let i = 0; i < results.rows.length; ++i) {
        //             temp.push(results.rows.item(i));
        //         }
        //         this.setState({
        //             FlatListItems: temp,
        //         });
        //     });
        // });
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
