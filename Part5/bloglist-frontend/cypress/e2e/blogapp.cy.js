describe("Blog app", () => {
  beforeEach(function () {
    const user = {
      username: "max33",
      name: "HolaSoyMax",
      password: "max22"
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
      username: "otromax",
      name: "HolaSoyOtroMax",
      password: "otromax"
    });
    cy.login({ username: user.username, password: user.password });

    cy.createBlog({
      author: "max33",
      title: "este es un test cypress",
      url: "cypress.com"
    });

    cy.get("#logout").click();
  });
  it("login is rendered initially", function () {
    cy.get('#form input[type="text"]').should("exist");
    cy.get('#form input[type="password"]').should("exist");
  });

  describe("login", function () {
    it("user can log in, and blogs render", function () {
      cy.get('#form input[type="text"]').type("max33");
      cy.get('#form input[type="password"]').type("max22");
      cy.get("#form button").click();

      cy.get("#blogsdiv .blogpost").should(
        "contain",
        "este es un test cypress"
      );
    });

    it("if login is not succesful, blogs do not render", function () {
      cy.get('#form input[type="text"]').type("max33");
      cy.get('#form input[type="password"]').type("max21");
      cy.get("#form button").click();

      cy.get("#blogsdiv .blogpost").should("not.exist");
    });

    it("if login is not succesful, red error is shown", function () {
      cy.get('#form input[type="text"]').type("max33");
      cy.get('#form input[type="password"]').type("max21");
      cy.get("#form button").click();

      setTimeout(() => {
        cy.get("#notification").should("have.css", "color", "red");
      }, 500);
    });
  });

  describe("when logged in", function () {
    it("user can log in, post, and the blog is rendered", function () {
      cy.get('#form input[type="text"]').type("max33");
      cy.get('#form input[type="password"]').type("max22");
      cy.get("#form button").click();

      cy.contains("create a new blog!").click();

      cy.get('input[placeholder="title"]').type("este es un test cypress2");
      cy.get('input[placeholder="author"]').type("max333");
      cy.get('input[placeholder="url"]').type("cypress2.com");
      cy.get("#createbutton").click();

      cy.get("#blogsdiv").should("contain", "max33");
    });

    it("user can like a post, and likes are updated", function () {
      cy.login({ username: "max33", password: "max22" });
      cy.get(".visible-div").contains("button", "view").click();
      cy.get(".blogpost").contains("button", "like").click();

      cy.get(".blogpost").contains("1");
    });

    it("user cannot delete a post that wasn't created by himself", function () {
      cy.login({ username: "otromax", password: "otromax" });
      cy.get(".visible-div").contains("button", "view").click();
      cy.get(".blogpost").contains("button", "delete").should("not.exist");
    });

    it("user can delete a post created by himself", function () {
      cy.login({ username: "max33", password: "max22" });
      cy.contains("create a new blog!").click();

      cy.contains(".blogpost", "este es un test cypress")
        .find("button")
        .click();

      cy.get("#delete").click();

      cy.get(".blogpost").should("not.exist");
    });
  });

  describe("blog order", function () {
    it("order by likes works", function () {
      cy.login({ username: "max33", password: "max22" });

      cy.createBlog({
        author: "max33",
        title: "este es un test cypress2",
        url: "cypress.com",
        likes: 1
      });

      cy.createBlog({
        author: "max33",
        title: "este es un test cypress3",
        url: "cypress.com",
        likes: 2
      });

      cy.get("select").select("likes");

      cy.get(".blogpost").eq(0).should("contain", "este es un test cypress");
      cy.get(".blogpost").eq(1).should("contain", "este es un test cypress2");
      cy.get(".blogpost").eq(2).should("contain", "este es un test cypress3");
    });
  });
});
