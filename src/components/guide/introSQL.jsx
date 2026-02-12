import React, { useState } from "react";
import { Button } from "../../dashboard/User/components";

const IntroSQL = ({ setNavlink}) => {


    const textContent = [
        { item: "Structured Query Language (SQL) serves as a foundational tool for interacting with relational databases, which remain a critical component in the data management infrastructure of numerous large-scale systems." },

        { item: 'A strong understanding of SQL is therefore indispensable for software engineers and data scientists, as their roles frequently involve the retrieval, manipulation, and analysis of data residing within these databases.' },

        { item: "For premier technology firms, including FAANG companies, proficiency in SQL is a key criterion evaluated during technical interviews to assess a candidate's capability to handle data with both efficiency and effectiveness. The interview process often requires candidates to formulate SQL queries to address specific challenges, demanding not only a grasp of basic syntax but also a comprehension of more advanced concepts and optimization strategies. A robust knowledge of SQL underscores a candidate's analytical thinking and problem-solving abilities within the context of data-intensive tasks." },

        { item: 'This lesson aims to provide a comprehensive guide by categorizing SQL commands into three distinct levels: basic, intermediate, and advanced.' },

        { item: 'The overarching objective is to deliver a thorough resource that encompasses all essential SQL commands pertinent to technical interviews, with a particular emphasis on advanced SQL concepts that are frequently assessed by FAANG companies. Ultimately, this guide is intended to be a valuable asset for self-directed learning and rigorous interview preparation, enabling users to systematically develop and master their SQL skills.' },

        { item: 'SQL (Structured Query Language) is a programming language that is used to manage and manipulate data stored in relational databases and data warehouses. SQL is a standard language that can be used with a variety of database management systems (DBMS), including MySQL, Oracle, SQL Server, and PostgreSQL.' },

        { item: 'Relational databases are data storage systems that store data in tables with rows and columns. Each table in a relational database represents a specific type of data, and each row represents a unique record. For example, a customer database might have a table for customer data, with columns for customer name, address, phone number, and email.' },


        { item: 'Data warehouses are specialized databases that are designed to support business intelligence and analytics applications. Data warehouses store large amounts of historical data, which can be used for reporting, data mining, and other analytical purposes. Data warehouses are typically optimized for read-heavy workloads and may use specialized indexing and partitioning techniques to improve performance.' },
    ]



    return (
        <div className="sql-intro">
            <h2 className="title">Introduction of SQL</h2>
            <div className="btns">
                <Button
                    text='Previous'
                    guidebtn
                    guideleft
                />
                <Button
                    text='Next'
                    guidebtn
                    guideright
                    onClick={() => setNavlink('sql-terminologie')}
                />
            </div>
            <div className="content">
                {textContent.map((text, index) => (
                    <p key={index}>{text.item}</p>
                ))}
            </div>
        </div>
    );
};

export default IntroSQL;
