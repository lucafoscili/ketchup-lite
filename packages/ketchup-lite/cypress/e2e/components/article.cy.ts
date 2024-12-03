import { KulDataCyAttributes } from '../../../src/types/GenericTypes';
import {
  KulArticleDataset,
  KulArticleEvent,
  KulArticleProps,
  KulArticlePropsInterface,
} from './../../../src/components/kul-article/kul-article-declarations';
import { ARTICLE_EXAMPLES_KEYS } from './../../../src/components/kul-showcase/components/article/kul-showcase-article-declarations';

const article = 'article';
const articleCapitalized = article.charAt(0).toUpperCase() + article.slice(1);
const articleTag = 'kul-' + article;

describe('Basic', () => {
  beforeEach(() => {
    cy.navigate(article);
  });

  it(`Should check that all <${articleTag}> exist.`, () => {
    cy.checkComponentExamples(articleTag, new Set(ARTICLE_EXAMPLES_KEYS));
  });

  it(`Should check that the number of <${articleTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(ARTICLE_EXAMPLES_KEYS));
  });
});

describe('Data', () => {
  beforeEach(() => {
    cy.navigate(article);
  });

  it(`Should check whether all <${articleTag}> elements in the page have a number of <section> elements equal to the number of children of the first node of the kulData property and their content matches.`, () => {
    cy.get('@kulComponentShowcase')
      .find(`${articleTag}#simple`)
      .each(($article) => {
        const articleElement = $article[0] as HTMLKulArticleElement;
        const kulData: KulArticleDataset = articleElement.kulData;
        const expectedSectionCount = kulData.nodes[0]?.children?.length || 0;

        if (expectedSectionCount > 0) {
          return cy
            .wrap($article)
            .shadow()
            .find('section')
            .should('have.length', expectedSectionCount)
            .each(($section, index) => {
              const expectedValue =
                kulData.nodes[0]?.children?.[index].value || '';

              return cy
                .wrap($section)
                .find('h2')
                .invoke('text')
                .then((h2Text) => {
                  expect(h2Text).to.equal(expectedValue);
                });
            });
        }
      });
  });

  it('Should check for the presence of shapes.', () => {
    cy.get('@kulComponentShowcase');
    cy.get(`${articleTag}#simple`).then(($article) => {
      const articleElement = $article[0] as HTMLKulArticleElement;
      const kulData: KulArticleDataset = articleElement.kulData;
      const firstNodeChildren = kulData.nodes[0]?.children || [];

      cy.wrap($article)
        .shadow()
        .find('section')
        .each(($section, index) => {
          const child = firstNodeChildren[index];
          const shapeType = child.cells?.[1]?.shape;

          if (shapeType === 'image') {
            cy.wrap($section).find('img').should('exist');
          } else if (shapeType === 'code') {
            cy.wrap($section).find('code').should('exist');
          }
        });
    });
  });

  it(`Should check whether all <${articleTag}> elements in the page have a number of <section> elements equal to the number of children of the first node of the kulData property and their content matches.`, () => {
    cy.get('@kulComponentShowcase');
    cy.get(`${articleTag}#simple`).each(($article) => {
      const articleElement = $article[0] as HTMLKulArticleElement;
      const kulData: KulArticleDataset = articleElement.kulData;
      const expectedSectionCount = kulData.nodes[0]?.children?.length || 0;

      if (expectedSectionCount > 0) {
        return cy
          .wrap($article)
          .shadow()
          .find('section')
          .should('have.length', expectedSectionCount)
          .each(($section, index) => {
            const expectedValue =
              kulData.nodes[0]?.children?.[index].value || '';

            return cy
              .wrap($section)
              .find('h2')
              .invoke('text')
              .then((h2Text) => {
                expect(h2Text).to.equal(expectedValue);
              });
          });
      }
    });
  });
});

describe('Events', () => {
  it(`kul-event`, () => {
    cy.navigate(article);
    const eventType: KulArticleEvent = 'kul-event';
    cy.checkEvent(article, eventType);
    cy.get('@eventElement')
      .findCyElement(KulDataCyAttributes.SHAPE)
      .first()
      .scrollIntoView()
      .click();
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });

  it(`ready`, () => {
    cy.checkReadyEvent(article);
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });

  it(`unmount`, () => {
    cy.navigate(article);
    const eventType: KulArticleEvent = 'unmount';
    cy.checkEvent(article, eventType);
    cy.get('@eventElement').then(($article) => {
      const kulArticleElement = $article[0] as HTMLKulArticleElement;
      kulArticleElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });
});

describe('Methods', () => {
  beforeEach(() => {
    cy.navigate(article);
  });

  it('getDebugInfo: check the structure of the returned object.', () => {
    cy.checkDebugInfo(articleTag);
  });

  it('getDebugInfo, refresh: check that renderCount has increased after refreshing.', () => {
    cy.checkRenderCountIncrease(articleTag);
  });

  it(`getProps: check keys against Kul${articleCapitalized}Props enum.`, () => {
    cy.checkProps(articleTag, KulArticleProps);
  });

  it(`getProps: check keys against Kul${articleCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(articleTag, {
      kulData: null,
      kulStyle: null,
    } as Required<KulArticlePropsInterface>);
  });
});

describe('Props', () => {
  beforeEach(() => {
    cy.navigate(article);
  });

  it('kulStyle: Should check for the presence of a <style> element with id kul-style.', () => {
    cy.checkKulStyle();
  });
});
