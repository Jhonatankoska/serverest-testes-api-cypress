describe("API de Usuários - Serverest (Cenários Negativos)", () => {
  let token = "";
  let emailDuplicado = `duplicado_${Date.now()}@usuario.com`;
  let emailOriginal = `original_${Date.now()}@usuario.com`;
  let userIdOriginal = "";
  let userIdDuplicado = "";

  before(() => {
    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "Usuário Duplicado",
        email: emailDuplicado,
        password: "senha123",
        administrador: "false",
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      userIdDuplicado = res.body._id;

      cy.request({
        method: "POST",
        url: "/usuarios",
        body: {
          nome: "Usuário Original",
          email: emailOriginal,
          password: "senha123",
          administrador: "true",
        },
      }).then((res2) => {
        expect(res2.status).to.eq(201);
        userIdOriginal = res2.body._id;

        cy.request({
          method: "POST",
          url: "/login",
          body: {
            email: emailOriginal,
            password: "senha123",
          },
        }).then((loginRes) => {
          expect(loginRes.status).to.eq(200);
          token = loginRes.body.authorization;
        });
      });
    });
  });

  it("Não deve criar um usuário com email já existente", () => {
    cy.request({
      method: "POST",
      url: "/usuarios",
      failOnStatusCode: false,
      body: {
        nome: "Duplicado",
        email: emailDuplicado,
        password: "qualquer123",
        administrador: "false",
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property(
        "message",
        "Este email já está sendo usado"
      );
    });
  });

  it("Não deve obter usuário com ID inválido", () => {
    const idInvalido = "123invalidUserId";
    cy.request({
      method: "GET",
      url: `/usuarios/${idInvalido}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property("message", "Usuário não encontrado");
    });
  });

  it("Não deve permitir atualizar o usuário com um email já cadastrado", () => {
    cy.request({
      method: "PUT",
      url: `/usuarios/${userIdOriginal}`,
      headers: { Authorization: token },
      failOnStatusCode: false,
      body: {
        nome: "Tentativa Duplicada",
        email: emailDuplicado,
        password: "senha123",
        administrador: "true",
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property("message", "Este email já está sendo usado");
    });
  });

  it("Não deve fazer login com senha incorreta", () => {
    cy.request({
      method: "POST",
      url: "/login",
      failOnStatusCode: false,
      body: {
        email: emailDuplicado,
        password: "senhaErrada",
      },
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property("message", "Email e/ou senha inválidos");
    });
  });
});
