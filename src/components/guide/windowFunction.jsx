import { Button } from "../../dashboard/User/components";
import { Table, } from 'antd';

const WindowFunction = ({ setNavlink }) => {

    const columns = [

        {
            title: 'Function Type',
            dataIndex: 'command',
            key: 'command',
            render: text => <p className="table-command">{text}</p>,

        },

        {
            title: 'Function Name',
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
            title: 'Common Use Cases',
            dataIndex: 'desc',
            key: 'desc',
            render: text => <p className="table-example">{text}</p>,

        },




    ];

    const data = [
        {
            key: '1',
            command: 'Ranking',
            category: 'ROW_NUMBER()',
            desc: 'Assigns a unique rank to each row within a partition.',
            exp: 'Numbering results, identifying the first or last row.',
        },

        {
            key: '2',
            command: 'Ranking',
            category: 'RANK()',
            desc: 'Assigns a rank to each row, with gaps for ties.',
            exp: 'Identifying top performers, leaderboards.',
        },

        {
            key: '3',
            command: 'Ranking ',
            category: 'DENSE_RANK()',
            desc: 'Assigns a rank to each row, without gaps for ties.',
            exp: 'Ranking items where consecutive ranks are needed.',
        },


        {
            key: '4',
            command: 'Ranking',
            category: 'NTILE(n)',
            desc: 'Divides rows into n groups and assigns a tile number.',
            exp: 'Calculating percentiles, dividing data into segments.',
        },

        {
            key: '5',
            command: 'Value',
            category: 'LAG(column, offset, default)',
            desc: 'Accesses the value from a preceding row.',
            exp: 'Comparing current value with the previous one, calculating differences over time.',
        },

        {
            key: '6',
            command: 'Value',
            category: 'LEAD(column, offset, default)',
            desc: 'Accesses the value from a succeeding row.',
            exp: 'Comparing current value with the next one, forecasting.',
        },

        {
            key: '7',
            command: 'Value',
            category: 'FIRST_VALUE(column)',
            desc: 'Returns the first value in a partition.',
            exp: 'Identifying the starting value within a group.',
        },

        {
            key: '8',
            command: 'Value',
            category: 'LAST_VALUE(column)',
            desc: 'Returns the last value in a partition.',
            exp: 'Identifying the ending value within a group.',
        },

        {
            key: '9',
            command: 'Aggregate',
            category: 'SUM() OVER()',
            desc: 'Calculates a running sum within a partition.',
            exp: 'Tracking cumulative totals.',
        },

        {
            key: '10',
            command: 'Aggregate',
            category: 'AVG() OVER()',
            desc: 'Calculates a moving average within a partition.',
            exp: 'Smoothing out fluctuations in data.',
        },

        {
            key: '11',
            command: 'Aggregate',
            category: 'COUNT() OVER()',
            desc: 'Counts the number of rows within a partition.',
            exp: 'Determining the size of groups.',
        },

        {
            key: '12',
            command: 'Aggregate',
            category: 'MIN() OVER()',
            desc: 'Finds the minimum value within a partition.',
            exp: 'Identifying the lowest value within a group.',
        },

        {
            key: '13',
            command: 'Aggregate',
            category: 'MAX() OVER()',
            desc: 'Finds the maximum value within a partition.',
            exp: 'Identifying the highest value within a group.',
        },



    ];



    const textContent = [
        {
            item: "This lesson has provided a comprehensive overview of SQL commands, categorized into basic, intermediate, and advanced levels. Understanding the commands within each category is essential for anyone working with relational databases, particularly for software engineers and data scientists preparing for technical interviews."
        },

        {
            item: "While basic and intermediate SQL commands form the foundation of data interaction, a strong command of advanced SQL concepts is particularly critical for success in technical interviews at FAANG companies. Topics such as window functions, CTEs, stored procedures, triggers, indexing, and transaction management are frequently assessed to gauge a candidate's ability to handle complex data scenarios and optimize database operations."
        },

        {
            item: "For effective learning and practice, it is recommended that users engage in regular query writing using various online platforms and sample datasets. The focus should be on comprehending the underlying principles behind each command rather than simply memorizing syntax. Exploring different SQL dialects such as PostgreSQL, MySQL, and SQL Server is also advisable, as interviewers may expect familiarity with common syntax variations. Furthermore, the ability to articulate the reasoning behind the SQL queries written is a key aspect of technical interviews. Practicing common SQL interview questions under timed conditions will help solidify understanding and build confidence. "
        },

        {
            item: "In conclusion, proficiency in SQL is an invaluable skill in the technology industry, and thorough preparation, especially in advanced SQL topics, is essential for excelling in technical interviews and effectively working with data in real-world applications."
        },

    ]

    return (
        <div className="sql-basic-command">
            <h2 className="title">Common window functions</h2>
            <div className="btns">

                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-advanced')}

                />

                <Button
                    text='Next'
                    guidebtn
                    guideright
                // onClick={() => setNavlink('sql-window-functions')}

                />

            </div>

            <div className="content">
                <Table columns={columns} dataSource={data}  pagination={{ pageSize: 100 }}  className="ant-table-overflow" />
            </div>

            <div className="text-content">
                <span>Conclusion: Mastering SQL for Technical Interviews</span>
                {textContent.map(
                    (text) => <p>{text.item}</p>
                )}

            </div>


            <div className="btns">

                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-advanced')}

                />

                <Button
                    text='Next'
                    guidebtn
                    guideright
                // onClick={() => setNavlink('sql-window-functions')}

                />

            </div>
        </div>
    );
};

export default WindowFunction;