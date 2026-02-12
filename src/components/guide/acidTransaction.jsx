import React from "react";
import { Button } from "../../dashboard/User/components";
import { Table, } from 'antd';
import { render } from "@testing-library/react";

const AcidTransaction = ({setNavlink}) => {

    const columns = [

        {
            title: 'SQL Command',
            dataIndex: 'command',
            key: 'command',
            render: text => <p className="table-command">{text}</p>,

        },


        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            render: text => <p className="table-desc">{text}</p>,

        },

        {
            title: 'Real-World Analogy',
            dataIndex: 'exmp',
            key: 'exmp',
            render: text => <p className="table-example">{text}</p>,

        },




    ];

    const data = [

        {
            key: '1',
            command: 'Atomicity',
            desc: 'Ensures all parts of a transaction are completed, or none are.',
            exmp: "A light switch#  It's either entirely on or fully off—no in-between state.",
        },

        {
            key: '2',
            command: 'Consistency',
            desc: 'Ensures all parts of a transaction are completed, or none are.',
            exmp: "A scale#   If weight is added to one side, the other side adjusts to maintain balance.",
        },

        {
            key: '3',
            command: 'Isolation',
            desc: 'Ensures all parts of a transaction are completed, or none are.',
            exmp: "Grocery checkout#   Everyone in line is served individually without mixing up their items.",
        },

        {
            key: '4',
            command: 'Durability',
            desc: 'Ensures that once a transaction is committed, its changes are permanent, even in a system failure.',
            exmp: "Saving a document#   It remains intact even if your computer crashes.",
        },



    ];



    const textContent = [
        {
            item: " Transaction management is crucial for maintaining the integrity and consistency of data, especially in multi-user environments. Transactions are sequences of database operations that are treated as a single logical unit of work. The ACID properties—Atomicity, Consistency, Isolation, and Durability—define the essential characteristics of a reliable transaction. Atomicity ensures that a transaction is either fully completed or entirely rolled back, preventing partial updates.  Consistency guarantees that a transaction brings the database from one valid state to another, adhering to all defined rules. Isolation ensures that concurrent transactions do not interfere with each other, behaving as if they are executing sequentially. Durability ensures that once a transaction is committed, the changes are permanent, even in the event of system failures.  Commands like BEGIN TRANSACTION, COMMIT, and ROLLBACK are used to manage these transactional operations."
        },




    ]

    return (
        <div className="sql-basic-command">
            <h2 className="title">ACID Properties of transaction</h2>
            <div className="btns">

                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-intermediate')}


                />

                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-advanced')}

                />

            </div>

            <div className="content">
                <Table columns={columns} dataSource={data}  className="ant-table-overflow" />
            </div>

            <div className="text-content">
                <span>Note:</span>
                {textContent.map(
                    (text) => <p>{text.item}</p>
                )}

            </div>

        </div>
    );
};

export default AcidTransaction;
