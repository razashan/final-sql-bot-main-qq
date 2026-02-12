import React from "react";
import { Button } from "../../dashboard/User/components";

const TerminologieSQL = ({ setNavlink }) => {

    const data = [
        {
            term: 'SQL ',
            ans1: '1. SQL stands for Structured Query Language.',
            ans2: '2. SQL is a programming language used for managing relational databases.',
            ans3: '3. Relational databases store data in tables, which are organized into rows and columns',
        },

        {
            term: 'What is RDBMS? ',
            ans1: '1. RDBMS stands for Relational Database Management System.',
            ans2: '2. RDBMS is a software system used for creating, maintaining, and managing relational databases.',
            ans3: '3. Examples of RDBMS include MySQL, Oracle, Microsoft SQL Server, and PostgreSQL.',
        },


        {
            term: 'What is a Database? ',
            ans1: '1. A database is a collection of data that is organized and stored in a structured manner.',
            ans2: '2. Databases can be used for various purposes, such as storing customer information, financial data, or product inventory.',
            ans3: '3. Examples of databases include sales databases, employee databases, and customer databases.',
        },


        {
            term: 'What is a Schema?',
            ans1: '1. A schema is a logical container for database objects, such as tables, views, and indexes.',
            ans2: '2. Schemas can be used to organize database objects and grant access to specific objects to specific users.',
            ans3: '3. Examples of schemas include HR schema, Sales schema, and Marketing schema.',
        },

        {
            term: 'What is a Table?',
            ans1: '1. A table is a collection of related data that is organized into rows and columns.',
            ans2: '2. Tables are the fundamental unit of storage in a relational database.',
            ans3: '3. Tables can be used to store information about customers, products, or employees.',
        },

        {
            term: 'What is a Field? ',
            ans1: '1. A field is a column in a table that represents a specific attribute of the data.',
            ans2: '2. Fields are also called columns or attributes.',
            ans3: '3. Examples of fields include customer name, product price, and employee salary.',
        },

        {
            term: 'What is a Record? ',
            ans1: '1. A record is a row in a table that contains information about a specific entity.',
            ans2: '2. Records are also called rows or tuples..',
            ans3: '3. Examples of records include a customer record, a product record, or an employee record.',
        },

        {
            term: 'What is a Primary Key? ',
            ans1: '1. A primary key is a unique identifier for a record in a table.',
            ans2: '2. Primary keys are used to ensure that each record in a table is unique and can be identified.',
            ans3: '3. Primary keys can be composed of one or more columns.',
        },




        {
            term: 'What is a Foreign Key?',
            ans1: '1. A foreign key is a column in a table that is used to reference the primary key of another table.',
            ans2: '2. Foreign keys are used to establish relationships between tables.',
            ans3: '3. Foreign keys are used to enforce referential integrity between tables.',
        },



        {
            term: 'What is a Null Value?',
            ans1: '1. A null value is a value that indicates that no data is present in a field.',
            ans2: '2. Null values are used to represent missing or unknown data.',
            ans3: '3. Primary keys can be composed of one or more columns.',
        },


        {
            term: 'What is a Primary Key? ',
            ans1: '1. A primary key is a unique identifier for a record in a table.',
            ans2: '2. Primary keys are used to ensure that each record in a table is unique and can be identified.',
            ans3: '3. Null values are used to enforce data integrity and consistency in a database.',
        },


        {
            term: 'What are SQL Constraints?',
            ans1: '1. SQL constraints are rules that are used to enforce data integrity in a database.',
            ans2: '2. SQL constraints can be used to enforce rules such as unique values, not null values, and referential integrity.',
            ans3: '3. Examples of SQL constraints include primary key constraints, foreign key constraints, unique constraints, and check constraints.',
        },

        {
            term: 'What is a Record?',
            ans1: '1. A request for data from a database. Queries are used to retrieve, modify, and delete data from tables.',
        },



    ]

    return (
        <div className="sql-terms">
            <h2 className="title">SQL Terminologies</h2>
            <div className="btns">
                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-intro')}

                />
                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-data-type')}

                />
            </div>
            <div className="content">

                {data.map(
                    (item) => (
                        <div className="all-terms">
                            <h5 className="term-title">{item.term}</h5>
                            <div className="term-ans">
                                <p className="ans">{item.ans1}</p>
                                <p className="ans">{item.ans2}</p>
                                <p className="ans">{item.ans3}</p>
                            </div>
                        </div>
                    ))}

            </div>

            <div className="btns">
                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-intro')}


                />
                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-data-type')}


                />
            </div>

        </div>
    );
};

export default TerminologieSQL;
