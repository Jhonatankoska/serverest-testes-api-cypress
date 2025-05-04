describe("API de Usuários - Serverest", () => {
  let token = "";
  let userId = "";
  let emailAdmin = `qa_${Date.now()}@admin.com`;

  before(() => {
    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "QA Test",
        email: emailAdmin,
        password: "teste123",
        administrador: "true",
      },
    }).then((res) => {
      expect(res.status).to.eq(201);

      cy.request({
        method: "POST",
        url: "/login",
        body: {
          email: emailAdmin,
          password: "teste123",
        },
      }).then((loginRes) => {
        token = loginRes.body.authorization;
      });
    });
  });

  it("Deve criar um novo usuário", () => {
    const emailUsuario = `novo_${Date.now()}@usuario.com`;
    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "Novo Usuário",
        email: emailUsuario,
        password: "123456",
        administrador: "false",
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      userId = res.body._id;
    });
  });

  it("Deve listar todos os usuários", () => {
    cy.request("/usuarios").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("usuarios");
    });
  });

  it("Deve obter um usuário por ID", () => {
    cy.request(`/usuarios/${userId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("nome");
    });
  });

  it("Deve atualizar um usuário", () => {
    cy.request({
      method: "PUT",
      url: `/usuarios/${userId}`,
      headers: { Authorization: token },
      body: {
        nome: "Usuário Atualizado",
        email: `atualizado_${Date.now()}@usuario.com`,
        password: "123456",
        administrador: "true",
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it("Deve deletar um usuário", () => {
    cy.request({
      method: "DELETE",
      url: `/usuarios/${userId}`,
      headers: { Authorization: token },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
