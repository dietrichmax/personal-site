/*import styled from "styled-components"

import ReactMarkdown from "react-markdown";
import { HeadingProps } from "react-markdown/lib/ast-to-react";

const Container = styled.div``
const Row = styled.div``
const Col = styled.div``


export default function TableOfContents(markdown) {
  const toc: {
    level,
    id,
    title,
}[] = [];
    // Magic.
    const addToTOC = ({children, ...props}) => {
        const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1));
        if (level && children && typeof children[0] === "string") {
            const id = children[0].toLowerCase().replace(/[^a-z0-9]+/g, "-");
            toc.push({
                level,
                id,
                title: children[0],
            });
            return React.createElement(
                props.node.tagName, {id}, children
            )
        } else {
            return React.createElement(props.node.tagName, props, children);
        }
    };

    function TOC() {
        return (
            <ul className="table-of-contents">
                {toc.map(({level, id, title}) => (
                    <li key={id} className={`toc-entry-level-${level}`}>
                        <a href={`#${id}`}>{title}</a>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <Container>
            <Row>
                <Col>
                    <ReactMarkdown
                        components={{
                            h2: addToTOC,
                            h3: addToTOC,
                            h4: addToTOC,
                            h5: addToTOC,
                            h6: addToTOC,
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </Col>
                <Col>
                    {/* More magic. 
                    <TOC />
                </Col>
            </Row>
        </Container>
    );
}

*/
