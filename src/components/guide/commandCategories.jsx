import React from "react";
import { Button } from "../../dashboard/User/components";

const CommandCategories = ({ setNavlink }) => {

    const data = [
        {
            term: 'Data Definition Language (DDL) ',
            des: 'DDL commands are used to define, modify, and delete the structure of database objects, such as tables, views, and indexes. Examples of DDL commands include:',
            tableleft: {
                create: 'CREATE TABLE:',
                alter: 'ALTER TABLE:',
                drop: 'DROP TABLE:',
                createIndex: 'CREATE INDEX:',
            },
            tableRight: {
                create: 'Creates a new table in the database.',
                alter: 'Modifies the structure of an existing table..',
                drop: 'Deletes a table and its associated data from the database.',
                createIndex: 'Creates an index on one or more columns of a table to improve query performance.',
            }
        },




        {
            term: '     Data Manipulation Language (DML) ',
            des: 'DML commands are used to manipulate the data stored in the database, such as inserting, updating, and deleting data. Examples of DML commands include:',
            tableleft: {
                create: 'SELECT:',
                alter: 'INSERT: ',
                drop: 'UPDATE:',
                createIndex: 'DELETE:',
            },
            tableRight: {
                create: 'Retrieves data from one or more tables based on specified criteria.',
                alter: 'Adds new data into a table.',
                drop: 'Modifies existing data in a table',
                createIndex: 'Removes data from a table.',
            }
        },




        {
            term: 'Data Control Language (DCL) ',
            des: 'DCL commands are used to control access to the database by granting or revoking permissions to users and roles. Examples of DCL commands include:',
            tableleft: {
                create: 'GRANT:',
                alter: 'REVOKE:',

            },
            tableRight: {
                create: 'Gives permissions to a user or role to perform a specific action on a database object.',
                alter: 'Removes permissions from a user or role to perform a specific action on a database object',

            }
        },



        {
            term: 'Transaction Control Language (TCL) ',
            des: 'TCL commands are used to control transactions, which are sequences of SQL statements that are executed as a single unit of work. Examples of TCL commands include:',
            tableleft: {
                create: 'COMMIT:',
                alter: 'ROLLBACK:',
                drop: 'SAVEPOINT:',
            },
            tableRight: {
                create: 'Saves the changes made to the database since the last COMMIT or ROLLBACK statement.',
                alter: 'Undoes the changes made to the database since the last COMMIT or ROLLBACK statement.',
                drop: 'Creates a point in a transaction that can be used to rollback the transaction to a specific point if necessary.',
            }
        },



    ]



    return (
        <div className="sql-command-categories">
            <h2 className="title">Categories of SQL command</h2>
            <div className="btns">
                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-erd')}
                />
                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-basic')}
                />
            </div>
            <div className="content">

                {data.map(
                    (item) => (
                        <div className="all-terms">
                            <h5 className="term-title">{item.term}</h5>
                            <p className="desc">{item.des}</p>
                            <div className="table">
                                <div className="table-left">
                                    <p className="">{item.tableleft?.create}</p>
                                    <p className="">{item.tableleft?.alter}</p>
                                    <p className="">{item.tableleft?.drop}</p>
                                    <p className="">{item.tableleft?.createIndex}</p>
                                </div>
                                <div className="table-right">
                                    <p className="">{item.tableRight?.create}</p>
                                    <p className="">{item.tableRight?.alter}</p>
                                    <p className="">{item.tableRight?.drop}</p>
                                    <p className="">{item.tableRight?.createIndex}</p>
                                </div>
                            </div>
                        </div>
                    ))}

            </div>

            <div className="btns">
                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-erd')}
                />
                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-basic')}
                />
            </div>

        </div>
    );
};

export default CommandCategories;
