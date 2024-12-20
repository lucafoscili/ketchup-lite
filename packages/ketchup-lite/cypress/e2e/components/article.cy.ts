import { KUL_ARTICLE_PROPS } from "src/components/kul-article/helpers/constants";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";
import {
  KulArticleDataset,
  KulArticleEvent,
} from "./../../../src/components/kul-article/kul-article-declarations";
import { ARTICLE_EXAMPLES_KEYS } from "./../../../src/components/kul-showcase/components/article/kul-showcase-article-declarations";

const article = "article";
const articleTag = "kul-" + article;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(article).waitForWebComponents([articleTag, "kul-code"]);
  });
  it(`Should check that all <${articleTag}> exist.`, () => {
    cy.checkComponentExamples(articleTag, new Set(ARTICLE_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${articleTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(ARTICLE_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`kul-event`, () => {
    cy.navigate(article);
    const eventType: KulArticleEvent = "kul-event";
    cy.checkEvent(article, eventType);
    cy.get("@eventElement")
      .findCyElement(KulDataCyAttributes.SHAPE)
      .first()
      .scrollIntoView()
      .click();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(article);
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
  it(`unmount`, () => {
    cy.navigate(article);
    const eventType: KulArticleEvent = "unmount";
    cy.checkEvent(article, eventType);
    cy.get("@eventElement").then(($article) => {
      const kulArticleElement = $article[0] as HTMLKulArticleElement;
      kulArticleElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(article);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(articleTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(articleTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(articleTag, KUL_ARTICLE_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(article);
  });
  it("kulData: Should check for the presence of shapes in the dataset.", () => {
    cy.get("@kulComponentShowcase")
      .find(`${articleTag}#simple`)
      .should("exist")
      .then(($article) => {
        const articleElement = $article[0] as HTMLKulArticleElement;
        const kulData = articleElement.kulData;
        const firstNodeChildren = kulData.nodes[0]?.children || [];

        return cy
          .wrap($article)
          .shadow()
          .find("section")
          .should("have.length", firstNodeChildren.length)
          .each(($section, index) => {
            const child = firstNodeChildren[index];
            const shapeType = child.cells?.[1]?.shape;

            if (shapeType === "image") {
              cy.wrap($section).find("img").should("exist");
            } else if (shapeType === "code") {
              cy.wrap($section).find("kul-code").should("exist");
            } else {
              cy.log(`No shape to check for index ${index}`);
            }
          });
      });
  });
  it("kulStyle: Should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion

//#region e2e
describe("e2e", () => {
  beforeEach(() => {
    cy.navigate(article);
  });
  it(`Should check whether all <${articleTag}> elements have the correct number of <section> elements and matching content.`, () => {
    cy.get("@kulComponentShowcase");

    cy.get(`${articleTag}#simple`).each(($article) => {
      const articleElement = $article[0] as HTMLKulArticleElement;
      const kulData = articleElement.kulData;
      const expectedSections = kulData.nodes[0]?.children || [];

      if (expectedSections.length > 0) {
        return cy
          .wrap($article)
          .shadow()
          .find("section")
          .should("have.length", expectedSections.length)
          .each(($section, index) => {
            const expectedValue = expectedSections[index]?.value || "";

            cy.wrap($section).find("h2").should("have.text", expectedValue);
          });
      }
    });
  });
  it(`Should check whether all <${articleTag}> elements in the page have a number of <section> elements equal to the number of children of the first node of the kulData property and their content matches.`, () => {
    cy.get("@kulComponentShowcase")
      .find(`${articleTag}#simple`)
      .each(($article) => {
        const articleElement = $article[0] as HTMLKulArticleElement;
        const kulData: KulArticleDataset = articleElement.kulData;
        const expectedSectionCount = kulData.nodes[0]?.children?.length || 0;

        if (expectedSectionCount > 0) {
          return cy
            .wrap($article)
            .shadow()
            .find("section")
            .should("have.length", expectedSectionCount)
            .each(($section, index) => {
              const expectedValue =
                kulData.nodes[0]?.children?.[index].value || "";

              return cy
                .wrap($section)
                .find("h2")
                .invoke("text")
                .then((h2Text) => {
                  expect(h2Text).to.equal(expectedValue);
                });
            });
        }
      });
  });
});
//#endregion
