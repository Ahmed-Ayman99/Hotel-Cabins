import styled, { css } from "styled-components";

const headingAs = {
  h1: css`
    font-size: 3rem;
    font-weight: 600;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;
  `,
  h3: css`
    font-size: 2rem;
    font-weight: 500;
  `,
  h4: css`
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
  `,
};

const Heading = styled.h1`
  line-height: 1.4;
  ${({ as }) => headingAs[as]}
`;

Heading.defaultProps = {
  as: "h1",
};

export default Heading;
