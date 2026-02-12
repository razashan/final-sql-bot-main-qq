import React from "react";
import { Button } from "../../dashboard/User/components";

const ERD = ({ setNavlink }) => {
  const textContent = [
    {
      item: "Data modeling is the process of creating a conceptual representation of data, called a data model, which describes the data and its relationships to other data. One common tool used for data modeling is the Entity-Relationship (ER) diagram. ",
    },

    {
      item: "An ER diagram visually represents entities (things that exist in the world, such as customers or orders) and their relationships to each other.Entities are the building blocks of an ER diagram. They represent things that exist in the world and that we want to store data about. ",
    },

    {
      item: "In ER diagrams, entities are uniquely identified by their primary keys, which are one or more attributes that uniquely identify each instance of the entity. For example, in the customer entity, the primary key might be the customer ID.",
    },

    {
      item: "When one entity has a relationship with another entity, it often includes a foreign key, which is an attribute in one entity that refers to the primary key of another entity. For example, in the orders entity, the customer ID might be a foreign key that refers to the primary key of the customer entity.",
    },
  ];

  return (
    <div className="erd-data-model">
      <h2 className="title">ER Diagram & Data modal</h2>
      <div className="btns">
        <Button text="Previous" guidebtn guideleft
          onClick={() => setNavlink('sql-data-type')}
        />

        <Button text="Next" guidebtn guideright
          onClick={() => setNavlink('sql-categories')}
        />
      </div>

      {/* contetn */}
      <div className="content">
        {textContent.map((text) => (
          <p>{text.item}</p>
        ))}
      </div>

      {/* examples */}
      <div className="examples">
        <p>
          For example, in a retail business, we might have entities for
          customers, orders, and products.{" "}
        </p>
        <ol class="dot">
          <li>
            {" "}
            <span> Attributes:</span> Entities have attributes, which are
            characteristics or properties that describe the entity. For example,
            a customer entity might have attributes like name, email, and
            address.
          </li>

          <li>
            {" "}
            <span> Relationships:</span> Entities are connected to each other through relationships, which describe how they are related to each other.
          </li>
        </ol>

      </div>

      {/* types */}

      <div className="erd-types">
        <p>There are several types of relationships in ER diagrams, including:</p>


        <ol>
          <li>
            One-to-One (1:1) Relationship: <span> A one-to-one relationship exists when one instance of an entity is associated with exactly one instance of another entity. For example, each employee may have one manager.</span>
          </li>

          <li>
            One-to-Many (1:N) Relationship: <span>
              A one-to-many relationship exists when one instance of an entity is associated with zero, one, or many instances of another entity. For example, each customer may place one, or many orders.</span>
          </li>

          <li>
            Many-to-One (N:1) Relationship: <span>   A many-to-one relationship exists when many instances of an entity are associated with one instance of another entity. For example, many orders may be placed by one customer.</span>
          </li>

          <li>
            Many-to-Many (N:N) Relationship:  <span>  A many-to-many relationship exists when many instances of an entity are associated with many instances of another entity. For example, many customers may place many orders.</span>
          </li>

        </ol>

      </div>




      {/* image */}
      <div className="erd-img">
        <img src="/images/erd-diagram.webp" alt="erd-img" className="erd-diagram" />
      </div>

      <div className="btns">
        <Button text="Previous" guidebtn guideleft
          onClick={() => setNavlink('sql-data-type')}
        />

        <Button text="Next" guidebtn guideright
          onClick={() => setNavlink('sql-window-functions')}
        />
      </div>
    </div>
  );
};

export default ERD;
