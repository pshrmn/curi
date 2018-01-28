import React from "react";
import { Link } from "@curi/react";

import BaseTutorial from "./base/BaseTutorial";
import { TutorialBranch, CompleteBranch, Outline } from "./base/Branch";
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from "../components/PrismBlocks";
import { Note } from "../components/Messages";
import { Section, Subsection } from "../components/Sections";
import CodeSandboxDemo from "../components/CodeSandboxDemo";

export default () => (
  <BaseTutorial>
    <h1>Part 7: Rendering Data with React</h1>
    <p>
      Now that our responses have <IJS>data</IJS>, we should update our{" "}
      <Cmp>BookList</Cmp> and <Cmp>Book</Cmp> components to use that. Accessing
      the <IJS>data</IJS> is really easy because it is a property of our{" "}
      <IJS>response</IJS> object.
    </p>
    <Outline>
      <ul>
        <li>
          Updating our <Cmp>BookList</Cmp> and <Cmp>Book</Cmp> components to
          render using <IJS>response.data</IJS>.
        </li>
      </ul>
    </Outline>
    <TutorialBranch name="07-render-data-react" />
    <Section title="Using Data with the Book List" id="book-list">
      <p>
        Currently, in our <IJS>BookList.js</IJS> file, we are importing the
        books from a file. Now, we can remove that import and instead use the{" "}
        <IJS>response</IJS> prop to access our data. Since we also have better
        data, we can now use each book's title for the link text.
      </p>
      <PrismBlock lang="jsx">
        {`// src/components/BookList.js
const BookList = ({ response }) => (
  <div className='book-list'>
    <h1>Available Books</h1>
    <div className='books'>
      { response.data.books.map(b => (
        <div key={b.id} className='book-item'>
          <Link to='Book' params={{ id: b.id }}>
            {b.title}
          </Link>
        </div>
      )) }
    </div>
  </div>
);`}
      </PrismBlock>
      <Note>
        If our <IJS>render</IJS> function (passed to the{" "}
        <Cmp>ResponsiveBase</Cmp>) had just passed the <IJS>params</IJS> instead
        of the whole <IJS>response</IJS>, we would have to modify that function
        to also pass along the <IJS>data</IJS>. Since we pass the entire{" "}
        <IJS>response</IJS>, we do not have to worry about updating that
        function.
      </Note>
    </Section>
    <Section title="Using Data with the Book" id="book">
      <p>
        We are already using the <IJS>response</IJS> prop in <Cmp>Book</Cmp>.
        Now, instead of using <IJS>params</IJS>, we will switch to using{" "}
        <IJS>data</IJS>. We can also take advantage of the <IJS>data.book</IJS>{" "}
        properties to expand on our <Cmp>Book</Cmp> implementation.
      </p>
      <p>
        We also have a special case that we need to consider: what should we do
        when there is no matching book? In the sample data, we have books with
        ids that range from 0-9. What if the user navigates to{" "}
        <IJS>/books/123</IJS>? Our <IJS>fetchBook</IJS> call will reject and{" "}
        <IJS>response.data</IJS> will be <IJS>undefined</IJS>. For now, we can
        just detect when <IJS>response.data</IJS> is <IJS>undefined</IJS> and
        render a simple message stating that the requested book does not exist.
      </p>
      <PrismBlock lang="jsx">
        {`// src/components/Book.js
const Book = (props) => {
  const { data } = props.response;
  if (!data) {
    return (
      <div className='book'>
        The requested book does not exist
      </div>
    );
  }
  const { book } = data;
  return (
    <div className='book'>
      <h2>{book.title}</h2>
      <p>By {book.author}</p>
      <p>Published in {book.published}</p>
      <p>This book is {book.pages} pages</p>
    </div>
  );
};`}
      </PrismBlock>
    </Section>
    <p>
      Now that we are using <IJS>response.data</IJS> in both the{" "}
      <Cmp>BookList</Cmp> and <Cmp>Book</Cmp> components, we can remove the{" "}
      <IJS>books.js</IJS> file.
    </p>
    <PrismBlock lang="bash">{`git rm src/books.js`}</PrismBlock>
    <Section title="Review" id="review">
      <p>
        Our "Book List" and "Book" pages are now rendered using data from{" "}
        <IJS>response.data</IJS>.
      </p>
      <CompleteBranch name="08-nav-react" />
      <CodeSandboxDemo id="github/pshrmn/curi-tutorial/tree/08-nav-react" />
    </Section>
    <Section title="Next" id="next">
      <p>
        Our book component still isn't complete. We are building a book store
        after all, so we should really provide the user a way to actually "buy"
        a book. In{" "}
        <Link to="Tutorial" params={{ name: "08-nav-react" }}>
          Part 8: Forms & Navigation
        </Link>, we will add the ability to add books to a shopping cart and
        "purchase" them from our "Checkout" route.
      </p>
    </Section>
  </BaseTutorial>
);
