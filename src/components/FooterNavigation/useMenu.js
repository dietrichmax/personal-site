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
      menuFooterItems: item.node.translations.menuFooterItems,
    };
  });

  // Only return menu for the current locale
  const { menuFooterItems } = simplified.filter(
    lang => lang.name === locale,
  )[0];

  return menuFooterItems;
}

export default useMenu;

const query = graphql`
  query useFooterMenu {
    rawData: allFile(filter: { sourceInstanceName: { eq: "Footermenu" } }) {
      edges {
        node {
          name
          translations: childFootermenuJson {
            menuFooterItems {
              link
              name
            }
          }
        }
      }
    }
  }
 `;