import React from "react";
import { Button } from "../../dashboard/User/components";

const DataTypeSQL = ({setNavlink}) => {

    const data = [
        {
            term: 'INTEGER ',
            ans1: 'The “INTEGER” data type is used to store whole numbers. ',
            ans2: 'It can store values from -2147483648 to 2147483647 (or from -9223372036854775808 to 9223372036854775807 in some databases).',
        },

        {
            term: 'FLOAT/Decimal',
            ans1: 'The “FLOAT/Decimal” data type is used to store floating-point numbers.',
            ans2: 'The maximum length of the string is also defined when the table is created, but it can be changed later',
        },


        {
            term: 'String/VARCHAR',
            ans1: 'The VARCHAR/NVARCHAR data type is used to store variable-length character strings. ',
            ans2: 'It can store values from -2147483648 to 2147483647 (or from -9223372036854775808 to 9223372036854775807 in some databases).',
        },


        {
            term: 'DATE/DATETIME/TIMESTAMP',
            ans1: 'The DATE/DATETIME/TIMESTAMP data types are used to store dates and times.',
            ans2: 'The DATE data type is used to store dates only, the DATETIME data type is used to store both dates and times, and the TIMESTAMP data type is used to store dates and times with higher precision.',
        },

        {
            term: 'BOOLEAN/BOOL',
            ans1: 'The BOOLEAN/BOOL data type is used to store Boolean values, such as true or false. ',
            ans2: 'In some databases, it is represented as 1 (true) or 0 (false).',
        },

    ]

    return (
        <div className="sql-data-types">
            <h2 className="title">SQL Data types</h2>
            <div className="btns">
                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-terminologie')}

                />
                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-erd')}

                />
            </div>
            <div className="content">

                {data.map(
                    (item) => (
                        <div className="all-terms">
                            <h5 className="term-title">{item.term}</h5>
                            <div className="term-ans">
                                <p className="ans">{item.ans1}</p>
                                <p className="ans2">{item.ans2}</p>
                            </div>
                        </div>
                    ))}

            </div>

            <div className="btns">
                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-terminologie')}


                />
                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-erd')}
                />
            </div>

        </div>
    );
};

export default DataTypeSQL;
