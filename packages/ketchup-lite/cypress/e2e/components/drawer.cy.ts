import { KulDebugLifecycleInfo } from "../../../src/managers/kul-debug/kul-debug-declarations";

const drawer = "drawer";

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(drawer);
  });

  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.get("iframe").then(($iframe) => {
      const iframeDocument = $iframe.contents();
      iframeDocument.find(drawer).each(($el) => {
        cy.wrap($el).then(($el) => {
          const kulDrawerElement = ($el as unknown as JQuery<HTMLElement>).get(
            0,
          ) as HTMLKulDrawerElement;
          kulDrawerElement
            .getDebugInfo()
            .then((debugInfo: KulDebugLifecycleInfo) => {
              expect(debugInfo).to.have.property("endTime").that.is.a("number");
              expect(debugInfo)
                .to.have.property("renderCount")
                .that.is.a("number");
              expect(debugInfo)
                .to.have.property("renderEnd")
                .that.is.a("number");
              expect(debugInfo)
                .to.have.property("renderStart")
                .that.is.a("number");
              expect(debugInfo)
                .to.have.property("startTime")
                .that.is.a("number");
            });
        });
      });
    });
  });
});
//#endregion
