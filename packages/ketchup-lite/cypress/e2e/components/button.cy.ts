import { KUL_BUTTON_PROPS } from "src/components/kul-button/helpers/constants";
import type { KulTheme } from "src/managers/kul-theme/kul-theme";
import { CY_ATTRIBUTES, KUL_DROPDOWN_CLASS_VISIBLE } from "src/utils/constants";
import {
  KulButtonEvent,
  KulButtonState,
  KulButtonStyling,
} from "../../../src/components/kul-button/kul-button-declarations";
import { BUTTON_CATEGORIES_KEYS } from "../../../src/components/kul-showcase/components/button/kul-showcase-button-declarations";

const button = "button";
const buttonTag = "kul-" + button;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(button).waitForWebComponents([buttonTag]);
  });
  it(`Should select all <${buttonTag}> elements matching the composed ID`, () => {
    cy.checkComponentExamplesByCategory(new Set(BUTTON_CATEGORIES_KEYS));
  });
  it(`Should check that all categories have at least 1 <${buttonTag}>`, () => {
    cy.checkComponentExamplesByCategoryNumber(buttonTag);
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`blur`, () => {
    cy.navigate(button);
    const eventType: KulButtonEvent = "blur";
    cy.checkEvent(button, eventType);
    cy.get("@eventElement").find("button").focus().blur();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`click`, () => {
    cy.navigate(button);
    const eventType: KulButtonEvent = "click";
    cy.checkEvent(button, eventType);
    cy.get("@eventElement").find("button").click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`kul-event`, () => {
    cy.navigate(button);
    const eventType: KulButtonEvent = "kul-event";
    cy.checkEvent(button, eventType);
    cy.get("#flat-dropdown")
      .findCyElement(CY_ATTRIBUTES.dropdownButton)
      .click();
    cy.getCyElement(CY_ATTRIBUTES.dropdownMenu)
      .should("be.visible")
      .should("have.class", KUL_DROPDOWN_CLASS_VISIBLE);
    cy.getCyElement(CY_ATTRIBUTES.node).first().click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`pointerdown`, () => {
    cy.navigate(button);
    const eventType: KulButtonEvent = "pointerdown";
    cy.checkEvent(button, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.ripple).click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(button);
  });
  it(`unmount`, () => {
    cy.navigate(button);
    const eventType: KulButtonEvent = "unmount";
    cy.checkEvent(button, eventType);
    cy.get("@eventElement").then(($button) => {
      const kulButtonElement = $button[0] as HTMLKulButtonElement;
      kulButtonElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(button);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(buttonTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(buttonTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(buttonTag, KUL_BUTTON_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(button);
  });
  it("kulData: should check that a button with kulData correctly renders a dropdown button.", () => {
    cy.get("@kulComponentShowcase")
      .find('kul-button[id*="dropdown"]')
      .first()
      .then(($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        expect(button.kulData).to.be.a("object");
      })
      .within(() => {
        cy.getCyElement(CY_ATTRIBUTES.dropdownButton).should("exist");
      });
  });
  it("kulDisabled: should ensure clicking the button does not fire events.", () => {
    cy.get("@kulComponentShowcase")
      .find('kul-button[id*="disabled"]')
      .first()
      .then(($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        expect(button.kulDisabled).to.eq(true);

        let clickEmitted = false;
        button.addEventListener("kul-button-event", (e) => {
          const { eventType } = e.detail;
          if (eventType === "click") {
            clickEmitted = true;
          }
        });

        cy.wrap(button).click({ force: true });
        expect(clickEmitted).to.eq(false);
      });
  });
  it("kulIcon: should check for the presence of an icon.", () => {
    cy.get("@kulComponentShowcase")
      .find('kul-button[id*="icon"]')
      .first()
      .then(($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        expect(button.kulIcon).to.not.be.empty;
      })
      .within(() => {
        cy.getCyElement(CY_ATTRIBUTES.icon).should("exist");
      });
  });
  it("kulIconOff: should ensure that clicking a toggable icon changes the displayed icon.", () => {
    let kulIcon: string;
    let kulIconOff: string;

    cy.get("@kulComponentShowcase")
      .find('kul-button[id*="pulsating"]')
      .first()
      .then(($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        kulIcon = button.kulIcon;
        kulIconOff = button.kulIconOff;
        expect(kulIcon).to.not.be.eq(kulIconOff);
        expect(kulIcon).to.not.be.empty;
        expect(kulIconOff).to.not.be.empty;
      })
      .within(() => {
        cy.getCyElement(CY_ATTRIBUTES.icon)
          .findCyElement(CY_ATTRIBUTES.maskedSvg)
          .then(($svg) => {
            const svg = $svg[0] as HTMLDivElement;
            const iconMask = svg.style.getPropertyValue("--kul_image_mask");
            expect(iconMask).to.include(kulIcon);
          });
      })
      .click()
      .within(() => {
        cy.getCyElement(CY_ATTRIBUTES.icon)
          .findCyElement(CY_ATTRIBUTES.maskedSvg)
          .then(($svg) => {
            const svg = $svg[0] as HTMLKulImageElement;
            const iconMask = svg.style.getPropertyValue("--kul_image_mask");
            expect(iconMask).to.include(kulIconOff);
          });
      });
  });
  it("kulLabel: should ensure that the button has a label.", () => {
    let bemClass: KulTheme["bemClass"];
    cy.getKulManager().then((kulManager) => {
      bemClass = kulManager.theme.bemClass;
    });

    cy.get("@kulComponentShowcase")
      .find('kul-button[id*="label"]')
      .first()
      .then(($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        expect(button.kulLabel).to.not.be.empty;
      })
      .within(() => {
        cy.get(`.${bemClass("button", "label")}`).should("exist");
      });
  });
  it("kulRipple: should check for the presence of a ripple element.", () => {
    cy.checkRipple(`${buttonTag}`);
  });
  it("kulShowSpinner: should ensure that the button has a spinner.", () => {
    let bemClass: KulTheme["bemClass"];
    cy.getKulManager().then((kulManager) => {
      bemClass = kulManager.theme.bemClass;
    });

    cy.get("@kulComponentShowcase")
      .find('kul-button[id*="spinner"]')
      .first()
      .then(($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        expect(button.kulShowSpinner).to.eq(true);
      })
      .within(() => {
        cy.get(`.${bemClass("button", "spinner-container")}`).should("exist");
      });
  });
  it("kulStyle: Should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
  it("kulStyling: should check for the existence of a button for each styling.", () => {
    let bemClass: KulTheme["bemClass"];

    const STYLINGS: KulButtonStyling[] = [
      "flat",
      "floating",
      "icon",
      "outlined",
      "raised",
    ];

    for (let index = 0; index < STYLINGS.length; index++) {
      const STYLING = STYLINGS[index];

      cy.get("@kulComponentShowcase")
        .find(`kul-button[id*="${STYLING}-"]`)
        .first()
        .within(() => {
          cy.getKulManager()
            .then((kulManager) => {
              bemClass = kulManager.theme.bemClass;
            })
            .then(() => {
              const selector = `.${bemClass("button", null, { [STYLING]: true })}`;

              expect(selector).to.exist;
            });
        });
    }
  });
  it("kulToggable: should toggle the value setting it to true.", () => {
    let initialValue: string;

    cy.get("@kulComponentShowcase")
      .find('kul-button[id*="pulsating"]')
      .first()
      .then(($button) => {
        const kulButtonElement = $button[0] as HTMLKulButtonElement;
        return kulButtonElement.getValue();
      })
      .then((value) => {
        initialValue = value;
        const newValue: KulButtonState = value === "on" ? "off" : "on";
        return cy.wrap({ initialValue, newValue });
      })
      .then(({ newValue }) => {
        cy.get("@kulComponentShowcase")
          .find('kul-button[id*="pulsating"]')
          .first()
          .then(($button) => {
            const kulButtonElement = $button[0] as HTMLKulButtonElement;
            return kulButtonElement.setValue(newValue);
          })
          .then(() => {
            return cy.wrap(newValue);
          })
          .then((newValue) => {
            cy.get("@kulComponentShowcase")
              .find('kul-button[id*="pulsating"]')
              .first()
              .then(($button) => {
                const kulButtonElement = $button[0] as HTMLKulButtonElement;
                return kulButtonElement.getValue();
              })
              .then((currentValue) => {
                expect(currentValue).to.equal(newValue);
              });
          });
      });
  });
  it("kulTrailingIcon: should ensure the button displays a trailing icon.", () => {
    let bemClass: KulTheme["bemClass"];
    cy.getKulManager().then((kulManager) => {
      bemClass = kulManager.theme.bemClass;
    });

    cy.get("@kulComponentShowcase")
      .find('kul-button[id*="trailingIcon"]')
      .first()
      .within(($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        expect(button.kulIcon).to.not.be.empty;
        expect(button.kulLabel).to.not.be.empty;
        expect(button.kulTrailingIcon).to.be.true;

        cy.getCyElement(CY_ATTRIBUTES.button)
          .should("exist")
          .and("not.have.class", "no-label")
          .children()
          .then((children) => {
            const [ripple, label, icon] = children.toArray();
            expect(ripple).to.have.attr("data-cy", CY_ATTRIBUTES.ripple);
            expect(label).to.have.class(bemClass("button", "label"));
            expect(icon).to.have.class(bemClass("button", "icon"));
          });
      });

    cy.get("@kulComponentShowcase")
      .find('kul-button[id*="labelIcon"]')
      .first()
      .within(($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        expect(button.kulIcon).to.not.be.empty;
        expect(button.kulLabel).to.not.be.empty;
        expect(button.kulTrailingIcon).to.be.false;

        cy.getCyElement(CY_ATTRIBUTES.button)
          .should("exist")
          .and("not.have.class", "no-label")
          .children()
          .then((children) => {
            debugger;
            const [ripple, icon, label] = children.toArray();
            expect(ripple).to.have.attr("data-cy", CY_ATTRIBUTES.ripple);
            expect(icon).to.have.class(bemClass("button", "icon"));
            expect(label).to.have.class(bemClass("button", "label"));
          });
      });
  });
  it("kulType: should check for the correct type on the button element.", () => {
    cy.get("@kulComponentShowcase")
      .find("kul-button")
      .first()
      .within(($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        expect(button.kulType).to.eq("button");
        cy.getCyElement(CY_ATTRIBUTES.button).should(
          "have.attr",
          "type",
          "button",
        );

        button.kulType = "reset";
      })
      .then(($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        expect(button.kulType).to.eq("reset");
      })
      .findCyElement(CY_ATTRIBUTES.button)
      .should("have.attr", "type", "reset");
  });
  it("kulValue: should check for the correct value.", () => {
    const newButton = document.createElement("kul-button");
    newButton.id = "cy-value-it";
    newButton.kulValue = true;

    cy.get("@kulComponentShowcase")
      .find('kul-button[id*="pulsating"]')
      .first()
      .within(async ($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        const value = await button.getValue();
        expect(value).to.be.false;
        expect(value).to.eq(button.kulValue);
      });

    cy.get("@kulComponentShowcase").within(($showcase) => {
      const showcase = $showcase[0] as HTMLKulShowcaseButtonElement;
      showcase.appendChild(newButton);

      cy.get("#cy-value-it").within(async ($button) => {
        const button = $button[0] as HTMLKulButtonElement;
        const value = await button.getValue();
        expect(value).to.be.true;
        expect(value).to.eq(button.kulValue);
      });
    });
  });
});
//#endregion
