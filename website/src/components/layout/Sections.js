import React from "react";
import { Link } from "@curi/react-dom";

const SECTION_CLASSNAMES = "mt-3 md:max-w-2xl";
const ASIDE_CLASSNAMES = `${SECTION_CLASSNAMES} py-1 px-2 border-l-2 border-border-green bg-light-green `;

export function PlainSection({
  children,
  className = "",
  wrapper: Wrapper = "section"
}) {
  return (
    <Wrapper className={`${SECTION_CLASSNAMES} ${className}`}>
      {children}
    </Wrapper>
  );
}

export function TitledPlainSection({ title, children, ...rest }) {
  return (
    <PlainSection {...rest}>
      <h1 className="outline-none" tabIndex={-1}>
        {title}
      </h1>
      {children}
    </PlainSection>
  );
}

function ArticleSection({ meta: { title, hash }, children, tag: Tag }) {
  return (
    <>
      <Tag id={hash} className="hash-anchor-fix outline-none" tabIndex={-1}>
        <Link hash={hash} className="header-link no-underline">
          {title}
        </Link>
      </Tag>
      {children}
    </>
  );
}

export function HashSection(props) {
  return (
    <section className={SECTION_CLASSNAMES}>
      <ArticleSection {...props} />
    </section>
  );
}

export function HashAside(props) {
  // .inline-code {
  //   background: ${color.green} !important;
  // }
  return (
    <section className={ASIDE_CLASSNAMES}>
      <ArticleSection {...props} />
    </section>
  );
}

export function Paragraph({ children, className = "", ...rest }) {
  return (
    <p {...rest} className={`m-0 mb-4 text-base md:text-lg ${className}`}>
      {children}
    </p>
  );
}
