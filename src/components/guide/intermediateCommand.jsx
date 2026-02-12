import { Button } from "../../dashboard/User/components";
import { Table, } from 'antd';

const IntermediateCommand = ({ setNavlink }) => {
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
      command: 'JOIN / INNER JOIN',
      category: 'Intermediate SQL',
      desc: 'Returns rows only when there is a match in both joined tables based on a related column.',
      exp: 'SELECT t1.col, t2.col FROM table1 t1 INNER JOIN table2 t2 ON t1.id = t2.id;',
    },

    {
      key: '2',
      command: 'LEFT JOIN / LEFT OUTER JOIN',
      category: 'Intermediate SQL',
      desc: 'Returns all rows from the left table and matching rows from the right table; NULL values are used for non-matching right table columns.',
      exp: 'SELECT t1.col, t2.col FROM table1 t1 LEFT JOIN table2 t2 ON t1.id = t2.id;',
    },

    {
      key: '3',
      command: 'RIGHT JOIN / RIGHT OUTER JOIN',
      category: 'Intermediate SQL',
      desc: 'Returns all rows from the right table and matching rows from the left table; NULL values are used for non-matching left table columns.',
      exp: 'SELECT t1.col, t2.col FROM table1 t1 RIGHT JOIN table2 t2 ON t1.id = t2.id;',
    },


    {
      key: '4',
      command: 'FULL OUTER JOIN / FULL JOIN',
      category: 'Intermediate SQL',
      desc: 'Returns all rows when there is a match in either the left or the right table; NULL values are used for non-matching columns.',
      exp: 'SELECT t1.col, t2.col FROM table1 t1 FULL OUTER JOIN table2 t2 ON t1.id = t2.id;',
    },

    {
      key: '5',
      command: 'CROSS JOIN',
      category: 'Intermediate SQL',
      desc: 'Returns the Cartesian product of rows from all tables in the join, combining every row from the first table with every row from the second.',
      exp: 'SELECT t1.col, t2.col FROM table1 t1 CROSS JOIN table2 t2;',
    },

    {
      key: '6',
      command: 'SELF JOIN',
      category: 'Intermediate SQL',
      desc: 'Joins a table to itself, allowing comparison of rows within the same table using aliases.',
      exp: 'SELECT e1.name, e2.name FROM employees e1, employees e2 WHERE e1.manager_id = e2.employee_id;',
    },

    {
      key: '7',
      command: 'COUNT()',
      category: 'Intermediate SQL',
      desc: 'Returns the number of rows in a result set or meeting a condition.',
      exp: 'SELECT COUNT(*) FROM table_name WHERE condition;',
    },


    {
      key: '8',
      command: 'SUM()',
      category: 'Intermediate SQL',
      desc: 'Returns the sum of values in a specified numeric column.',
      exp: 'SELECT SUM(numeric_column) FROM table_name;',
    },


    {
      key: '9',
      command: 'AVG()',
      category: 'Intermediate SQL',
      desc: 'Returns the average value of a specified numeric column.',
      exp: 'SELECT AVG(numeric_column) FROM table_name;',
    },


    {
      key: '10',
      command: 'MIN()',
      category: 'Intermediate SQL',
      desc: 'Returns the minimum value in a specified column.',
      exp: 'SELECT MIN(column) FROM table_name;',
    },


    {
      key: '11',
      command: 'MAX()',
      category: 'Intermediate SQL',
      desc: 'Returns the maximum value in a specified column.',
      exp: 'SELECT MAX(column) FROM table_name;',
    },



    {
      key: '12',
      command: 'GROUP BY',
      category: 'Intermediate SQL',
      desc: 'Groups rows with the same values in one or more columns into a summary row, often used with aggregate functions.',
      exp: 'SELECT group_column, COUNT(*) FROM table_name GROUP BY group_column;',
    },


    {
      key: '13',
      command: 'HAVING',
      category: 'Intermediate SQL',
      desc: 'Filters the results of a GROUP BY clause based on specified conditions applied to the groups.',
      exp: 'SELECT group_column, COUNT(*) FROM table_name GROUP BY group_column HAVING COUNT(*) > 10;',
    },


    {
      key: '14',
      command: 'Subquery',
      category: 'Intermediate SQL',
      desc: 'A query nested inside another SQL query, used in SELECT, FROM, WHERE, or HAVING clauses to retrieve data for the outer query.',
      exp: 'SELECT column FROM table WHERE column IN (SELECT another_column FROM another_table);',
    },


    {
      key: '15',
      command: 'UNION',
      category: 'Intermediate SQL',
      desc: 'Combines the result sets of two or more SELECT statements, removing duplicate rows to ensure uniqueness.',
      exp: 'SELECT column FROM table1 UNION SELECT column FROM table2;',
    },


    {
      key: '16',
      command: 'UNION ALL',
      category: 'Intermediate SQL',
      desc: 'Combines the result sets of two or more SELECT statements, including all rows without removing duplicates.',
      exp: 'SELECT column FROM table1 UNION ALL SELECT column FROM table2;',
    },


    {
      key: '17',
      command: 'INTERSECT',
      category: 'Intermediate SQL',
      desc: 'Returns rows that are common to the result sets of two or more SELECT statements.',
      exp: 'SELECT column FROM table1 INTERSECT SELECT column FROM table2;',
    },


    {
      key: '18',
      command: 'EXCEPT / MINUS',
      category: 'Intermediate SQL',
      desc: 'Returns rows from the first SELECT statement that are not present in the result set of the second SELECT statement.',
      exp: 'SELECT column FROM table1 EXCEPT SELECT column FROM table2;',
    },



  ];



  const textContent = [
    {
      item: "Intermediate SQL commands build upon the basics, enabling more complex data interactions. Joining tables is a fundamental skill for working with relational databases, where data is often spread across multiple tables to ensure normalization and reduce redundancy."
    },

    {
      item: " The JOIN clause, in its various forms (INNER, LEFT, RIGHT, FULL OUTER), allows users to combine data from two or more tables based on relationships defined by common columns.INNER JOIN retrieves only the matching rows from both tables, whereas LEFT JOIN includes all rows from the left table and the matching rows from the right, filling in NULL for unmatched columns from the right table.  RIGHT JOIN operates similarly but prioritizes the right table, and FULL OUTER JOIN returns all rows from both tables, with NULL for non-matches.  The CROSS JOIN creates a Cartesian product, combining every row from one table with every row from another, which can be useful for generating all possible combinations.  Lastly, a SELF JOIN allows a table to be joined with itself, which is particularly useful for analyzing hierarchical data or comparing rows within the same table."
    },

    {
      item: "Aggregate functions provide the ability to summarize and analyze data. COUNT(), SUM(), AVG(), MIN(), and MAX() are essential for performing calculations on sets of data, such as counting the number of records, calculating totals, averages, and identifying extreme values.  The GROUP BY clause works in tandem with these functions by grouping rows based on one or more columns, allowing aggregate functions to be applied to each group.  The HAVING clause then filters these grouped results based on specified conditions, similar to how WHERE filters individual rows."
    },

    {
      item: " Subqueries, or nested queries, are a powerful tool for performing more intricate data retrieval. A subquery can be used within the SELECT, FROM, WHERE, or HAVING clauses of an outer query to provide a set of values or a table that the outer query can then use.3 This allows for the construction of queries that depend on the results of other queries."
    },


    {
      item: " Set operations enable the combination or comparison of the results of multiple SELECT statements. UNION merges the result sets of two or more queries, removing any duplicate rows. UNION ALL performs a similar merge but includes all rows, even duplicates. INTERSECT returns only the rows that are present in the result sets of all combined queries, effectively finding the common elements.21 Finally, EXCEPT (or MINUS in Oracle) returns the rows from the first query that are not present in the result set of the second query, allowing for the identification of differences between datasets."
    },






  ]

  return (
    <div className="sql-basic-command">
      <h2 className="title">Intermediate SQL command</h2>
      <div className="btns">

        <Button
          text='Previous'
          guidebtn
          guideleft
          onClick={() => setNavlink('sql-basic')}
        />

        <Button
          text='Next'
          guidebtn
          guideright
          onClick={() => setNavlink('sql-acid')}
        />

      </div>

      <div className="content">
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 100 }}  className="ant-table-overflow" />
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
          onClick={() => setNavlink('sql-basic')}

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

export default IntermediateCommand;
