import { Button } from "../../dashboard/User/components";
import { Table, } from 'antd';

const AdvancedCommand = ({ setNavlink }) => {

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
            command: 'ROW_NUMBER()',
            category: 'Advanced SQL (Window Function)',
            desc: 'Assigns a unique sequential integer to each row within a partition of a result set, based on the order specified.',
            exp: 'SELECT col, ROW_NUMBER() OVER (ORDER BY order_col) AS rn FROM table;',
        },

        {
            key: '2',
            command: 'RANK()',
            category: 'Advanced SQL (Window Function)',
            desc: 'Assigns a rank to each row within a partition, with gaps for ties in the ranking.',
            exp: 'SELECT col, RANK() OVER (ORDER BY order_col DESC) AS rnk FROM table;',
        },

        {
            key: '3',
            command: 'DENSE_RANK()',
            category: 'Advanced SQL (Window Function)',
            desc: 'Assigns a rank to each row within a partition, without gaps for ties, resulting in consecutive ranks.',
            exp: 'SELECT col, DENSE_RANK() OVER (ORDER BY order_col DESC) AS drnk FROM table;',
        },


        {
            key: '4',
            command: 'NTILE(n)',
            category: 'Advanced SQL (Window Function)',
            desc: 'Distributes rows in a partition into n approximately equal groups, assigning a group number to each row.',
            exp: 'SELECT t1.col, t2.col FROM table1 t1 FULL OUTER JOIN table2 t2 ON t1.id = t2.id;',
        },

        {
            key: '5',
            command: 'LAG(col, offset, default)',
            category: 'Advanced SQL (Window Function)',
            desc: 'Accesses data from a previous row in the same result set, relative to the current row.',
            exp: 'SELECT col, LAG(col, 1, 0) OVER (ORDER BY order_col) AS prev_val FROM table;',
        },

        {
            key: '6',
            command: 'LEAD(col, offset, default)',
            category: 'Advanced SQL (Window Function)',
            desc: 'Accesses data from a subsequent row in the same result set, relative to the current row.',
            exp: 'SELECT col, LEAD(col, 1, 0) OVER (ORDER BY order_col) AS next_val FROM table;',
        },

        {
            key: '7',
            command: 'FIRST_VALUE(col)',
            category: 'Advanced SQL (Window Function)',
            desc: 'Returns the value of the specified column from the first row of the window frame.',
            exp: 'SELECT col, FIRST_VALUE(col) OVER (PARTITION BY part_col ORDER BY order_col) AS first FROM table;',
        },


        {
            key: '8',
            command: 'LAST_VALUE(col)',
            category: 'Advanced SQL (Window Function)',
            desc: 'Returns the value of the specified column from the last row of the window frame.',
            exp: 'SELECT col, LAST_VALUE(col) OVER (PARTITION BY part_col ORDER BY order_col) AS last FROM table;',
        },


        {
            key: '9',
            command: 'WITH (CTE)',
            category: 'Advanced SQL ',
            desc: 'Defines a temporary, named result set (Common Table Expression) that can be referenced within a single query, improving readability and allowing for recursive queries.',
            exp: 'WITH temp_table AS (SELECT * FROM another_table) SELECT * FROM temp_table WHERE condition;',
        },


        {
            key: '10',
            command: 'CREATE PROCEDURE',
            category: 'Advanced SQL',
            desc: 'Creates a stored procedure, a named set of SQL statements stored in the database that can be executed by name, often accepting parameters.',
            exp: 'CREATE PROCEDURE GetOrdersByCustomer (IN cust_id INT) BEGIN SELECT * FROM orders WHERE customer_id = cust_id; END;',
        },


        {
            key: '11',
            command: 'CREATE TRIGGER',
            category: 'Advanced SQL (Window Function)',
            desc: 'Creates a trigger, a database object associated with a table that activates in response to specific events (e.g., INSERT, UPDATE, DELETE) to automate actions.',
            exp: 'CREATE TRIGGER LogOrderInsert AFTER INSERT ON orders FOR EACH ROW BEGIN INSERT INTO order_log (order_id) VALUES (NEW.id); END;',
        },



        {
            key: '12',
            command: 'CREATE INDEX',
            category: 'Advanced SQL ',
            desc: 'Creates an index on one or more columns of a table to enhance the speed of data retrieval operations.',
            exp: 'CREATE INDEX idx_customer_id ON customers (customer_id);',
        },


        {
            key: '13',
            command: 'DROP INDEX',
            category: 'Advanced SQL',
            desc: 'Deletes an existing index from a table.',
            exp: 'DROP INDEX idx_customer_id ON customers;',
        },


        {
            key: '14',
            command: 'BEGIN TRANSACTION / START TRANSACTION',
            category: 'Advanced SQL ',
            desc: 'Marks the beginning of a database transaction, a sequence of operations treated as a single logical unit.',
            exp: 'BEGIN TRANSACTION;',
        },


        {
            key: '15',
            command: 'COMMIT',
            category: 'Advanced SQL',
            desc: 'Saves all changes made within the current transaction to the database permanently.',
            exp: 'COMMIT;',
        },


        {
            key: '16',
            command: 'ROLLBACK',
            category: 'Advanced SQL ',
            desc: 'Undoes all changes made within the current transaction, reverting the database to its state before the transaction began.',
            exp: 'ROLLBACK;',
        },


        {
            key: '17',
            command: 'SAVEPOINT',
            category: 'Advanced SQL',
            desc: 'Sets a point within a transaction to which you can later roll back, allowing for partial transaction rollback.',
            exp: 'SAVEPOINT savepoint_name;',
        },


        {
            key: '18',
            command: 'EXPLAIN PLAN / EXPLAIN',
            category: 'Advanced SQL',
            desc: 'Provides information about the execution plan the database will use for a query, aiding in performance analysis and optimization.',
            exp: "EXPLAIN SELECT * FROM table WHERE column = 'value';",
        },


        {
            key: '19',
            command: 'CREATE VIEW',
            category: 'Advanced SQL',
            desc: 'Creates a virtual table based on the result of a SQL statement, simplifying complex queries and providing data abstraction.',
            exp: "CREATE VIEW customer_orders AS SELECT c.name, o.order_id FROM customers c JOIN orders o ON c.id = o.customer_id;",
        },




        {
            key: '20',
            command: 'DROP VIEW',
            category: 'Advanced SQL',
            desc: 'Removes an existing view from the database.',
            exp: "DROP VIEW customer_orders;",
        },



        {
            key: '21',
            command: 'ALTER VIEW',
            category: 'Advanced SQL',
            desc: 'Modifies an existing view in the database.',
            exp: "ALTER VIEW customer_orders AS SELECT c.name, o.order_id, o.order_date FROM customers c JOIN orders o ON c.id = o.customer_id;",
        },


        {
            key: '22',
            command: 'TRUNCATE TABLE',
            category: 'Advanced SQL',
            desc: 'Removes all rows from a table quickly, without logging individual row deletions, but keeps the table structure.',
            exp: "TRUNCATE TABLE orders;",
        },


        {
            key: '23',
            command: 'CREATE USER',
            category: 'Advanced SQL',
            desc: 'Creates a new user account in the database system.',
            exp: "CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'password';",
        },



        {
            key: '24',
            command: 'ALTER USER',
            category: 'Advanced SQL',
            desc: 'Modifies an existing user account.',
            exp: "ALTER USER 'new_user'@'localhost' IDENTIFIED BY 'new_password';",
        },

        {
            key: '25',
            command: 'DROP USER',
            category: 'Advanced SQL',
            desc: 'Removes a user account from the database system.',
            exp: "DROP USER 'new_user'@'localhost';",
        },


        {
            key: '26',
            command: 'GRANT',
            category: 'Advanced SQL',
            desc: 'Grants specific privileges or permissions to a user or role on database objects.',
            exp: "GRANT SELECT ON customers TO 'new_user'@'localhost';",
        },



        {
            key: '27',
            command: 'REVOKE',
            category: 'Advanced SQL',
            desc: 'Revokes previously granted privileges or permissions from a user or role.',
            exp: "REVOKE SELECT ON customers FROM 'new_user'@'localhost';",
        },



        {
            key: '28',
            command: 'CREATE FUNCTION (User-Defined Function)',
            category: 'Advanced SQL',
            desc: 'Creates a user-defined function that can be called within SQL statements to perform custom logic and return a scalar value or a table.',
            exp: "CREATE FUNCTION CalculateTax (price DECIMAL, rate DECIMAL) RETURNS DECIMAL AS BEGIN RETURN price * rate; END;",
        },



        {
            key: '29',
            command: 'DROP FUNCTION',
            category: 'Advanced SQL',
            desc: 'Removes an existing user-defined function from the database.',
            exp: "DROP FUNCTION CalculateTax;",
        },



        {
            key: '29',
            command: 'CREATE MATERIALIZED VIEW',
            category: 'Advanced SQL',
            desc: 'Creates a materialized view, which is a pre-computed snapshot of data from a query, stored in the database to improve performance of complex queries.',
            exp: "CREATE MATERIALIZED VIEW monthly_sales AS SELECT DATE_TRUNC('month', order_date), SUM(amount) FROM orders GROUP BY 1;",
        },



        {
            key: '30',
            command: 'DROP MATERIALIZED VIEW',
            category: 'Advanced SQL',
            desc: 'Removes an existing materialized view from the database.',
            exp: "DROP MATERIALIZED VIEW monthly_sales;",
        },

        {
            key: '31',
            command: 'MERGE INTO',
            category: 'Advanced SQL',
            desc: 'Performs insert, update, or delete operations on a target table based on the results of a join with a source table.',
            exp: "MERGE INTO target_table AS target USING source_table AS source ON (target.id = source.id) WHEN MATCHED THEN UPDATE SET target.col = source.col WHEN NOT MATCHED THEN INSERT (id, col) VALUES (source.id, source.col);",
        },


        {
            key: '32',
            command: 'CROSS APPLY',
            category: 'Advanced SQL',
            desc: 'Invokes a table-valued function for each row of an outer table, returning the combined results (similar to an inner join).',
            exp: "SELECT o.order_id, ca.product_name FROM orders o CROSS APPLY GetOrderItems(o.order_id) ca;",
        },

        {
            key: '33',
            command: 'OUTER APPLY',
            category: 'Advanced SQL',
            desc: 'Invokes a table-valued function for each row of an outer table, returning the combined results, including rows from the outer table even if the function returns no rows (similar to a left join).',
            exp: "SELECT c.customer_id, oa.order_id FROM customers c OUTER APPLY GetLatestOrder(c.customer_id) oa;",
        },


        {
            key: '33',
            command: 'Table Variables',
            category: 'Advanced SQL',
            desc: 'Declares a temporary, table-like structure that exists only for the duration of a batch or procedure, used to store and process temporary data.',
            exp: "DECLARE @temp_orders TABLE (order_id INT, order_date DATE); INSERT INTO @temp_orders SELECT id, date FROM orders WHERE customer_id = 1; SELECT * FROM @temp_orders;",
        },

        {
            key: '34',
            command: 'Hierarchical Queries (CONNECT BY PRIOR)',
            category: 'Advanced SQL',
            desc: 'Constructs queries to retrieve data organized in a hierarchy, defining parent-child relationships within a table.',
            exp: "SELECT employee_id, employee_name, manager_id FROM employees START WITH manager_id IS NULL CONNECT BY PRIOR employee_id = manager_id;",
        },

        {
            key: '36',
            command: 'Fulltext Search (MATCH AGAINST)',
            category: 'Advanced SQL',
            desc: 'Performs searches on text columns using fulltext indexes, allowing for natural language queries and various search modes.',
            exp: "SELECT title FROM articles WHERE MATCH (body) AGAINST ('search terms' IN NATURAL LANGUAGE MODE);",
        },


        {
            key: '37',
            command: 'Dynamic SQL (EXECUTE IMMEDIATE)',
            category: 'Advanced SQL',
            desc: 'Allows the construction and execution of SQL statements at runtime, providing flexibility for queries where the structure or parameters are not known in advance.',
            exp: "DECLARE @sql VARCHAR(MAX) = 'SELECT * FROM ' + @table_name + ' WHERE ' + @condition; EXECUTE (@sql);",
        },

        {
            key: '38',
            command: 'Row-Level Security (RLS)',
            category: 'Advanced SQL',
            desc: 'Implements security policies to control access to rows in a database table based on user context or group membership.',
            exp: "CREATE SECURITY POLICY SalesFilter ON sales.Orders FILTER FUNCTION sales.fn_securitypredicate(SalesPersonID) WITH SCHEMABINDING;",
        },


        {
            key: '39',
            command: 'Indexed Views',
            category: 'Advanced SQL',
            desc: 'Creates a view that is physically stored in the database, similar to a materialized view, improving query performance for the view.',
            exp: "CREATE UNIQUE CLUSTERED INDEX idx_custorder ON Sales.vw_CustomerOrders (CustomerID, OrderID);",
        },


        {
            key: '40',
            command: 'Cursors',
            category: 'Advanced SQL',
            desc: 'Creates a view that is physically stored in the database, similar to a materialized view, improving query performance for the view.',
            exp: "DECLARE cursor_name CURSOR FOR SELECT column FROM table; OPEN cursor_name; FETCH NEXT FROM cursor_name INTO @variable; WHILE @@FETCH_STATUS = 0 BEGIN -- Perform operations SET @variable =... FETCH NEXT FROM cursor_name INTO @variable; END; CLOSE cursor_name; DEALLOCATE cursor_name;",
        },

        {
            key: '41',
            command: 'Table Partitioning',
            category: 'Advanced SQL',
            desc: 'Divides a large table into smaller, more manageable segments called partitions, improving query performance and manageability.',
            exp: "CREATE TABLE orders (order_id INT, order_date DATE, amount DECIMAL) PARTITION BY RANGE (YEAR(order_date)) (PARTITION p0 VALUES LESS THAN (2023), PARTITION p1 VALUES LESS THAN (2024));",
        },

    ];



    const textContent = [
        {
            item: "Advanced SQL commands unlock sophisticated data manipulation and analysis capabilities, crucial for tackling complex problems in technical interviews, especially those at FAANG companies. Window functions, identified as a key advanced SQL concept, allow for calculations across a set of table rows that are related to the current row. Ranking functions like ROW_NUMBER(), RANK(), and DENSE_RANK() are used to assign ranks to rows within a partition of a result set, based on specified criteria.  Value functions such as LAG() and LEAD() enable access to data in preceding or succeeding rows, facilitating comparisons across rows. Aggregate functions can also be used as window functions with the OVER() clause to compute running totals, averages, and other aggregate values within a defined window of rows."
        },

        {
            item: "Common Table Expressions (CTEs), defined using the WITH clause, provide a way to define temporary result sets that can be referenced within a single query. CTEs enhance query readability and allow for the construction of recursive queries, which are particularly useful for navigating hierarchical data structures. Stored procedures, created with CREATE PROCEDURE, are named sets of SQL statements stored in the database that can be executed by calling their name. They offer benefits such as improved security, modularity, and performance. Triggers, created using CREATE TRIGGER, are database objects that automatically execute a predefined set of SQL statements in response to certain events on a table, such as INSERT, UPDATE, or DELETE. They are often used for auditing, maintaining data integrity, and enforcing business rules."
        },

        {
            item: "Indexing, managed with CREATE INDEX and DROP INDEX, is a critical technique for optimizing query performance.  Creating indexes on frequently queried columns can significantly speed up data retrieval. Transaction management commands, including BEGIN TRANSACTION, COMMIT, ROLLBACK, and SAVEPOINT, are essential for ensuring data consistency and integrity when performing multiple related database operations. "
        },

        {
            item: " For performance analysis, the EXPLAIN PLAN (or EXPLAIN) command provides insights into how the database will execute a query, allowing for identification of potential bottlenecks and areas for optimization. Views, created with CREATE VIEW, offer a way to encapsulate complex queries and provide a simplified, virtual representation of data, enhancing security and ease of use.  TRUNCATE TABLE offers a fast way to remove all rows from a table while retaining the table structure. Managing database access involves commands like CREATE USER, ALTER USER, DROP USER, GRANT, and REVOKE to control user accounts and their permissions. User-defined functions, created with CREATE FUNCTION, allow users to extend the functionality of SQL by writing custom functions that can be used in queries Materialized views, created with CREATE MATERIALIZED VIEW, store the results of a query to improve performance for frequently executed, complex queries. The MERGE INTO statement provides a way to perform conditional updates and inserts in a single operation. CROSS APPLY and OUTER APPLY are used to invoke table-valued functions for each row of an outer table, offering more flexible ways to join tables with functions. Table variables, declared using DECLARE @variable TABLE (...), are temporary table-like structures useful for storing data within a batch or procedure Hierarchical queries, often using CONNECT BY PRIOR in Oracle, are designed for retrieving and manipulating data with parent-child relationships. Fulltext search capabilities, accessed via commands like MATCH AGAINST, allow for efficient searching of text data using specialized indexes.  Dynamic SQL enables the construction and execution of SQL statements that are not fully known at compile time. Row-level security (RLS) provides fine-grained control over data access at the row level.  Indexed views are materialized views that are automatically updated when the base tables change.  Cursors allow for sequential processing of rows in a result set.92 Table partitioning divides large tables into smaller, more manageable parts to improve performance and manageability."
        },

    ]

    return (
        <div className="sql-basic-command">
            <h2 className="title">Advanced SQL command</h2>
            <div className="btns">

                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                    onClick={() => setNavlink('sql-acid')}

                />

                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-window-functions')}

                />

            </div>

            <div className="content">
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 100 }} className="ant-table-overflow" />
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
                    onClick={() => setNavlink('sql-acid')}
                />

                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-window-functions')}

                />

            </div>
        </div>
    );
};

export default AdvancedCommand;