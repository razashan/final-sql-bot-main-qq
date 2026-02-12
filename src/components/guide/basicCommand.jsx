import React from "react";
import { Button } from "../../dashboard/User/components";
import { Table, } from 'antd';
import { render } from "@testing-library/react";

const BasicCommand = ({ setNavlink }) => {

    const columns = [

        {
            title: 'SQL Command',
            dataIndex: 'command',
            key: 'command',
            render: text => <p className="table-command">{text}</p>,

        },

        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: text => <p className="table-catg">{text}</p>,

        },

        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            render: text => <p className="table-desc">{text}</p>,

        },

        {
            title: 'Example on use',
            dataIndex: 'desc',
            key: 'desc',
            render: text => <p className="table-example">{text}</p>,

        },




    ];

    const data = [
        {
            key: '1',
            command: 'SELECT',
            category: 'Basic SQL',
            desc: 'Retrieves data from one or more tables, specifying the columns to be returned.',
            exp: 'SELECT column_name FROM table_name;',
        },

        {
            key: '2',
            command: 'FROM',
            category: 'Basic SQL',
            desc: 'Specifies the table(s) from which to retrieve data, indicating the source for the SELECT statement.',
            exp: 'SELECT column_name FROM table_name;',
        },

        {
            key: '3',
            command: 'WHERE',
            category: 'Basic SQL',
            desc: 'Filters the result set to include only rows that meet specified conditions using comparison and logical operators.',
            exp: 'SELECT column_name FROM table_name;',
        },


        {
            key: '4',
            command: 'SELECT DISTINCT',
            category: 'Basic SQL',
            desc: 'Retrieves only unique rows from the result set, eliminating duplicates based on the selected columns.',
            exp: 'SELECT DISTINCT column_name FROM table_name;',
        },

        {
            key: '5',
            command: 'ORDER BY',
            category: 'Basic SQL',
            desc: 'Sorts the result set based on specified columns, arranging rows in ascending (ASC) or descending (DESC) order.',
            exp: 'SELECT column_name FROM table_name ORDER BY column_name ASC;',
        },

        {
            key: '6',
            command: 'LIMIT',
            category: 'Basic SQL',
            desc: 'Restricts the number of rows returned by the query (syntax varies by SQL dialect).',
            exp: 'SELECT column_name FROM table_name LIMIT 10;',
        },

        {
            key: '7',
            command: 'TOP',
            category: 'Basic SQL',
            desc: 'Restricts the number of rows returned by the query (used in SQL Server).',
            exp: 'SELECT TOP 10 column_name FROM table_name;',
        },


        {
            key: '8',
            command: 'FETCH FIRST',
            category: 'Basic SQL',
            desc: 'Restricts the number of rows returned by the query (used in Oracle).',
            exp: 'SELECT column_name FROM table_name FETCH FIRST 10 ROWS ONLY;',
        },


        {
            key: '9',
            command: 'INSERT INTO',
            category: 'Basic SQL',
            desc: 'Adds new rows to a table, allowing population of all or specific columns with data.',
            exp: 'INSERT INTO table_name (column1) VALUES (value1);',
        },


        {
            key: '10',
            command: 'UPDATE',
            category: 'Basic SQL',
            desc: 'Modifies existing records in a table by changing the values of specified columns in rows that meet a certain condition.',
            exp: 'UPDATE table_name SET column1 = value1 WHERE condition;',
        },


        {
            key: '11',
            command: 'DELETE FROM',
            category: 'Basic SQL',
            desc: 'Removes rows from a table based on a specified condition; without a WHERE clause, it deletes all rows.',
            exp: 'DELETE FROM table_name WHERE condition;',
        },



        {
            key: '12',
            command: 'CREATE DATABASE',
            category: 'Basic SQL',
            desc: 'Creates a new database within the database management system, requiring appropriate privileges.',
            exp: 'CREATE DATABASE database_name;',
        },


        {
            key: '13',
            command: 'CREATE TABLE',
            category: 'Basic SQL',
            desc: 'Restricts the number of rows returned by the query (used in Oracle).',
            exp: 'SELECT column_name FROM table_name FETCH FIRST 10 ROWS ONLY;',
        },


        {
            key: '14',
            command: 'ALTER TABLE',
            category: 'Basic SQL',
            desc: 'Modifies the structure of an existing table, allowing the addition, deletion, or modification of columns and constraints.',
            exp: 'ALTER TABLE table_name ADD column_name datatype;',
        },


        {
            key: '15',
            command: 'DROP TABLE',
            category: 'Basic SQL',
            desc: 'Deletes a table and its associated data permanently from the database.',
            exp: 'DROP TABLE table_name;',
        },
    ];



    const textContent = [
        {
            item: "The SELECT command, in conjunction with FROM and WHERE, forms the bedrock of data retrieval in SQL. The SELECT statement specifies which columns should be included in the result, while FROM indicates the table or tables from which this data should be sourced.13 The WHERE clause introduces a crucial element of filtering, enabling users to pinpoint specific subsets of data based on defined criteria. For instance, a user might want to retrieve only customers from a specific city or orders placed within a certain date range. Beyond basic filtering, the SELECT DISTINCT command is used to ensure that only unique records are returned, which is valuable when dealing with datasets that might contain duplicates"
        },

        {
            item: "Presenting data in an organized manner is often a requirement, and the ORDER BY clause fulfills this need by allowing the sorting of the result set based on one or more columns, in either ascending or descending order. When dealing with large datasets, it's often practical to limit the number of rows returned. Different SQL dialects offer various commands to achieve this: LIMIT is commonly used in MySQL and PostgreSQL, TOP in SQL Server, and FETCH FIRST in Oracle.  Awareness of these variations is important for candidates preparing for interviews that might involve different database systems.Data manipulation is another fundamental aspect of SQL, encompassing the ability to add, modify, and remove data.The INSERT INTO command is used to add new records to a table, specifying either all columns or a subset thereof along with their corresponding values.To modify existing data, the UPDATE command is employed, allowing changes to be made to specific columns based on conditions defined in the WHERE clause.21 Conversely, the DELETE FROM command serves to remove rows from a table that satisfy a given condition, or all rows if no condition is specified."
        },

        {
            item: "Finally, the basic structure of a database is defined using Data Definition Language (DDL) commands. CREATE DATABASE is the initial command to establish a new database. Within a database, CREATE TABLE is used to define the schema of individual tables, including column names and their data types. Existing tables can be modified using ALTER TABLE, which allows for adding or dropping columns, as well as altering their properties. When a table is no longer needed, DROP TABLE is used to permanently remove it from the database. These basic DDL commands are essential for setting up and managing the database environment."
        },


    ]

    return (
        <div className="sql-basic-command ">
            <h2 className="title">Basic SQL command</h2>
            <div className="btns">

                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-categories')}
                />

                <Button
                    text='Next'
                    guidebtn
                    guideright

                    onClick={() => setNavlink('sql-intermediate')}
                />

            </div>

            <div className="content">
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 100 }} className="ant-table-overflow"/>
            </div>

            <div className="text-content">
                <span>Note:</span>
                {textContent.map(
                    (text) => <p>{text.item}</p>
                )}

            </div>


            <div className="btns">

                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-categories')}

                />

                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-advanced')}

                />

            </div>
        </div>
    );
};

export default BasicCommand;
