import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { LocaleContext } from '../Layout';

function useMenu() {
  // Grab the locale (passed through context) from the Context Provider
  const { locale } = React.useContext(LocaleContext);
  // Query the JSON files in <rootDir>/i18n/translations
  const { rawData } = useStaticQuery(query);

  // Simplify the response from GraphQL
  const simplified = rawData.edges.map(item => {
    return {
      name: item.node.name,
      menuHeaderItems: item.node.translations.menuHeaderItems,
    };
  });

  // Only return menu for the current locale
  const { menuHeaderItems } = simplified.filter(
    lang => lang.name === locale,
  )[0];

  return menuHeaderItems;
}

export default useMenu;

const query = graphql`
  query useHeaderMenu {
    rawData: allFile(filter: { sourceInstanceName: { eq: "Headermenu" } }) {
      edges {
        node {
          name
          translations: childHeadermenuJson {
            menuHeaderItems {
              link
              name
            }
          }
        }
      }
    }
  }
 `;