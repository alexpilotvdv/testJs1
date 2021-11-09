import * as SQLite from 'expo-sqlite'



/// временный код - чтобы заполнить базу

//////



let init2 = []
////////////////////////////
class Mydb {
    constructor() {
        this.flagReadOk = false
        this.db = SQLite.openDatabase('db.testDb')
        this.db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, completed INT)'
            )
        })
        this.db.transaction(tx => {
            tx.executeSql('SELECT * FROM items', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => this.setState([..._array]),
                // failure callback which sends two things Transaction object and Error
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction

    }
    setState = (par) => {
        this.state = par
        this.flagReadOk = true
        //console.log('***',par)
    }
    //функция обращается к базе и загружает данные в state а после вызывает переданную функцию
    loadData = (funcAfter) => {
        this.db.transaction(tx => {
            tx.executeSql('SELECT * FROM items', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    this.state = [..._array].reverse()
                    funcAfter()
                },
                // failure callback which sends two things Transaction object and Error
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
    }
    loadDataPromis = () => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('SELECT * FROM items', null, // passing sql query and parameters:null
                    // success callback which sends two things Transaction object and ResultSet Object
                    (txObj, { rows: { _array } }) => {
                        this.state = [..._array].reverse()
                        resolve()
                    },
                    // failure callback which sends two things Transaction object and Error
                    (txObj, error) => console.log('Error ', error)
                ) // end executeSQL
            }) // end transaction
        })

    }



    addTest = (par) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('INSERT INTO items (text, completed) values (?, ?)', par,
                    (txObj, resultSet) => resolve(resultSet),
                    (txObj, error) => reject(error))
            })
        })

    }

    editRecordCompleted = (id, par) => {
        let newCompl = 0
        newCompl = (par === 0) ? 1 : 0
        console.log('editrec')
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('UPDATE items SET completed = ? WHERE id = ?', [newCompl, id],
                    (txObj, resultSet) => {
                        if (resultSet.rowsAffected > 0) {
                            resolve(resultSet)
                        } else {
                            reject('err')
                        }
                    })
            })

        })

    }

    deleteAllRec = () => {
        this.db.transaction(tx => {
            tx.executeSql('DELETE FROM items', null,
                (txObj, resultSet) => console.log('all deleted', resultSet),
                (txObj, error) => console.log('error deleted', error))
        })
    }
}
/////////////////////////////////////////////////////////////
let db = new Mydb()
//db.addTest()
//db.deleteAllRec()
//console.log('all',db.returnAllRec())
let nextid = 2
//db.asyncReturnAll().then(result=>console.log('ressssss',result))
export const createThunkLoadAll = () => {
    return (dispatch) => {
        db.loadDataPromis().then(
            resolve => dispatch({ type: 'AFTERLOAD' })
        )
    }
}

export const createThunkEditCompl = (id,par)=>{
    return (dispatch)=>{
        db.editRecordCompleted(id, par).then(
            result =>  (db.loadDataPromis().then(
                resolve => dispatch({ type: 'AFTERLOAD' })
            )),
            error => { console.log(error) }
        )
    }
}

//реализовать загрузку с базы
const todos = (state = init2, action) => {

    switch (action.type) {
        case 'LOAD':
            db.loadData(action.func)
            return state
        case 'AFTERLOAD':
            console.log('case AFTERLOAD')
            return [...db.state]
        case 'ADD_TODO':
            //реализовать загрузку в базу
            if (action.text && action.text.trim().length) {
                //добавить в базу
                //после прочитать все
                db.addTest([action.text, 0]).then(
                    result => {
                        //если данные записались в базу, вызовем загрузку из базы
                        console.log('record ok', result)
                        db.loadData(action.func)
                    },
                    error => {

                    }
                )
                console.log('return state')
                return state
                //можно было проще сделать. просто добавив новый элемент в стэйт без загрузки 
                //из базы
            } else return state

        case 'TOGGLE_TODO':

            db.editRecordCompleted(action.id, action.current).then(
                //надо будет сюда передать функцию, которая вызовет новый диспатч
                result => db.loadData(action.func),
                error => { console.log(error) }
            )
            return [...db.state]
        default: return state

    }

}
export default todos