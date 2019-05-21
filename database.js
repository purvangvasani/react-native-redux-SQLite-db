import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'sqliteexample.db', createFromLocation : 1});

export default class Database{
    
    ADD_INTO_DATABASE(user_name, user_contact, user_address){
        db.transaction(function(tx) {
            tx.executeSql(
                'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
                [user_name, user_contact, user_address],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    }
    
    UPDATE_DATABASE(contactName, contactNumber, contactAddress, contactID){
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
    }
    
    DELETE_FROM_DATABASE(id){
        db.transaction(tx => {
            tx.executeSql('Delete FROM table_user WHERE user_id = ?', [id])
        });
    }
    
    SELECT_ALL(){
        return new Promise((resolve) => {
            var products = []
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT u.user_id, u.user_name, u.user_contact, u.user_address FROM table_user u', [],
                    (tx,results) => {
                        console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            console.log(`User ID: ${row.user_id}, Prod Name: ${row.user_name}`)
                            const { user_id, user_name, user_contact, user_address } = row;
                            products.push({
                                user_id,
                                user_name,
                                user_contact,
                                user_address
                            });
                        }
                        console.log(products);
                        resolve(products);
                    }
                )
            })
        })
    }

    SELECT_BY_ID(id){
        return new Promise((resolve) => {
            var products = []
            
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM table_user WHERE user_id = ?', 
                    [id], 
                    (tx, results) => {
                        if(results.rows.length > 0) {
                            let row = results.rows.item(0);
                            console.log('====================================');
                            console.log(row);
                            console.log('====================================');
                            resolve(row);
                        }
                    }
                );
            });
        })
    }
}
